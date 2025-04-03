
        // let MAPTOKEN=MAPTOKEN;
        // console.log(MAPTOKEN);
        mapboxgl.accessToken=MAPTOKEN;

        const map = new mapboxgl.Map({
            container: "map", // container ID
            style:"mapbox://styles/mapbox/streets-v12",
            center:listing.geometry.coordinates, // starting position [lng, lat]
            zoom: 8,
        });
      
        
    
    const marker=new mapboxgl.Marker({color:"red"})
        .setLngLat(listing.geometry.coordinates)  //Listing.geomatry.coordinates
        .setPopup(
          new mapboxgl.Popup({offset:25}).setHTML(
          `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
          )
          )
        .addTo(map);
    
