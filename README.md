# Open Stremio Links on MPV

> This sc## Configuration Options

| Setting | Description | Options |
|---------|-------------|---------|
| **MPV Profile** | Custom MPV profile to use | Any profile name (default: "default") |
| **Video Quality** | Preferred video quality | 2160p, 1440p, 1080p, 720p, 480p, 360p |
| **Run With Console** | Show console when launching MPV | Yes / No |

## Supported Sites

- [Stremio Web](https://web.stremio.com/) (Official)
- [Stremio Web Shell](https://stremio.zarg.me/) (Community)

## Requirementssigned to work with [Stremio Web](https://web.stremio.com/) and the [MPV](https://mpv.io/) player, automatically converting Stremio stream links to open directly in MPV via the mpv-handler protocol.

## Features

- **Automatic Link Processing** - Automatically detects and converts Stremio M3U playlist links
- **Built-in Configuration Panel** - Easy-to-use settings interface with MPV customization options
- **Visual Interface** - Floating control button with MPV icon and settings access
- **Real-time Notifications** - Visual feedback when links are processed and ready
- **Multi-language Support** - English, Portuguese (Brazil), and Portuguese (Portugal)
- **MPV Profile Support** - Use custom MPV profiles and quality preferences
- **Auto-update Detection** - Notifies about mpv-handler updates

## How to use:

### Prerequisites:
1. **Install mpv-handler** - Download and install [mpv-handler](https://github.com/akiirui/mpv-handler) to enable the `mpv://` protocol
2. **Install Userscript Manager** - Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/) extension

### Installation:
3. **[Click here to install the script](https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js)**

### Setup:
4. **Configure Stremio Web**:
   - Go to [Stremio Web Settings](https://web.stremio.com/#/settings)
   - Under "Advanced" → "Play in external player"
   - Enable the **"M3U Playlist"** option
5. **Configure the Script** (optional):
   - Click the settings button that appears when hovering over the MPV button
   - Customize MPV profile, video quality, and console options

### Usage:
6. **Stream to MPV**:
   - Navigate to any content on Stremio Web
   - Click on a stream link
   - The script will automatically process the link and open it in MPV!

## Configuration Options

| Setting | Description | Options |
|---------|-------------|---------|
| **MPV Profile** | Custom MPV profile to use | Any profile name (default: "default") |
| **Video Quality** | Preferred video quality | 2160p, 1440p, 1080p, 720p, 480p, 360p |
| **Run With Console** | Show console when launching MPV | Yes / No |

## 📋 Requirements

- **Browser**: Chrome, Firefox, Safari, or any modern browser
- **Userscript Manager**: Tampermonkey or Greasemonkey extension
- **MPV Player**: [Download MPV](https://mpv.io/installation/)
- **mpv-handler**: [Download mpv-handler](https://github.com/akiirui/mpv-handler/releases/latest)

## Troubleshooting

### Links not opening in MPV?
1. Ensure mpv-handler is properly installed and configured
2. Check that the "M3U Playlist" option is enabled in Stremio Web settings
3. Try clicking the MPV button manually to process links
4. Check browser console for any error messages

### Settings not saving?
1. Make sure to click "Save" in the configuration panel
2. Check that your userscript manager allows the script to store data

### Multiple tabs opening?
The script automatically prevents blank tabs from opening when clicking MPV links.

## Contributing

Feel free to contribute to this project by:
- Reporting bugs and issues
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

This project is licensed under the MIT License.

## Acknowledgments

- Based on the excellent [Play with MPV](https://greasyfork.org/en/scripts/416271-play-with-mpv) script
- Uses [mpv-handler](https://github.com/akiirui/mpv-handler) for protocol handling
- Built with [GM_config](https://github.com/sizzlemctwizzle/GM_config) for configuration management
