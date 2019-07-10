import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js/crypto-js'

const key = CryptoJS.enc.Utf8.parse("dadadad3￥%#*（）——+……￥#Fsaa张三");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('+—24115—）2（31*&gaw……%￥#da');   //十六位十六进制数作为密钥偏移量
    
//解密方法
export function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
//加密方法
export function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }

const TokenKey = 'X-Auth-Token'
const username = 'username'
const passWord = 'passWord'
const Catalog = 'Catalog'
const TokenTime='TokenTime'
const DomainName='DomainName'
const DomainId='DomainId'
// export function setCookie(cname, cvalue, exdays) {//以分钟为基数
//         var d = new Date();
//         d.setTime(d.getTime() + (exdays * 60 * 1000));
//         var expires = "expires=" + d.toUTCString();
//         document.cookie = cname + "=" + cvalue + "; " + expires;
// }
// export function getCookie(cname) {
//         var name = cname + "=";
//         var ca = document.cookie.split(';');
//         for (var i = 0; i < ca.length; i++) {
//           var c = ca[i];
//           console.log(c)
//           while (c.charAt(0) == ' ') c = c.substring(1);
//           if (c.indexOf(name) != -1){
//             return c.substring(name.length, c.length);
//           }
//         }
//         return "";
// }
// export function clearCookie() {
//     this.setCookie("username", "", -1);
// } 
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getName() {
  return Cookies.get(username)
}

export function setName(name) {
  return Cookies.set(username, name)
}

export function removeName() {
  return Cookies.remove(username)
}
export function getPassWord() {
    
  return Cookies.get(passWord)
}

export function setPassWord(passWords) {
    // cookie加密
    // passWords.split("").reverse().join("")
    
//   return Cookies.set(passWord, passWords)
alert(this.Encrypt(passWords))
return Cookies.set(passWord, this.Encrypt(passWords))
}

export function removePassWord() {
  return Cookies.remove(passWord)
}
export function getCatalogs() {
  return Cookies.get(Catalog)
}

export function setCatalogs(Catalogs) {
  return Cookies.set(Catalog, Catalogs)
}

export function removeCatalogs() {
  return Cookies.remove(Catalog)
}
export function getTokenTime() {
  return Cookies.get(TokenTime)
}

export function setTokenTime(TokenTimes) {
  return Cookies.set(TokenTime, TokenTimes)
}

export function removeTokenTime() {
  return Cookies.remove(TokenTime)
}
export function getDomainId() {
  return Cookies.get(DomainId)
}

export function setDomainId(DomainIds) {
  return Cookies.set(DomainId, DomainIds)
}

export function removeDomainId() {
  return Cookies.remove(DomainId)
}
export function getDomainName() {
  return Cookies.get(DomainName)
}

export function setDomainName(DomainNames) {
  return Cookies.set(DomainName, DomainNames)
}

export function removeDomainName() {
  return Cookies.remove(DomainName)
}
export function removeAll(){
  removeDomainName()
  removeDomainId()
  removeTokenTime()
  removeCatalogs()
  removePassWord()
  removeName()
  removeToken()
}
