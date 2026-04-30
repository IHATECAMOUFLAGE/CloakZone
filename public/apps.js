"use strict";

const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});

scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

document.getElementById('cardsContainer').addEventListener("click", async (event) => {
	try {
		const card = event.target.closest(".card");
		if (!card) {
			console.log('no card');
			return;
		}

		event.preventDefault();

		const appUrl = card.getAttribute('data-url');
		if (!appUrl) {
			console.log('No App Url!');
			return;
		}

		console.log(appUrl);

		try {
			await registerSW();
		} catch (err) {
			error.textContent = "Failed to register service worker.";
			errorCode.textContent = err.toString();
			return;
		}

		let wispUrl =
			(location.protocol === "https:" ? "wss" : "ws") +
			"://" +
			location.host +
			"/wisp/";

		if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
			await connection.setTransport("/libcurl/index.mjs", [
				{ websocket: wispUrl },
			]);
		}

		const frame = scramjet.createFrame();
		frame.frame.id = "sj-frame";
		document.body.appendChild(frame.frame);
		frame.go(appUrl);
	} catch(error) {
		console.log(error.message);
	}
});
