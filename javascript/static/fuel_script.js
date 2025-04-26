// Fetch and display alternative fuel station data
d3.json("/alt_fuel_stations").then(function (data) {
    console.log("Fetched Data:", data);

    // Count occurrences of each state
    let stateCounts = {};
    data.forEach(d => {
        let state = d.State || "Unknown"; // Handle missing state values
        stateCounts[state] = (stateCounts[state] || 0) + 1;
    });

    // Sort and get top 10 states
    let sortedStates = Object.entries(stateCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
        .slice(0, 10); // Get top 10

    let states = sortedStates.map(d => d[0]);
    let stationCounts = sortedStates.map(d => d[1]);

    console.log("Top 10 States:", states);
    console.log("Station Counts:", stationCounts);

    // Bar Chart - Top 10 States with Most Alternative Fuel Stations
    let trace = {
        x: states,
        y: stationCounts,
        type: "bar",
        marker: { color: "teal" }
    };
    
    let layout = {
        title: {text:"Top 10 States with Most Alternative Fuel Stations"},
        xaxis: { title: "State" },
        yaxis: { title: "Number of Stations" }
    };

    Plotly.newPlot("bar-plot", [trace], layout);
}).catch(function (error) {
    console.error("Error loading data:", error);
});

// Fetch and display alternative fuel station data
d3.json("/alt_fuel_stations").then(function (data) {
    console.log("Fetched Data:", data);

    // Filter for stations in California (CA)
    let caData = data.filter(d => d.State === "CA");

    // Count occurrences of each city within California
    let cityCounts = {};
    caData.forEach(d => {
        let city = d.City || "Unknown"; // Handle missing city values
        cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    // Sort and get top 10 cities in California
    let sortedCities = Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
        .slice(0, 10); // Get top 10

    let cities = sortedCities.map(d => d[0]);
    let stationCounts = sortedCities.map(d => d[1]);

    console.log("Top 10 Cities in CA:", cities);
    console.log("Station Counts:", stationCounts);

    // Pie Chart - Top 10 Cities in California with Most Alternative Fuel Stations
    let pieData = [{
        labels: cities,
        values: stationCounts,
        type: "pie",
        marker: { colors: ["#FF6347", "#98C4E1", "#F6E2B3", "#E8A1C6", "#D4E157", "#FFB74D", "#FF8A65", "#81C784", "#4CAF50", "#00ACC1"] }
    }];

    let pieLayout = {
        title: {text:"Top 10 Cities in California with Most Alternative Fuel Stations"},
        showlegend: true
    };

    Plotly.newPlot("pie-chart", pieData, pieLayout);
}).catch(function (error) {
    console.error("Error loading data:", error);
});




        // // Add OpenStreetMap tiles
        // let mymap = L.map('map').setView([37.7749, -122.4194], 10);
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '© OpenStreetMap contributors'
        // }).addTo(map);

        // // Fetch station data from Flask API
        // fetch("http://127.0.0.1:5000/api/stations")
        //     .then(response => response.json())
        //     .then(stations => {
        //         stations.forEach(station => {
        //             L.marker([station.lat, station.lon])
        //                 .addTo(map)
        //                 .bindPopup(`<b>${station.name}</b><br>Fuel Type: ${station.fuel_type}`);
        //         });
        //     })
        //     .catch(error => console.error("Error fetching data:", error));

        fetch('http://127.0.0.1:5000/alt_fuel_stations')  
        .then(response => response.json())
        .then(data => processFuelStations(data))
        .catch(error => console.error('Error fetching data:', error));
    
    function processFuelStations(data) {
        let cityCounts = {};
    
        // Count stations in each city
        data.forEach(station => {
            if (station.city) {  // Ensure city exists
                cityCounts[station.city] = (cityCounts[station.city] || 0) + 1;
            }
        });
    
        // Get top 10 cities by station count
        let topCities = Object.entries(cityCounts)
            .sort((a, b) => b[1] - a[1])  // Sort by station count (descending)
            .slice(0, 10);  // Take top 10
    
        console.log("Top 10 Cities:", topCities);
    
        // Add markers for fuel stations in the top 10 cities
        data.forEach(station => {
            if (station.city && topCities.some(city => city[0] === station.city)) {
                if (station.latitude && station.longitude) {  // Ensure coordinates exist
                    let coords = [station.latitude, station.longitude];
    
                    // Optional: Create a Turf.js point (only if needed)
                    if (typeof turf !== "undefined") {
                        let point = turf.point(coords);
                    }
    
                    // Construct the popup content
                    let popupContent = `
                        <b>${station.station_name}</b><br>
                        <b>Fuel Type:</b> ${station.fuel_type_code}<br>
                        <b>Address:</b> ${station.street_address}<br>
                        ${station.intersection_directions ? `<b>Intersection:</b> ${station.intersection_directions}<br>` : ""}
                        <b>City:</b> ${station.city}, ${station.state} ${station.zip}
                    `;
    
                    // Add marker to the Leaflet map
                    if (typeof map !== "undefined") {  // Ensure map is defined
                        L.marker(coords)
                            .bindPopup(popupContent)
                            .addTo(map);
                    } else {
                        console.error("Leaflet map is not defined.");
                    }
                }
            }
        });
    }
    