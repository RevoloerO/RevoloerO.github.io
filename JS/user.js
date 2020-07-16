var ba = ["Vivaldi", "Trident", "Edg", "Chrome", "Firefox", "Safari", "Opera", "MSIE"];
var browser,ua = navigator.userAgent;
var platform = navigator.platform;
for(var i=0; i<ba.length;i++){
  if(ua.indexOf(ba[i]) > -1){
    if(ba[i] ==="Edg"){
      browser = "Edge";
    }else{
      browser = ba[i];
    }

    break;
  }
}

document.write("User info:");
document.write("<br>Browser: " + browser);
document.write("<br>Platform: " + platform);
