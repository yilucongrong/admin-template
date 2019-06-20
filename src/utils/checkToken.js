
import { setToken,getName,getPassWord,getTokenTime,setTokenTime,removeTokenTime,removeToken} from '@/utils/auth' // getToken from cookie
import { getTokenId} from '@/api/login'


export function checkToken(){
    let expire =getTokenTime();
        expire = expire.replace(new RegExp("-","gm"),"/");
        expire = (new Date(expire)).getTime(); //得到毫秒数
    
    let nowData=new Date().getTime() //当前时间转化为分钟
    let duringTime = (expire-nowData)/1000/60; //token剩余时间间隔 5min
    if(duringTime>0&&duringTime<5){
        const auth={
          "auth": {
            "identity": {
              "methods": [
                "password"
              ],
              "password": {
                "user": {
                  "name": getName(),
                  "password": getPassWord()
                }
              }
            }
          }
        }
        return new Promise((resolve, reject) => {
            getTokenId(auth).then(res => {  //获取刷新token
                const userToken={
                "auth": {
                    "identity": {
                    "methods": [
                        "token"
                    ],
                    "token": {
                        "id": res.headers['x-subject-token']
                    }
                    }
                }
                }
                getTokenId(userToken).then(response => {//获取访问token
                setTokenTime(response.data.token.expireAt)
                setToken(response.headers['x-subject-token'])
                resolve()
                })
                
            }).catch(error => {
                console.log("错误在checkToken里面")
                // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
                reject(error)
            })
        })
    }else{
        if(duringTime<0){
            removeTokenTime();
            removeToken();
            return false;
        }else{
            return true;
        }
    }
}