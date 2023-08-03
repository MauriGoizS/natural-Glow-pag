
function fetchcall() {
    // (B1) GET FORM DATA

    const form = new FormData(document.getElementById("registro-form"));

    // (B2) FETCH

    fetch("/interfazCompleto/php/authentication/signup.php", { method: "POST", body: form })
        .then(res => res.text())
        .then(txt => console.log(txt))
        .catch(err => console.error(err));
    return false;
}