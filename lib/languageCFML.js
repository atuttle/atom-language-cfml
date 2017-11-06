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
				case GRAMMAR_EMBEDDED_CFML:
					module.htmlCfmlGrammar = grammar;
					break;
				case GRAMMAR_CFML:
					module.cfmlGrammar = grammar;
					break;
				case GRAMMAR_CFSCRIPT:
					module.cfscriptGrammar = grammar;
					break;
			}
		});

		//	Observes all currently open editors, and editors opened in the future
		module.editorObserver = atom.workspace.observeTextEditors(function(editor) {
			// apparently sometimes the uri can be null
			if (!!editor.getURI()) {
				// cfc's need to watch for changes so the grammar can be switched
				if (editor.getURI().endsWith('cfc')) {
					bindCfcChangeChecker(editor);
					checkCfScriptEditorGrammar(editor);

					if( atom.config.get('language-cfml.enableComponentOutlinePanel') ) {
						let outlinePanel = new componentOutlinePanel(); // Get handle to singleton
						if (atom.workspace.getActivePaneItem() == editor){
							outlinePanel.updatePanelInstance( editor ); // If the current file is a .cfc
						}
					}
				// cfm(l) files should use the mixed-mode grammar
				} else if (editor.getURI().endsWith("cfm") || editor.getURI().endsWith("cfml")) {
					//	If the grammer is loaded:
					if (module.htmlCfmlGrammar) {
						const buffer = editor.getBuffer();
						atom.grammars.assignLanguageMode(buffer, module.htmlCfmlGrammar.scopeName);
					}
				}
			}
		});

		// now establish the grammars after the listeners have been set
		atom.grammars.grammarForScopeName(GRAMMAR_EMBEDDED_CFML);
		atom.grammars.grammarForScopeName(GRAMMAR_CFML);
		atom.grammars.grammarForScopeName(GRAMMAR_CFSCRIPT);

		return;
	},

	deactivate: function() {
		// dispose of attached events
		module.grammarObserver.dispose();
		module.editorObserver.dispose();
		module.ComponentOutlinePanelConfigObserver.dispose();

		for (var editor of atom.workspace.getTextEditors()) {
			if (editor._cfcChangeChecker) {
				editor._cfcChangeChecker.dispose();
				delete editor._cfcChangeChecker;
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
function checkCfScriptEditorGrammar(editor) {
	if (
		!editor._checking_is_cfscript && // not already checking...
		!!module.htmlCfmlGrammar && // and html/cfml grammar is loaded
		!!module.cfscriptGrammar // and cfscript grammar is loaded
	) {
		editor._checking_is_cfscript = true;
		//	Only run this is the grammars have been defined.
		for (var line of editor.getBuffer().getLines()) {
			if (line.length) {
				if (/(\bimport\b|^\s*\/\*|^\s*\/\/|\bcomponent\b|\binterface\b)/.test(line)) {
					const buffer = editor.getBuffer();
					atom.grammars.assignLanguageMode(buffer, module.cfscriptGrammar.scopeName);
				} else {
					const buffer = editor.getBuffer();
					atom.grammars.assignLanguageMode(buffer, module.htmlCfmlGrammar.scopeName);
				}

				break;
			}
		}
		editor._checking_is_cfscript = false;
	}
}

function bindCfcChangeChecker(editor) {
	if (editor && !editor._cfcChangeChecker) {
		editor._cfcChangeChecker = editor.onDidChange(function(e) {
			checkCfScriptEditorGrammar(editor);
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
