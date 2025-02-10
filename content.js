console.log("nani..??")

const LOCALSTORAGEPREFIX = "WHATSAPP_CUSTOM_THEME_";
const cssVar = {
    sidePane: "--side-pane",
    msgIn: "--msg-in",
    msgOut: "--msg-out",
    bars: "--bars",
    someMoreBars: "--some-more-bars",
    msgInInner: "--msg-in-inner",
    msgOutInner: "--msg-out-inner",
    msgInText: "--msg-in-text",
    sidePanePrimaryText: "--side-pane-primary-text",
    sidePaneSecondaryText: "--side-pane-secondary-text",
    msgOutText: "--msg-out-text",
    msgInLink: "--msg-in-link",
    msgOutLink: "--msg-out-link",
    chatBackground: "--chat-background"
}

//retrieve preset::local storage
try {
    const retrievedPreset = JSON.parse(localStorage.getItem(`${LOCALSTORAGEPREFIX}PRESET`))
    if(retrievedPreset) setTheme(retrievedPreset)
} catch (error) {
    console.log(error)
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.color) {
      let hex = message.color;
      hex=hex.replace('#','');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty(`${message.varName}`, `rgb(${r}, ${g}, ${b})`);
    }

    if(message.apply){
        applyPreset();
    }
});

function setTheme(retrievedPreset){
    const target = document.documentElement.style;
    Object.keys(cssVar).forEach(key => {
        target.setProperty(cssVar[key], retrievedPreset[key]);
    })
}

function applyPreset(){
    const preset = {};
    const rootStyles = getComputedStyle(document.documentElement);

    Object.keys(cssVar).forEach(key => {
        preset[key] = rootStyles.getPropertyValue(cssVar[key]).trim();
    });

    alert("Your Changes Have Been Saved Noob...")
    console.log("Saving Changes...")
    localStorage.setItem(`${LOCALSTORAGEPREFIX}PRESET`, JSON.stringify(preset));
}
