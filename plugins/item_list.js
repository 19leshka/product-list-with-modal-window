Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function _createItemsList(products = []) {
    if(products.length === 0) return document.createElement('div');

    const wrap = document.createElement('div');
    wrap.classList.add('row');

    products.forEach( product => {
        const $list_item = document.createElement('div');
        $list_item.classList.add('col');
        $list_item.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <img style="height: 300px" src="${product.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
                <a href="#" class="btn btn-primary">Узнать цену</a>
                <a href="#" class="btn btn-danger">Удалить</a>
            </div>
        </div>
        `)
        
        wrap.appendChild($list_item);
    })

    return wrap;

}

function _createList(options){
    // const list = document.createElement('div');
    // list.classList.add('items_list');

    const list = _createItemsList(options);
    list.appendAfter(document.querySelector('h1'));
    
    return list;
}

$.list = function(options) {
    const list = {
        create() {
            _createList(options);
        }
    }

    return list;
}