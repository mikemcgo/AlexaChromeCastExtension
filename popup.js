function renderDoc() {
	chrome.storage.local.get('machineName', function(result) {
		document.getElementById('showMachineName').textContent = "Computer Name: " + result.machineName;
	});
	chrome.storage.local.get('targetIP', function(result) {
		document.getElementById('showTargetIP').textContent = "Target IP: " + result.targetIP;
	});
}

function save(key, outputElement, printString) {
	var value = document.getElementById(key).value;
	chrome.storage.local.set({key: value}, function() {
		// Notify that we saved.
		document.getElementById(outputElement).textContent = printString + value
	});
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("nameSubmit").addEventListener("click", function() {save('machineName', 'showMachineName', "Computer Name: ")});
	document.getElementById("IPSubmit").addEventListener("click", function() {save('targetIP', 'showTargetIP', "Target IP: ")});
	renderDoc();
});
