const loadBooks = () => {
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
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.price}€</p>
                                <a href="#" class="btn btn-primary mr-1">Add to cart</a>
                                <a href="#" class="btn btn-primary">skip</a>
                            </div>
                        </div>
                        `;

        row.appendChild(col);
      });
    })
    .catch((error) => console.error(error));
};

function addCart() {}

let newArray = [];
function removeCard(event) {
  let card = event.target.value;
  card.remove();
  newArray.push(card);
}

window.onload = () => {
  loadBooks();
};
