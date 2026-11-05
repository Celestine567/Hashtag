(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLS  = ["--c-r","--c-o","--c-y","--c-b"];
  var TINTS = ["var(--d-1)","var(--d-2)","var(--d-3)","var(--d-4)","var(--d-5)","var(--d-6)"];

  /* ============ CONFIG：新增项目只改这里 ============ */
  // footer 跑马灯里的项目（href 做好页面后再改）
  var PROJECTS = [
    {n:"01", name:"CoCare",    href:"#"},
    {n:"02", name:"BoardKit",  href:"BoardKit.html"},
    {n:"03", name:"Nourish",   href:"#"},
    {n:"04", name:"Portfolio", href:"#"}
  ];
  // 本页文字的中英文（会合并进 lang.js 的 I18N，不用改 lang.js）
  var TEXT = {
    en:{ "nav.intro":"Intro","sec.research":"User Research","sec.persona":"Persona","sec.pain":"Pain Point","sec.ux":"UX Architecture","sec.wire":"Wireframe","foot.home":"Take me home",
         "hero.title":"BoardKit - A Board Game Assistant" },
    zh:{ "nav.intro":"简介","sec.research":"用户研究","sec.persona":"用户画像","sec.pain":"痛点","sec.ux":"体验架构","sec.wire":"线框图","foot.home":"回到首页",
         "hero.title":"BoardKit - 桌游社交与时间管理工具",
         "hero.intro":"BoardKit 是一款专为桌游爱好者设计的社交平台，以日程管理和桌游辅助工具为卖点，帮助玩家协调空闲时间、组织桌游活动、和朋友交流，并提供便捷的游戏辅助功能，从而解决桌游活动中玩家时间难以协调的问题。" }
  };

  function $$(s){ return [].slice.call(document.querySelectorAll(s)); }
  function rand(a,b){ return a + Math.random()*(b-a); }
  function radius(){
    function p(){ return Math.round(rand(35,65)); }
    var a=p(),b=100-a,c=p(),d=100-c,e=p(),f=100-e,g=p(),h=100-g;
    return a+"% "+b+"% "+c+"% "+d+"% / "+e+"% "+f+"% "+g+"% "+h+"%";
  }
  function morphVars(){ return "--r-a:"+radius()+";--r-b:"+radius()+";--r-c:"+radius()+";"; }

  /* ---------- bg bubbles ---------- */
  var deco = document.getElementById("pageDeco");
  if(deco){
    var count = window.innerWidth > 720 ? 45 : 22;
    for(var i=0;i<count;i++){
      var el = document.createElement("div");
      el.className = "deco";
      el.style.cssText =
        "--x:"+rand(0,100).toFixed(1)+"%;--y:"+rand(0,100).toFixed(1)+"%;"+
        "--size:"+rand(6,30).toFixed(1)+"px;"+
        "--tint:"+TINTS[Math.floor(rand(0,TINTS.length))]+";--alpha:"+rand(.5,.85).toFixed(2)+";"+
        morphVars()+
        "--dx:"+rand(-30,30).toFixed(0)+"px;--dy:"+rand(-30,30).toFixed(0)+"px;--rot:"+rand(-14,14).toFixed(0)+"deg;"+
        "--drift-dur:"+rand(6,16).toFixed(1)+"s;--morph-dur:"+rand(5,15).toFixed(1)+"s;--delay:-"+rand(0,20).toFixed(1)+"s;";
      deco.appendChild(el);
    }
  }

  /* ---------- 章节编号泡泡：按顺序自动生成 01 02 03… ---------- */
  function fillBubble(b){
    var n = b.dataset.num;
    b.style.setProperty("--tint","var("+COLS[(parseInt(n,10)-1)%COLS.length]+")");
    b.innerHTML = '<span class="bubble-shape"></span><span class="num">'+n+'</span>';
  }
  $$(".step").forEach(function(s,i){
    var h = s.querySelector(".step-head h2"); if(!h) return;
    var b = document.createElement("span");
    b.className = "num-bubble"; b.setAttribute("aria-hidden","true");
    b.dataset.num = ("0"+(i+1)).slice(-2);
    h.insertBefore(b,h.firstChild);
  });
  $$(".num-bubble[data-num]").forEach(fillBubble);

  /* ---------- 左侧导航：根据 [data-nav] 自动生成，滚动时高亮 ---------- */
  var secs = $$("[data-nav]");
  var nav  = document.getElementById("sideNav");
  var links = [];
  if(nav && secs.length){
    secs.forEach(function(s,i){
      if(!s.id) s.id = "sec-"+i;
      var a = document.createElement("a");
      a.href = "#"+s.id; a.textContent = s.dataset.nav;
      if(s.dataset.navKey) a.setAttribute("data-i18n", s.dataset.navKey);
      nav.appendChild(a); links.push(a);
    });
    var ticking = false;
    function onScroll(){
      var line = window.innerHeight*0.4, cur = 0;
      secs.forEach(function(s,i){ if(s.getBoundingClientRect().top <= line) cur = i; });
      links.forEach(function(a,i){ a.classList.toggle("is-active", i===cur); });
      ticking = false;
    }
    window.addEventListener("scroll", function(){ if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
    onScroll();
  }

  /* ---------- 痛点泡泡 / 技能圆点 ---------- */
  $$(".blob").forEach(function(b){
    b.style.cssText += morphVars()+"--morph-dur:"+rand(9,16).toFixed(1)+"s;--delay:-"+rand(0,10).toFixed(1)+"s;";
  });
  $$(".dots[data-level]").forEach(function(d){
    var lv = +d.dataset.level;
    for(var k=0;k<5;k++){ var dot = document.createElement("i"); if(k<lv) dot.className="on"; d.appendChild(dot); }
  });

  /* ---------- Footer：Take me home / top / 项目跑马灯 ---------- */
  var foot = document.getElementById("siteFooter");
  if(foot){
    foot.innerHTML =
      '<div class="foot-actions">'+
        '<a class="btn-blob" href="index.html" data-i18n="foot.home">Take me home</a>'+
        '<button class="btn-top" type="button" aria-label="Back to top"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>'+
      '</div>'+
      '<div class="marquee"><div class="marquee-track" id="marqueeTrack"></div></div>';
    foot.querySelector(".btn-top").addEventListener("click", function(){
      window.scrollTo({top:0, behavior: reduced ? "auto" : "smooth"});
    });

    var track = foot.querySelector("#marqueeTrack"), c = 0;
    var here = location.pathname.split("/").pop();
    var bubble = function(){
      var b = document.createElement("span");
      b.className = "mq-bubble";
      b.style.cssText =
        "--size:"+rand(58,78).toFixed(0)+"px;--tint:var("+COLS[c++ % COLS.length]+");"+ morphVars()+
        "--drift-dur:"+rand(14,24).toFixed(1)+"s;--morph-dur:"+rand(10,18).toFixed(1)+"s;--delay:-"+rand(0,15).toFixed(1)+"s;";
      b.innerHTML = '<span class="bubble-shape"></span>';
      return b;
    };
    for(var copy=0; copy<2; copy++){            // 复制两份才能无缝循环
      PROJECTS.forEach(function(p){
        track.appendChild(bubble()); track.appendChild(bubble());
        var a = document.createElement("a");
        a.className = "mq-word"+(p.href===here ? " is-current":"");
        a.href = p.href; a.textContent = p.n+" "+p.name;
        track.appendChild(a);
      });
    }
  }

  /* ---------- tag 边框 ---------- */
  $$(".tags li").forEach(function(li){
    li.style.setProperty("--r", radius());
    li.style.transform = "rotate("+rand(-0.8,0.8).toFixed(2)+"deg)";
  });

  /* ---------- 合并本页文字进 lang.js 的字典，并刷新一次 ---------- */
  if(typeof I18N !== "undefined" && typeof setLang === "function"){
    Object.keys(TEXT).forEach(function(l){ Object.assign(I18N[l], TEXT[l]); });
    var sw = document.getElementById("langSwitch");
    setLang((sw && sw.dataset.lang) || "en");
  }
})();