/* Typing.js - animates typing effect.
 * Author: Lihui
 * Websitte: withlihui.com
 * Github: github.com/lihuii/typing.js
 * MIT licesned.
 */
{
  let b = 0;
  let c = 0;
  let isTyping = true;
  let isLoop = true;
  let isPlaceholder = false;
  let i = 0;
  let typingSpeed = 200;
  let deleteSpeed = 40;
  let waitTime = 1000;
  let strings = ["Hello This is Dylan", "I am glad you are visiting my website"];

  // 起初等待waitTime秒執行typing
  setTimeout("typing()", waitTime);

  function change() {
    b = 0;
    c = strings[i].length;
    isTyping = true;
  }

  function typing() {
    // 判斷是否為placeholder 在此為false
    if (isPlaceholder == true) {
      document.getElementById("words").placeholder = strings[i].substring(c, b);
    } else {
      document.getElementById("words").innerHTML = strings[i].substring(c, b);
    }
    // 判斷b等於需要輸出的數量 起初為false
    if (b == strings[i].length) {
      // setTimeout("b=0, c=strings[i].length, isTyping=true", waitTime);
      setTimeout("change()", waitTime);
    } else {
      if (c != 0) {
        c--;
        // 如果不跑loop且已跑到最後
        if (i == strings.length - 1 && isLoop == false) {
          return;
        }
        if (c == 0) {
          i++;
          if (i == strings.length) {
            i = 0;
          }
        }
      } else {
        //起初因 c==0 所以走這
        var isTyping = false;
        b++;
      }
    }

    if (isTyping == false) {
      setTimeout("typing()", typingSpeed);
    } else {
      setTimeout("typing()", deleteSpeed);
    }
  }
}
