const socket = io();

socket.on("productos", (listProds) => {
  loadProds(listProds);
});

async function loadProds(listProd) {
  let htmlProd = {};
  const tableList = await fetch("views/partials/productos.ejs").then((res) => res.text()
  );

  if (listProd.length === 0) htmlProd = `Lista de productos vacia`;
  else htmlProd = ejs.render(tableList, { listProd });

  document.getElementById("newTable").innerHTML = htmlProd;
}

document.getElementById("btn").addEventListener("click", () => {
  const product = {
    name: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("newProducto", product);
});



socket.on("mensajes", (data) => {
  loadMens(data);
});

function loadMens(data) {
  const html = data.map((elem, index) => {
    return `<div class="direct-chat-info clearfix">
                <span id="chatName" class="direct-chat-name pull-right">${elem.email}</span>
                <span id= "chatDate" class="direct-chat-timestamp pull-left">${elem.date}</span>
              </div>
              
              <div id="chatText" class="direct-chat-text">${elem.mensaje}</div>
            `;
  }).join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

document.getElementById("formData").addEventListener("submit", (e) => {
  e.preventDefault();
  addMens();
});

function addMens() {
  const newMensaje = {
    author: document.getElementById("email").value,
    msg: document.getElementById("mensaje").value,
  };
  socket.emit("newMensaje", newMensaje);
}