var auth = null;
var streamNationContext = null;

var newContext = {
	"title": chrome.i18n.getMessage('ext_name'),
	"contexts": ["image"],
	"onclick": function (info) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { 'context': 'clicked' });
		});
	}
}

if (streamNationContext) {
	chrome.contextMenus.update(streamNationContext, newContext);
}
else {
	streamNationContext = chrome.contextMenus.create(newContext);
}

chrome.storage.sync.get('StreamNationAuth', function (result) {
	if (result === null || isEmpty(result) || result.StreamNationAuth === null) {
		auth = null;
	}
	else {
		auth = result.StreamNationAuth;
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs[0].id === tabId) {
			if (changeInfo && changeInfo.status === 'complete') {
				chrome.tabs.sendMessage(tabs[0].id, { data: tab });
			}
		}
		else {
			return false;
		}
	});
});
