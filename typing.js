let b=0;let c=0;let isTyping=true;let isLoop=true;let isPlaceholder=false;let i=0;let typingSpeed=200;let deleteSpeed=40;let waitTime=1000;let strings=["Hello This is Dylan","I am glad you are visiting my website"];setTimeout("typing()",waitTime);function change(){b=0;c=strings[i].length;isTyping=true;}
function typing(){if(isPlaceholder==true){document.getElementById("words").placeholder=strings[i].substring(c,b);}else{document.getElementById("words").innerHTML=strings[i].substring(c,b);}
if(b==strings[i].length){setTimeout("change()",waitTime);}else{if(c!=0){c--;if(i==strings.length-1&&isLoop==false){return;}
if(c==0){i++;if(i==strings.length){i=0;}}}else{var isTyping=false;b++;}}
if(isTyping==false){setTimeout("typing()",typingSpeed);}else{setTimeout("typing()",deleteSpeed);}}