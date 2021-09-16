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
