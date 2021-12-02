const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
  ]

const MyModal = $.modal({
    title: "Модальное окно",
    closable: true,
    content: `
        <h4>Модальное окно работает</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    `,
    width: "400px",
    footerButtons: [
        {
            text: 'Ok',
            type: 'primary',
            handler() {
                console.log("Primary os clicked");
                MyModal.close();
            }
        },
        {
            text: 'Camcel',
            type: 'danger',
            handler() {
                console.log("Danger is clicked");
                MyModal.close();
            }
        }
    ]
});

const ProductsList = $.list([
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
  ]);

