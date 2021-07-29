// Building metadata located in meta.js

// global vars to track buildings
let selectedBuilding = '';
let displayedBuildings = [];
const buildingListContainer = document.getElementById("building-list-container");

//directions service set up
var map;
var directionsDisplay;
var directionsService;
var distanceService;

let mainMenu = document.getElementById("menu");
let directionsMenu = document.getElementById("directions");
let closeDirections = document.getElementById("close-directions-button");

closeDirections.addEventListener("click", () => {
  directionsMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
});

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
  distanceServer = new google.maps.DistanceMatrixService();

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

// create markers using metadata
for (let i=0; i < meta.length; i++) {
  const marker = new google.maps.Marker({
    position: meta[i].position,
    map: map,
    icon: {
      labelOrigin: new google.maps.Point(15,30),
      url: "icon.png"
    },
    label: {
      text: ' ',
      color: "black",
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  marker.addListener("click", () => {
    const location = meta[i].position;
    //calculateAndDisplayRoute(directionsService, directionsRenderer, { lat: 42.376468639837235, lng: -71.11823289325775 }, location);
    infoWindow.close();
    infoWindow.setContent(makeContent(meta[i]));
    infoWindow.open(marker.getMap(), marker);
    map.moveCamera({
      center: new google.maps.LatLng(meta[i].position.lat, meta[i].position.lng),
      zoom: 18,
    });
    markerArray.push(marker)
  });

  marker.addListener('mouseover', () => {
    var Icon = marker.getIcon();
    Icon.url = 'iconRed.png';
    marker.setIcon(Icon);
    var label = marker.getLabel();
    label.text = meta[i].title;
    marker.setLabel(label);
    
  });

  marker.addListener('mouseout', () => {
    var Icon = marker.getIcon();
    Icon.url = 'icon.png';
    marker.setIcon(Icon);
    var label = marker.getLabel();
    label.text = ' ';
    marker.setLabel(label);
  });
};

//function creates Div for the building list
function createBuildingListDiv(building) {
  const elt = document.createElement("div");
  elt.classList.add("building-list-item");
  elt.textContent = building.title;
  elt.dataset.value = building.sid;
  elt.onclick = () => {
    selectedBuilding = elt.dataset.value;
    renderBuildingsList();
    document.getElementById('start').value = building.title;
    const startMenu = building.title;
    buildingA = meta.find(b => b.title === startMenu);
    map.moveCamera({
      center: new google.maps.LatLng(buildingA.position.lat, buildingA.position.lng),
      zoom: 20,
      tilt: 40
    });
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
  // if (directionsDisplay != null) {
  //   directionsDisplay.setMap(null);
  // }
  // document.getElementById('end').value = " ";
  // document.getElementById('start').value = " ";

  mainMenu.classList.add("hide");
  directionsMenu.classList.remove("hide");

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
  directionsDisplay.setPanel(document.getElementById("direction-steps"));
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
      console.log(response);
      const steps = response.routes[0].legs[0].steps;
//       steps.forEach(s => {
//         const div = document.createElement("div");
//         div.classList.add("direction-step-div");
//         div.innerHTML = s.instructions;
//         document.getElementById("direction-steps").appendChild(div);
//       });
    })
    .catch((e) => console.log("Directions request failed due to " + e));
    requestAnimationFrame(animate);
  
  
}

let mouseDown = false;

document.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.addEventListener("mouseup", () => {
  mouseDown = false;
})

let heading = 0;
let tilt = 60;
function animate() {
  if (map && !mouseDown) {
    heading += 0.2;
    map.moveCamera({ heading, tilt });
  }

  requestAnimationFrame(animate);
}


function renderBuildingsList() {
  Array.from(buildingListContainer.children).forEach(item => {
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

