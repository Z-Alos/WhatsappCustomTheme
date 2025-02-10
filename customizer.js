document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.getElementById("apply-btn")

    const sidePane = document.getElementById("custom-side-pane");
    const msgIn = document.getElementById("custom-msg-in");
    const msgOut = document.getElementById("custom-msg-out");
    const bars = document.getElementById("custom-bars");
    const someMoreBars = document.getElementById("custom-some-more-bars");
    const msgInInner = document.getElementById("custom-msg-in-inner");
    const msgOutInner = document.getElementById("custom-msg-out-inner");
    
    const sidePanePrimaryText = document.getElementById("custom-side-pane-primary-text");
    const sidePaneSecondaryText = document.getElementById("custom-side-pane-secondary-text");

    const msgInText = document.getElementById("custom-msg-in-text");
    const msgOutText = document.getElementById("custom-msg-out-text");
    const msgInLink = document.getElementById("custom-msg-in-link");
    const msgOutLink = document.getElementById("custom-msg-out-link");
    
    const mainBackgroundInput = document.getElementById("main-background-input");
    const chatBackgroundInput = document.getElementById("chat-background-input");

    const mainBackgroundOpacity = document.getElementById("main-background-opacity");
    const mainBackgroundOverlayColor = document.getElementById("main-background-overlay-color");
    const mainBackgroundOverlayOpacity = document.getElementById("main-background-overlay-opacity");
    const chatBackgroundOpacity = document.getElementById("chat-background-opacity");
    const chatBackgroundOverlayColor = document.getElementById("chat-background-overlay-color");
    const chatBackgroundOverlayOpacity = document.getElementById("chat-background-overlay-opacity");
    const chatBackground = document.getElementById("custom-chat-background");

    const appBorderRadius = document.getElementById("app-border-radius");

    const selectors = [sidePane, msgIn, msgOut, bars, someMoreBars,
                       msgInInner, msgOutInner, sidePanePrimaryText,
                       sidePaneSecondaryText, msgInText, msgOutText,
                       msgInLink, msgOutLink, mainBackgroundOverlayColor,
                       chatBackgroundOverlayColor, chatBackground] 
    const valueSelector = [mainBackgroundOpacity, mainBackgroundOverlayOpacity, chatBackgroundOpacity, chatBackgroundOverlayOpacity]

    selectors.forEach(element => {
        element.addEventListener('input',() => displayColorChange(`--${element.name}`, element.value));
    });

    valueSelector.forEach(element => {
        element.addEventListener('input',() => displayOpacityChange(`--${element.name}`, element.value));
    });
    
    appBorderRadius.addEventListener('input', () => displayRadiusChange(`--${appBorderRadius.name}`, appBorderRadius.value));

    mainBackgroundInput.addEventListener('change', (e)=>{
        const file = e.target.files[0];
        if(file){
          const reader = new FileReader();
          reader.onload = (e)=>{
            chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
              chrome.tabs.sendMessage(tabs[0].id, {setMainBackgroundImage: e.target.result})
            })
          }
          reader.readAsDataURL(file)
        }
      })

    chatBackgroundInput.addEventListener('change', (e)=>{
        const file = e.target.files[0];
        if(file){
          const reader = new FileReader();
          reader.onload = (e)=>{
            chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
              chrome.tabs.sendMessage(tabs[0].id, {setChatBackgroundImage: e.target.result})
            })
          }
          reader.readAsDataURL(file)
        }
      })


    applyBtn.addEventListener('click',()=>{
        console.log("Applying Changes...")
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {apply: true});
        });
    })
});

function displayColorChange(varName, color) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: color, varName: varName });
    });
}

function displayOpacityChange(varName, opacity) {
  opacity = opacity/100;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { opacity: opacity, opacityVarName: varName });
  });
}

function displayRadiusChange(varName, radius) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { borderRadius: radius, borderVarName: varName });
    });
}
  
