
let nav = document.querySelector('#nav');
let logo = document.querySelector('#logo');
let menuShow = document.querySelector('#menuShow');
let menuHidden = document.querySelector('#menuHidden');
let navlink = nav.querySelectorAll('a');
let slideBtn = document.querySelector('#slideBtn');
let h1 = document.querySelectorAll('h1');
let experience = document.querySelector('#experience').querySelector('.section');
let aboutL = document.querySelector('#about').querySelector('.pic');
let aboutR = document.querySelector('#about').querySelector('.txt');
let worksPic = '';
let worksTxt = '';
let skillsTxt = '';
const uri = 'https://dylansweb.herokuapp.com/api/';

// for ie foreach
if (typeof NodeList.prototype.forEach !== 'function') {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// get xhr
function get(url) {
  return new Promise(function (resolve, reject) {
    // 定義 Http request
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(JSON.parse(req.response));
        // 使用 resolve 回傳成功的結果，也可以在此直接轉換成 JSON 格式
      } else {
        // 使用 reject 自訂失敗的結果
        reject(new Error(req))
      }
    };
    req.send();
  });
}

// 轉 Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer.data);
  let len = bytes.byteLength;
  for (let z = 0; z < len; z++) {
    binary += String.fromCharCode(bytes[z]);
  }
  return window.btoa(binary);
};

// experiences api
function getExperiences() {
  return new Promise(function (resolve, reject) {
    get(uri + 'experiences', { method: 'GET' })
      .then(function (data) {
        console.log('我是Experience Api Data ☆', data);
        data.forEach(function (e) {
          let html = '<div class="item"><h2>' + e.company + '</h2><h3>' + e.position + '<span class="time">' + e.date + '</span></h3><ul class="detail">';
          e.task.forEach(function (i) {
            html += '<li>' + i + '</li>';
          });
          html += '</ul></div>';
          $('#experienceApi').append(html);
        });
        resolve();
      });
  })
}

// skills api
function getSkills() {
  return new Promise(function (resolve, reject) {
    get(uri + 'skills', { method: 'GET' })
      .then(function (data) {
        console.log('我是Skills Api Data ☆', data);
        data.forEach(function (e) {
          let html = '<div class="item"><div class="pic"><img src="data:image/png;base64,' + arrayBufferToBase64(e.imgUrl) + '" alt="' + e.key + '"></div>';
          html += '<div class="txt"><h2>' + e.key + '</h2><h5>' + e.name + '</h5></div></div>';
          $('#skillsApi').append(html);
        });
        resolve();
      });
  });
}

// projects api
function getProjects() {
  return new Promise(function (resolve, reject) {
    get(uri + 'projects', { method: 'GET' })
      .then(function (data) {
        console.log('我是Projects Api Data ☆', data);
        data.forEach(function (e) {
          let html = '<div class="item"><div class="pic"><img src="./image/' + e.imgUrl + '" alt="' + e.key + '"></div>';
          html += '<div class="txt"><h2>' + e.name + '</h2><ul><li>' + e.describe + '</li><li>' + e.purpose + '</li></ul><div class="btn">';
          html +=  e.demoUrl ? '<a class="demo" href="' + e.demoUrl + '" target="_blank">Demo</a>' : '';
          html +=  e.codeUrl ?'<a class="code" href="' + e.codeUrl + '" target="_blank">Code</a>' : '';
          html +=  e.backUrl ? '<a class="back" href="' + e.backUrl + '" target="_blank">API</a>' : '';
          html += '</div></div></div>';
          $('#projectsApi').append(html);
        });
        resolve();
      });
  });
}

// call all api
(function () {
  getExperiences().then(function () {
    getSkills().then(function () {
      getProjects().then(function () {
        $('.index-loading').addClass('loading-finished')
        $('.loading').css("display", "none");
        skillsTxt = document.querySelector('#skills').querySelectorAll('.txt');
        worksPic = document.querySelector('#works').querySelectorAll('.pic');
        worksTxt = document.querySelector('#works').querySelectorAll('.txt');
      })
    })
  })
})()

