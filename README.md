# My apps website

Free website hosted on GitHub Pages: **https://sriramtejaarige.github.io**

There is no build step. The site is plain HTML, CSS and JavaScript.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: your name, intro and the grid of apps |
| `app.html` | App page: download buttons, screenshots, features and how-to guide. It shows whichever app is in the link (`app.html?id=livewall-studio`) |
| `apps/apps.js` | **The app catalog: the only file you edit to add apps** |
| `apps/<app-id>/` | Each app's icon and screenshots |
| `assets/site.js` | Builds the pages from the catalog. Your name and bio are at the top (`OWNER`) |
| `assets/style.css` | The look of the site (follows light/dark mode, works on phones) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Add a new app

1. Publish the app on GitHub with a Release that has the download files attached.
2. Create `apps/<new-app-id>/` with `icon.png` and screenshots.
3. In `apps/apps.js`, copy the LiveWall Studio entry, paste it after it, and change the text and the `github` repo name.
4. Commit and push. The home page and the new app page appear automatically.

Download buttons always point at the **latest** GitHub release of each app, so releasing a new version doesn't require a website change.
