const ComponentModel = require('./componentModel.js');
const ComponentOutlineView = require('./componentOutlineView.js');

var _registered = null;
var _activePanel = null;
var _instance = null;

module.exports =
class componentOutlinePanel {
	constructor( ) {
		if (_instance == null) {
			_instance = this;
		}
		return _instance;
	}

	createPanelInstance() {
		if(_registered == null) {
			this.viewProvider = atom.views.addViewProvider(ComponentModel, ComponentOutlineView.render);
			this.activeEditorListener = atom.workspace.onDidChangeActiveTextEditor(this.updatePanelInstance);
			_registered = true;
		}
	}

	destroyPanelInstance() {
		if(!!this.viewProvider) {
			this.viewProvider.dispose();
			this.viewProvider = null;
		}

		if(!!this.activeEditorListener) {
			this.activeEditorListener.dispose();
			this.activeEditorListener = null;
		}

		if (_activePanel != null) {
			_activePanel.destroy();
		}
		_registered = null;
	}

	updatePanelInstance( editor ) {
		if (_activePanel != null) {
			_activePanel.destroy();
		}

		if (!editor)
			return;

		if (!!editor.getURI() && editor.getURI().endsWith("cfc")) {
			// cfc's need to watch for changes so the grammar can be switched
			_activePanel = atom.workspace.addRightPanel(
				{
					'item': new ComponentModel(editor),
					'visible': true,
					'priority': 100
				}
			);

			// Use static method to add handlers post load.
			ComponentOutlineView.makeResizable( _activePanel );

		} else {
			_activePanel = null;
		}
	}
}
