console.log("Whatsapp Custom Theme In Effect!!! Let's Go Baby...")

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "close_popup" && sender.tab === undefined) {
        chrome.action.setPopup({ popup: "" }); // Remove popup
    }
});
