/*
  APP CATALOG — this is the only file you need to edit to add a new app.

  To add an app:
    1. Make a folder apps/<your-app-id>/ and put icon.png + screenshots in it.
    2. Copy the LiveWall Studio entry below, paste it after it, and change the text.
    3. Publish the website again. The home page and the app page are built automatically.

  "downloads" are the buttons on the app page ("fallback" is the link they open).
  "github" (optional) points the buttons at the LATEST public GitHub release - leave it out for paid apps.
*/
// Buyers contact this address. Change it here and publish the site again.
const SALES_EMAIL = 'positive.sriram@gmail.com';
window.APPS = [
  {
    id: 'livewall-studio',
    name: 'LiveWall Studio',
    tagline: 'LED wall and live event visuals for Windows',
    headline: 'Run the LED wall at your next event from one laptop',
    summary:
      'Mix videos, HDMI camera feeds, titles and animated backgrounds, prepare the next look in a private preview, and send it to the wall with one key. Built for weddings, stage shows and DJ nights.',
    downloadNote: 'Send a licence request. Once it is accepted you receive your personal key, which unlocks the download and activates the app.',
    icon: 'apps/livewall-studio/icon.png',
    color: '#7c5cff',
    category: 'Event & Video',
    platform: 'Windows 10 / 11 (64-bit)',
    license: 'Paid licence',
    version: '1.6.0',
    size: '~110 MB',
    released: 'November 2026',
    downloads: [
      { label: 'Request a licence', primary: true, fallback: '#request' },
      { label: 'I have a key - download', fallback: '#download' },
    ],
    // Licence flow: buyers send a request (the form goes to SALES_EMAIL), you reply with a key,
    // and the key unlocks the download links below. The key is checked in the browser with the app's public key.
    licence: {
      requestTo: SALES_EMAIL,
      publicKey: 'MCowBQYDK2VwAyEAlcsGdvvJUH7M9cjdjaFiGgznpwgRsYFE8H5jwtZvWWk=',
      files: [
        { label: 'Download installer', note: 'Windows 10 / 11, 64-bit', url: 'https://github.com/SriRamTejaArige/livewall-studio-download/releases/download/v1.6.0/LiveWall-Studio-Setup-1.6.0.exe' },
        { label: 'Portable version', note: 'No install; runs from a USB stick', url: 'https://github.com/SriRamTejaArige/livewall-studio-download/releases/download/v1.6.0/LiveWall-Studio-Portable-1.6.0.exe' },
      ],
    },
    screenshots: [
      { src: 'apps/livewall-studio/studio.png', caption: 'The studio: sources on the left, preview and live monitors, guide tabs and the layers panel' },
      { src: 'apps/livewall-studio/output.png', caption: 'The LED wall output: Royal Wedding template with falling rose petals' },
    ],
    highlights: [
      ['Preview, then take live', 'Build the next look in a private preview while the wall keeps showing the current one. Seven transitions, blackout and cues on Shift+1 to 9.'],
      ['Output on the second screen', 'The live output opens fullscreen on the display connected to your LED processor, at the exact wall resolution.'],
      ['Up to five sources', 'Video files, photos, HDMI capture cards with audio, screen capture, playlists and slideshows, placed anywhere on the wall.'],
      ['Event templates', '28 ready designs, including wedding, Haldi, Mehendi, Sangeet, birthday, Diwali, Garba, DJ night and corporate.'],
      ['Green screen and effects', 'Chroma key with spill removal, plus strobe, mirror, RGB split, pixelate, tint and 32 animated backgrounds.'],
      ['Music sync', 'Listens to a mic, line-in or the laptop’s own audio, detects the beat and BPM, and pulses the visuals with it.'],
    ],
    // Long-form content shown on the app page. Each section gets an entry in the side menu.
    sections: [
      {
        id: 'install',
        title: 'Install',
        html: `
<ol class="steps">
  <li><b>Request a licence</b> with the form on this page. When your request is accepted you get a personal licence key by email.</li>
  <li><b>Download:</b> enter the key under <b>I have a key</b> to unlock the installer.</li>
  <li><b>Run it.</b> Windows may show “Windows protected your PC” because the app isn’t code-signed. Click <b>More info → Run anyway</b>. This only happens the first time.</li>
  <li><b>Installer:</b> choose a folder and finish. Open <b>LiveWall Studio</b> from the Start menu or desktop.<br><b>Portable:</b> just double-click the .exe — nothing is installed.</li>
  <li>On first start, paste your <b>licence key</b> (it starts with <code>LW1-</code>) and click <b>Activate</b>. You only do this once per PC.</li>
  <li>Connect your LED wall’s processor (HDMI/DVI) to the laptop as a <b>second display</b> (Windows key + P → “Extend”).</li>
</ol>
<p class="note">Your shows, cues and media are saved automatically and come back every time you open the app.</p>`,
      },
      {
        id: 'quick-start',
        title: 'Quick start (5 minutes)',
        html: `
<ol class="steps">
  <li>Click <b>⧉ Open Live Output</b> (top right). With a second display connected it goes fullscreen on the LED wall automatically.</li>
  <li>Open the <b>Event Templates</b> tab and click a template — for example “Royal Wedding”. It appears in the green <b>PREVIEW</b> monitor only.</li>
  <li>Open <b>Text &amp; Graphics</b> and change “Bride ♥ Groom” to the couple’s names. Drag text directly on the Preview to move it.</li>
  <li>Press <b>TAKE LIVE</b> (or the <kbd>Space</kbd> key). The red <b>LIVE OUTPUT</b> monitor and the LED wall crossfade to your new look.</li>
  <li>Keep preparing the next look in Preview while the wall shows the current one — that’s the whole idea.</li>
</ol>`,
      },
      {
        id: 'screen',
        title: 'The screen explained',
        html: `
<div class="explain">
  <div><h4>Left — Sources (1–5)</h4><p>Up to five inputs: video files, photos, capture cards/cameras, playlists, screen capture, FX animations or a solid color. Click a source thumbnail to put it into the selected zone.</p></div>
  <div><h4>Middle — Preview &amp; Live</h4><p><b>Green = Preview</b> (only you see it). <b>Red = Live</b> (what the wall shows). Between them: transition type, TAKE LIVE, CUT, Grab Live and BLACKOUT.</p></div>
  <div><h4>Bottom — Tabs</h4><p>Layout &amp; Zones, Text &amp; Graphics, FX &amp; Animations, Frames, Event Templates, Media Library, Music Sync, Cues, Color Adjust, LED Wall and Help.</p></div>
  <div><h4>Right — Layers panel</h4><p>Everything in the scene in stacking order. Select a layer to set exact position and size in pixels, rotation, opacity and blend mode. Hide it with <kbd>L</kbd> or “▸ Hide”; drag its edge to resize.</p></div>
</div>`,
      },
      {
        id: 'sources',
        title: 'Sources & layouts',
        html: `
<ul>
  <li><b>Choose a source type</b> from the dropdown on each source card: “Video file, Image/Photo, Capture card (HDMI)/Camera, Playlist/Slideshow, Screen/Window capture, FX Animation, Solid color”.</li>
  <li><b>Layouts</b> (Layout &amp; Zones tab): Full Screen, Split 2/3, Center + Wings, Main + Side, Picture-in-Picture, Quad, Five Sources — or <b>Custom</b>, where you drag zones anywhere.</li>
  <li><b>Put a source into a zone:</b> click the zone (on the Preview or in the list), then click a source thumbnail — or press <kbd>1</kbd>–<kbd>5</kbd>.</li>
  <li><b>Video controls:</b> loop, audio, speed (0.25×–4×), reverse, and <b>[ In / Out ]</b> buttons to loop just part of a clip.</li>
</ul>`,
      },
      {
        id: 'layers',
        title: 'Layers & exact placement',
        html: `
<ul>
  <li>Click anything on the <b>Preview</b> to select it. Drag to move; drag a <b>corner handle</b> to resize. <kbd>Shift</kbd> keeps proportions, <kbd>Alt</kbd> turns off snapping.</li>
  <li>In the <b>Layers</b> panel type exact <b>X, Y, W, H in wall pixels</b>, or use the align buttons (left, centre, right, top, middle, bottom, Fill, ½).</li>
  <li>Each layer has <b>rotation</b>, <b>opacity</b>, <b>blend mode</b> (Add, Screen, Multiply…), <b>flip</b>, show/hide ● and lock 🔒. Reorder with ▲ ▼.</li>
  <li>Arrow keys nudge the selected layer 1 px (<kbd>Shift</kbd> = 10 px).</li>
</ul>`,
      },
      {
        id: 'effects',
        title: 'FX, frames & templates',
        html: `
<ul>
  <li><b>FX &amp; Animations:</b> click any effect to add it <b>above your video</b> (up to 4 layers). Use the small <b>BG</b> button to set it as the background instead.</li>
  <li>Select an FX layer in the Layers panel to <b>confine it to an area</b>, rotate it, or change opacity and blend.</li>
  <li><b>Frames:</b> 11 animated borders (Royal Gold, Marquee Bulbs, Neon, Marigold, Hearts, Film Strip…) or your own transparent PNG — around the whole wall or around each zone.</li>
  <li><b>Event Templates:</b> one click loads a complete design (background, effects and text) into Preview. Your sources and zones are kept.</li>
</ul>`,
      },
      {
        id: 'capture',
        title: 'Capture cards & chroma key',
        html: `
<ul>
  <li>Plug in a USB/HDMI capture card (Elgato, AVerMedia or any “UVC” card). Set a source to <b>Capture card (HDMI) / Camera</b> and pick the device. Press ⟳ to re-scan.</li>
  <li>Choose <b>resolution</b> (4K / 1080p / 720p / SD) and <b>frame rate</b>. The card’s <b>HDMI audio</b> is connected automatically and is heard only while that feed is live.</li>
  <li><b>Green screen:</b> select the zone in the Layers panel → open <b>Effects ▸</b> → tick <b>Chroma key</b>. Adjust Tolerance and Edge softness until the edges are clean.</li>
  <li>Other effects in the same place: Strobe (or strobe on the beat), Mirror/Kaleido, RGB split, Pixelate, Tint, Invert.</li>
</ul>`,
      },
      {
        id: 'media',
        title: 'Media library & playlists',
        html: `
<ul>
  <li><b>Media Library</b> tab → <b>＋ Add folder</b> to import a whole pack of video loops or photos at once. Each folder becomes a category. You can also drag files onto the window.</li>
  <li>Click <b>1–5</b> on any item to load it into that source.</li>
  <li><b>Slideshows:</b> set a source to <b>Playlist / Slideshow</b>, then use <b>＋ Playlist</b> on library items. Videos and photos play in order with crossfades; set photo time, shuffle, repeat and slow zoom.</li>
</ul>`,
      },
      {
        id: 'music',
        title: 'Music sync',
        html: `
<ul>
  <li>Open <b>♫ Music Sync</b> and choose the input: a <b>microphone / line-in</b> (connect the DJ mixer’s REC or booth output), <b>Computer audio</b> (music playing on the laptop) or the <b>Demo beat</b>.</li>
  <li>Tick <b>Music sync ON</b>. Visuals pulse, flash and speed up with the beat; the Equalizer effect shows the real music.</li>
  <li><b>Apply to LIVE now</b> switches music sync on the wall without re-taking. The DJ Night, Club Lasers, Disco, Garba and New Year templates have it on already.</li>
</ul>`,
      },
      {
        id: 'show',
        title: 'Running the show (cues)',
        html: `
<ul>
  <li>Prepare every moment of the event in advance — entry, ring ceremony, cake cutting, sponsor logos — and save each with <b>Cues → ＋ Save Preview as Cue</b>.</li>
  <li>During the event press <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>9</kbd> to take a cue live instantly.</li>
  <li><b>BLACKOUT</b> (<kbd>B</kbd>) fades the wall to black; <b>Test Pattern</b> (<kbd>T</kbd>) shows a grid for lining up LED cabinets.</li>
</ul>`,
      },
      {
        id: 'led',
        title: 'LED wall setup',
        html: `
<ul>
  <li><b>LED Wall</b> tab: pick your wall resolution (Full HD, 4K, 32:9 wide, portrait or custom) and the number of cabinets across and down.</li>
  <li><b>Pixel-exact mode</b> places the picture at an X/Y offset — use it when your LED sending card reads a fixed region of the screen.</li>
  <li><b>Render quality</b> (Balanced / Performance) keeps very large walls smooth on slower laptops.</li>
  <li><b>Output mapping (advanced):</b> send slices of the picture to different places on the output, with rotation — for split or odd-shaped walls.</li>
</ul>`,
      },
      {
        id: 'keys',
        title: 'Keyboard shortcuts',
        html: `
<table class="keys">
  <tr><td><kbd>Space</kbd></td><td>Take live with transition</td></tr>
  <tr><td><kbd>Enter</kbd></td><td>Cut (instant)</td></tr>
  <tr><td><kbd>1</kbd>–<kbd>5</kbd></td><td>Put a source into the selected zone</td></tr>
  <tr><td><kbd>Shift</kbd>+<kbd>1</kbd>–<kbd>9</kbd></td><td>Take cue 1–9 live</td></tr>
  <tr><td><kbd>B</kbd></td><td>Blackout</td></tr>
  <tr><td><kbd>T</kbd></td><td>Test pattern</td></tr>
  <tr><td><kbd>G</kbd></td><td>Grab live into preview</td></tr>
  <tr><td><kbd>L</kbd></td><td>Show / hide the Layers panel</td></tr>
  <tr><td>Arrows / <kbd>Delete</kbd></td><td>Nudge / delete the selected layer</td></tr>
  <tr><td><kbd>F</kbd> (in Output window)</td><td>Fullscreen on / off</td></tr>
</table>`,
      },
      {
        id: 'requirements',
        title: 'System requirements',
        html: `
<ul>
  <li>Windows 10 or 11, 64-bit</li>
  <li>4 GB RAM minimum, 8 GB recommended</li>
  <li>Any graphics card from the last ~8 years (integrated Intel/AMD graphics is fine for Full HD walls)</li>
  <li>A second display output (HDMI/DVI/DisplayPort) for the LED wall processor</li>
  <li>Optional: USB/HDMI capture card, microphone or line-in for music sync</li>
  <li>No internet needed during the event — everything works offline</li>
</ul>`,
      },
      {
        id: 'faq',
        title: 'FAQ & troubleshooting',
        html: `
<details><summary>Windows says “Windows protected your PC”.</summary><p>That’s SmartScreen warning about apps that aren’t code-signed. Click <b>More info → Run anyway</b>.</p></details>
<details><summary>The output didn’t go to my LED wall.</summary><p>Check the LED processor is connected and Windows is set to <b>Extend</b> (Windows key + P). Then click Open Live Output again. You can also drag the output window to the wall and press <kbd>F</kbd>.</p></details>
<details><summary>My effect isn’t visible.</summary><p>Effects added with a normal click sit above your video. If you used <b>BG</b>, the effect is the background and a full-screen video covers it — the FX tab shows a warning when that happens.</p></details>
<details><summary>My capture card doesn’t appear.</summary><p>Plug it in, then press ⟳ on the source card. Close other apps that might be using it (OBS, Zoom, Camera app).</p></details>
<details><summary>How do I get it?</summary><p>Send a <b>licence request</b> on this page. Once it's accepted you receive a licence key; the key unlocks the download here and activates the app. No subscription, no watermark, and it works offline at events.</p></details>
<details><summary>I changed my PC.</summary><p>Email with your licence ID (in the app: <b>LiveWall → Licence</b>) and you'll get help moving it.</p></details>`,
      },
      {
        id: 'changelog',
        title: 'What’s new',
        html: `
<h4>1.5.0 — November 2026</h4>
<ul>
  <li>LiveWall Studio is now a licensed app: activate once with your licence key</li>
  <li>LiveWall → Licence shows who the copy is licensed to</li>
</ul>
<h4>1.4.1 — November 2026</h4>
<ul>
  <li>Chroma key now removes real green screens (standard chroma green #00b140) instead of tinting them teal</li>
  <li>Test pattern shows the real wall size when render quality is reduced</li>
</ul>
<h4>1.4.0 — November 2026</h4>
<ul>
  <li>Layers panel slides in and out and can be resized</li>
  <li>Chroma key and clip effects (strobe, mirror, RGB split, pixelate, tint, invert)</li>
  <li>Video speed, reverse and In/Out points</li>
  <li>Output mapping for split / odd-shaped LED walls</li>
  <li>Free placement of every layer with exact pixel sizes, rotation, opacity and blend modes</li>
  <li>Capture card input with HDMI audio, frame borders, media library, playlists and music sync</li>
</ul>`,
      },
    ],
  },
];
