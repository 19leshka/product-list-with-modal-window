const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];

const apples = [
    {id: 1, title: 'iPhone 11', price: 600 , img: 'assets/images/iphone11.jpeg'},
    {id: 2, title: 'iPhone 12', price: 700 , img: 'assets/images/iphone12.jpeg'},
    {id: 3, title: 'iPhone 13', price: 800 , img: 'assets/images/iphone13.jpeg'}
]

let products = apples; // Product selection

/* Generating products cards to HTML code */
const toHTML = products => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" src="${products.img}" alt="${products.title}">
      <div class="card-body">
        <h5 class="card-title">${products.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${products.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${products.id}">Удалить</a>
      </div>
    </div>
  </div>
`;                                          

/* Adding products to the page */
function render() {
    const html = products.map(toHTML).join('');
    document.querySelector('#products').innerHTML = html;
}
  
render();

/* Creating a modal window with the product price */
const priceModal = $.modal({
    title: 'Цена на Товар',
    closable: true,
    width: '400px',
    footerButtons: [
      {text: 'Закрыть', type: 'primary', handler() {
        priceModal.close()
      }}
    ]
});

/* Event handler on product buttons */
document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const product = products.find(f => f.id === id);
  
    if (btnType === 'price') {
      priceModal.setContent(`
        <p>Цена на ${product.title}: <strong>${product.price}$</strong></p>
      `);
      priceModal.open()
    } else if (btnType === 'remove') {
      $.confirm({
        title: 'Вы уверены?',
        content: `<p>Вы удаляете: <strong>${product.title}</strong></p>`
      }).then(() => {
        products = products.filter(f => f.id !== id);
        render();
      }).catch(() => {
        console.log('Cancel');
      })
    }
});