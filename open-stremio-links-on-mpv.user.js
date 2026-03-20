// ==UserScript==
// @name                Open Stremio Links on MPV
// @name:en-US          Open Stremio Links on MPV
// @name:pt-BR          Abrir Links do Stremio no MPV
// @name:pt-PT          Abrir Ligações do Stremio no MPV
// @description         Replaces the links when the option "M3U Playlist" is active and opens them on MPV via mpv-handler
// @description:en-US   Replaces the links when the option "M3U Playlist" is active and opens them on MPV via mpv-handler
// @description:pt-BR   Substitui os links quando a opção "M3U Playlist" está ativa e os abre no MPV via mpv-handler
// @description:pt-PT   Substitui as ligações quando a opção "M3U Playlist" está activa e abre-as no MPV via mpv-handler
// @namespace           open-stremio-links-on-mpv
// @version             4.8
// @author              Ângelo Azevedo
// @license             MIT License
// @icon                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmVyc2lvbj0iMSI+CiA8Y2lyY2xlIHN0eWxlPSJvcGFjaXR5Oi4yIiBjeD0iMzIiIGN5PSIzMyIgcj0iMjgiLz4KIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzhkMzQ4ZSIgY3g9IjMyIiBjeT0iMzIiIHI9IjI4Ii8+CiA8Y2lyY2xlIHN0eWxlPSJvcGFjaXR5Oi4zIiBjeD0iMzQuNSIgY3k9IjI5LjUiIHI9IjIwLjUiLz4KIDxjaXJjbGUgc3R5bGU9Im9wYWNpdHk6LjIiIGN4PSIzMiIgY3k9IjMzIiByPSIxNCIvPgogPGNpcmNsZSBzdHlsZT0iZmlsbDojZmZmZmZmIiBjeD0iMzIiIGN5PSIzMiIgcj0iMTQiLz4KIDxwYXRoIHN0eWxlPSJmaWxsOiM2OTFmNjkiIHRyYW5zZm9ybT0ibWF0cml4KDEuNTE1NTQ0NSwwLDAsMS41LC0zLjY1Mzg3OSwtNC45ODczODQ4KSIgZD0ibTI3LjE1NDUxNyAyNC42NTgyNTctMy40NjQxMDEgMi0zLjQ2NDEwMiAxLjk5OTk5OXYtNC0zLjk5OTk5OWwzLjQ2NDEwMiAyeiIvPgogPHBhdGggc3R5bGU9ImZpbGw6I2ZmZmZmZjtvcGFjaXR5Oi4xIiBkPSJNIDMyIDQgQSAyOCAyOCAwIDAgMCA0IDMyIEEgMjggMjggMCAwIDAgNC4wMjE0ODQ0IDMyLjU4NTkzOCBBIDI4IDI4IDAgMCAxIDMyIDUgQSAyOCAyOCAwIDAgMSA1OS45Nzg1MTYgMzIuNDE0MDYyIEEgMjggMjggMCAwIDAgNjAgMzIgQSAyOCAyOCAwIDAgMCAzMiA0IHoiLz4KPC9zdmc+Cg==
// @require             https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@06f2015c04db3aaab9717298394ca4f025802873/gm_config.js
// @grant               GM_info
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_notification
// @grant               GM_registerMenuCommand
// @run-at              document-idle
// @noframes
// @match               *://web.stremio.com/*
// @match               *://stremio.zarg.me/*
// @downloadURL         https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// @updateURL           https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js
// ==/UserScript==

"use strict";

const MPV_HANDLER_VERSION = "v0.3.15";

const css = String.raw;

