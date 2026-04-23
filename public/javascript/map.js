const mapDiv = document.getElementById("map");

// get values from HTML
const coordinates = mapDiv.dataset.coordinates.split(",").map(Number);
const image = mapDiv.dataset.image;
const locationName = mapDiv.dataset.location;
const token = mapDiv.dataset.token;

console.log("Coordinates:", coordinates);

mapboxgl.accessToken = token;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: coordinates,
    zoom: 9,
});

// marker
const el = document.createElement("div");
el.className = "custom-marker";

el.innerHTML = `<img src="${image}" />`;

// animation
el.style.animation = "pop 0.5s ease";

new mapboxgl.Marker(el)
  .setLngLat(coordinates)
  .setPopup(
  new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h4>${locationName}</h4>
     <p style="font-size:18px; color:red;">
     🔒 Exact location will be provided after Booking.
     </p>`
  )
)
  .addTo(map);