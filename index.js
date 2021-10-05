const loadBooks = (event) => {
  fetch("https://striveschool-api.herokuapp.com/books")
    // WAITING
    .then((response) => response.json())
    .then((body) => {
      /*    console.log(body); */
      let row = document.querySelector(".row");
      row.innerHTML = "";
      body.forEach((element) => {
        console.log(element);
        let col = document.createElement("div");
        col.className = "col-md-3";
        col.innerHTML = ` 
                       <div class="card">
                            <img src="${element.img}" class="img-fluid h-100 w-100" alt="...">
                            <div class="card-body">
                                <h5 id="clamp"  class="card-title">${element.title}</h5>
                                <p class="card-text">${element.price}€</p>
                                <a href="#"  class="btn btn-primary mr-1"  onclick= "removeCard(event,'${element.title}','${element.img}')">Add to cart</a>
                                <a href="#" class="btn btn-primary" style ="background-color:red" onclick="deleteCard(event)">skip</a>
                            </div>
                        </div>
                        `;

        row.appendChild(col);
      });
    })
    .catch((error) => console.error(error));
};

const booksWrapper = document.querySelector("#books-wrapper");
let books = [];
let filteredBooks = [];
const fetchCards = () => {
  fetch("https://striveschool-api.herokuapp.com/")
    // WAITING
    .then((response) => response.json())
    .then((_body) => {
      console.log(_body);
      let row = document.querySelector(".row");
      row.innerHTML = "";
      books = _body;

      console.log(book);
      displayBooks();
    })
    .catch((error) => console.error(error));
};

function displayBooks(_books = books) {
  booksWrapper.innerHTML = "";

  _books.forEach((book) => {
    booksWrapper.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="${book.img}" class="img-fluid card-img-top" alt="${
      book.title
    }">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.category}</p>
            <button class="btn btn-primary" onclick="addToCart('${String(
              book.asin
            )}', this)">$${book.price}</button>
            <button class="btn btn-warning" onclick="this.closest('.col-12').remove()">
              Skip me
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function search(query) {
  if (query.length < 3) {
    filteredBooks = books;
    displayBooks();
    return;
  }

  filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredBooks);
  displayBooks(filteredBooks);
}

function addCart() {
  removeCard;
}

let newArray = [];

function removeCard(event, title, image) {
  let card = event.target.closest(".col-md-3");

  newArray.push(card);
  let listNode = document.querySelector(".dropdown-menu");
  let cartList = document.createElement("a");
  cartList.className = "list-item";
  cartList.innerHTML = `<div class="d-flex mb-1">
  <a class="dropdown-item" href="#" ><span><img src="${image}" alt="" width="25px"></span>${title}<span><a href="#" class="cart-btn btn-primary " onclick="deleteShoppingCart(event)" >delete</a></span></a>
  </div>
  `;
  listNode.appendChild(cartList);
}

function deleteCard(event) {
  event.target.closest(".col-md-3").remove();
}

function deleteShoppingCart(event) {
  console.log(event.target);
  let removedCart = event.target.closest(".list-item");

  removedCart.remove();
}

window.onload = () => {
  loadBooks();
};
