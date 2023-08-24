import { getCookie } from './cookie'
import { decrypt, encrypt } from './encrypt'

let token =  getCookie('geotoken');
const date = Math.round((new Date()).getTime() / 1000);
const tokenExpire = date + 60 * 60

if(token!=undefined && token!=''){
    token =  decrypt(token);
} 
const commonHeader = {
    // "Content-Type": "application/json; charset=UTF-8",
    // "Accept" : "application/json"
    // "geokey" ,
    // "geotoken" ,
    // "Set-Cookie" : `token=${token}; Expires=${tokenExpire}`
}

const postApi = async({ path="", data={}, auth="" } = {}) => {
    try {
        const requestData = { data, token }
        const encryptData = encrypt(JSON.stringify(requestData))
        if(data!={}){
            const response = await fetch(path,{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: commonHeader,
                body: encryptData
            });
            const result = await response.json();
            return JSON.parse(decrypt(result.body));
        } else {
            const encryptToken = encrypt(JSON.stringify(token))
            const response = await fetch(path,{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: commonHeader,
                body: encryptToken
            });
            
            const result = await response.json();
            return JSON.parse(decrypt(result.body));
        }
    } catch(error) {

    }
}


export {
    postApi,
}