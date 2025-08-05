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
// @version             3.7
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
    proto = "mpv-debug://play/" + btoaUrl(url);
  } else {
    proto = "mpv://play/" + btoaUrl(url);
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
    
    console.log('Stremio MPV: Decoded data:', decodedData);
    
    // Look for HTTP/HTTPS URLs in the decoded data
    const urlMatch = decodedData.match(/(https?:\/\/[^\s\n\r\t]+)/);
    if (urlMatch) {
      const extractedUrl = urlMatch[1];
      console.log('Stremio MPV: Extracted URL:', extractedUrl);
      return extractedUrl;
    }
    
    // Alternative: look for lines that contain URLs
    const lines = decodedData.split('\n');
    for (const line of lines) {
      if (line.startsWith('http://') || line.startsWith('https://')) {
        console.log('Stremio MPV: Found URL in line:', line.trim());
        return line.trim();
      }
    }
    
    // If no URL found, log the decoded content for debugging
    console.log('Stremio MPV: No URL found in decoded data');
    return null;
  } catch (e) {
    console.error('Stremio MPV: Failed to decode data URL:', e);
    return null;
  }
}

// Function to process links with enhanced mpv-handler integration
function processLinks() {
  const links = document.querySelectorAll('a[href^="data:application/octet-stream;charset=utf-8;base64,"]');
  let processedCount = 0;

  console.log(`Stremio MPV: Found ${links.length} potential stream links`);

  links.forEach((link, index) => {
    // Check if the link has already been processed and actually has an mpv:// URL
    if (link.dataset.processed && (link.href.startsWith('mpv://') || link.href.startsWith('mpv-debug://'))) {
      console.log(`Stremio MPV: Link ${index} already processed with MPV URL`);
      return;
    }

    console.log(`Stremio MPV: Processing link ${index}:`, link.href.substring(0, 100) + '...');

    const decodedUrl = decodeDataUrl(link.href);
    if (decodedUrl) {
      // Generate mpv-handler protocol URL
      const mpvHandlerUrl = generateProto(decodedUrl);
      console.log(`Stremio MPV: Generated MPV URL:`, mpvHandlerUrl);
      
      // Update the link href to the MPV protocol URL
      link.href = mpvHandlerUrl;
      link.dataset.processed = 'true';
      processedCount++;

      // Add a click event listener to prevent opening new tabs
      link.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Stremio MPV: Opening in MPV:', mpvHandlerUrl);
        
        // Try to open with mpv-handler
        window.location.href = mpvHandlerUrl;
      });
    } else {
      console.log(`Stremio MPV: Failed to extract URL from link ${index}`);
    }
  });

  // Only show log if links were actually processed
  if (processedCount > 0) {
    console.log(`Stremio MPV: Successfully processed ${processedCount} stream link(s)`);
  }
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

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver(() => {
  processLinks();
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
  registerMenuCommands();
  startObserver();
  // Initial processing
  processLinks();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
