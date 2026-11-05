/* CoCare 页面文字的中英文：合并进 lang.js 的 I18N（BoardKit.js 已先加载） */
(function(){
  var TEXT = {
    en:{ "cc.title":"CoCare - A Parenting Community",
         "cc.intro":"CoCare is a mobile community where parents and caregivers can share experiences, find reliable information and support each other. (Replace with your own intro.)",
         "cc.intro2":"CoCare meets these needs through three connected features: a verified community, categorised collections and a family network.",
         "cc.concept":"Design Concept","cc.persona":"Persona","cc.wire":"Wireframe" },
    zh:{ "cc.title":"CoCare - 专业育儿互助社区",
         "cc.intro":"CoCare 是一款为父母及照顾者打造的可信社区应用，让他们分享经验、获取可靠信息并互相支持。（请替换为你自己的介绍）",
         "cc.intro2":"CoCare 通过三个相互关联的核心功能满足这些需求：认证社区、分类信息收集工具和家庭网络。",
         "cc.concept":"设计概念","cc.persona":"用户画像","cc.wire":"线框图" }
  };
  if(typeof I18N === "undefined" || typeof setLang !== "function") return;
  Object.keys(TEXT).forEach(function(l){ Object.assign(I18N[l], TEXT[l]); });
  var sw = document.getElementById("langSwitch");
  setLang((sw && sw.dataset.lang) || "en");
})();