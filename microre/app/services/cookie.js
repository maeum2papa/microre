import { Cookies } from "react-cookie";
import { chash, encrypt, decrypt } from "./encrypt";

const cookies = new Cookies();

const setCookie = (name, value, options) => {
    // return cookies.set(encrypt(name), encrypt(value), {...options}); 
    return cookies.set(name, value, {...options})
}

const getCookie = (name) => {

    // let getData = cookies.get(encrypt(name).replace("==",""));
    // if(getData!=undefined) getData = getData.replace("==","");

    // if(getData==undefined || getData==''){
    //     return '';
    // }else{
    //     return decrypt(getData);
    // }

    return cookies.get(name);
    
}

const delCookie = (name) => {
    return cookies.set(name, '', {maxAge:0}); 
}

export {
    setCookie,
    getCookie,
    delCookie
}