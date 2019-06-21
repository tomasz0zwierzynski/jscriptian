$.getJSON('/user-info', { token: token }, res => {

    const { name } = res;

    document.getElementById("player-name").innerHTML = name;
})

function logout() {
    $.getJSON('/logout', { token: token }, data => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = 'login';
        }, 30);
    });
}