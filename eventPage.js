var services = ["youtube", "twitch"]

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
	if (changeInfo.url) {
		var serviceFound = false
		// Check the page for being a part of selected services
		for (i = 0; i < services.length; i++) {
			if (changeInfo.url.includes(services[i])) {
				serviceFound = true
			}
		}
		if (!serviceFound) {
			return 
		}
		alert(changeInfo.url)
	}
})