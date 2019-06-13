function hash(input) {
    // TODO: implement hashing function
    return input;
}

function logout() {
    $.getJSON('/logout', { token: token }, data => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = 'login';
        }, 30);
    });
}