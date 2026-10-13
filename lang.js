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