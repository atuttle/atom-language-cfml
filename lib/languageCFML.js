//	Set Const values for string scope names
const GRAMMAR_CFML = 'source.cfml';
const GRAMMAR_CFSCRIPT = 'source.cfscript';
const GRAMMAR_EMBEDDED_CFML = 'text.html.cfml';

const componentOutlinePanel = require('./componentOutlinePanel.js');

module.exports = {
	config: {
		'enableComponentOutlinePanel': {
			title: 'Enable Component Outline',
			description: '**Experimental** - Adds a panel to the right of editor when a coldfusion component it open. It provides an outline of the current active component.',
			type: 'boolean',
			default: false
		}
	},
	activate: function() {
		//	Try loading the grammars
		module.ComponentOutlinePanelConfigObserver = atom.config.observe('language-cfml.enableComponentOutlinePanel', updateComponentOutlinePanel);

		//	Listen for the addition of the CMFL grammar.
		module.grammarObserver = atom.grammars.onDidAddGrammar(function(grammar) {
			switch (grammar.scopeName) {
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
				// cfc's need to watch for changes so the grammar can be switched; default to script
				if (editor.getURI().endsWith('cfc')) {
					// If the grammars are ready, assign the language mode now
					if (!!module.cfscriptGrammar && !!module.htmlCfmlGrammar) {
						atom.grammars.assignLanguageMode(editor.getBuffer(), checkEditorGrammar(editor));
					}
					observeGrammarChange(editor);

					if( atom.config.get('language-cfml.enableComponentOutlinePanel') ) {
						let outlinePanel = new componentOutlinePanel(); // Get handle to singleton
						if (atom.workspace.getActivePaneItem() == editor){
							outlinePanel.updatePanelInstance( editor ); // If the current file is a .cfc
						}
					}

				} else if (editor.getURI().endsWith("cfm") || editor.getURI().endsWith("cfml")) {
					// cfm(l) files should use the mixed-mode grammar
					//	If the grammer is loaded:
					if (module.htmlCfmlGrammar) {
						const buffer = editor.getBuffer();
						atom.grammars.assignLanguageMode(buffer, GRAMMAR_EMBEDDED_CFML);
					}
				}
			}
		});

		// now establish the grammars after the listeners have been set
		module.htmlCfmlGrammar = atom.grammars.grammarForScopeName(GRAMMAR_EMBEDDED_CFML);
		module.cfmlGrammar = atom.grammars.grammarForScopeName(GRAMMAR_CFML);
		module.cfscriptGrammar = atom.grammars.grammarForScopeName(GRAMMAR_CFSCRIPT);

		return;
	},

	deactivate: function() {
		// dispose of attached events
		module.grammarObserver.dispose();
		module.editorObserver.dispose();
		module.ComponentOutlinePanelConfigObserver.dispose();

		for (var editor of atom.workspace.getTextEditors()) {
			if (editor._cfcGrammarObserver) {
				editor._cfcGrammarObserver.dispose();
				delete editor._cfcGrammarObserver;
			}
		}

		delete module.grammarObserver;
		delete module.editorObserver;
		delete module.ComponentOutlinePanelConfigObserver;

		delete module.htmlCfmlGrammar;
		delete module.cfmlGrammar;
		delete module.cfscriptGrammar;
	}
};

/**
 * Check the current editor, if it is a CFC editor, and auto-switch to the cfscript grammar if necessary
 */
function checkEditorGrammar(editor) {
	if (
		!editor._checking_is_script && // not already checking...
		!!module.htmlCfmlGrammar && // and html/cfml grammar is loaded
		!!module.cfscriptGrammar // and cfscript grammar is loaded
	) {
		editor._checking_is_script = true;
		//	Only run this is the grammars have been defined.
		for (var line of editor.getBuffer().getLines()) {
			if (line.length) {
				if (/^\s*</.test(line)) {
					delete editor._checking_is_script;
					return GRAMMAR_EMBEDDED_CFML;
				} else {
					delete editor._checking_is_script;
					return GRAMMAR_CFSCRIPT;
				}
			}
		}
	}
	//	Presume Script until modules are ready
	delete editor._checking_is_script;
	return editor.getGrammar().scopeName || GRAMMAR_CFSCRIPT;
}

function observeGrammarChange(editor) {
	if (editor && !editor._cfcGrammarObserver) {
		editor._cfcGrammarObserver = editor.onDidChange(function(e) {
			const detectedGrammer = checkEditorGrammar(editor);
			if (detectedGrammer != editor.getGrammar().scopeName) {
				//	Only update the grammer if it's changed:
				atom.grammars.assignLanguageMode(editor.getBuffer(), detectedGrammer);
			}
		});
	}
}

function updateComponentOutlinePanel(active) {
	let outlinePanel = new componentOutlinePanel(); // Get the singleton
	if(active) {
		outlinePanel.createPanelInstance();
	} else {
		outlinePanel.destroyPanelInstance();
	}
}
