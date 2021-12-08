/* Class prototype Element adding an element after a given node */
Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
} 

function noop() {} // Empty function

/* Creating footer with buttons for modal window */
function _createModalFooter (buttons = []){
    if(buttons.length === 0) return document.createElement('div');

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach( btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.type || 'secondary'}`);
        $btn.onclick = btn.handler || noop; // Execution of the specified function of the button on click || (noop) - do nothing

        wrap.appendChild($btn);
    })

    return wrap;
}

/* Adding modal window to HTML file */
function _createModal (options){
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div');
    modal.classList.add('xmodal');
    modal.insertAdjacentHTML('afterbegin',`
        <div class="modal--overlay" data-close="true">
            <div class="modal--window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal--header">
                    <span class="modal--title">${options.title || 'Modal window'}</span>
                    ${options.closable ? `<span class="modal--close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal--body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `);
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));

    document.body.appendChild(modal);
    return modal;
}

/* Creating modal window obj with methods */
$.modal = function(options){
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if(destroyed){
                return console.log("Modal is destriyed");
            }
            !closing && $modal.classList.add('open');
        }, // Opening a modal window if it exists
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide--animation');
            setTimeout(() => {
                $modal.classList.remove('hide--animation');
                closing = false;
                if (typeof options.onClose === 'function') {
                    options.onClose();                    
                }
            }, ANIMATION_SPEED);
        }  // Closing a modal window with animation
    }

    const listener = event => {
        if(event.target.dataset.close) modal.close();
    } // Callback to track when the modal is clicked to close 

    $modal.addEventListener('click', listener); // Adding tracker with parameter

    return Object.assign(modal,{
        destroy(){
            $modal.parentNode.removeChild($modal);
            destroyed = true;
            $modal.removeEventListener('click', listener);
        }, // Deleting modal window from HTML
        setContent(text){
            $modal.querySelector('[data-content]').innerHTML = text;
        }  // Adding content to a modal window
    }); 
}

