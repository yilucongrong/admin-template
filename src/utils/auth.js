import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js/crypto-js'

const key = "qwwe%^*yhu8976)(";
const iv = "UJHY@#$*0987&^%H";
//加密方法
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
}
//解密方法
function decrypt(text) {
    let result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
}




const TokenKey = 'X-Auth-Token'
const username = 'username'
const passWord = 'passWord'
const Catalog = 'Catalog'
const TokenTime = 'TokenTime'
const DomainName = 'DomainName'
const DomainId = 'DomainId'
const Theme = 'Theme'
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
    if (Cookies.get(passWord)) {
        return decrypt(Cookies.get(passWord))
    } else {
        return Cookies.get(passWord)
    }
}

export function setPassWord(passWords) {
    return Cookies.set(passWord, encrypt(passWords))
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
//获取设置主题
export function getTheme() {
    return Cookies.get(Theme)
}

export function setTheme(data) {
    return Cookies.set(Theme, data)
}

export function removeTheme() {
    return Cookies.remove(Theme)
}
export function removeAll() {
    removeDomainName()
    removeDomainId()
    removeTokenTime()
    removeCatalogs()
    removePassWord()
    removeName()
    removeToken()
}
