const search = document.getElementById('search');
const searching = document.getElementById('searching');
const badge = document.getElementById('badge');
const alerta = document.getElementById('alerta');
const signOut = document.getElementById('signOut');


const TIME = 1000;

searching.addEventListener('click', () => {
  window.location.href = `/home/buscar?search=${search.value}`;
});

const handleAdd = (model, precio, detalles, id) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);

    if (response > 0) {
      badge.innerHTML = response;

      alerta.style.display = 'flex';
      alerta.innerHTML = 'Producto agregado al carrito!';
      setTimeout(() => {
        alerta.style.display = 'none';
      }, TIME);
    } else {
      alerta.style.display = 'flex';
      alerta.innerHTML = 'No se pudo agregar!';
      setTimeout(() => {
        alerta.style.display = 'none';
      }, TIME);
    }
  };
  xhr.open(
    'GET',
    `/home/add?model=${model}&detalles=${detalles}&precio=${precio}&id${id}`
  );
  xhr.send();
};

