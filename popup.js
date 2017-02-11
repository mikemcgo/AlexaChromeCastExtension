function renderDoc() {
	chrome.storage.local.get('machineName', function(result) {
		document.getElementById('showMachineName').textContent = "Computer Name: " + result.machineName;
	});
	chrome.storage.local.get('targetIP', function(result) {
		document.getElementById('showTargetIP').textContent = "Target IP: " + result.targetIP;
	});
}

function save(keyName, outputElement, printString) {
	console.log(keyName)
	var tmpObj = {};
	tmpObj[keyName] = document.getElementById(keyName).value;
	chrome.storage.local.set(tmpObj, function() {
		// Notify that we saved.
		document.getElementById(outputElement).textContent = printString + tmpObj[keyName]
		chrome.storage.local.get(function(result) {
			console.log(result)
		})
	});

}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("nameSubmit").addEventListener("click", function() {save('machineName', 'showMachineName', "Computer Name: ")});
	document.getElementById("IPSubmit").addEventListener("click", function() {save('targetIP', 'showTargetIP', "Target IP: ")});
	renderDoc();
});
