var PROJECT_PAGES_READY = false; // 项目页面做好后改成 true

document.querySelectorAll(".bubble").forEach(function(link){
  link.addEventListener("click", function(e){
    if(!PROJECT_PAGES_READY) e.preventDefault();
    this.blur(); // 收起 hover/focus 预览
  });
});

(function(){
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layerBg  = document.getElementById("layerBg");
  var layerTop = document.getElementById("layerTop");
  var layerCur = document.getElementById("layerCursor");
  var stage    = document.getElementById("stage");

  var TINTS = ["var(--d-1)","var(--d-2)","var(--d-3)","var(--d-4)","var(--d-5)","var(--d-6)"];

  function rand(a,b){ return a + Math.random() * (b - a); }
  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  /* 随机的有机圆角：8 个百分比构成不规则 blob */
  function radius(){
    function p(){ return Math.round(rand(35,65)); }
    var a=p(),b=100-a,c=p(),d=100-c,e=p(),f=100-e,g=p(),h=100-g;
    return a+"% "+b+"% "+c+"% "+d+"% / "+e+"% "+f+"% "+g+"% "+h+"%";
  }

  /* 中心密、边缘疏：极坐标 + 半径取幂，指数越大越往中间聚 */
  function centerWeightedPos(){
    var angle = Math.random() * Math.PI * 2;
    var r = Math.pow(Math.random(), 0.8) * 52;   // 0 → 52%
    return {
      x: 50 + Math.cos(angle) * r * 1.35,        // 横向略拉开，贴合宽屏
      y: 50 + Math.sin(angle) * r
    };
  }

  function makeDeco(opts){
    var el = document.createElement("div");
    var pos = centerWeightedPos();
    var size = rand(opts.min, opts.max);
    /* 离中心越远 → 越淡，进一步强化“中间密、外围疏”的观感 */
    var dist = Math.min(1, Math.hypot(pos.x - 50, pos.y - 50) / 55);
    var alpha = opts.alpha * (1 - dist * 0.45);

    el.className = "deco";
    el.style.cssText =
      "--x:" + pos.x.toFixed(2) + "%;" +
      "--y:" + pos.y.toFixed(2) + "%;" +
      "--size:" + size.toFixed(1) + "px;" +
      "--tint:" + pick(TINTS) + ";" +
      "--alpha:" + alpha.toFixed(3) + ";" +
      "--r-a:" + radius() + ";" +
      "--r-b:" + radius() + ";" +
      "--r-c:" + radius() + ";" +
      "--dx:" + rand(-opts.move, opts.move).toFixed(1) + (opts.moveUnit || "px") + ";" +
      "--dy:" + rand(-opts.move, opts.move).toFixed(1) + (opts.moveUnit || "px") + ";" +
      "--rot:" + rand(-14,14).toFixed(1) + "deg;" +
      "--drift-dur:" + rand(2,15).toFixed(1) + "s;" +
      "--morph-dur:" + rand(5,15).toFixed(1) + "s;" +
      "--delay:-" + rand(0,20).toFixed(1) + "s;";
    return el;
  }

  function populate(){
    layerBg.innerHTML = "";
    layerTop.innerHTML = "";
    var wide = window.innerWidth > 720;

    var bgCount  = wide ? 60 : 30;   // bottom layer：mixed
    var topCount = wide ? 30 : 15;   // top layer: small bubbles

    var i;
    for(i = 0; i < bgCount; i++){
      layerBg.appendChild(makeDeco({min:56, max:230, alpha:0.8}));
    }
    for(i = 0; i < topCount; i++){
      layerTop.appendChild(makeDeco({min:14, max:64, alpha:0.8}));
    }
  }

  populate();

  /* 尺寸变化时重新分布（节流） */
  var rt;
  window.addEventListener("resize", function(){
    clearTimeout(rt);
    rt = setTimeout(populate, 260);
  });

  /* ---------- 鼠标拖尾：节流生成，出现后快速淡出并移除 ---------- */
  if(!reduced && window.matchMedia("(hover: hover)").matches){
    var last = 0;
    var GAP = 130;   // 生成间隔（ms）—— 调大 = 更少气泡
    var LIFE = 900;  // 存活时长（ms）

    stage.addEventListener("mousemove", function(e){
      var now = performance.now();
      if(now - last < GAP) return;
      last = now;

      var rect = stage.getBoundingClientRect();
      var b = document.createElement("div");
      b.className = "trail";
      b.style.cssText =
        "left:" + (e.clientX - rect.left + rand(-10,10)) + "px;" +
        "top:"  + (e.clientY - rect.top  + rand(-10,10)) + "px;" +
        "--size:" + rand(9,26).toFixed(1) + "px;" +
        "--tint:" + pick(TINTS) + ";" +
        "--r-a:" + radius() + ";" +
        "--tx:" + rand(-40,40).toFixed(0) + "%;" +
        "--ty:" + rand(-70,-20).toFixed(0) + "%;" +
        "--life:" + LIFE + "ms;";
      layerCur.appendChild(b);
      setTimeout(function(){ b.remove(); }, LIFE + 60);
    }, {passive:true});
  }
})();