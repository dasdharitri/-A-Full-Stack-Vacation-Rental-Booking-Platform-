
        // let MAPTOKEN=MAPTOKEN;
        // console.log(MAPTOKEN);
        mapboxgl.accessToken=MAPTOKEN;

        const map = new mapboxgl.Map({
            container: "map", // container ID
            style:"mapbox://styles/mapbox/streets-v12",
            center:listing.geometry.coordinates, // starting position [lng, lat]
            zoom: 8,
        });
      
        
         // create custom element
const el = document.createElement("div");
el.className = "custom-marker";

el.innerHTML = `
  <img src="${listing.image.url}" />
`;

// ✅ ADD ANIMATION HERE
el.style.animation = "pop 0.5s ease";

// create marker
new mapboxgl.Marker(el)
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
  new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h4>${listing.location}</h4>
     <p class="secure-text">🔒 Exact location will be provided after booking</p>`
  )
)

  .addTo(map);

        

        // .setLngLat(listing.geometry.coordinates)  //Listing.geomatry.coordinates
        // .setPopup(
        //   new mapboxgl.Popup({offset:25}).setHTML(
        //   `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
        //   )
        //   )
        // .addTo(map);
    
