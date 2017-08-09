module.exports = {
	activate: function() {
		//	Try loading the grammars
		module.htmlCfmlGrammar = atom.grammars.grammarForScopeName('text.html.cfml');
		module.cfmlGrammar = atom.grammars.grammarForScopeName('source.cfml');
		module.cfscriptGrammar = atom.grammars.grammarForScopeName('source.cfscript');

		//	Listen for the addition of the CMFL grammar.
		module.grammarObserver = atom.grammars.onDidAddGrammar(function (grammar) {
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

		//	Observes all currently open editors, and editors opened in the future
		module.editorObserver = atom.workspace.observeTextEditors(function(editor) {
			// apparently sometimes the uri can be null
			if (!!editor.getURI()) {
				// cfc's need to watch for changes so the grammar can be switched
				if (editor.getURI().endsWith("cfc")) {
					bindCfcChangeChecker(editor);
					checkCfscriptEditorGrammar(editor);
				// cfm(l) files should use the mixed-mode grammar
				} else if (editor.getURI().endsWith("cfm") || editor.getURI().endsWith("cfml")) {
					if (module.htmlCfmlGrammar) {
						editor.setGrammar(module.htmlCfmlGrammar);
					}
				}
			}
		});
	}

	,deactivate: function() {
		// dispose of attached events
		module.grammarObserver.dispose();
		module.editorObserver.dispose();
		for (var editor of atom.workspace.getTextEditors()) {
			if (editor._cfcChangeChecker) {
				editor._cfcChangeChecker.dispose();
				delete editor._cfcChangeChecker;
			}
		}

		delete module.grammarObserver;
		delete module.editorObserver;
		delete module.htmlCfmlGrammar;
		delete module.cfmlGrammar;
		delete module.cfscriptGrammar;
	}
};

/**
 * Check the current editor, if it is a CFC editor, and auto-switch to the cfscript grammar if necessary
 */
function checkCfscriptEditorGrammar(editor) {
	if ( !editor._checking_is_cfscript // not already checking...
	  && !!module.htmlCfmlGrammar // and html/cfml grammar is loaded
	  && !!module.cfscriptGrammar // and cfscript grammar is loaded
	) {
		editor._checking_is_cfscript=true;
		//	Only run this is the grammars have been defined.
		
		for (var line of editor.getBuffer().getLines()) {
			if (line.length) {
			 	if (/(\bimport\b|^\s*\/\*|^\s*\/\/|\bcomponent\b|\binterface\b)/.test(line)) {
					editor.setGrammar(module.cfscriptGrammar);
				} else {
					editor.setGrammar(module.htmlCfmlGrammar);
				}
				break;
			}
		}
		editor._checking_is_cfscript=false;
	}
}

function bindCfcChangeChecker(editor) {
	if (editor && !editor._cfcChangeChecker) {
		editor._cfcChangeChecker = editor.onDidChange(function() {
			checkCfscriptEditorGrammar(editor);
		});
	}
}
