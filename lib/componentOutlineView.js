
module.exports =
class ComponentOutlineView {

	constructor ( componentModelInst ) {
		this.panelItem = document.createElement( 'section' );
		this.panelItem.classList.add( 'componentOutlineView','inset-panel' );

		this.panelItemTitle = this.panelItem.appendChild( document.createElement('div') );
		this.panelItemTitle.classList.add('componentOutlineView__title','panel-heading');
		this.panelItemTitle.appendChild( document.createTextNode('Component Outline') );

		// this.panelItemToggleIcon = this.panelItemTitle.appendChild( document.createElement('i') );
		// this.panelItemToggleIcon.classList.add( 'icon', 'icon-move-right' );

		this.panelItemContainer = this.panelItem.appendChild( document.createElement('ol') );
		this.panelItemContainer.classList.add('componentOutlineView__container','list-group','panel-body');
		return this;
	}

	static makeResizable ( panelItem ) {
		var handle = document.createElement('div');
		handle.classList.add('componentOutlineView__resize-handle');
		handle.draggable = true;
		handle.setAttribute('tabindex','-1'); //	Because atom.. [https://discuss.atom.io/t/drag-drop/21262/14]

		handle = panelItem.element.insertBefore(handle, panelItem.element.querySelector('.componentOutlineView'));

		var _panelItem = panelItem.element;
		var _width = 200;
		var _x = 0;

		// async callback for window.requestAnimationFrame for visual updates.
		function update () {
			_panelItem.style.minWidth = _width + 'px';
		}

		//	Set initial x postition on drag start.
		handle.addEventListener("dragstart", function( event ) {
			event.stopImmediatePropagation();
			handle.classList.add('active');
			_x = event.screenX;
		}, true);

		//	Clear dragging highlighting on dragend
		handle.addEventListener("dragend", function( event ) {
			event.stopImmediatePropagation();
			handle.classList.remove('active');
		}, true);

		//	If the x is non-zero, calculate the different and add it to the elements width
		handle.addEventListener("drag", function( event ) {
			event.stopImmediatePropagation();
			if(event.screenX !== 0){
				_width += (_x - event.screenX);
				_x = event.screenX;
			}
			//	Sync update with animation frames
			window.requestAnimationFrame( update );
		}, false);

		//	Set initial position
		window.requestAnimationFrame( update );
	}

	static render ( componentModelInst ) {
		var newPanel = new ComponentOutlineView( componentModelInst );
		return newPanel.panelItem;
	}
}