const ICON_MPV =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0\
PSI2NCIgdmVyc2lvbj0iMSI+CiA8Y2lyY2xlIHN0eWxlPSJvcGFjaXR5Oi4yIiBjeD0iMzIiIGN5\
PSIzMyIgcj0iMjgiLz4KIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzhkMzQ4ZSIgY3g9IjMyIiBjeT0i\
MzIiIHI9IjI4Ii8+CiA8Y2lyY2xlIHN0eWxlPSJvcGFjaXR5Oi4zIiBjeD0iMzQuNSIgY3k9IjI5\
LjUiIHI9IjIwLjUiLz4KIDxjaXJjbGUgc3R5bGU9Im9wYWNpdHk6LjIiIGN4PSIzMiIgY3k9IjMz\
IiByPSIxNCIvPgogPGNpcmNsZSBzdHlsZT0iZmlsbDojZmZmZmZmIiBjeD0iMzIiIGN5PSIzMiIg\
cj0iMTQiLz4KIDxwYXRoIHN0eWxlPSJmaWxsOiM2OTFmNjkiIHRyYW5zZm9ybT0ibWF0cml4KDEu\
NTE1NTQ0NSwwLDAsMS41LC0zLjY1Mzg3OSwtNC45ODczODQ4KSIgZD0ibTI3LjE1NDUxNyAyNC42\
NTgyNTctMy40NjQxMDEgMi0zLjQ2NDEwMiAxLjk5OTk5OXYtNC0zLjk5OTk5OWwzLjQ2NDEwMiAy\
eiIvPgogPHBhdGggc3R5bGU9ImZpbGw6I2ZmZmZmZjtvcGFjaXR5Oi4xIiBkPSJNIDMyIDQgQSAy\
OCAyOCAwIDAgMCA0IDMyIEEgMjggMjggMCAwIDAgNC4wMjE0ODQ0IDMyLjU4NTkzOCBBIDI4IDI4\
IDAgMCAxIDMyIDUgQSAyOCAyOCAwIDAgMSA1OS45Nzg1MTYgMzIuNDE0MDYyIEEgMjggMjggMCAw\
IDAgNjAgMzIgQSAyOCAyOCAwIDAgMCAzMiA0IHoiLz4KPC9zdmc+Cg==";

const ICON_SETTINGS =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0\
PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KIDxkZWZzPgogIDxzdHlsZSBpZD0iY3VycmVudC1j\
b2xvci1zY2hlbWUiIHR5cGU9InRleHQvY3NzIj4KICAgLkNvbG9yU2NoZW1lLVRleHQgeyBjb2xv\
cjojNDQ0NDQ0OyB9IC5Db2xvclNjaGVtZS1IaWdobGlnaHQgeyBjb2xvcjojNDI4NWY0OyB9CiAg\
PC9zdHlsZT4KIDwvZGVmcz4KIDxwYXRoIHN0eWxlPSJmaWxsOmN1cnJlbnRDb2xvciIgY2xhc3M9\
IkNvbG9yU2NoZW1lLVRleHQiIGQ9Ik0gNi4yNSAxIEwgNi4wOTU3MDMxIDIuODQzNzUgQSA1LjUg\
NS41IDAgMCAwIDQuNDg4MjgxMiAzLjc3MzQzNzUgTCAyLjgxMjUgMi45ODQzNzUgTCAxLjA2MjUg\
Ni4wMTU2MjUgTCAyLjU4Mzk4NDQgNy4wNzIyNjU2IEEgNS41IDUuNSAwIDAgMCAyLjUgOCBBIDUu\
NSA1LjUgMCAwIDAgMi41ODAwNzgxIDguOTMxNjQwNiBMIDEuMDYyNSA5Ljk4NDM3NSBMIDIuODEy\
NSAxMy4wMTU2MjUgTCA0LjQ4NDM3NSAxMi4yMjg1MTYgQSA1LjUgNS41IDAgMCAwIDYuMDk1NzAz\
MSAxMy4xNTIzNDQgTCA2LjI0NjA5MzggMTUuMDAxOTUzIEwgOS43NDYwOTM4IDE1LjAwMTk1MyBM\
IDkuOTAwMzkwNiAxMy4xNTgyMDMgQSA1LjUgNS41IDAgMCAwIDExLjUwNzgxMiAxMi4yMjg1MTYg\
TCAxMy4xODM1OTQgMTMuMDE3NTc4IEwgMTQuOTMzNTk0IDkuOTg2MzI4MSBMIDEzLjQxMjEwOSA4\
LjkyOTY4NzUgQSA1LjUgNS41IDAgMCAwIDEzLjQ5NjA5NCA4LjAwMTk1MzEgQSA1LjUgNS41IDAg\
MCAwIDEzLjQxNjAxNiA3LjA3MDMxMjUgTCAxNC45MzM1OTQgNi4wMTc1NzgxIEwgMTMuMTgzNTk0\
IDIuOTg2MzI4MSBMIDExLjUxMTcxOSAzLjc3MzQzNzUgQSA1LjUgNS41IDAgMCAwIDkuOTAwMzkw\
NiAyLjg0OTYwOTQgTCA5Ljc1IDEgTCA2LjI1IDEgeiBNIDggNiBBIDIgMiAwIDAgMSAxMCA4IEEg\
MiAyIDAgMCAxIDggMTAgQSAyIDIgMCAwIDEgNiA4IEEgMiAyIDAgMCAxIDggNiB6IiB0cmFuc2Zv\
cm09InRyYW5zbGF0ZSg0IDQpIi8+Cjwvc3ZnPgo=";

