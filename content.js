console.log("nani..??")

const LOCALSTORAGEPREFIX = "WHATSAPP_CUSTOM_THEME_";
try {
    const retrievedPreset = JSON.parse(localStorage.getItem(`${LOCALSTORAGEPREFIX}PRESET`))
    console.log(retrievedPreset);
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
        const rootStyles = getComputedStyle(document.documentElement);
        const preset = {
            sidePane: rootStyles.getPropertyValue("--side-pane").trim(),
            msgIn: rootStyles.getPropertyValue("--msg-in").trim(),
            msgOut: rootStyles.getPropertyValue("--msg-out").trim(),
            bars: rootStyles.getPropertyValue("--bars").trim(),
            someMoreBars: rootStyles.getPropertyValue("--some-more-bars").trim()
        }

        console.log("Saving Changes...")
        localStorage.setItem(`${LOCALSTORAGEPREFIX}PRESET`, JSON.stringify(preset));
    }
});

function setTheme(retrievedPreset){
    const target = document.documentElement.style;
    target.setProperty('--side-pane', retrievedPreset.sidePane);
    target.setProperty('--msg-in', retrievedPreset.msgIn);
    target.setProperty('--msg-out', retrievedPreset.msgOut);
    target.setProperty('--bars', retrievedPreset.bars);
    target.setProperty('--some-more-bars', retrievedPreset.someMoreBars);
}