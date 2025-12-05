chrome.storage.local.get(["lang"], ({ lang = DEFAULTS.lang }) => {
    const showToastMsg = (taskId, success = true) => {
        const text = success 
            ? `${locales[lang].copied}${taskId}` 
            : locales[lang].copyError;
        showToast(text);
    };

    const copyToClipboard = async (taskId, summary, format, copyMode) => {
        const copyText = getCopyText(taskId, summary, window.location.href, format, copyMode);
        const plainText = copyText.replace(/<[^>]+>/g, "");

        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": new Blob([copyText], { type: "text/html" }),
                    "text/plain": new Blob([plainText], { type: "text/plain" })
                })
            ]);
            showToastMsg(taskId, true);
        } catch (error) {
            showToastMsg(taskId, false);
        }
    };

    document.addEventListener("copy", (e) => {
        if (window.getSelection().toString().trim()) return;

        const taskId = getJiraTaskId();
        if (!taskId) return;

        const summary = getJiraSummary();
        
        chrome.storage.local.get(["format", "copyMode"], ({ format = DEFAULTS.format, copyMode = DEFAULTS.copyMode }) => {
            copyToClipboard(taskId, summary, format, copyMode);
        });

        e.preventDefault();
    });
});

function getCopyText(taskId, summary, url, format, copyMode) {
    const summaryPart = (copyMode === "full" && summary) ? ` ${summary}` : "";

    const formats = {
        slack: `<${url}|${taskId}>${summaryPart}`,
        plain: `${taskId}${summaryPart}`,
        markdown: `[${taskId}](${url})${summaryPart}`,
        html: `<a href="${url}">${taskId}</a>${summaryPart}`
    };

    return formats[format] || formats.html;
}

function getJiraTaskId() {
    return window.location.pathname.match(/\/browse\/([^\/]+)/)?.[1] || null;
}

function getJiraSummary() {
    return document.querySelector('h1[data-testid="issue.views.issue-base.foundation.summary.heading"]')?.innerText.trim() || null;
}

function showToast(text) {
    const TOAST_ID = "jira-smart-copy-toast";
    const TOAST_DURATION = 2000;
    const FADE_DURATION = 250;

    document.getElementById(TOAST_ID)?.remove();

    const toast = document.createElement("div");
    toast.id = TOAST_ID;
    toast.innerText = text;
    
    Object.assign(toast.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "12px 18px",
        borderRadius: "8px",
        fontSize: "14px",
        zIndex: 2147483647,
        opacity: "0",
        transition: `opacity ${FADE_DURATION}ms ease`
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), FADE_DURATION);
    }, TOAST_DURATION);
}
