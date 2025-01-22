// ==UserScript==
// @name           Open Stremio Links on MPV
// @version        2.0
// @description    Replaces the links when the option "M3U Playlist" is active and opens them on MPV
// @author         Ângelo Azevedo
// @match          *://web.stremio.com/*
// @match          *://zaarrg.github.io/stremio-web-shell-fixes/*
// @downloadURL    https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @updateURL      https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @grant          none
// ==/UserScript==

(function() {
    'use strict';

    // Function to decode base64 URL from data URI and extract the actual stream URL
    function decodeDataUrl(dataUrl) {
        try {
            const base64Data = dataUrl.split(',')[1];
            const decodedData = atob(base64Data);
            const match = decodedData.match(/(https:\/\/.*\.*)/);
            return match ? match[1] : null;
        } catch (e) {
            console.error('Failed to decode data URL:', e);
            return null;
        }
    }

    // Function to process links
    function processLinks() {
        const links = document.querySelectorAll('a[href^="data:application/octet-stream;charset=utf-8;base64,"]');

        links.forEach(link => {
            // Check if the link has already been processed (to avoid double processing)
            if (link.dataset.processed) return;

            // Check if the link is inside a stream container
            const streamContainer = link.closest('.stream-container-JPdah');
            if (!streamContainer) return;

            const decodedUrl = decodeDataUrl(link.href);
            if (decodedUrl) {
                link.href = `mpv:///open?url=${encodeURIComponent(decodedUrl)}&player=mpv`;
                link.dataset.processed = 'true';

                // Add a click event listener to the link to prevent the opening of a new tab
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    
                    const mpvUrl = link.href;

                    // Check if a new window is opened
                    const mpvWindow = window.open(mpvUrl, '_blank');
                    if (mpvWindow) {
                        // If a new window is opened, close it
                        mpvWindow.close();
                    }
                });
            }
        });
    }

    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
        processLinks();
    });

    // Start observing the document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial processing
    processLinks();
})();