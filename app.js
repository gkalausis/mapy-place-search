const API_URL = "https://api.mapy.com/v1/geocode";
const API_KEY = "MJDXLxGvJWHEqjDyho39Q5-GRem2YWSYGRyPKG35ohk";
const MAX_RESULTS = 5;

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const status = document.getElementById("status");
const results = document.getElementById("results");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search(input.value.trim());
});

async function search(query) {
  if (!query) {
    showStatus("Please enter a place name.", true);
    return;
  }

  setLoading(true);
  showStatus("Searching…", false);
  hideResults();

  try {
    const url = `${API_URL}?query=${encodeURIComponent(query)}&limit=${MAX_RESULTS}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Mapy API error (${response.status})`);
    }

    const data = await response.json();
    renderResults(data.items || []);
  } catch (error) {
    showStatus(`Search failed: ${error.message}`, true);
  } finally {
    setLoading(false);
  }
}

function renderResults(items) {
  if (items.length === 0) {
    showStatus("No places found. Try a different name.", false);
    return;
  }

  hideStatus();
  results.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.tabIndex = 0;

    const name = document.createElement("div");
    name.className = "result-name";
    name.textContent = item.name;

    const meta = document.createElement("div");
    meta.className = "result-meta";
    meta.textContent = [item.label, item.location].filter(Boolean).join(" · ");

    li.appendChild(name);
    li.appendChild(meta);

    const open = () => {
      const { lat, lon } = item.position;
      window.open(`https://mapy.com/?q=${lat},${lon}`, "_blank", "noopener");
    };

    li.addEventListener("click", open);
    li.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });

    results.appendChild(li);
  });

  results.hidden = false;
}

function setLoading(loading) {
  button.disabled = loading;
  button.textContent = loading ? "Searching…" : "Search";
}

function showStatus(message, isError) {
  status.textContent = message;
  status.classList.toggle("error", isError);
  status.hidden = false;
}

function hideStatus() {
  status.hidden = true;
}

function hideResults() {
  results.hidden = true;
  results.innerHTML = "";
}
