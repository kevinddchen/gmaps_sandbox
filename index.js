// Building metadata located in meta.js

// global vars to track buildings
let selectedBuilding = '';
let displayedBuildings = [];
const buildingListContainer = document.getElementById("building-list-container");

//directions service set up
var map;
var directionsDisplay;
var directionsService;

// Initialize and add the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15, // furthest zoom that can see buildings
    center: { lat: 42.37429224178242, lng: -71.11628459241092 }, // arbitrary start location
    mapId: 'b536490391ffa6c2',
    restriction: {
      latLngBounds: {
        north: 42.39, 
        south: 42.35,
        west: -71.130,
        east: -71.107
      },
    },
  });
  
  //directions service set up
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);

  // turn off point-of-interest visibility
  map.setOptions({ styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ]});

  const buttons = [
    ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
    ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
    ["Tilt Down", "tilt", 20, google.maps.ControlPosition.BOTTOM_CENTER],
    ["Tilt Up", "tilt", -20, google.maps.ControlPosition.TOP_CENTER],
  ];
  buttons.forEach(([text, mode, amount, position]) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("button");
    if(text == "Rotate Left"){
      controlUI.classList.add("ui-left")
    }
    if(text == "Rotate Right"){
      controlUI.classList.add("ui-right")
    }
    if(text == "Tilt Down"){
      controlUI.classList.add("ui-Down")
    }
    if(text == "Tilt Up"){
      controlUI.classList.add("ui-Up")
    }
    controlUI.classList.add("ui-button");
    controlUI.addEventListener("click", () => {
      adjustMap(mode, amount);
    });
    controlDiv.appendChild(controlUI);
    map.controls[position].push(controlDiv);
  });

  const adjustMap = function (mode, amount) {
    switch (mode) {
      case "tilt":
        map.setTilt(map.getTilt() + amount);
        break;
      case "rotate":
        map.setHeading(map.getHeading() + amount);
        break;
      default:
        break;
    }
  };

  // create one infowindow for all markers
  const makeContent = x => 
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h1 id="firstHeading" class="firstHeading">${x.title}</h1>` +
    "</div>" +
    "<div>" + 
    `<p>${x.description}</p>`+
    "</div>" +
    '<iframe' +
    ' width="600"' +
    ' height="480"' +
    ` src="https://my.matterport.com/show?m=${x.sid}"` +
    ' frameborder="0"' +
    ' allow="fullscreen">' +
    '</iframe>';
  const infoWindow = new google.maps.InfoWindow({
    zIndex: 1,
  });

  //array to store markers
  let markerArray = []
  //console.log(meta);
  // create markers using metadata and initialize building list
  for (let i=0; i < meta.length; i++) {
    const buildingInfo = meta[i];
    displayedBuildings.push(buildingInfo);
    createBuildingListDiv(buildingInfo);
    createBuildingListSelect(buildingInfo);
  };

  //create highlighted area using coordinates
  for(let i = 0; i<coorData.length; i++){
    var coordinates = buildCoordinatesArrayFromString(coorData[i]);
    const Polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#FF3158',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF3158',
      fillOpacity: 0.3,
      clickable: false
    })
    Polygon.setMap(map)
  }

  var buildingA;
  var buildingB;

//function creates Div for the building list
function createBuildingListDiv(building) {
  const elt = document.createElement("div");
  elt.classList.add("building-list-item");
  elt.textContent = building.title;
  elt.dataset.value = building.sid;
  elt.onclick = () => {
    selectedBuilding = elt.dataset.value;
    renderBuildingsList();
    const marker = new google.maps.Marker({
      title:building.title,
      position: building.position,
      map: map,
      icon: 'icon.png',
      collisionBehavior: google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
    });
    map.moveCamera({
      center: new google.maps.LatLng(building.position.lat, building.position.lng),
      zoom: 17,
    });
    markerArray.push(marker)
    document.getElementById('start').value = building.title;
    const startMenu = building.title;
    buildingA = meta.find(b => b.title === startMenu);
    infoWindow.close();
    infoWindow.setContent(makeContent(building));
    infoWindow.open(marker.getMap(), marker);
  };
  buildingListContainer.appendChild(elt);
}

document.getElementById("searchbar-input").addEventListener("input", (ev) => {
  const search = ev.currentTarget.value.toLowerCase();
  displayedBuildings = meta.filter(b => b.title.toLowerCase().includes(search));
  renderBuildingsList();
});

// Event listeners

const endMenu = document.getElementById('end');
endMenu.addEventListener('change', (event) => {
  const value = event.currentTarget.value;
  buildingB = meta.find(b => b.title === value);
  calculateAndDisplayRoute(directionsService, directionsDisplay, buildingA.position, buildingB.position);
});

//function creates Select for the directions
function createBuildingListSelect(building) {
  let select = document.getElementById('end');
  const opt = document.createElement("option");
  opt.value = building.title;
  opt.text = building.title;
  select.add(opt, null);
}

//click event to clean current route
let btn = document.getElementById('clean');
btn.addEventListener("click", function() {
  if (directionsDisplay != null) {
    directionsDisplay.setMap(null);
  }
});

}

//function to save coordinates data into array
function buildCoordinatesArrayFromString(MultiGeometryCoordinates){
  var finalData = [];
  var grouped = MultiGeometryCoordinates.split("\n");

  grouped.forEach(function(item, i){
      let a = item.trim().split(',');

      finalData.push({
          lng: parseFloat(a[0]),
          lat: parseFloat(a[1])
      });
  });

  return finalData;
}

//function to calculate and display desired route
function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  directionsDisplay.setMap(map);
  directionsService
    .route({
      origin: origin,
      destination: destination,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: "WALKING",
    })
    .then((response) => {
      directionsDisplay.setDirections(response);
    })
    .catch((e) => console.log("Directions request failed due to " + e));
}

function renderBuildingsList() {
  Array.from(buildingListContainer.children).sort((a, b) => {
    return a.title.localeCompare(b.title);
  })
  .forEach(item => {
    const val = item.dataset.value;
    // check if building should be hidden
    if (!displayedBuildings.find(b => b.sid === val)) {
      item.style.display = "none";
      return;
    }
    item.style.display = "block";
    item.classList.remove("selected");
    if (item.dataset.value === selectedBuilding) {
      item.classList.add("selected");
    }
  });
}

