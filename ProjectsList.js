(function(){
  "use strict";
  var TINTS = ["var(--d-1)","var(--d-2)","var(--d-3)","var(--d-4)","var(--d-5)","var(--d-6)"];

  function rand(a,b){ return a + Math.random()*(b-a); }
  function radius(){
    function p(){ return Math.round(rand(35,65)); }
    var a=p(),b=100-a,c=p(),d=100-c,e=p(),f=100-e,g=p(),h=100-g;
    return a+"% "+b+"% "+c+"% "+d+"% / "+e+"% "+f+"% "+g+"% "+h+"%";
  }

  /* ---------- bg bubbles（从 BoardKit.js 原样复制） ---------- */
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

  /* ---------- tag 边框（和 BoardKit 同一段） ---------- */
  document.querySelectorAll(".tags li").forEach(function(li){
    li.style.setProperty("--r", radius());
    li.style.setProperty("--bw", [
      rand(2.5,4.5).toFixed(1)+"px",
      rand(2.5,4.5).toFixed(1)+"px",
      rand(2.5,4.5).toFixed(1)+"px",
      rand(2.5,4.5).toFixed(1)+"px"
    ].join(" "));
    li.style.transform = "rotate("+rand(-0.8,0.8).toFixed(2)+"deg)";
  });

  /* ---------- 新增：每个项目一条不同的静止曲线 ---------- */
  function wavyPath(w,h){
    var segs = Math.round(rand(3,5)), step = w/segs, mid = h/2;
    var d = "M0 "+(mid+rand(-3,3)).toFixed(1);
    for(var i=1;i<=segs;i++){
      var x  = (i*step).toFixed(1);
      var cx = ((i-0.5)*step + rand(-step*.15, step*.15)).toFixed(1);
      var cy = (mid + (i%2 ? -1 : 1) * rand(5,9)).toFixed(1);   // 上下交替，形成波浪
      var y  = (mid + rand(-3,3)).toFixed(1);
      d += " Q"+cx+" "+cy+" "+x+" "+y;
    }
    return d;
  }
  document.querySelectorAll(".project-line path").forEach(function(p){
    p.setAttribute("d", wavyPath(400,20));
  });

  /* ---------- 新增：hover 切换右边的图片 ---------- */
  var items  = document.querySelectorAll(".project-item");
  var slides = document.querySelectorAll(".preview-slide");
  function show(n){
    slides.forEach(function(s,k){ s.classList.toggle("is-active", k===n); });
  }
  items.forEach(function(it,n){
    it.addEventListener("mouseenter", function(){ show(n); });
    it.addEventListener("focusin",    function(){ show(n); });   // 键盘 Tab 也能切换
  });
  show(0);
})();