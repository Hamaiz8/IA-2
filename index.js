const params = new URLSearchParams(window.location.search);
const parentHost = params.get('parenthost');
const trustArcRootElement = document.getElementById("consent_blackbar");
let trustArcRootElementHeight = 0;
const strictConsentFallback = {
    consentDecision: [1],
    source: "asserted"
}

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.target === trustArcRootElement && trustArcRootElementHeight !== entry.contentRect.height) {
            parent.postMessage(['trustarc', 'barheight', entry.contentRect.height + 'px'], parentHost);
            trustArcRootElementHeight = entry.contentRect.height;
        }
    }
});

const mutationObserver = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        for (let j = 0; j < mutation.addedNodes.length; j++) {
            const addedNode = mutation.addedNodes[j];
            if (addedNode.classList && addedNode.classList.contains("truste_overlay")) {
                parent.postMessage(['trustarc', 'popup-open'], parentHost);
            }
        }
        for (let j = 0; j < mutation.removedNodes.length; j++) {
            const removedNode = mutation.removedNodes[j];
            if (removedNode.classList && removedNode.classList.contains("truste_overlay")) {
                parent.postMessage(['trustarc', 'barheight-closed', trustArcRootElement.offsetHeight + 'px'], parentHost);
            }
        }
    }
});

function listenForConsentChangeMessageFromTrustArc() {
    const apiObject = {
        truste: {
            action: "getConsent",
            timestamp: new Date().getTime()
        }
    };
    const json = JSON.stringify(apiObject);
    window.top.postMessage(json, parentHost);
}

function consentInformationPostMessage() {
    const consentJson = truste.cma.callApi("getGDPRConsentDecision", "lastpass.com");
    parent.postMessage(['trustarc', 'consent-level', consentJson], parentHost);
}

window.addEventListener("load", () => {
    resizeObserver.observe(trustArcRootElement)
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    consentInformationPostMessage()
    listenForConsentChangeMessageFromTrustArc()
});

window.addEventListener('error', (event) => {
    parent.postMessage(['trustarc', 'consent-level', strictConsentFallback, 'trustArcBannerFunctionalityBlocked'], parentHost);
    parent.postMessage(['trustarc', 'barheight', '0px'], parentHost);
    const error = event.error;
    console.error('TrustArc Iframe Error. Falling back to strict consent:', error);
});

window.addEventListener('message', (event) => {
    const messageData = event.data;
    if (typeof messageData !== 'string') return;
    if (messageData === 'open-cookie-preferences') {
        truste.eu.clickListener()
    } else if (messageData.indexOf('submit_preferences') > 0) {
        setTimeout(() => {
            // pref change api call not immediate;
            consentInformationPostMessage();
        }, 1000)
    }
});