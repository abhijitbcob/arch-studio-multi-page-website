var mymap = L.map("mapid").setView([33.49057868873611, -89.58391610961591], 7);

var blackIcon = L.icon({
  iconUrl: "../assets/icons/location-mark.svg",

  iconSize: [38, 95], // size of the icon
});

var marker1 = L.marker([33.52301831796869, -86.81306675185802], {
  icon: blackIcon,
}).addTo(mymap);

var marker2 = L.marker([32.511850102488, -92.11902701939424], {
  icon: blackIcon,
}).addTo(mymap);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJoaWppdGJjb2IiLCJhIjoiY2tyZWttMXJwMHA4ajJvb2UyM2x5OWlvdyJ9.gG49w8uAWxHtMobo1jxr2g",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWJoaWppdGJjb2IiLCJhIjoiY2tyZWttMXJwMHA4ajJvb2UyM2x5OWlvdyJ9.gG49w8uAWxHtMobo1jxr2g",
  }
).addTo(mymap);
