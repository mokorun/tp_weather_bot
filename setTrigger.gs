// 9時00分
function setTrigger() {
    var triggerDay = new Date();
    triggerDay.setHours(9);
    triggerDay.setMinutes(00);
    ScriptApp.newTrigger("doFunc").timeBased().at(triggerDay).create();
  }
  
  // トリガー削除
  function deleteTrigger() {
    var triggers = ScriptApp.getProjectTriggers();
    for(var i=0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() == "doFunc") {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
  }