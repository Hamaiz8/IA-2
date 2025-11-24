window.addEventListener("message", function(event) {
    if (event.data[0] !== 'alero' || event.source !== window.parent) return;
    document.body.insertAdjacentHTML('afterbegin', event.data[1].join(''));
});