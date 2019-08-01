
 // TODO: @Depreceted delete later
$.getJSON('/user-info-params', { token: token }, res => {

    const { name } = res;

    document.getElementById("player-name").innerHTML = name;
})
