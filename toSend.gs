/* send chatwork */
function sendMessage(body){
  
    //設定読み込み
    var confData = getConf();
    
    //chatworkのトークン
    var token = confData.token;
    
    //返事するルームID
    var room_id = confData.room_id;
    
    var params = {
      headers : {"X-ChatWorkToken" : token},
      method : "post",
      payload : {
        body : body
      }
    };
  
    var url = "https://api.chatwork.com/v2/rooms/" + room_id + "/messages";
    UrlFetchApp.fetch(url, params);
  }