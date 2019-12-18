// ==UserScript==
// @name         Block facebook ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block facebook ads
// @author       You
// @match        https://www.facebook.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function removeAds() {
        var stories = document.querySelectorAll("[data-testid='fbfeed_story']");
        var removed = 0;
        for (var i = 0; i < stories.length; i++) {
            var content = stories[i].textContent;
            if (content.includes('Sponsored')) {
                stories[i].remove();
                removed++;
            }
        }
        if (removed > 0) {
            console.log('Ads removed: ' + removed);
        }
    }
    setInterval(removeAds, 100);
})();
