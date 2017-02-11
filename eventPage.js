var services = ["youtube.com", "twitch.tv"];

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
	if (changeInfo.url) {
		var serviceFound = "";
		// Check the page for being a part of selected services
		for (i = 0; i < services.length; i++) {
			if (changeInfo.url.includes(services[i])) {
				serviceFound = services[i];
			}
		}
		if (serviceFound === "") {
			return ;
		}
		var content = changeInfo.url.substring(changeInfo.url.search(serviceFound) + serviceFound.length + 1);
		if (content.length != 0 && content.search('/') == -1)
		{
			// save to local
			chrome.storage.local.set({serviceFound: content});
			// Transmit to server
			chrome.storage.local.get(function(result) {
				var uRL = "http://" + result.targetIP + ":5000/v1/reporter/" + result.machineName;
				console.log(uRL);

				var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
				xmlhttp.open("POST", uRL, "/json-handler");
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState ===XMLHttpRequest.DONE && xmlhttp.status === 200) {
						console.log("Request complete");
					}
					else {
						alert("Connection failure");
					}
				}
				xmlhttp.setRequestHeader("Content-Type", "application/json");
				xmlhttp.send(JSON.stringify({serviceFound: content}));
			});
		}
	}
})