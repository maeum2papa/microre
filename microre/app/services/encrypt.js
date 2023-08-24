import CryptoJS from "crypto-js";

const encrypt_key =  CryptoJS.enc.Utf8.parse('b6kvneYUOJrajznRGfy6333J2i4zbWSh');
const encrypt_iv =  CryptoJS.enc.Utf8.parse('Gw55S8IMeXBiGDKb');


const encrypt = (text) => {

    const ciphertext = CryptoJS.AES.encrypt(text,  encrypt_key, {
        iv: encrypt_iv,
        mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.ZeroPadding,
    });

    return ciphertext.toString();
    
}

const decrypt = (text)=>{

    if(text.match(/\s/g)){
        text = text.replaceAll(" ","+");
    }

    const decrypted = CryptoJS.AES.decrypt(text, encrypt_key, {
        iv: encrypt_iv,
        mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.ZeroPadding,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

}

const jwtDecrypt = (text)=>{
    const replace = text.replaceAll(' ', '+')
    const uri = decodeURI(replace)
    const decrypted = CryptoJS.AES.decrypt(uri, encrypt_key, {
        iv: encrypt_iv,
        mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.ZeroPadding,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

}

const chash = (text) => {
    return CryptoJS.SHA256((text+'.').toString()).toString();
}

export{
    encrypt,
    decrypt,
    chash,
    jwtDecrypt
}