const CONFIG_ID = "stremio-mpv-config";

const CONFIG_CSS = css`
  body {
    display: flex;
    justify-content: center;
  }
  #${CONFIG_ID}_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #${CONFIG_ID} .config_header {
    display: flex;
    align-items: center;
    padding: 12px;
  }
  #${CONFIG_ID} .config_var {
    margin: 0 0 12px 0;
  }
  #${CONFIG_ID} .field_label {
    display: inline-block;
    width: 140px;
    font-size: 14px;
  }
  #${CONFIG_ID}_field_profile,
    #${CONFIG_ID}_field_quality,
    #${CONFIG_ID}_field_console {
    width: 80px;
    height: 24px;
    font-size: 14px;
    text-align: center;
  }
  #${CONFIG_ID}_buttons_holder {
    display: flex;
    flex-direction: column;
  }
  #${CONFIG_ID} .saveclose_buttons {
    margin: 1px;
    padding: 4px 0;
  }
  #${CONFIG_ID} .reset_holder {
    padding-top: 4px;
  }
`;

const CONFIG_IFRAME_CSS = css`
  position: fixed;
  z-index: 99999;
  width: 300px;
  height: 320px;
  border: 1px solid;
  border-radius: 10px;
`;

const CONFIG_FIELDS = {
  profile: {
    label: "MPV Profile",
    type: "text",
    default: "default",
  },
  quality: {
    label: "Prefer Video Quality",
    type: "select",
    options: ["default", "2160p", "1440p", "1080p", "720p", "480p", "360p"],
    default: "default",
  },
  console: {
    label: "Run With Console",
    type: "select",
    options: ["yes", "no"],
    default: "yes",
  },
};

// GM_config init
GM_config.init({
  id: CONFIG_ID,
  title: GM_info.script.name,
  fields: CONFIG_FIELDS,
  events: {
    init: () => {
      let quality = GM_config.get("quality").toLowerCase();

      if (!CONFIG_FIELDS.quality.options.includes(quality)) {
        GM_config.set("quality", "default");
      }
    },
    save: () => {
      let profile = GM_config.get("profile").trim();

      if (profile === "") {
        GM_config.set("profile", "default");
      } else {
        GM_config.set("profile", profile);
      }

      GM_config.close();
    },
    reset: () => {
      GM_config.save();
    },
  },
  css: CONFIG_CSS.trim(),
});

