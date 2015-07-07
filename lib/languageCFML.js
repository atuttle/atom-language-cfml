module.exports = {
	activate: function() {
		//	Listen for the addition of the CMFL grammar.
		module.htmlCfmlGrammar = atom.grammars.grammarForScopeName('text.html.cfml');
		module.cfmlGrammar = atom.grammars.grammarForScopeName('source.cfml');
		module.cfscriptGrammar = atom.grammars.grammarForScopeName('source.cfscript');

		atom.grammars.onDidAddGrammar(function (grammar) {
			switch (grammar.scopeName){
				case "text.html.cfml":
					module.htmlCfmlGrammar = grammar;
					break;
				case "source.cfml":
					module.cfmlGrammar = grammar;
					break;
				case "source.cfscript":
					module.cfscriptGrammar = grammar;
					break;
			}
		});
		//	Listen for opening new files.
		atom.workspace.emitter.on("did-open", function(tab){
			if (!!tab.item.getURI() && tab.item.getURI().endsWith("cfc")) {
				return checkCfscriptEditorGrammar(tab.item);
			} else if (!!tab.item.getURI() && tab.item.getURI().endsWith("cfm")) {
				if (!!module.htmlCfmlGrammar) {
					tab.item.setGrammar(module.htmlCfmlGrammar);
				}
				return;
			}
		});
		//	Add listners to all existing text editor instances.
		for (var editor of atom.workspace.getTextEditors()) {
			if (!!editor.getURI() && editor.getURI().endsWith("cfc")) {
				bindCfcChangeChecker(editor);
				checkCfscriptEditorGrammar(editor);
			} else if (!!editor.getURI() && editor.getURI().endsWith("cfm")) {
				if (!!module.htmlCfmlGrammar) {
					editor.setGrammar(module.htmlCfmlGrammar);
				}
			}
		}
	}
};

/**
 * Check the current editor, if it is a CFC editor, and auto-switch to the cfscript grammar if necessary
 */
function checkCfscriptEditorGrammar(editor) {
	if (!editor._checking_is_cfscript) {
		editor._checking_is_cfscript=true;
		if (!!module.cfmlGrammar && !!module.cfscriptGrammar) {
			//	Only run this is the grammars have been defined.
			for (var line of editor.getBuffer().lines) {
				if (line.length) {
				 	if (/(\bimport\b|^\s*\/\*|^\s*\/\/|\bcomponent\b|\binterface\b)/.test(line)) {
						editor.setGrammar(module.cfscriptGrammar);
					} else {
						editor.setGrammar(module.htmlCfmlGrammar);
					}
					break;
				}
			}
		}
		editor._checking_is_cfscript=false;
	}
}

function bindCfcChangeChecker(editor) {
	editor._changeChecker = editor.emitter.on("did-change", function() {
		checkCfscriptEditorGrammar(editor);
	});
}
