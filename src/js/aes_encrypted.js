// 正确用法
function aes_encrypted(encryptedParams) {
    var milliseconds=Date.parse(new Date());
    var hospitalData = JSON.parse(localStorage.getItem("hospitalData"));
    var userUUid;
    if(hospitalData){
        userUUid = hospitalData.sessionId;
    }
    if (null !=userUUid && userUUid != undefined && userUUid != 'undefined'){
        encryptedParams.appId=userUUid;
    }else {
        var user_uuid=generateUUID();
        localStorage.setItem("user_uuid",user_uuid);
        encryptedParams.appId=user_uuid;
    }
    // encryptedParams.appId='doc_app_login_03D3BC6C-89DB-4265-B9EA-456A0C438D5E';
    encryptedParams.reqToken=milliseconds;
    encryptedParams.systemTag="feiyue";
    encryptedParams.clientInfo=navigator.userAgent;
    encryptedParams.language="zhcn";
    encryptedParams.sign=CryptoJS.MD5(milliseconds+"774D94361A243577F0A497C4EAB6462A178900022D1D95B2EAE04").toString();
    var str=JSON.stringify(encryptedParams);
    // 密钥 16 位
    var key = 'CCD43A0F3B989162';
    //初始向量 initial vector 16 位
    var iv = 'CCD43A0F3B989162';
    //key 和 iv 可以一致
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}




//生成uuid
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
