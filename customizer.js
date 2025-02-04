document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.getElementById("apply-btn")

    const sidePane = document.getElementById("custom-side-pane");
    const msgIn = document.getElementById("custom-msg-in");
    const msgOut = document.getElementById("custom-msg-out");
    const bars = document.getElementById("custom-bars");
    const someMoreBars = document.getElementById("custom-some-more-bars");

    const selectors = [sidePane, msgIn, msgOut, bars, someMoreBars]
    selectors.forEach(element => {
        console.log(element.name);
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
  
