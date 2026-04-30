importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

async function injectErudaIfHtml(response) {
    try {
        const type = response.headers.get("content-type") || "";
        if (!type.includes("text/html")) return response;

        const original = await response.text();

        const erudaCode = `
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>
(function () {
    function toggleEruda() {
        if (!eruda._isInit) {
            eruda.init();
            return;
        }

        if (eruda._devTools._isShow) {
            eruda.hide();
        } else {
            eruda.show();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'i') {
            toggleEruda();
        }
    });
})();
</script>
`;

        const injected = original.includes("</body>")
            ? original.replace(/<\/body>/i, erudaCode + "</body>")
            : original + erudaCode;

        return new Response(injected, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });
    } catch {
        return response;
    }
}

async function handleRequest(event) {
    await scramjet.loadConfig();

    let response;
    if (scramjet.route(event)) {
        response = await scramjet.fetch(event);
    } else {
        response = await fetch(event.request);
    }

    return injectErudaIfHtml(response);
}

self.addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event));
});