// --- 展開菜單欄 ---
menuShow.addEventListener('click', function (evt) {
  //   nav.style.setProperty("display", "flex");
  evt.preventDefault();
  nav.style.setProperty('visibility', 'visible');
  nav.style.setProperty('max-height', '300px');
  menuShow.style.setProperty('display', 'none');
  menuHidden.style.setProperty('display', 'block');
});
// --- 關閉菜單欄 ---
menuHidden.addEventListener('click', function (evt) {
  evt.preventDefault();
  nav.style.setProperty('visibility', 'hidden');
  nav.style.setProperty('max-height', '0px');
  menuShow.style.setProperty('display', 'block');
  menuHidden.style.setProperty('display', 'none');
});
// --- 點擊菜單欄連結 ---
for (let i = 0; i < navlink.length; i++) {
  navlink[i].addEventListener('click', function (evt) {
    nav.style.setProperty('visibility', 'hidden');
    nav.style.setProperty('max-height', '0px');
    menuShow.style.setProperty('display', 'block');
    menuHidden.style.setProperty('display', 'none');
  });
}
// --- 點選logo --
logo.addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.home');
});
// --- 點選slideBtn ---
slideBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.experience');
});
// --- 點選experience ---
navlink[0].addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.experience');
});
// --- 點選about ---
navlink[1].addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.about');
});
// --- 點選skills ---
navlink[2].addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.skills');
});
// --- 點選works ---
navlink[3].addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollTo(0, 600, '.works');
});

window.addEventListener('scroll', function () {
  const top1 = document.documentElement.scrollTop;
  const top2 = document.querySelector('.experience').offsetTop;
  const top3 = document.querySelector('.about').offsetTop;
  const top4 = document.querySelector('.skills').offsetTop;
  const top5 = document.querySelector('.works').offsetTop;
  const h = window.screen.height;
  // --- 學經歷是否顯示 ---
  if (top1 + h / 2 > top2 && top1 + h / 2 < top3) {
    experience.classList.add('active');
    h1[1].classList.add('active');
    navlink[0].classList.add('activeNav');
  } else {
    experience.classList.remove('active');
    h1[1].classList.remove('active');
    navlink[0].classList.remove('activeNav');
  }
  // --- 關於我是否顯示 ---
  if (top1 + h / 2 > top3 && top1 + h / 2 < top4) {
    aboutL.classList.add('active');
    aboutR.classList.add('active');
    h1[2].classList.add('active');
    navlink[1].classList.add('activeNav');
  } else {
    aboutL.classList.remove('active');
    aboutR.classList.remove('active');
    h1[2].classList.remove('active');
    navlink[1].classList.remove('activeNav');
  }
  // --- 技能樹是否顯示 ---
  if (skillsTxt) {
    if (top1 + h / 2 > top4 && top1 + h / 2 < top5) {
      skillsTxt.forEach(function (el) {
        el.classList.add('active');
      });
      h1[3].classList.add('active');
      navlink[2].classList.add('activeNav');
    } else {
      skillsTxt.forEach(function (el) {
        el.classList.remove('active');
      });
      h1[3].classList.remove('active');
      navlink[2].classList.remove('activeNav');
    }
  }
  // --- 作品是否顯示 ---
  if (worksPic) {
    if (top1 + h / 2 > top5) {
      worksPic.forEach(function (el) {
        el.classList.add('active');
      });
      worksTxt.forEach(function (el) {
        el.classList.add('active');
      });
      h1[4].classList.add('active');
      navlink[3].classList.add('activeNav');
    } else {
      worksPic.forEach(function (el) {
        el.classList.remove('active');
      });
      worksTxt.forEach(function (el) {
        el.classList.remove('active');
      });
      h1[4].classList.remove('active');
      navlink[3].classList.remove('activeNav');
    }
  }
});

function scrollTo(number, time, element) {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = number;
    return number;
  }
  const top1 = document.documentElement.scrollTop;
  const top2 = document.querySelector(element).offsetTop;
  const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
  let spacingInex = time / spacingTime; // 计算循环的次数
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
  let everTop = (top2 - top1) / spacingInex; // 计算每次滑动的距离
  let scrollTimer = setInterval(function () {
    if (spacingInex > 0) {
      spacingInex--;
      this.scrollTo((nowTop += everTop));
    } else {
      clearInterval(scrollTimer); // 清除计时器
    }
  }, spacingTime);
}
