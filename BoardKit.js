(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLS  = ["--c-r","--c-o","--c-y","--c-b"];            // 数字泡泡 / banner 泡泡循环用的 root 颜色
  var TINTS = ["var(--d-1)","var(--d-2)","var(--d-3)","var(--d-4)","var(--d-5)","var(--d-6)"];
  var WORDS = ["Timeline","Persona","Survey","Wireframe","Prototype"];

  function rand(a,b){ return a + Math.random()*(b-a); }
  function radius(){
    function p(){ return Math.round(rand(35,65)); }
    var a=p(),b=100-a,c=p(),d=100-c,e=p(),f=100-e,g=p(),h=100-g;
    return a+"% "+b+"% "+c+"% "+d+"% / "+e+"% "+f+"% "+g+"% "+h+"%";
  }

  /* ---------- bg bubbles ---------- */
  var deco = document.getElementById("pageDeco");
  var count = window.innerWidth > 720 ? 45 : 22;
  for(var i=0;i<count;i++){
    var el = document.createElement("div");
    el.className = "deco";
    el.style.cssText =
      "--x:"+rand(0,100).toFixed(1)+"%;--y:"+rand(0,100).toFixed(1)+"%;"+
      "--size:"+rand(8,30).toFixed(1)+"px;"+
      "--tint:"+TINTS[Math.floor(rand(0,TINTS.length))]+";--alpha:"+rand(.5,.85).toFixed(2)+";"+
      "--r-a:"+radius()+";--r-b:"+radius()+";--r-c:"+radius()+";"+
      "--dx:"+rand(-30,30).toFixed(0)+"px;--dy:"+rand(-30,30).toFixed(0)+"px;--rot:"+rand(-14,14).toFixed(0)+"deg;"+
      "--drift-dur:"+rand(6,16).toFixed(1)+"s;--morph-dur:"+rand(5,15).toFixed(1)+"s;--delay:-"+rand(0,20).toFixed(1)+"s;";
    deco.appendChild(el);
  }

  /* ---------- Banner---------- */
  var track = document.getElementById("marqueeTrack");
  var c = 0;
  function bubble(){
    var b = document.createElement("span");
    b.className = "mq-bubble";
    b.style.cssText =
      "--size:"+rand(58,78).toFixed(0)+"px;--tint:var("+COLS[c++ % COLS.length]+");"+
      "--r-a:"+radius()+";--r-b:"+radius()+";--r-c:"+radius()+";"+
      "--drift-dur:"+rand(14,24).toFixed(1)+"s;--morph-dur:"+rand(10,18).toFixed(1)+"s;--delay:-"+rand(0,15).toFixed(1)+"s;";
    b.innerHTML = '<span class="bubble-shape"></span>';
    return b;
  }
  for(var copy=0; copy<2; copy++){
    WORDS.forEach(function(w){
      track.appendChild(bubble());
      track.appendChild(bubble());
      var t = document.createElement("span");
      t.className = "mq-word"; t.textContent = w;
      track.appendChild(t);
    });
  }

  /* ---------- number change---------- */
  var heroB  = document.getElementById("heroBubble");
  var floatB = document.getElementById("floatBubble");
  var current = "";
  function setStep(n){
    if(n === current) return;
    var first = current === "";
    current = n;
    var color = "var(" + COLS[(parseInt(n,10)-1) % COLS.length] + ")";
    [heroB, floatB].forEach(function(b){
      b.style.setProperty("--tint", color);
      b.querySelector(".num").textContent = n;
      if(!first && !reduced){ b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    });
  }
  setStep("01");

  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting) setStep(e.target.dataset.step); });
    }, {rootMargin:"-45% 0px -50% 0px"});            // middle of page
    document.querySelectorAll(".step").forEach(function(s){ io.observe(s); });

    
    new IntersectionObserver(function(es){
      floatB.classList.toggle("show", !es[0].isIntersecting);
    }).observe(heroB);
  }
})();