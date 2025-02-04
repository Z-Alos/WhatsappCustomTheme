document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.getElementById("apply-btn")

    const sidePane = document.getElementById("custom-side-pane");
    const msgIn = document.getElementById("custom-msg-in");
    const msgOut = document.getElementById("custom-msg-out");
    const bars = document.getElementById("custom-bars");
    const someMoreBars = document.getElementById("custom-some-more-bars");
    const msgInInner = document.getElementById("custom-msg-in-inner");
    const msgOutInner = document.getElementById("custom-msg-out-inner");


    const msgInText = document.getElementById("custom-msg-in-text");
    const msgOutText = document.getElementById("custom-msg-out-text");
    const msgInLink = document.getElementById("custom-msg-in-link");
    const msgOutLink = document.getElementById("custom-msg-out-link");

    const selectors = [sidePane, msgIn, msgOut, bars, someMoreBars,
                       msgInInner, msgOutInner, msgInText, msgOutText,
                       msgInLink, msgOutLink]   
    selectors.forEach(element => {
        element.addEventListener('input',() => displayColorChange(`--${element.name}`, element.value));
    });

    applyBtn.addEventListener('click',()=>{
        console.log("Applying Changes...")
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {apply: true});
        });
    })
});

function displayColorChange(varName, color) {
    console.log("i am working bud...")
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: color, varName: varName });
    });
}
  
