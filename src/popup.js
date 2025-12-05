const elements = {
    formatsContainer: document.getElementById("formats"),
    copyModesContainer: document.getElementById("copyModes"),
    languagesContainer: document.getElementById("languages"),
    formatLabel: document.getElementById("format-label"),
    copyLabel: document.getElementById("copy-label")
};

function createRadioButton(name, value, isChecked, labelText) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="${name}" value="${value}" ${isChecked ? "checked" : ""}/> ${labelText}`;
    return label;
}

function renderRadioButtons(lang, format, copyMode) {
    elements.formatsContainer.innerHTML = "";
    elements.copyModesContainer.innerHTML = "";
    elements.languagesContainer.innerHTML = "";

    FORMATS.forEach(f => {
        const radio = createRadioButton("format", f, format === f, locales[lang][f]);
        elements.formatsContainer.appendChild(radio);
    });

    COPY_MODES.forEach(m => {
        const radio = createRadioButton("copyMode", m, copyMode === m, locales[lang][m]);
        elements.copyModesContainer.appendChild(radio);
    });

    LANGUAGES.forEach(l => {
        const radio = createRadioButton("lang", l.code, lang === l.code, l.name);
        elements.languagesContainer.appendChild(radio);
    });
}

function applyTranslations(lang, format, copyMode) {
    elements.formatLabel.innerText = locales[lang].formatLabel;
    elements.copyLabel.innerText = locales[lang].copyLabel;
    renderRadioButtons(lang, format, copyMode);
}

function initializeSettings() {
    chrome.storage.local.get(["format", "copyMode", "lang"], ({ 
        format = DEFAULTS.format, 
        copyMode = DEFAULTS.copyMode, 
        lang = DEFAULTS.lang 
    }) => {
        applyTranslations(lang, format, copyMode);
    });
}

initializeSettings();

function setupEventListeners() {
    document.addEventListener("change", (e) => {
        const { name, value } = e.target;
        
        if (name === "lang") {
            chrome.storage.local.set({ lang: value });
            chrome.storage.local.get(["format", "copyMode"], ({ format, copyMode }) => {
                applyTranslations(value, format, copyMode);
            });
        } else if (name === "format" || name === "copyMode") {
            chrome.storage.local.set({ [name]: value });
        }
    });
}

setupEventListeners();
