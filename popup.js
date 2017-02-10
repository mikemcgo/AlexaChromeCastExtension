// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
	// Query filter to be passed to chrome.tabs.query - see
	// https://developer.chrome.com/extensions/tabs#method-query
	var queryInfo = {
		url: 'https://www.twitch.tv/*',
	};

	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];

		var url = tab.url;
		console.assert(typeof url == 'string', 'tab.url should be a string');

		callback(url);
	});
}

function renderDoc(statusText) {
	document.getElementById('status').textContent = statusText;
	chrome.storage.local.get('machineName', function(result) {
		document.getElementById('showMachineName').textContent = "Computer Name: " + result.machineName;
	});
}

function saveName() {
	var computerName = document.getElementById('machineName').value;
	chrome.storage.local.set({'machineName': computerName}, function() {
		// Notify that we saved.
		console.log(computerName + "saved")
	});
	document.getElementById('showMachineName').textContent = "Computer Name: " + computerName
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("nameSubmit").addEventListener("click", saveName);
	getCurrentTabUrl(function(url) {
		// Put the image URL in Google search.
		renderDoc('Finding ' + url);
	});
});
