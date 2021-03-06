// Building metadata located in meta.js

// global vars to track buildings
let selectedBuilding = "";
let displayedBuildings = [];
const buildingListContainer = document.getElementById("building-list-container");
let buildingA;
let buildingB;

//global variables for animations
let heading = 0;
let tilt = 60;

//directions service set up
var map;
var directionsDisplay;
var directionsService;
var distanceService;

//global variable for language
let control;


let mainMenu = document.getElementById("menu");
let directionsMenu = document.getElementById("directions");


const endSelect = document.getElementById("end");
endSelect.addEventListener("change", (event) => updateRoute(event.currentTarget.value, false));
const startSelect = document.getElementById("start");
startSelect.addEventListener("change", (event) => updateRoute(event.currentTarget.value, true));


// Initialize and add the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16, // furthest zoom that can see buildings
    center: { lat: 42.37429224178242, lng: -71.11628459241092 }, // arbitrary start location
    mapId: "b536490391ffa6c2",
    restriction: {
      latLngBounds: {
        north: 42.39, 
        south: 42.35,
        west: -71.130,
        east: -71.107
      },
    },
  });

  //localization service set up
  control = document.getElementById("selection-box");
  let region = document.getElementById("region");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);
  // Due to the time between when the map is loaded and the control div is
  // added to the page it creates a jarring effect. This is a best effort
  // to minimize that.
  google.maps.event.addListenerOnce(map, "tilesloaded", function(e) {
    control.style.display = "none";
    region.style.display = "none";
  });
  showDirections();
  
  //directions service set up
  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: new google.maps.Polyline({
      // map: map,
      strokeColor: "#385DFF",
      strokeWeight: 4,
      strokeOpacity: 0.6,
    }),
  });
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

  const windowLabels = new google.maps.InfoWindow({
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
      strokeColor: "#ff3158",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#ff3158",
      fillOpacity: 0.3,
      clickable: false
    })
    
    Polygon.setMap(map)
  }

  //create highlighted area for buildings using coordinates
  for(let i = 0; i<buildings.length; i++){
    var coordinates = buildCoordinatesArrayFromString(buildings[i]);
    const Polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: "#ffffed",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#ffffed",
      fillOpacity: 0,
      visible: true
    });
    Polygon.addListener("mouseover",() => {
      Polygon.setOptions({strokeOpacity: 0.8, strokeWeight: 3});
    });

    Polygon.addListener("mouseout",() => {
      Polygon.setOptions({strokeOpacity: 0.8, strokeWeight: 1});
    });
    Polygon.setMap(map) 
  }

  // create markers using metadata
  var labelsArray = [];
  for (let i=0; i < meta.length; i++) {
    const marker = new google.maps.Marker({
      position: meta[i].position,
      map: map,
      icon: {
        labelOrigin: new google.maps.Point(15,30),
        url: "icon.png"
      },
      label: {
        text: " ",
        color: "black",
        fontWeight: "bold",
        fontSize: "16px"
      },
      title: meta[i].title
    });

    const location = meta[i].sid;

    marker.addListener("click", () => {
      //calculateAndDisplayRoute(directionsService, directionsRenderer, { lat: 42.376468639837235, lng: -71.11823289325775 }, location);
      infoWindow.close();
      infoWindow.setContent(makeContent(meta[i]));
      infoWindow.open(marker.getMap(), marker);
      map.moveCamera({
        center: new google.maps.LatLng(meta[i].position.lat, meta[i].position.lng),
        zoom: 18,
      });
      markerArray.push(marker)
      console.log(labelsArray);

    });

    marker.addListener("mouseover", () => {
      windowLabels.close();
      windowLabels.setContent(marker.getTitle());
      windowLabels.open(marker.getMap(), marker);
      var Icon = marker.getIcon();
      Icon.url = "iconRed.png";
      marker.setIcon(Icon);
      dirIcon = document.getElementById(location).style.display="block";
    });


    marker.addListener("mouseout", () => {
      var Icon = marker.getIcon();
      Icon.url = "icon.png";
      marker.setIcon(Icon);
      windowLabels.close();
      dirIcon = document.getElementById(location).style.display="none";
    });
  };
}


document.getElementById("searchbar-input").addEventListener("input", (ev) => {
  const search = ev.currentTarget.value.toLowerCase();
  displayedBuildings = meta.filter(b => b.title.toLowerCase().includes(search));
  renderBuildingsList();
});

function updateRoute(value, isStart) {
  if (isStart) {
    buildingA = meta.find(b => b.title === value);
  } else {
    buildingB = meta.find(b => b.title === value);
  }
  if (directionsDisplay != null) {
    directionsDisplay.setMap(null);
  }
  stopAnimation();
  calculateAndDisplayRoute(directionsService, directionsDisplay, buildingA.position, buildingB.position);
}

//function creates Div for the building list
function createBuildingListDiv(building) {
  const elt = document.createElement("div");
  const dir = document.createElement("button");
  elt.classList.add("building-list-item");
  elt.textContent = building.title;
  elt.dataset.value = building.sid;
  dir.setAttribute("id", building.sid);
  dir.classList.add("navigation");
  dir.addEventListener("click", () => {
    mainMenu.classList.add("hide");
    directionsMenu.classList.remove("hide");
  });
  elt.appendChild(dir);
  elt.onclick = () => {
    selectedBuilding = elt.dataset.value;
    renderBuildingsList();
    startSelect.value = building.title;
    const start = building.title;
    buildingA = meta.find(b => b.title === start);
    map.moveCamera({
      center: new google.maps.LatLng(buildingA.position.lat, buildingA.position.lng),
      zoom: 20,
      tilt: 40
    });
  };

  elt.onmouseover = () => {
    dir.style.display = "block";
  };

  elt.onmouseout = () => {
    dir.style.display = "none";
  };
  buildingListContainer.appendChild(elt);
}

