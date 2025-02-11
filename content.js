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
    appBorderRadius: "--app-border-radius",
    mainBackgroundOpacity: "--main-background-opacity",
    mainBackgroundOverlayColor: "--main-background-overlay-color",
    mainBackgroundOverlayOpacity: "--main-background-overlay-opacity",
    chatBackgroundOpacity: "--chat-background-opacity",
    chatBackgroundOverlayColor: "--chat-background-overlay-color",
    chatBackgroundOverlayOpacity: "--chat-background-overlay-opacity",
    chatBackground: "--chat-background"
}

//retrieve preset::local storage
try {
    const retrievedPreset = JSON.parse(localStorage.getItem(`${LOCALSTORAGEPREFIX}PRESET`))
    if(retrievedPreset) setTheme(retrievedPreset)
} catch (error) {
    console.log(error)
}

setMainBackgroundImage();
setChatBackgroundImage();


chrome.runtime.onMessage.addListener((message) => {
    if (message.color) {
      let hex = message.color;
      hex=hex.replace('#','');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty(`${message.varName}`, `rgb(${r}, ${g}, ${b})`);
    }

    if(message.opacity){
      document.documentElement.style.setProperty(`${message.opacityVarName}`, message.opacity);
    }

    if(message.borderRadius){
      document.documentElement.style.setProperty(`${message.borderVarName}`, `${message.borderRadius}px`);
    }

    if(message.apply){
        applyPreset();
    }

    if(message.setMainBackgroundImage){
        chrome.storage.local.set({mainBackgroundImage: message.setMainBackgroundImage},()=>{
            setMainBackgroundImage();
        })
    }

    if(message.setChatBackgroundImage){
        chrome.storage.local.set({chatBackgroundImage: message.setChatBackgroundImage},()=>{
            setChatBackgroundImage();
        })
    }
});

function setTheme(retrievedPreset){
    const target = document.documentElement.style;
    Object.keys(cssVar).forEach(key => {
        target.setProperty(cssVar[key], retrievedPreset[key]);
    })

    setDestructuredRgbVal('--msg-in', '--msg-in-rgb')
    setDestructuredRgbVal('--msg-out', '--msg-out-rgb')
}

function applyPreset(){
    const preset = {};
    const rootStyles = getComputedStyle(document.documentElement);
    
    Object.keys(cssVar).forEach(key => {
        preset[key] = rootStyles.getPropertyValue(cssVar[key]).trim();
    });
    
    alert("Your Changes Have Been Saved Noob...")
    const audio = new Audio(chrome.runtime.getURL("apply_sound_effect.mp3"));
    audio.play();
    console.log("Saving Changes...")
    localStorage.setItem(`${LOCALSTORAGEPREFIX}PRESET`, JSON.stringify(preset));
    setDestructuredRgbVal('--msg-in', '--msg-in-rgb')
    setDestructuredRgbVal('--msg-out', '--msg-out-rgb')
}

function setChatBackgroundImage() {
    chrome.storage.local.get("chatBackgroundImage", (data) => {
        if (!data.chatBackgroundImage) return;
        document.documentElement.style.setProperty('--chat-bg-img', `url("${data.chatBackgroundImage}")`)
    });
}

function setMainBackgroundImage() {
    chrome.storage.local.get("mainBackgroundImage", (data) => {
        if (!data.mainBackgroundImage) return;
        document.documentElement.style.setProperty('--main-bg-img', `url("${data.mainBackgroundImage}")`)
    });
}

function setDestructuredRgbVal(inputElement, outputElement){
    const rgbVal = getComputedStyle(document.documentElement).getPropertyValue(inputElement)
    const [r, g, b] = rgbVal.match(/\d+/g).map(Number);
    document.documentElement.style.setProperty(outputElement, `${r},${g},${b}`)
}