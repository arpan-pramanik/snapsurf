const clearCache = async () => {
	try {
		const clearBtn = document.querySelector("#btnClear");
		const originName = document.querySelector("#originName");

		const tabs = await chrome.tabs.query({
			currentWindow: true,
			active: true,
		});
		const domain = new URL(tabs[0].url);
		const domainName = domain.hostname;
		originName.innerHTML += `${domainName}`;

		const clearCacheMessage = {
			msg: "clearCache",
			data: {
				appcache: true,
				cache: true,
				cacheStorage: true,
				cookies: true
			},
			origins: [domain.origin],
		};

		const reloadTab = () => {
			chrome.tabs.reload(tabs[0].id);
		};

		const clearCacheAndReload = () => {
			chrome.runtime.sendMessage(clearCacheMessage, reloadTab);
		};

		clearBtn?.addEventListener("click", clearCacheAndReload);
	} catch (err) {
		console.error("Error occurred", err);
	}
};

clearCache();
