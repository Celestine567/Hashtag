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
    "cc.wire":    "Wireframe",

    /* BoardKit */
    "bk.title": "BoardKit - A Board Game Assistant",
    "bk.intro": "The project aims to develop a companion application to assist board game players, focusing on facilitating more convenient and efficient gameplay with a comprehensive set of functions.",
    /* Project List */
    "pl.cocare.title": "CoCare",
    "pl.cocare.desc": "CoCare is a mobile app that brings parents and caregivers together to share experiences, find reliable information about infant care, and support each other.",
    "pl.boardkit.title": "BoardKit",
    "pl.boardkit.desc": "BoardKit is a social platform for board game players to coordinate schedules, organise game sessions, and stay connected with friends.",
    "pl.nourish.title": "Nourish Website Redesign",
    "pl.nourish.desc": "A website redesign focused on improving usability and navigation while maintaining Nourish's luxurious and minimalist brand identity.",
    "bk.research.desc": "The project timeline covers the period from the initial concept to the development stage.",
    "bk.persona": "User Personas",
    "bk.persona.desc": "User personas were developed based on insights gathered from interviews.",
    /* About */
    "about.education": "Education",
    "about.university": "University of Melbourne",
    "about.degree": "User Experience Design",
    "about.experience": "Experience",
    "about.marketing": "Marketing Intern",
    "about.marketing.desc": "Contacted KOLs on social media and supported influencer marketing activities.",
    "about.ux": "UX Design Studio Project",
    "about.ux.desc": "Collaborated with classmates on a user research and prototype design project.",
    "about.mentor": "Peer Mentor",
    "about.mentor.desc": "Supported new students in adapting to university life and their studies.",
    "about.skills": "Skills",
    "about.language": "Languages",
    "about.english": "Fluent",
    "about.mandarin": "Native"
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
    "cc.wire":    "线框图",

    /* BoardKit */
    "bk.title": "BoardKit - 桌游社交与时间管理工具",
    "bk.intro": "BoardKit 是一款桌游辅助应用，旨在帮助玩家更方便地组织游戏、协调时间，并提升整体游戏体验。",
    /* Project List */
    "pl.cocare.title": "CoCare",
    "pl.cocare.desc": "CoCare 是一款为父母及照护者打造的移动应用，帮助他们分享育儿经验、获取可靠的婴儿护理信息，并在社区中互相支持。",
    "pl.boardkit.title": "BoardKit",
    "pl.boardkit.desc": "BoardKit 是一款面向桌游玩家的社交平台，帮助用户协调空闲时间、组织桌游活动，并与朋友保持联系。",
    "pl.nourish.title": "Nourish 网站重新设计",
    "pl.nourish.desc": "本项目通过重新设计 Nourish 网站，改善网站的可用性与导航体验，同时保留品牌奢华、简约的视觉风格。",
    "bk.research.desc": "项目时间线展示了从最初概念构思到设计开发阶段的整个过程。",
    "bk.persona": "用户画像",
    "bk.persona.desc": "根据用户访谈中收集到的见解，整理并创建了具有代表性的用户画像。",
    /* About */
    "about.education": "教育背景",
    "about.university": "墨尔本大学",
    "about.degree": "用户体验设计",
    "about.experience": "工作与项目经历",
    "about.marketing": "市场营销实习生",
    "about.marketing.desc": "通过社交媒体联系 KOL，并协助开展网红营销活动。",
    "about.ux": "用户体验设计工作室项目",
    "about.ux.desc": "与同学合作完成用户研究与原型设计项目。",
    "about.mentor": "同伴导师",
    "about.mentor.desc": "帮助新生适应大学学习与校园生活。",
    "about.skills": "技能",
    "about.language": "语言能力",
    "about.english": "流利",
    "about.mandarin": "母语"
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

