// Initialize and add the map
function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17, // furthest zoom that can see buildings
    center: { lat: 42.37429224178242, lng: -71.11628459241092 }, // arbitrary start location
  });

  // turn off point-of-interest visibility
  map.setOptions({ styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ]});

  // create one infowindow for all markers
  const makeContent = x => 
    '<iframe' +
    ' width="600"' +
    ' height="480"' +
    ` src="https://my.matterport.com/show?m=${x}"` +
    ' frameborder="0"' +
    ' allow="fullscreen">' +
    '</iframe>';
  const infoWindow = new google.maps.InfoWindow({
    zIndex: 1,
  });

  // create markers using metadata
  for (let i=0; i < meta.length; i++) {
    const marker = new google.maps.Marker({
      position: meta[i].position,
      title: meta[i].title,
      map: map,
    });
    const label = new google.maps.InfoWindow({ 
      content: meta[i].title,
      zIndex: 0,
    });
    label.open(marker.getMap(), marker);
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(makeContent(meta[i].sid));
      infoWindow.open(marker.getMap(), marker);
    });
  };
};

// Put all marker metadata here
const meta = [
  {
    position: { lat: 42.376468639837235, lng: -71.11823289325775 },
    title: 'Littauer Center of Public Administration',
    sid: '7NHGxdB7qDi',
  },
  {
    position: { lat: 42.372262942322884, lng: -71.11987174774083 }, 
    title: 'Weissman Preservation Center',
    sid: '8iApc5dtvmi',
  },
  {
    position: { lat: 42.37484391141072, lng: -71.11823573681987 }, 
    title: 'Harvard Hall',
    sid: 'DhGGdYSxAXN',
  },
  {
    position: { lat: 42.37563007285733, lng: -71.11323291791693 }, 
    title: 'Center for Government and International Studies',
    sid: 'FXNqoAZ3SHA',
  },
  {
    position: { lat: 42.37202569383172, lng: -71.11804970916374 }, 
    title: 'Lowell House',
    sid: 'Gb7TzfTuCoV',
  },
  {
    position: { lat: 42.37471210920963, lng: -71.11494780740425 }, 
    title: 'Robinson Hall',
    sid: 'GycExKiYVFp',
  },
];