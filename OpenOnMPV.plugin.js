'use strict';
/**
 * @name        Open Stremio Links on MPV
 * @description Replaces the links when the option "M3U Playlist" is active and opens them on MPV
 * @updateUrl   https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/OpenOnMPV.plugin.js
 * @version     2.4
 * @author      Ângelo Azevedo
 */

// Function to decode base64 URL from data URI and extract the actual stream URL
function decodeDataUrl(dataUrl) {
    try {
        const base64Data = dataUrl.split(',')[1];
        const decodedData = atob(base64Data);
        const match = decodedData.match(/(https?:\/\/[^\s'"]+)/);
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
        // Verifica apenas nossa própria flag, para não colidir com o Stremio
        if (link.dataset.mpvProcessed) return;

        const decodedUrl = decodeDataUrl(link.href);
        if (!decodedUrl) return;

        // Ajusta o href para mpv
        link.href = `mpv:///open?url=${encodeURIComponent(decodedUrl)}&player=mpv`;
        // Marca como processado pelo plugin
        link.dataset.mpvProcessed = 'true';

        // Ao clicar, abre o MPV sem deixar janela extra
        link.addEventListener('click', event => {
            event.preventDefault();
            const mpvWindow = window.open(link.href, '_blank');
            if (mpvWindow) mpvWindow.close();
        });
    });
}

// Observador de mudanças no DOM (novos links de stream)
const observer = new MutationObserver(processLinks);
observer.observe(document.body, { childList: true, subtree: true });

// Processamento inicial
processLinks();
