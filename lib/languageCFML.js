module.exports = {
	activate: function() {
		module.cfmlGrammar = atom.grammars.grammarForScopeName("text.cf.cfml");
		module.cfscriptGrammar = atom.grammars.grammarForScopeName("text.cf.cfscript");

		atom.workspace.emitter.on("did-open", function(tab){
			if (tab.item.getURI().endsWith("cfc")) {
				bindChangeChecker(tab.item);
				return checkCfscriptEditorGrammar(tab.item);
			}
		});

		for (var editor of atom.workspace.getTextEditors()) {
			if (editor.getURI().endsWith("cfc")) {
				bindChangeChecker(editor);
				checkCfscriptEditorGrammar(editor);
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

		for (var line of editor.getBuffer().lines) {
			if (line.length) {
			 	if (/(\bimport\b|^\s*\/\*|\bcomponent\b|\binterface\b)/.test(line)) {
					editor.setGrammar(module.cfscriptGrammar);
				} else {
					editor.setGrammar(module.cfmlGrammar);
				}
				break;
			}
		}
		editor._checking_is_cfscript=false;
	}
}



function bindChangeChecker(editor) {
	editor._changeChecker = editor.emitter.on("did-change", function() {
		checkCfscriptEditorGrammar(editor);
	});
}
