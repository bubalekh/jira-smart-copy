const elements = {
    formatsContainer: document.getElementById("formats"),
    copyModesContainer: document.getElementById("copyModes"),
    languagesContainer: document.getElementById("languages"),
    formatLabel: document.getElementById("format-label"),
    copyLabel: document.getElementById("copy-label"),
    advancedSettingsLabel: document.getElementById("advanced-settings-label"),
    replaceLabel: document.getElementById("replace-label"),
    replaceCheckbox: document.getElementById("replaceDefault"),
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

function applyTranslations(lang, format, copyMode, replaceDefault) {
    elements.formatLabel.innerText = locales[lang].formatLabel;
    elements.copyLabel.innerText = locales[lang].copyLabel;
    elements.replaceLabel.innerText = locales[lang].replaceLabel;
    elements.advancedSettingsLabel.innerText = locales[lang].advancedSettingsLabel;
    elements.replaceCheckbox.checked = replaceDefault;
    renderRadioButtons(lang, format, copyMode);
}

function initializeSettings() {
    chrome.storage.local.get(["format", "copyMode", "lang", "replaceDefault"], ({
        format = DEFAULTS.format,
        copyMode = DEFAULTS.copyMode,
        lang = DEFAULTS.lang,
        replaceDefault = DEFAULTS.replaceDefault
    }) => {
        applyTranslations(lang, format, copyMode, replaceDefault);
    });
}

initializeSettings();

function setupEventListeners() {
    document.addEventListener("change", (e) => {
        const { name, value, checked } = e.target;

        if (name === "lang") {
            chrome.storage.local.set({ lang: value });
            chrome.storage.local.get(["format", "copyMode", "replaceDefault"], ({ format, copyMode, replaceDefault }) => {
                applyTranslations(value, format, copyMode, replaceDefault);
            });
        } else if (name === "format" || name === "copyMode") {
            chrome.storage.local.set({ [name]: value });
        } else if (e.target.id === "replaceDefault") {
            chrome.storage.local.set({ replaceDefault: checked });
        }
    });
}

setupEventListeners();