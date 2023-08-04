let cliente = null;

function signup() {
    // (B1) GET FORM DATA

    const form = new FormData(document.getElementById("registro-form"));

    // (B2) FETCH

    fetch("/interfazCompleto/php/authentication/signup.php", { method: "POST", body: form })
        .then(res => res.json())
        .then(res => {
            cliente = res.data;
            console.log(cliente);
            validarCliente();
        })
        .catch(err => console.error(err));
    return false;
}

function validarCliente() {
    if (cliente !== null && (typeof cliente === 'object')) {
        const clienteString = JSON.stringify(cliente);
        localStorage.setItem('cliente', clienteString);
        window.location.href = '/interfazCompleto/index.html';
    } else {
        document.getElementById('mensaje-error').style.display = 'block';
    }
}