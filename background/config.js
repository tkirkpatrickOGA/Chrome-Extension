function handleError() {
	if (chrome.runtime.lastError) {
		// TODO: Properly display error to user
		console.error(chrome.runtime.lastError.message);
	}
}

function initializeConfig(clear) {
	if (clear) {
		chrome.storage.local.clear(handleError);
	}
	
	chrome.storage.local.set({
		"initialized": new Date().getTime(),

		/* REST API URL */
		"api.url.scheme": "https",
		"api.url.domain": "beta-api.zync.co",
		"api.url.version": 0,
		"api.url.format": "{scheme}://{domain}/v{version}/{endpoint}",

		/* REST API Auth */
		"api.auth.header": "X-ZYNC-TOKEN",
		"api.auth.token": null,

		/* Encryption */
		"encryption.password": null,

		/* Firebase */
		"firebase.apiKey": "AIzaSyAp1jrV5OQn9yG-EScMWes827_EvpcQE68",
		"firebase.authDomain": "zyncco-f9dd0.firebaseapp.com",
		"firebase.messagingSenderId": "958433754089",

		/* History */
		"history": []
	}, handleError);
}

chrome.storage.local.getBytesInUse(null, result => {
	if (result === 0) {
		initializeConfig();
	}
});