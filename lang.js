/* ===== i18n.js：language change ===== */
// dictionary
const I18N = {
  en: {
    "role":         "UI/UX Designer",
    "nav.projects": "All Projects",
    "nav.about":    "About"
  },
  zh: {
    "role":         "UI/UX 设计师",
    "nav.projects": "全部项目",
    "nav.about":    "关于我"
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

