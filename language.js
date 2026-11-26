(function () {
  var toggle = document.querySelector(".language-toggle");
  var popover = document.getElementById("language-popover");
  if (!toggle || !popover) return;

  var languageCodes = [
    "en", "ar", "bg", "zh-CN", "hr", "cs", "da", "nl", "et", "fi",
    "fr", "de", "el", "hu", "ga", "it", "lv", "lt", "mt", "pl",
    "pt", "ro", "sk", "sl", "es", "sv", "ru", "uk", "no", "tr",
    "zu", "ko", "sw"
  ];

  window.gtranslateSettings = {
    default_language: "en",
    languages: languageCodes,
    native_language_names: true,
    wrapper_selector: ".gtranslate_wrapper"
  };

  var currentLanguage = "en";
  try {
    var savedLanguages = JSON.parse(localStorage.getItem("__GT_TRANSLATE_LANGS") || "null");
    if (savedLanguages && languageCodes.indexOf(savedLanguages.tgtLang) !== -1) {
      currentLanguage = savedLanguages.tgtLang;
    }
  } catch (error) {
    console.error("Could not read the saved language preference.", error);
  }
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  var wrapper = document.querySelector(".gtranslate_wrapper");
  if (wrapper) {
    wrapper.addEventListener("pointerenter", function (event) {
      event.stopImmediatePropagation();
    }, true);
    wrapper.addEventListener("focusin", function (event) {
      event.stopImmediatePropagation();
    }, true);
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    popover.hidden = !open;
  }

  document.addEventListener("click", function (event) {
    var choice = event.target.closest("[data-gt-lang]");
    if (!choice) return;

    var language = choice.getAttribute("data-gt-lang");
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    setOpen(false);
    toggle.focus();
    document.dispatchEvent(new CustomEvent("sadaqah:languagechange", {
      detail: { language: language }
    }));
  });

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("pointerdown", function (event) {
    if (!popover.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  var script = document.createElement("script");
  script.src = "https://cdn.gtranslate.net/widgets/latest/ln.js";
  script.async = true;
  script.onerror = function () {
    console.error("Could not load the GTranslate language widget.");
  };
  document.head.appendChild(script);
})();
