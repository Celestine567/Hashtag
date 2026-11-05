/* ===== i18n.js：language change ===== */
// dictionary
const I18N = {
  en: {
    "role":         "UI/UX Designer",
    "nav.projects": "All Projects",
    "nav.about":    "About",

    /* Nourish */
    "nr.title": "Nourish - Website Redesign",
    "nr.intro": "This redesign aims to improve the Nourish website by addressing the usability issues identified in the UI Analysis Report, while maintaining its luxurious and minimalist brand identity.",
    "nr.key":   "Key Improvements",
    "nr.k1":    "Navigation: Introduce a fixed header for easier navigation.",
    "nr.k2":    "Visual Hierarchy: Establish a consistent typography and colour system.",
    "nr.k3":    "Website Architecture: Improve the content structure and interaction flow, making key features easier to find.",
    "nr.wire":  "Redesigned Wireframe",
    "nr.insp":  "Inspiration",
    "nr.idea":  "Ideation",

    /* CoCare */
    "cc.title":   "CoCare - A Parenting Community",
    "cc.intro":   "CoCare is a mobile community where parents and caregivers can share experiences, find reliable information and support each other. (Replace with your own intro.)",
    "cc.intro2":  "CoCare meets these needs through three connected features: a verified community, categorised collections and a family network.",
    "cc.concept": "Design Concept",
    "cc.persona": "Persona",
    "cc.wire":    "Wireframe"
  },
  zh: {
    "role":         "UI/UX 设计师",
    "nav.projects": "全部项目",
    "nav.about":    "关于我",

    /* Nourish */
    "nr.title": "Nourish - 重新设计网站",
    "nr.intro": "本次重新设计旨在解决 UI 分析报告中发现的可用性问题，同时保持 Nourish 网站奢华而极简的品牌调性。",
    "nr.key":   "主要改进",
    "nr.k1":    "导航：加入固定顶部栏，让导航更方便。",
    "nr.k2":    "视觉层级：建立统一的字体与色彩体系。",
    "nr.k3":    "网站架构：优化内容结构与交互流程，让关键功能更容易找到。",
    "nr.wire":  "重新设计的线框图",
    "nr.insp":  "灵感",
    "nr.idea":  "构思",

    /* CoCare */
    "cc.title":   "CoCare - 专业育儿互助社区",
    "cc.intro":   "CoCare 是一款为父母及照顾者打造的可信社区应用，让他们分享经验、获取可靠信息并互相支持。（请替换为你自己的介绍）",
    "cc.intro2":  "CoCare 通过三个相互关联的核心功能满足这些需求：认证社区、分类信息收集工具和家庭网络。",
    "cc.concept": "设计概念",
    "cc.persona": "用户画像",
    "cc.wire":    "线框图"
  }
};

const STORAGE_KEY = "site-lang";


function setLang(lang){
  if(!I18N[lang]) lang = "en";

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const text = I18N[lang][el.dataset.i18n];
    if(text) el.textContent = text;
  });

  const sw = document.getElementById("langSwitch");
  if(sw){
    sw.dataset.lang = lang;
    sw.querySelectorAll("[data-set-lang]").forEach(b => {
      b.setAttribute("aria-pressed", b.dataset.setLang === lang);
    });
  }

  try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
}

// connect to button
document.querySelectorAll("[data-set-lang]").forEach(b => {
  b.addEventListener("click", () => setLang(b.dataset.setLang));
});

// reset and auto-detect language
let saved = null;
try{ saved = localStorage.getItem(STORAGE_KEY); }catch(e){}
setLang(saved || (navigator.language.startsWith("zh") ? "zh" : "en"));


/* ===== mobile nav toggle ===== */
(function(){
  var header = document.querySelector(".site-header");
  var nav = header && header.querySelector(".site-nav");
  if(!nav) return;

  nav.id = "siteNav";
  var btn = document.createElement("button");
  btn.className = "nav-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Menu");
  btn.setAttribute("aria-controls", "siteNav");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(btn);

  function setOpen(open){
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open);
  }
  btn.addEventListener("click", function(e){
    e.stopPropagation();
    setOpen(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", function(e){ if(e.target.closest("a")) setOpen(false); });   
  document.addEventListener("click", function(e){ if(!nav.contains(e.target)) setOpen(false); }); 
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") setOpen(false); });
  window.addEventListener("resize", function(){ if(window.innerWidth > 720) setOpen(false); });
})();