// Inject MPV settings into Stremio's native settings panel
function injectStremioSettings() {
  // Look for the settings panel container
  const settingsPanels = document.querySelectorAll('[class*="settings-container"]');
  
  if (settingsPanels.length === 0) {
    return;
  }

  const settingsContainer = settingsPanels[0];
  
  // Check if we've already injected our settings
  if (settingsContainer.querySelector('[data-mpv-settings]')) {
    return;
  }

  // Find all settings sections to understand the structure
  const sections = settingsContainer.querySelectorAll('[class*="section-"]');
  
  if (sections.length === 0) {
    return;
  }

  // Create MPV settings section matching Stremio's style
  const mpvSection = document.createElement('div');
  mpvSection.setAttribute('data-mpv-settings', 'true');
  mpvSection.setAttribute('class', sections[0].getAttribute('class'));
  mpvSection.style.marginTop = '24px';
  
  // Create section title
  const sectionTitle = document.createElement('div');
  sectionTitle.setAttribute('class', sections[0].querySelector('[class*="section-"]')?.getAttribute('class') || 'section-title');
  sectionTitle.textContent = 'MPV Player';
  sectionTitle.style.fontSize = '14px';
  sectionTitle.style.fontWeight = '500';
  sectionTitle.style.marginBottom = '16px';
  sectionTitle.style.color = 'rgba(255, 255, 255, 0.7)';
  
  mpvSection.appendChild(sectionTitle);

  // Create options container
  const optionsContainer = document.createElement('div');
  
  // Profile setting
  const profileOption = createSettingOption('profile', 'MPV Profile', 'text', null);
  optionsContainer.appendChild(profileOption);
  
  // Quality setting
  const qualityOption = createSettingOption('quality', 'Prefer Video Quality', 'select', CONFIG_FIELDS.quality.options);
  optionsContainer.appendChild(qualityOption);
  
  // Console setting
  const consoleOption = createSettingOption('console', 'Run With Console', 'select', CONFIG_FIELDS.console.options);
  optionsContainer.appendChild(consoleOption);
  
  mpvSection.appendChild(optionsContainer);
  
  // Add to settings container
  settingsContainer.appendChild(mpvSection);
}

// Create a single settings option element
function createSettingOption(fieldName, label, type, options) {
  const optionContainer = document.createElement('div');
  optionContainer.setAttribute('class', 'mpv-setting-option');
  optionContainer.style.marginBottom = '16px';
  optionContainer.style.display = 'flex';
  optionContainer.style.alignItems = 'center';
  optionContainer.style.justifyContent = 'space-between';
  
  // Create label
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.fontSize = '14px';
  labelEl.style.color = 'rgba(255, 255, 255, 0.9)';
  labelEl.style.flex = '1';
  
  // Create input
  let inputEl;
  const currentValue = GM_config.get(fieldName);
  
  if (type === 'select') {
    inputEl = document.createElement('select');
    inputEl.style.padding = '6px 8px';
    inputEl.style.borderRadius = '4px';
    inputEl.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    inputEl.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    inputEl.style.color = 'rgba(255, 255, 255, 0.9)';
    inputEl.style.fontSize = '14px';
    inputEl.style.cursor = 'pointer';
    
    options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt;
      optionEl.textContent = opt;
      optionEl.selected = opt === currentValue;
      inputEl.appendChild(optionEl);
    });
    
    inputEl.addEventListener('change', (e) => {
      GM_config.set(fieldName, e.target.value);
    });
  } else if (type === 'text') {
    inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = currentValue;
    inputEl.style.padding = '6px 8px';
    inputEl.style.borderRadius = '4px';
    inputEl.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    inputEl.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    inputEl.style.color = 'rgba(255, 255, 255, 0.9)';
    inputEl.style.fontSize = '14px';
    inputEl.style.width = '200px';
    
    inputEl.addEventListener('change', (e) => {
      let value = e.target.value.trim();
      if (value === '') {
        value = 'default';
        inputEl.value = value;
      }
      GM_config.set(fieldName, value);
    });
  }
  
  optionContainer.appendChild(labelEl);
  optionContainer.appendChild(inputEl);
  
  return optionContainer;
}

