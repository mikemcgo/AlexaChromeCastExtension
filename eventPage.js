var services = ["youtube.com", "twitch.tv"]

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
	if (changeInfo.url) {
		var serviceFound = ""
		// Check the page for being a part of selected services
		for (i = 0; i < services.length; i++) {
			if (changeInfo.url.includes(services[i])) {
				serviceFound = services[i]
			}
		}
		if (serviceFound === "") {
			return 
		}
		var content = changeInfo.url.substring(changeInfo.url.search(serviceFound) + serviceFound.length + 1);
		if (content.length != 0 && content.search('/') == -1)
		{
			// save to local
			chrome.storage.local.set({serviceFound: content})
			// Transmit to server
			chrome.storage.local.get(function(result) {
				var uRL = "http://" + result.targetIP + ":5000/reporter/" + result.machineName
				console.log(uRL)
				$.ajax({
					type: 'POST',
					url: uRL,
					data: JSON.stringify({
						serviceFound: content,
					}),
					dataType: 'json',
					success: function() {
						console.log("Put Complete");
					},
					error: function() {
						// may want to create notification to encourage user to turn off sync
						console.log("Put to server failed");
					}
				});
			});
		}
	}
})