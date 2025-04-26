// EV Dashboard JavaScript Code

console.log("EV Dashboard Loaded!");

// Fetch and display EV data
d3.json("/EVP").then(function (data) {
    console.log("Fetched Data:", data);

    // Extract relevant fields
    let make = data.map(d => d.Make);
    let city = data.map(d => d.City);
    let county = data.map(d => d.County);

    console.log("Makes:", make);
    console.log("Cities:", city);
    console.log("Counties:", county);

    // Bar Chart - EV Count by Make in Cities
    let trace1 = {
        x: make,
        y: city,
        type: "bar",
        marker: { color: "steelblue" }  // Change color of bars
    };
    let layout1 = {
        title: { text:"Electric Vehicles by Make in Cities"},
        xaxis: { title: "Make" },
        yaxis: { title: "City" }
    };
    Plotly.newPlot("bar-plot", [trace1], layout1);

    // Bar Chart - EV Count by Make in Counties
    let trace2 = {
        x: county,
        y: make,
        type: "bar",
        marker: { color: "darkorange" }  // Change color
    };
    let layout2 = {
        title: {text:"Electric Vehicles by Make in Counties"},
        xaxis: { title: "County" },
        yaxis: { title: "Make" }
    };
    Plotly.newPlot("bar-plot1", [trace2], layout2);
}).catch(function (error) {
    console.error("Error loading data:", error);
});

// Function to build the metadata panel
function buildMetadata(selectedMake) {
    d3.json("/EVP").then((data) => {
        let filteredData = data.filter(obj => obj.Make === selectedMake);
        console.log("Filtered Metadata:", filteredData);

        let panel = d3.select("#sample-metadata");
        panel.html(""); // Clear existing metadata

        if (filteredData.length > 0) {
            let result = filteredData[0]; // Use the first result
            Object.entries(result).forEach(([key, value]) => {
                panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
            });
        } else {
            panel.append("h6").text("No data available");
        }
    });
}

// Function to build the charts
function buildCharts(selectedMake) {
    d3.json("/EVP").then((data) => {
        let filteredData = data.filter(obj => obj.Make === selectedMake);

        // Count EV models
        let modelCounts = {};
        filteredData.forEach(d => {
            let model = d.Model || "Unknown"; // Handle missing models
            modelCounts[model] = (modelCounts[model] || 0) + 1;
        });

        let sortedModels = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

        // Bar Chart - Top 10 Models
        let barData = [{
            x: sortedModels.map(d => d[1]),
            y: sortedModels.map(d => d[0]),
            type: "bar",
            orientation: "h",
            marker: { 
                color: sortedModels.map((d, i) => 
                    ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#C70039", "#900C3F", "#581845", "#00A8A8", "#A833FF", "#FF3385"][i]
                ) // Assign different colors to each bar
            }
            
        }];
        let barLayout = { title: "Top 10 EV Models by Count" };
        Plotly.newPlot("bar", barData, barLayout);
    });
}

// Initialize the dashboard
function init() {
    d3.json("/EVP").then((data) => {
        let uniqueMakes = [...new Set(data.map(car => car.Make))];
        let dropdownMenu = d3.select("#selDataset");

        uniqueMakes.forEach(make => {
            dropdownMenu.append("option").text(make).property("value", make);
        });

        let firstMake = uniqueMakes[0];
        buildCharts(firstMake);
        buildMetadata(firstMake);
    });
}

// Event listener for dropdown selection
function optionChanged(newMake) {
    buildCharts(newMake);
    buildMetadata(newMake);
}

// Run initialization
init();


