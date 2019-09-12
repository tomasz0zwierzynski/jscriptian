const token = localStorage.getItem('token');

function hash(input) {
    return SHA256(input);
}

function logout() {
    $.getJSON('/logout', { token: token }, data => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = 'login';
        }, 30);
    });
}

function getUrlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1] || 0;
    }
    return null;
}

function handleFail(msg) {
    console.log('getJSON fail:' + msg);
    window.location.href = 'login';
}

function getSiteName(id) {
    return getBuildingName(id);
}

function getBuildingName(id) {
    switch (id) {
        case 0: return "Woodcutter";
        case 1: return "Clay Pit";
        case 2: return "Iron Mine";
        case 3: return "Crop Field";
        case 4: return "Main Building";
        case 5: return "Warehouse";
        case 6: return "Granary";
        case 7: return "Sawmill";
        case 8: return "Brickyard";
        case 9: return "Iron Foundry";
        case 10: return "Grain Mill";
        case 11: return "Bakery";
        default: return "Undefined";
    }
}

function getBuildingDescription(id, attr) {
    return getSiteDescription(id, attr);
}

function getSiteDescription(id, attr) {
    switch (id) {
        case 0:
            return `In woodcutter (...) production: ${attr.prod}`;
        case 1:
            return `In clay pit (...) production: ${attr.prod}`;
        case 2:
            return `In iron mine (...) production: ${attr.prod}`;
        case 3:
            return `In crop field (...) production: ${attr.prod}`;
        case 4: 
            return `In main building are living organisms reducing building time by <b>${attr.reduction}</b>`;
        case 5: 
            return `In werehouse are stored important resources other than crop. Capacity: ${attr.capacity}`;
        case 6: 
            return `In granary are stored crop. Capacity: ${attr.capacity}`;
        default: 
            return "Undefined building";
    }
}

function SHA256(r){function k(r,n){var t=(65535&r)+(65535&n);return(r>>16)+(n>>16)+(t>>16)<<16|65535&t}function q(r,n){return r>>>n|r<<32-n}function s(r,n){return r>>>n}return function(r){for(var n="0123456789abcdef",t="",e=0;e<4*r.length;e++)t+=n.charAt(r[e>>2]>>8*(3-e%4)+4&15)+n.charAt(r[e>>2]>>8*(3-e%4)&15);return t}(function(r,n){var t,e,o,a,f,u,c,h,i,C,g,A,d,v,l,S,m,y,w=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),b=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),p=new Array(64);r[n>>5]|=128<<24-n%32,r[15+(n+64>>9<<4)]=n;for(var H=0;H<r.length;H+=16){t=b[0],e=b[1],o=b[2],a=b[3],f=b[4],u=b[5],c=b[6],h=b[7];for(var j=0;j<64;j++)p[j]=j<16?r[j+H]:k(k(k(q(y=p[j-2],17)^q(y,19)^s(y,10),p[j-7]),q(m=p[j-15],7)^q(m,18)^s(m,3)),p[j-16]),i=k(k(k(k(h,q(S=f,6)^q(S,11)^q(S,25)),(l=f)&u^~l&c),w[j]),p[j]),C=k(q(v=t,2)^q(v,13)^q(v,22),(g=t)&(A=e)^g&(d=o)^A&d),h=c,c=u,u=f,f=k(a,i),a=o,o=e,e=t,t=k(i,C);b[0]=k(t,b[0]),b[1]=k(e,b[1]),b[2]=k(o,b[2]),b[3]=k(a,b[3]),b[4]=k(f,b[4]),b[5]=k(u,b[5]),b[6]=k(c,b[6]),b[7]=k(h,b[7])}return b}(function(r){for(var n=Array(),t=0;t<8*r.length;t+=8)n[t>>5]|=(255&r.charCodeAt(t/8))<<24-t%32;return n}(r=function(r){r=r.replace(/\r\n/g,"\n");for(var n="",t=0;t<r.length;t++){var e=r.charCodeAt(t);e<128?n+=String.fromCharCode(e):(127<e&&e<2048?n+=String.fromCharCode(e>>6|192):(n+=String.fromCharCode(e>>12|224),n+=String.fromCharCode(e>>6&63|128)),n+=String.fromCharCode(63&e|128))}return n}(r)),8*r.length))}
