
Link to the earthquake map: https://linetosoro.github.io/leaflet-challenge/

The United States Geological Survey(USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. 

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. The task at hand is to develop a way to visualize USGS data that will allow better education to the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Use both HTML and JavaScript

Create the Earthquake Visualization 

Your first task is to visualize an earthquake dataset. Complete the following steps:

Get your dataset. To do so, follow these steps:

The USGS provides earthquake data in a number of different formats, updated every 5 minutes.

When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. 

Import and visualize the data by doing the following:

Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

Hint: The depth of the earth can be found as the third coordinate for each earthquake.

Include popups that provide additional information about the earthquake when its associated marker is clicked.

Create a legend that will provide context for your map data.


Refrences: 

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson 

https://earthquake.usgs.gov/fdsnws/event/1/ 

https://stackoverflow.com/questions/40906118/is-it-possible-to-add-custom-html-to-leaflet-layer-groups-and-layers-control

https://www.w3schools.com/colors/colors_picker.asp?colorhex=FFFFFF 