// Watch for settings panel and inject our settings
function setupSettingsIntegration() {
  // Try to inject immediately
  injectStremioSettings();
  
  // Watch for hash changes to detect settings panel navigation
  window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('settings')) {
      // Wait a bit for the panel to render
      setTimeout(injectStremioSettings, 100);
    }
  });
  
  // Also watch for DOM mutations to catch dynamic panel creation
  const settingsObserver = new MutationObserver(() => {
    injectStremioSettings();
  });
  
  // Start observing when we detect the settings panel root
  const checkForSettingsPanel = setInterval(() => {
    const panel = document.querySelector('[class*="settings-container"]');
    if (panel) {
      settingsObserver.observe(panel.parentNode || document.body, {
        childList: true,
        subtree: true,
      });
      clearInterval(checkForSettingsPanel);
    }
  }, 500);
  
  // Clear the interval after 30 seconds to avoid infinite checking
  setTimeout(() => clearInterval(checkForSettingsPanel), 30000);
}

// URL-safe base64 encode
function btoaUrl(url) {
  return btoa(url).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
}

// Generate protocol URL for mpv-handler
function generateProto(url) {
  let profile = GM_config.get("profile").trim();
  let quality = GM_config.get("quality").toLowerCase();
  let console = GM_config.get("console").toLowerCase();
  let options = [];

  let proto;

  if (console === "yes") {
    proto = "mpv-handler-debug://play/" + btoaUrl(url);
  } else {
    proto = "mpv-handler://play/" + btoaUrl(url);
  }

  if (profile !== "default" && profile !== "") {
    options.push("profile=" + profile);
  }
  if (quality !== "default") {
    options.push("quality=" + quality);
  }

  if (options.length !== 0) {
    proto += "/?";

    options.forEach((option, index) => {
      proto += option;

      if (index + 1 !== options.length) {
        proto += "&";
      }
    });
  }

  return proto;
}

