var PROJECT_PAGES_READY = false; //true

document.querySelectorAll(".bubble").forEach(function(link){
  link.addEventListener("click", function(e){
    if(!PROJECT_PAGES_READY) e.preventDefault();
    this.blur(); // close hover/focus preview
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

  /* change bubble radius*/
  function radius(){
    function p(){ return Math.round(rand(35,65)); }
    var a=p(),b=100-a,c=p(),d=100-c,e=p(),f=100-e,g=p(),h=100-g;
    return a+"% "+b+"% "+c+"% "+d+"% / "+e+"% "+f+"% "+g+"% "+h+"%";
  }

/* ============================================================
   density- center
   ============================================================ */
  function centerWeightedPos(){
    var angle = Math.random() * Math.PI * 2;
    var r = Math.pow(Math.random(), 0.7) * 52;   // 0 → 52%
    return {
      x: 50 + Math.cos(angle) * r * 1.35,        
      y: 50 + Math.sin(angle) * r
    };
  }

  function clamp01(v){ return Math.max(0, Math.min(1, v)); }

  function makeDeco(opts){
  var el = document.createElement("div");
  var pos = centerWeightedPos();

  var dist = clamp01(Math.hypot((pos.x - 50) / 1.35, pos.y - 50) / 52);

  // noise - more ramdom bubbles
  var NOISE = 0.45;
  var t = clamp01(dist + rand(-NOISE, NOISE));
  var size = opts.min + (opts.max - opts.min) * Math.pow(1 - t, 2);

  var alpha = opts.alpha * (1 - dist * 0.25);

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
      "--drift-dur:" + rand(8,22).toFixed(1) + "s;" + //move spped
      "--morph-dur:" + rand(5,15).toFixed(1) + "s;" +
      "--delay:-" + rand(0,20).toFixed(1) + "s;";
    return el;
  }

  function populate(){
    layerBg.innerHTML = "";
    layerTop.innerHTML = "";
    var wide = window.innerWidth > 720;

    var bgCount  = wide ? 90 : 30;   // bottom layer：mixed
    var topCount = wide ? 30 : 15;   // top layer: small bubbles

    var i;
    for(i = 0; i < bgCount; i++){
      layerBg.appendChild(makeDeco({min:10, max:250, alpha:0.8, move:60}));
    }
    for(i = 0; i < topCount; i++){
      layerTop.appendChild(makeDeco({min:14, max:64, alpha:0.8}));
    }
  }

  populate();

  var rt;
  window.addEventListener("resize", function(){
    clearTimeout(rt);
    rt = setTimeout(populate, 260);
  });

  /* ---------- mouse bubblr ---------- */
  if(!reduced && window.matchMedia("(hover: hover)").matches){
    var last = 0;
    var GAP = 60;   // bubblr gap
    var LIFE = 900;  // time (exist)

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

  