/* eslint-disable */

export const displayMap = locations => {
  console.log(locations);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZW5ndWVycmFuZC1kZXYiLCJhIjoiY2t6NXRseWJvMDV2MTMwbWdpZmc4eWEwdyJ9.FKDyP3XMdv60o9YTw7fyag';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/enguerrand-dev/ckz5uortr003j14pmcphkt0we',
    scrollZoom: false
    //center: [-118.264264, 34.125721],
    //zoom: 4
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // add marker@
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extend map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 }
  });
};
