// The live map (MapLibre with OpenFreeMap tiles).
// Switched OFF: do not turn it on until India's borders on this map have been corrected, checked and approved.
export const REAL_MAP = false;

const BASE = "https://unpkg.com/maplibre-gl@5.24.0/dist/";
// One fixed version. The browser refuses a file whose contents do not match its hash.
const SCRIPT = { src: `${BASE}maplibre-gl.js`, integrity: "sha384-5+cfbwT0iiub6VsQAdn6yz16nr6sDiQoHx6tm4O8OVYXHYOxcffFmCJBL0dgdvGp" };
const STYLES = { rel: "stylesheet", href: `${BASE}maplibre-gl.css`, integrity: "sha384-uTttxo/aOKbdE5RlD/SPzSDoDmNvGlUYPjONi2MN/b7c9HPSvW07OIuyP7uL6jxK" };
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const INDIA = { center: [78.9, 22.5], zoom: 3.4 }; // longitude first

let ready, map, box, markers = [], failed = false;

// Where the map should look: all of India, or the chosen state and its projects.
export function mapFocus(stateName, projects, states) {
  if (!stateName) return INDIA;
  const own = projects.filter(project => project.state === stateName);
  if (own.length > 1) {
    const lngs = own.map(project => project.lng), lats = own.map(project => project.lat);
    return { bounds: [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]] };
  }
  const place = own[0] ?? states.find(item => item.name === stateName);
  return place ? { center: [place.lng, place.lat], zoom: own.length ? 8 : 5.5 } : INDIA;
}
function showPins(maplibre, projects) {
  markers.forEach(marker => marker.remove());
  markers = projects.map(project => {
    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = `map-live-pin is-${project.status}`;
    pin.dataset.openProject = project.id; // the page's click handler opens the project
    const marker = new maplibre.Marker({ element: pin }).setLngLat([project.lng, project.lat]).addTo(map);
    pin.setAttribute("aria-label", `View ${project.title} details`);
    pin.title = project.title;
    return marker;
  });
}
export const realMapAvailable = () => REAL_MAP && !failed;

function load(tag, attributes) {
  return new Promise((resolve, reject) => {
    const element = Object.assign(document.createElement(tag), { crossOrigin: "anonymous" }, attributes);
    element.onload = resolve;
    element.onerror = () => reject(new Error(`could not load ${attributes.src || attributes.href}`));
    document.head.append(element);
  });
}
async function create() {
  await Promise.all([load("script", SCRIPT), load("link", STYLES)]);
  map = new window.maplibregl.Map({ container: box, style: MAP_STYLE, ...INDIA });
  map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }));
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("the map took too long to load")), 12000);
    map.once("load", () => { clearTimeout(timer); resolve(); });
  });
}

// Puts the map inside `host`. The same map is moved into the new screen after every redraw.
export async function showRealMap(host, { projects, states, stateName, onReady, onFail }) {
  if (!box) { box = document.createElement("div"); box.className = "real-map"; }
  host.append(box);
  try {
    await (ready ??= create());
    if (!box.isConnected) return;
    map.resize();
    showPins(window.maplibregl, projects);
    const { bounds, ...camera } = mapFocus(stateName, projects, states);
    if (bounds) map.fitBounds(bounds, { padding: 60, maxZoom: 9, animate: false });
    else map.jumpTo(camera);
    onReady();
  } catch (error) {
    console.warn("Live map unavailable:", error.message);
    if (failed) return;
    failed = true;
    map?.remove();
    map = null;
    onFail();
  }
}