//function creates Select for the directions
function createBuildingListSelect(building) {
  const endOpt = document.createElement("option");
  endOpt.value = building.title;
  endOpt.text = building.title;
  endSelect.add(endOpt, null);

  const startOpt = document.createElement("option");
  startOpt.value = building.title;
  startOpt.text = building.title;
  startSelect.add(startOpt, null);

  endSelect.value = null;
  startSelect.value = null;
}

//click event to clear current route
let btn = document.getElementById("close-directions-button");
btn.addEventListener("click", function() {
  if (directionsDisplay != null) {
    directionsDisplay.setMap(null);
    directionsDisplay.setPanel(null);
  }
  if (midpointMarker) midpointMarker.setMap(null);
  stopAnimation();
  endSelect.value = null;
  startSelect.value = null;
  buildingA = null;
  buildingB = null;
});

//click event to go back to main side menu
let closeDirections = document.getElementById("go-back-button");
closeDirections.addEventListener("click", () => {
  directionsMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
  if (directionsDisplay != null) {
    directionsDisplay.setMap(null);
  }
  if (midpointMarker) midpointMarker.setMap(null);
  stopAnimation();
  document.getElementById("end").value = " ";
  map.moveCamera({
    center: {lat: 42.37429224178242, lng: -71.11628459241092 },
    zoom: 15,
    tilt: 0,
    heading: 0
  });
});

//click event to pop up language window
let language = document.getElementById("Language");
language.addEventListener("click", () => {
  control.style.display = "block";
});


//function to save coordinates data into array
function buildCoordinatesArrayFromString(MultiGeometryCoordinates){
  var finalData = [];
  var grouped = MultiGeometryCoordinates.split("\n");

  grouped.forEach(function(item, i){
      let a = item.trim().split(",");

      finalData.push({
          lng: parseFloat(a[0]),
          lat: parseFloat(a[1])
      });
  });

  return finalData;
}

// track midpoint label
let midpointMarker;

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

      const distance = response.routes[0].legs[0].distance.value;
      const distanceObj = response.routes[0].legs[0].distance;

      const steps = response.routes[0].legs[0].steps;
      let path = [];
      steps.forEach(step => path.push(...(step.lat_lngs)));
      path = path.map(p => {return { lat: p.lat(), lng: p.lng() }})

      const frac = 0.5;
      let dist = 0;
      const targetDist = frac * distance;
      let mid;
      for (let i = 0; i < path.length; i++) {
        if (i >= path.length-2) return;
        const p0 = path[i];
        const p1 = path[i+1];
        const d = haversineDistance(p0, p1);
        // check if we found the segment containing the midpoint
        if (dist + d > targetDist) {
          const t = (targetDist - dist) / d;
          mid = {
            lat: p0.lat,
            lng: p0.lng,
          };
          break;
        }
        dist += d;
      };

      // remove previous marker
      if (midpointMarker) midpointMarker.setMap(null);
      midpointMarker = new google.maps.Marker({
        position: mid,
        map: map,
        icon: {
          labelOrigin: new google.maps.Point(10,10),
          path: google.maps.SymbolPath.CIRCLE,
          scale: 1,
          fillColor: "transparent",
          strokeColor: "transparent",
        },
        label: {
          className: "midpoint-label",
          text: `${distanceObj.text}`,
        }
      });
      
    })
    .catch((e) => console.log("Directions request failed due to " + e));
    requestAnimationFrame(animate);
}

/**
 * Copied from https://www.movable-type.co.uk/scripts/latlong.html
 * Calculates the distance between two lat-lng coordinates.
 * @param {{lat:number,lng:number}} p0 Point 0 (start)
 * @param {{lat:number,lng:number}} p1 Point 1 (end)
 * @returns Distance between the points in meters
 */
 function haversineDistance(p0, p1) {
  const [lat0, lng0] = [p0.lat, p0.lng];
  const [lat1, lng1] = [p1.lat, p1.lng];
  	
  const R = 6371e3; // metres
  const phi0 = lat0 * Math.PI/180; // phi, lambda in radians
  const phi1 = lat1 * Math.PI/180;
  const delPhi = (lat1-lat0) * Math.PI/180;
  const delLam = (lng1-lng0) * Math.PI/180;

  const a = Math.sin(delPhi/2) * Math.sin(delPhi/2) +
            Math.cos(phi0) * Math.cos(phi1) *
            Math.sin(delLam/2) * Math.sin(delLam/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // in metres

  return d;
}

let mouseDown = false;

document.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.addEventListener("mouseup", () => {
  mouseDown = false;
})

var animation;
function animate() {
  if (mouseDown) return;
  if (map && !mouseDown) {
    heading += 0.2;
    map.moveCamera({ heading, tilt });
  }

  animation = requestAnimationFrame(animate);
}

function stopAnimation() {
  cancelAnimationFrame(animation);
  var name = document.getElementById("start").value;
  building = meta.find(b => b.title === name);
  map.moveCamera({
    center: new google.maps.LatLng(building.position.lat, building.position.lng),
    zoom: 20,
    tilt: 40
  });
}

function renderBuildingsList() {
  Array.from(buildingListContainer.children).sort((a, b) => {
    return a.title.localeCompare(b.title);
  })
  .forEach(item => {
    const val = item.dataset.value;
    // check if building should be hidden
    if (!displayedBuildings.find(b => b.sid === val)) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
    item.classList.remove("selected");
    if (item.dataset.value === selectedBuilding) {
      item.classList.add("selected");
    }
  });
}

