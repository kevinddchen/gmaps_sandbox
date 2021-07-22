// Building metadata located in meta.js

// global vars to track buildings
let selectedBuilding = '';
let displayedBuildings = [];
const buildingListContainer = document.getElementById("building-list-container");

// Initialize and add the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17, // furthest zoom that can see buildings
    center: { lat: 42.37429224178242, lng: -71.11628459241092 }, // arbitrary start location
    mapId: 'b536490391ffa6c2',
  });

  // turn off point-of-interest visibility
  map.setOptions({ styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ]});

  map.moveCamera({
    center: new google.maps.LatLng(42.37429224178242, -71.11628459241092),
    zoom: 16,
    heading: 320,
    tilt: 47.5
  });

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

  // create markers using metadata and initialize building list
  for (let i=0; i < meta.length; i++) {
    const buildingInfo = meta[i];
    const marker = new google.maps.Marker({
      position: buildingInfo.position,
      map: map,
      icon: 'icon.png',
      collisionBehavior: google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
    });
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(makeContent(buildingInfo));
      infoWindow.open(marker.getMap(), marker);
    });

    displayedBuildings.push(buildingInfo);
    createBuildingListDiv(buildingInfo);
  };

  for(let i = 0; i<coorData.length; i++){
    var coordinates = buildCoordinatesArrayFromString(coorData[i]);
    const Polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#FF3158',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF3158',
      fillOpacity: 0.3
    })
    Polygon.setMap(map)
  }

function createBuildingListDiv(building) {
  const elt = document.createElement("div");
  elt.classList.add("building-list-item");
  elt.textContent = building.title;
  elt.dataset.value = building.sid;
  elt.onclick = () => {
    selectedBuilding = elt.dataset.value;
    renderBuildingsList();
  };
  buildingListContainer.appendChild(elt);
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

document.getElementById("searchbar-input").addEventListener("input", (ev) => {
  const search = ev.currentTarget.value.toLowerCase();
  displayedBuildings = meta.filter(b => b.title.toLowerCase().includes(search));
  renderBuildingsList();
});

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

}

