// ==UserScript==
// @name           Open Stremio Links on MPV
// @version        1.1
// @description    Replaces the links when the option "M3U Playlist" is active and opens them on MPV
// @author         Ângelo Azevedo
// @match          https://web.stremio.com/*/detail/*
// @downloadURL    https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @updateURL      https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
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
            if (link.dataset.processed) return;

            const streamContainer = link.closest('.stream-container-JPdah');
            if (!streamContainer) return;

            const decodedUrl = decodeDataUrl(link.href);
            if (decodedUrl) {
                // Modificar o link original
                link.href = `mpv:///open?url=${encodeURIComponent(decodedUrl)}&player=mpv`;
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