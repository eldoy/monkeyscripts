// ==UserScript==
// @name         Block facebook ads
// @namespace    fugroup
// @version      0.1
// @description  Block facebook ads
// @author       You
// @match        *://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    var lock = false

    function removeAds() {
        if (lock) return;
        lock = true;
        var stories = document.getElementsByClassName('userContentWrapper');
        // DEBUG: console.log('Found ' + stories.length + ' stories');
        var removed = 0;
        for (var i = 0; i < stories.length; i++) {
            var content = stories[i].textContent;
            if (content.includes('Sponsored')) {
                stories[i].remove();
                removed++;
            }
        }
        if (removed > 0) {
            console.log('Removed ' + removed + ' ad(s)');
        }
        var egopane = document.getElementById('pagelet_ego_pane');
        if (egopane) {
            egopane.innerHTML = '&nbsp';
        }
        setTimeout(function() { lock = false }, 1000);
    }

    var observer = new MutationObserver(function(){
        setTimeout(removeAds);
    });
    observer.observe(document, { childList: true, subtree: true });
    setTimeout(removeAds, 100);
}());