// Function to decode base64 URL from data URI and extract the actual stream URL
function decodeDataUrl(dataUrl) {
  try {
    const base64Data = dataUrl.split(',')[1];
    const decodedData = atob(base64Data);
    
    // Look for HTTP/HTTPS URLs in the decoded data
    const urlMatch = decodedData.match(/(https?:\/\/[^\s\n\r\t]+)/);
    if (urlMatch) {
      const extractedUrl = urlMatch[1];
      return extractedUrl;
    }
    
    // Alternative: look for lines that contain URLs
    const lines = decodedData.split('\n');
    for (const line of lines) {
      if (line.startsWith('http://') || line.startsWith('https://')) {
        return line.trim();
      }
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

function padBase64(value) {
  const padding = value.length % 4;
  if (padding === 0) {
    return value;
  }

  return value + "=".repeat(4 - padding);
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function extractJsonObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return safeJsonParse(text.slice(start, end + 1));
}

function buildMagnetFromInfoHash(streamData) {
  if (!streamData || !streamData.infoHash) {
    return null;
  }

  const magnet = new URLSearchParams();
  magnet.append("xt", "urn:btih:" + streamData.infoHash);

  if (streamData.name) {
    magnet.append("dn", streamData.name);
  }

  if (Array.isArray(streamData.announce)) {
    streamData.announce.forEach((tracker) => {
      if (typeof tracker === "string" && tracker.trim() !== "") {
        magnet.append("tr", tracker.trim());
      }
    });
  }

  return "magnet:?" + magnet.toString();
}

function decodePlayerPayload(payload) {
  const candidates = [payload, payload.replace(/-/g, "+").replace(/_/g, "/")];

  for (const candidate of candidates) {
    try {
      const decoded = atob(padBase64(candidate));
      const parsed = extractJsonObject(decoded);

      if (parsed) {
        return parsed;
      }
    } catch (e) {
      // Ignore invalid base64 payloads and continue with the next candidate.
    }
  }

  return extractJsonObject(payload);
}

function decodePlayerRouteUrl(linkUrl) {
  const marker = "#/player/";
  const markerIndex = linkUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const route = linkUrl.slice(markerIndex + marker.length);

  // Try to extract direct playable media URLs encoded in the route.
  try {
    const decodedRoute = decodeURIComponent(route);
    const directMediaMatch = decodedRoute.match(/(https?:\/\/[^\s"']+\.(?:m3u8|mpd|mp4|mkv|webm)(?:\?[^\s"']*)?)/i);

    if (directMediaMatch) {
      return directMediaMatch[1];
    }
  } catch (e) {
    // Ignore decode errors and continue with payload decoding.
  }

  const payloadEndIndex = route.search(/\/(?:https?|http)%3A%2F%2F/i);
  const encodedPayload = payloadEndIndex === -1 ? route.split("/")[0] : route.slice(0, payloadEndIndex);

  if (!encodedPayload) {
    return null;
  }

  let payload;

  try {
    payload = decodeURIComponent(encodedPayload);
  } catch (e) {
    payload = encodedPayload;
  }

  const streamData = decodePlayerPayload(payload);

  if (!streamData) {
    return null;
  }

  if (typeof streamData.url === "string" && streamData.url.trim() !== "") {
    return streamData.url.trim();
  }

  return buildMagnetFromInfoHash(streamData);
}

function extractStreamUrl(linkUrl) {
  if (linkUrl.startsWith("data:application/octet-stream;charset=utf-8;base64,")) {
    return decodeDataUrl(linkUrl);
  }

  if (linkUrl.includes("#/player/")) {
    return decodePlayerRouteUrl(linkUrl);
  }

  return null;
}

function notifyOpeningInMpv(link) {
  const linkText = (link.textContent || "").trim();
  const streamLabel = linkText !== "" ? linkText : "Selected stream";
  const compactLabel = streamLabel.replace(/\s+/g, " ").slice(0, 72);
  const container = document.querySelector(".toasts-container-oKECy") || document.querySelector("#app");

  if (!container) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = "tooltip-container-Qpse8 tooltip-item-gfYXu";
  toast.textContent = `Opening in MPV: ${compactLabel}`;

  // Keep the visual feel aligned with Stremio while guaranteeing visibility.
  toast.style.position = "fixed";
  toast.style.right = "16px";
  toast.style.bottom = "16px";
  toast.style.zIndex = "999999";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "10px";
  toast.style.background = "rgba(32, 34, 38, 0.95)";
  toast.style.color = "#f2f3f5";
  toast.style.fontSize = "13px";
  toast.style.lineHeight = "1.3";
  toast.style.border = "1px solid rgba(255, 255, 255, 0.12)";
  toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.35)";
  toast.style.maxWidth = "360px";
  toast.style.pointerEvents = "none";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(8px)";
  toast.style.transition = "opacity 140ms ease, transform 140ms ease";

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.remove();
  }, 2200);
}

function bindMpvClick(link) {
  if (link.dataset.clickBound === "true") {
    return;
  }

  link.dataset.clickBound = "true";
  link.target = "_self";

  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    notifyOpeningInMpv(link);
    setTimeout(() => {
      window.location.href = link.href;
    }, 120);
  });
}

let lastContextMenuStreamLink = null;

function getMpvHandlerUrlFromLink(link) {
  if (!link || typeof link.href !== "string") {
    return null;
  }

  if (link.href.startsWith("mpv-handler://") || link.href.startsWith("mpv-handler-debug://")) {
    return link.href;
  }

  const decodedUrl = extractStreamUrl(link.href);

  if (!decodedUrl) {
    return null;
  }

  return generateProto(decodedUrl);
}

function resolveContextMenuStreamLink(menuContent) {
  return (
    menuContent.closest("a.stream-container-JPdah") ||
    document.querySelector("a.stream-container-JPdah.active") ||
    lastContextMenuStreamLink
  );
}

function injectPlayOnMpvContextOption(menuContent, streamLink) {
  if (menuContent.querySelector('[data-mpv-context-option="true"]')) {
    return;
  }

  const templateOption = menuContent.querySelector(".context-menu-option-container-BZGla");

  if (!templateOption) {
    return;
  }

  const mpvHandlerUrl = getMpvHandlerUrlFromLink(streamLink);

  if (!streamLink || !mpvHandlerUrl) {
    return;
  }

  const option = templateOption.cloneNode(true);
  option.dataset.mpvContextOption = "true";
  option.title = "Play on MPV";

  const label = option.querySelector(".context-menu-option-label-EbNNz");
  if (label) {
    label.textContent = "Play on MPV";
  }

  option.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stohttps://web.stremio.com/#/settingspPropagation();

      notifyOpeningInMpv(streamLink);

      setTimeout(() => {
        window.location.href = mpvHandlerUrl;
      }, 120);
    },
    true,
  );

  // Insert after the title and before the first Play button
  const titleElement = menuContent.querySelector(".context-menu-title-aoWE4");
  if (titleElement && titleElement.nextElementSibling) {
    menuContent.insertBefore(option, titleElement.nextElementSibling);
  } else {
    menuContent.insertBefore(option, menuContent.firstChild);
  }
}

