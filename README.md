# mapy-place-search

A small web app to search places with the [Mapy.com REST API](https://developer.mapy.com/rest-api-mapy-cz/) and open the selected result on [mapy.com](https://mapy.com).

## Usage

1. Enter a place name into the search field.
2. Click **Search** — the app queries the Mapy Geocoding API and shows up to 5 results.
3. Click a result to open that point on mapy.com in a new tab.

## Run

Static site — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Files

- `index.html` — search form and results list
- `app.js` — Geocoding API call, result rendering, mapy.com deep links
- `styles.css` — styling
