// ==UserScript==
// @name           Open Stremio Links on MPV
// @version        2.4
// @description    Replaces the links when the option "M3U Playlist" is active and opens them on MPV
// @author         Ângelo Azevedo
// @match          *://web.stremio.com/*
// @match          *://stremio.zarg.me/*
// @downloadURL    https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/OpenOnMPV.plugin.js
// @updateURL      https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/OpenOnMPV.plugin.js
// @grant          none
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('[OpenOnMPV] userscript injetado');

    function decodeDataUrl(dataUrl) {
        try {
            const base64Data = dataUrl.split(',')[1];
            const decodedData = atob(base64Data);
            const match = decodedData.match(/(https?:\/\/[^\s'"]+)/);
            return match ? match[1] : null;
        } catch (e) {
            console.error('[OpenOnMPV] Falha ao decodificar data URL:', e);
            return null;
        }
    }

    function processLinks() {
        const links = document.querySelectorAll('a[href^="data:application/octet-stream;charset=utf-8;base64,"]');
        links.forEach(link => {
            if (link.dataset.mpvProcessed) return;

            const decodedUrl = decodeDataUrl(link.href);
            if (!decodedUrl) return;

            link.href = `mpv:///open?url=${encodeURIComponent(decodedUrl)}&player=mpv`;
            link.dataset.mpvProcessed = 'true';

            link.addEventListener('click', event => {
                event.preventDefault();
                const w = window.open(link.href, '_blank');
                if (w) w.close();
            });
        });
    }

    const observer = new MutationObserver(processLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    processLinks();
})();