function enhanceContextMenus() {
  const menuContents = document.querySelectorAll(".context-menu-content-Xe_lN");

  menuContents.forEach((menuContent) => {
    const streamLink = resolveContextMenuStreamLink(menuContent);
    if (streamLink) {
      injectPlayOnMpvContextOption(menuContent, streamLink);
    }
  });
}

function trackContextMenuTarget() {
  document.addEventListener(
    "contextmenu",
    (event) => {
      const streamLink = event.target.closest("a.stream-container-JPdah");

      if (streamLink) {
        lastContextMenuStreamLink = streamLink;
        
        // Inject option immediately without async delay
        const menuContent = document.querySelector(".context-menu-content-Xe_lN");
        if (menuContent) {
          injectPlayOnMpvContextOption(menuContent, streamLink);
        }
      }
    },
    true,
  );
}

// Function to process links with enhanced mpv-handler integration
function processLinks() {
  // Stream links are left unmodified for default streaming behavior.
  // The "Play on MPV" option is available only via right-click context menu.
  // This is handled by enhanceContextMenus() which is called separately.
}

// Notify update about mpv-handler
function notifyUpdate() {
  let version = GM_getValue("mpvHandlerVersion", null);

  if (version !== MPV_HANDLER_VERSION) {
    const UPDATE_NOTIFY = {
      title: `${GM_info.script.name}`,
      text: `mpv-handler is upgraded to ${MPV_HANDLER_VERSION}\n\nClick to check updates`,
      onclick: () => {
        window.open("https://github.com/akiirui/mpv-handler/releases/latest");
      },
    };

    GM_notification(UPDATE_NOTIFY);
    GM_setValue("mpvHandlerVersion", MPV_HANDLER_VERSION);
  }
}

// Register menu commands for easy access to settings
function registerMenuCommands() {
  GM_registerMenuCommand("MPV Settings", () => {
    if (!GM_config.isOpen) {
      GM_config.open();
      GM_config.frame.style = CONFIG_IFRAME_CSS.trim();
    }
  });
  
  GM_registerMenuCommand("Process Links Manually", () => {
    processLinks();
    GM_notification({
      title: 'Stremio MPV',
      text: 'Processing Stremio links...',
      timeout: 2000
    });
  });
}

// Create a MutationObserver to watch for DOM changes with throttling
let processTimeout;
const observer = new MutationObserver(() => {
  // Throttle the processing to avoid multiple rapid calls
  clearTimeout(processTimeout);
  processTimeout = setTimeout(() => {
    processLinks();
    enhanceContextMenus();
  }, 500); // Wait 500ms before processing
});

// Start observing the document
function startObserver() {
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    // If body is not ready, wait and try again
    setTimeout(startObserver, 100);
  }
}

// Fix TrustedHTML
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy("default", {
    createHTML: (string) => string,
  });
}

// Initialize the script
function init() {
  notifyUpdate();
  setupSettingsIntegration();
  registerMenuCommands();
  trackContextMenuTarget();
  startObserver();
  // Initial processing
  processLinks();
  enhanceContextMenus();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
