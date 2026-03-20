# Open Stremio Links on MPV

A userscript that automatically converts Stremio Web stream links to open directly in MPV using mpv-handler.

## Features

- **Default Stream Behavior**: Left-click on stream links opens them normally in Stremio
- **Right-Click Context Menu**: Right-click any stream to see "Play on MPV" option
- **MPV Integration**: Uses mpv-handler protocol for direct MPV player launch
- **In-page Launch Toast**: Shows a website toast when a stream is being opened in MPV
- **Multi-language Support**: Available in English, Portuguese (Brazil), and Portuguese (Portugal)
- **Quality Control**: Configure preferred video quality settings
- **Profile Support**: Use custom MPV profiles
- **Console Options**: Choose whether to show MPV console
- **Easy Configuration**: Access settings through Tampermonkey/Greasemonkey menu
- **Real-time Processing**: Automatically processes new links as they appear on the page

## Requirements

### 1. MPV Player
Download and install MPV player:
- **Windows/macOS/Linux**: [https://mpv.io/installation/](https://mpv.io/installation/)

### 2. mpv-handler
Install the mpv-handler browser extension (v0.3.15 or later):
- **Chrome/Edge**: [Chrome Web Store](https://chrome.google.com/webstore/detail/mpv-handler/dagckdidgfbnpejcedabnnbjdcchikfl)
- **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/mpv-handler/)

### 3. Userscript Manager
Install a userscript manager extension:
- **Tampermonkey**: [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Greasemonkey**: [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox only)

## Installation

1. **Install Prerequisites**: Ensure MPV player, mpv-handler, and a userscript manager are installed
2. **Install Script**: Click [here](https://github.com/ang3lo-azevedo/open-stremio-links-on-mpv/raw/refs/heads/main/open-stremio-links-on-mpv.user.js) to install the userscript
3. **Confirm Installation**: Your userscript manager will prompt you to install the script

## Usage

### Playing on MPV
The script enhances the right-click context menu:

1. **Navigate to Stremio Web**: Go to [web.stremio.com](https://web.stremio.com) or [stremio.zarg.me](https://stremio.zarg.me)
2. **Enable M3U Playlist**: In Stremio settings, enable the "M3U Playlist" option
3. **Right-Click a Stream**: Right-click on any stream to bring up the context menu
4. **Select "Play on MPV"**: Click the "Play on MPV" option from the menu
5. **See Confirmation**: A small in-page toast appears: "Opening in MPV: ..."
6. **Enjoy**: The stream opens directly in MPV player

**Note**: Left-clicking stream links opens them normally in Stremio as expected.

### Configuration

Access configuration through your userscript manager menu:

**Tampermonkey/Greasemonkey Menu Options:**
- **MPV Settings**: Configure script preferences
- **Process Links Manually**: Force manual processing if needed

**Available Settings:**
- **MPV Profile**: Choose MPV profile (`default` or custom profile name)
- **Prefer Video Quality**: Select preferred quality (`default`, `2160p`, `1440p`, `1080p`, `720p`, `480p`, `360p`)
- **Run With Console**: Show MPV console (`yes` or `no`)

## Supported Sites

- **Stremio Web**: [web.stremio.com](https://web.stremio.com)
- **Stremio Zarg**: [stremio.zarg.me](https://stremio.zarg.me)

## How It Works

1. **Link Detection**: Monitors the page for stream links (`data:` and `#/player/` routes)
2. **Stream Extraction**: Decodes payloads and extracts playable URLs (including magnet fallback when needed)
3. **Protocol Conversion**: Converts stream URLs to `mpv-handler://` or `mpv-handler-debug://`
4. **Click Binding**: Ensures MPV links keep a persistent click handler
5. **User Feedback**: Shows an in-page toast right before launching MPV

## Troubleshooting

### Script Not Working
- Ensure all prerequisites are installed and up-to-date
- Check that "M3U Playlist" option is enabled in Stremio settings
- Try manually processing links via userscript menu

### MPV Not Opening
- Verify mpv-handler extension is installed and enabled
- Check MPV player installation
- Try with "Run With Console" enabled to see error messages

### Toast Not Showing
- Refresh the page once after updating the script
- Make sure you are clicking a converted stream entry (not a normal external link)
- Check if another extension is blocking page-injected UI elements

### Links Not Converting
- Open browser console (F12) to check for error messages
- Ensure you're on a supported Stremio site
- Try refreshing the page

### Console Access
Open browser developer console (F12) to see script debug information and processing status.

## Technical Details

- **Version**: 4.6
- **mpv-handler Version**: v0.3.15
- **Supported Browsers**: Chrome, Firefox, Edge, Safari (with appropriate userscript managers)
- **Dependencies**: GM_config library for settings management

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

MIT License - see the script header for full license text.

## Author

Ângelo Azevedo

## Changelog

### v4.6
- Optimized context menu injection for instant display
- Positioned "Play on MPV" option at the top of the context menu
- Reduced loading time for menu option appearance

### v4.5
- Added "Play on MPV" option to right-click context menu for quick stream launching
- Restored default left-click behavior (links open normally in Stremio)
- Improved user control over MPV launching vs default streaming

### v4.4
- Added in-page "Opening in MPV" toast notification
- Improved toast visibility timing and styling reliability

### v4.3
- Replaced system opening notification with website toast

### v4.2
- Added feedback when launching streams in MPV

### v4.1
- Fixed repeat-click behavior that could open an unwanted tab

### v4.0
- Improved persistent MPV click handling for already converted links

### v3.9
- Removed all debug console logs for cleaner operation
- Silent background processing without console pollution

### v3.8
- Fixed multiple MPV instances opening on single click
- Added throttling to prevent excessive processing
- Improved event listener management with cloning technique
- Enhanced link processing reliability

### v3.7
- Added English menu commands
- Improved user experience

### v3.6
- Added Tampermonkey/Greasemonkey menu integration
- Easy access to settings and manual processing

### v3.5
- Removed manual control buttons for fully automatic operation
- Streamlined user interface

### v3.4
- Removed visual styling of processed links
- Cleaner integration with Stremio interface

### v3.3
- Enhanced link processing with better URL conversion
- Improved click handling for MPV protocol

### v3.2
- Added visual feedback for processed links
- Enhanced CSS styling and user experience

### v3.1
- Improved notification system
- Better debugging capabilities

### v3.0
- Complete rewrite with advanced features
- Multi-language support
- MPV icon integration
- Professional configuration interface

## Acknowledgments

- Based on the excellent [Play with MPV](https://greasyfork.org/en/scripts/416271-play-with-mpv) script
- Uses [mpv-handler](https://github.com/akiirui/mpv-handler) for protocol handling
- Built with [GM_config](https://github.com/sizzlemctwizzle/GM_config) for configuration management
