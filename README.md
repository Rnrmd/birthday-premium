# A Little Universe — Premium Birthday Website

A responsive birthday experience built with HTML, CSS, JavaScript, Three.js and GSAP.

## Run locally
No build step is required. Because `script.js` uses an ES module, run the folder through a local server instead of opening `index.html` directly.

### Option A — VS Code
Install the **Live Server** extension, right-click `index.html`, then choose **Open with Live Server**.

### Option B — Node.js
```bash
npx serve .
```
Open the local URL shown in your terminal.

## Personalize the website
Open `script.js` and edit:
```js
const recipientName = 'Beautiful';
```
Replace it with the birthday person's name.

Edit the letter text directly in `index.html`:
- `Dear Beautiful`
- The three birthday message paragraphs
- The closing message

## Add your photos
Put your own images in `assets/photos/` and use these exact filenames:
- `photo-1.jpg`
- `photo-2.jpg`
- `photo-3.jpg`

JPG, PNG or WebP are fine; if you use another extension, update the corresponding `src` in `index.html`.

## Add background music
Put an MP3 file at `assets/music/song.mp3`. The music starts only after the visitor taps **SOUND OFF**, because browsers block autoplay with sound.

Only use music you have permission to publish.

## Deploy to Vercel
1. Create a GitHub repository and upload all files in this folder.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Framework Preset: **Other**.
4. Build Command: leave empty.
5. Output Directory: `.` (root).
6. Click **Deploy**.

You can also deploy with the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Notes
- Three.js draws a subtle animated star field. If WebGL is unavailable, the page still works with its CSS background.
- GSAP and Three.js are loaded from public CDNs, so an internet connection is needed for those effects and Google Fonts.
- The page does not collect or transmit personal data.
- For best performance, compress photos to around 300–700 KB each before uploading.
