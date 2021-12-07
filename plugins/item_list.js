Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function _createItemsList(products = []) {
    if(products.length === 0) return document.createElement('div');

    const wrap = document.createElement('div');
    wrap.classList.add('row');
    wrap.classList.add('products');

    products.forEach( product => {
        const $list_item = document.createElement('div');
        $list_item.classList.add('col');
        $list_item.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <img  src="${product.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description || "Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${product.id}">Узнать цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${product.id}">Удалить</a>
            </div>
        </div>
        `)
        
        wrap.appendChild($list_item);
    })

    return wrap;

}

function _createList(options){
    const list = _createItemsList(options);
    list.appendAfter(document.querySelector('h1'));
    
    return list;
}

function _removeEl(ob, num =""){
    if(num==""){
        document.querySelector(`.${ob}`).innerHTML = '';
    }else if(num=="last"){
        let elems = document.querySelectorAll(`.${ob}`);
        elems[elems.length -1].parentNode.removeChild(elems[elems.length -1]);

        console.log(elems)
    }
}

$.list = function(options) {
    let products = options;   

    const priceModal = $.modal({
        title: 'Цена на Товар',
        closable: true,
        width: '400px',
        footerButtons: [
          {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close();
            // priceModal.destroy();
          }}
        ]
    })

    const list = {
        create() {
            _createList(products);
        }
    }  

    document.addEventListener('click', event => {
        event.defaultPrevented;
        const btnType = event.target.dataset.btn;

        const id = +event.target.dataset.id
        const product = options.find(f => f.id === id)
      
        if (btnType === 'price') {
          priceModal.setContent(`
            <p>Цена на ${product.title}: <strong>${product.price}$</strong></p>
          `)
          priceModal.open()
        } else if (btnType === 'remove') {
          $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${product.title}</strong></p>`
          }).then(() => {
            _removeEl("products");
            products = products.filter(f => f.id !== id);
            const ProductsList = $.list(products);
            ProductsList.create();

            _removeEl("xmodal", "last");
            delete this.modal;
          }).catch(() => {
            console.log('Cancel');
          })
        }
    })

    return list;
}