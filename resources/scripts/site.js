$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

const id = $.urlParam('id');

const token = localStorage.getItem('token');

$.getJSON('/site-params/' + id, { token: token }, res => {

    const { name, cost, production } = res;

    document.getElementById("wood").innerHTML = cost.wood;
    document.getElementById("clay").innerHTML = cost.clay;
    document.getElementById("iron").innerHTML = cost.iron;
    document.getElementById("crop").innerHTML = cost.crop;

    document.getElementById("production").innerHTML = production;

    document.getElementById("site-name").innerHTML = name;
} );

function build() {
    setTimeout(() => {
        window.location.href = 'upgrade?id=' + id + '&token=' + token;
    }, 30);
}