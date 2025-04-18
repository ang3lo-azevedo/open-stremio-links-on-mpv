// ==UserScript==
// @name           Open Stremio Links on MPV
// @version        2.4
// @description    Replaces the links when the option "M3U Playlist" is active and opens them on MPV
// @author         Ângelo Azevedo
// @match          *://web.stremio.com/*
// @match          *://stremio.zarg.me/*
// @downloadURL    https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @updateURL      https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @grant          none
// ==/UserScript==

(function() {
    'use strict';

    // Decodifica o Base64 e extrai a URL real
    function decodeDataUrl(dataUrl) {
        try {
            const base64Data = dataUrl.split(',')[1];
            const decodedData = atob(base64Data);
            const match = decodedData.match(/(https?:\/\/[^\s'"]+)/);
            return match ? match[1] : null;
        } catch (e) {
            console.error('Falha ao decodificar data URL:', e);
            return null;
        }
    }

    function processLinks() {
        // Seleciona apenas links em Base64 de playlists
        const links = document.querySelectorAll('a[href^="data:application/octet-stream;charset=utf-8;base64,"]');

        links.forEach(link => {
            // **Aqui**: verificamos somente nossa própria flag
            if (link.dataset.mpvProcessed) return;

            const decodedUrl = decodeDataUrl(link.href);
            if (!decodedUrl) return;

            // Ajusta o href para mpv
            link.href = `mpv:///open?url=${encodeURIComponent(decodedUrl)}&player=mpv`;
            // Marca como processado **pelo seu script**, não pelo Stremio
            link.dataset.mpvProcessed = 'true';

            // Ao clicar, abre mpv sem deixar janela pendurada
            link.addEventListener('click', event => {
                event.preventDefault();
                const mpvWindow = window.open(link.href, '_blank');
                if (mpvWindow) mpvWindow.close();
            });
        });
    }

    // Observa mudanças no DOM (p.ex. quando novos links de stream aparecem)
    const observer = new MutationObserver(processLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    // Processamento inicial
    processLinks();
})();
