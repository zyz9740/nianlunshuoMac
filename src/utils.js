const webroot = "http://49.235.93.122:8080";

function encodeDate(date){
    return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
}

function decodeDate(str){
    let l = str.split('/');
    let year = parseInt(l[0]);
    let month = parseInt(l[1]);
    let date = parseInt(l[2]);
    return [year, month, date]
}

export {
    encodeDate,
    decodeDate,
    webroot
}
