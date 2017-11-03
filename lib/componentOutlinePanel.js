const ComponentModel = require('./componentModel.js');
const ComponentOutlineView = require('./componentOutlineView.js');

var _registered = null;
var _activePanel = null;

module.exports =
class componentOutlinePanel {
	constructor( ) {
		if(_registered == null) {
			this.createPanelInstance();
			_registered = true;
		}
		//	Now, we've just opened a new editor,

	}

	createPanelInstance() {
		atom.views.addViewProvider(ComponentModel, ComponentOutlineView.render);
		atom.workspace.onDidChangeActiveTextEditor(this.updatePanelInstance);
	}

	updatePanelInstance( editor ) {
		if (_activePanel != null) {
			_activePanel.destroy();
		}
		
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
