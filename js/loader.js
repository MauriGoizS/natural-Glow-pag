let loading = true;

displayLoading();

function displayLoading() {
    if (loading === true) {
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('box-container').style.display = 'none';
    } else {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('box-container').style.display = 'block';
    }
}