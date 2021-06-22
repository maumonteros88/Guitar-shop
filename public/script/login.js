const ingresar = document.getElementById('ingresar');
const mailInput = document.getElementById('mail');
const password = document.getElementById('password');
const message = document.getElementById('message');
const loading = document.getElementById('loading');

ingresar.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/users/auth', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  const mail = mailInput.value;
  const pass = password.value;
  loading.style = 'display:block; margin-left: 36%';
  ingresar.style = 'display:none';
  message.innerHTML = '';

  const params = {
    mail: mail,
    password: pass,
  };

  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);

    if (response.success) {
      window.location.href = '/home';
    } else {
      loading.style = 'display:none';
      ingresar.style = 'display:inline-block';
      message.innerHTML = response.message;
    }
  };

  xhr.send(JSON.stringify(params));
});
