var ba = ["MessengerLiteForiOS","Android","Mobile","Vivaldi", "Trident", "Edg", "Chrome", "Firefox", "Safari", "Opera", "MSIE"];
var browser,ua = navigator.userAgent;
var platform = navigator.platform,lang = navigator.language;
var java;
var hostname;
if(navigator.javaEnabled()){
  java = "Enabled";
}else{
  java = "Not Enabled";
}
//check browser
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
if(window.location.hostname === ""){
  hostname = "invalid"
}else{
  hostname = window.location.hostname
}

document.write("Browser: " + browser);
document.write("<br>Platform: " + platform);
document.write("<br>Language: " + lang);
document.write("<br>Java: " + java);
document.write("<br>Test: " + hostname);
//toggle info part
const infos = document.querySelectorAll(".info");
infos.forEach(function (info) {
  const btn = info.querySelector(".info-btn");
  btn.addEventListener("click", function () {
    // console.log(question);

    infos.forEach(function (item) {
      if (item !== info) {
        item.classList.remove("show-text");
      }
    });

    info.classList.toggle("show-text");
  });
});
