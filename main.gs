//從CWB取得data

function getData(){
  
    //設定
    var confData = getConf();
    var getIssues_url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/";
    var dataid = "F-C0032-001";
    var format = "JSON";
    var location = encodeURIComponent("臺北市");
    var startTime = SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(1, 2).getValue();
    var timeTo = SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(2, 2).getValue();
    
    var url = getIssues_url +
      dataid +
        "?Authorization=" +
          confData.apikey +
              "&format=" +
                format + 
                  "&locationName=" + 
                    location;
    
    SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(4, 4).setValue(url);
    var response = UrlFetchApp.fetch(url);
    var data = response.getContentText();
    return JSON.parse(data);
  
  }
  
  function doFunc(){
    deleteTrigger()
    var confData = getConf();
    var data =getData();
    
    var text = "[info][title]今天白天的天氣（臺北）[/title]";
    
    
    var Wx  = data['records']['location']['0']['weatherElement']['0']['time']['0']['parameter']['parameterName'];
    SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(4, 4).setValue(Wx);
    text += "\n天氣現象 : " + Wx;
    var MaxT  = data['records']['location']['0']['weatherElement']['4']['time']['0']['parameter']['parameterName'];
    SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(4, 8).setValue(MaxT);
    text += "\n最高溫度 : " + MaxT + "℃";
    var MinT  = data['records']['location']['0']['weatherElement']['2']['time']['0']['parameter']['parameterName'];
    SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(4, 6).setValue(MinT);
    text += "\n最低溫度 : " + MinT + "℃";
    var CI  = data['records']['location']['0']['weatherElement']['3']['time']['0']['parameter']['parameterName'];
    SpreadsheetApp.openById(confData.key).getSheetByName('CWB_time').getRange(4, 7).setValue(CI);
    text += "\n舒適度 : " + CI + "[/info]";
    
    sendMessage(text);
    
    
    return ContentService.createTextOutput("Hello World");
  }
  