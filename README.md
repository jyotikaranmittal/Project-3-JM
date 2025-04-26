# Project-3-JM

Project Overview
This project explores the electric vehicle (EV) population in Washington State along with alternative fuel station data. The goal is to visualize and understand the EV trends and fuel station distribution using real-world data, database integration, and interactive dashboards.

Data sources:-
Alt Fuel Stations Locations--- https://catalog.data.gov/dataset/?q=electric+vehicles&organization_type=Federal+Government
Electric Vehicle Population-----https://catalog.data.gov/dataset/

Project :---

project/
│
├── electric.ipynb            # Jupyter notebook for data cleaning and exploration
|
|---Databases -- MongoDB  # Mongo DB used to make databases 
├── data/
│   ├── ev_population.csv     # Electric vehicle population dataset source:--https://catalog.data.gov/dataset/
│   └── alt_fuel_stations.csv # Alternative fuel station dataset Source:--https://catalog.data.gov/dataset/?q=electric+vehicles&organization_type=Federal+Government
│
├── javascript/
│   ├── static/
│   │   ├── fuel_script.js    # Script for visualizing fuel station data
│   │   └── script.js         # Script for visualizing EV population data
│   │
│   ├── templates/
│   │   ├── fuel_script.html  # HTML page for fuel station visualization
│   │   ├── script.html       # HTML page for EV population visualization
│   │   └── index.html        # Main landing page
│   │
│   └── app.py                # Flask app to serve the visualizations
│
└── README.md                 # Project overview and documentation



Tools and Technologies Used:---

MongoDB – For storing and querying structured EV and fuel station data

Python (Jupyter Notebook) – Data processing and cleaning using pandas

Flask – Web framework to serve data and visualizations

JavaScript (D3.js or Plotly) – For creating interactive charts and maps

HTML/CSS – Web front-end structure and styling


Features:---


Interactive maps and charts to visualize:

Distribution of EVs across counties
![alt text](<Screenshot (46).png>)
electric vehicles by make in cities
dropdown to know different Models of different make,Electric Range and electric vehicle type
![alt text](<Screenshot (47).png>)

Types of EVs registered


Locations of alternative fuel stations
Top 10 states with Most alternative Fuel Stations
Top 10 cities in California with Most Alternative Fuel Stations
![alt text](<Screenshot (45).png>)

Integration of cleaned data into MongoDB

Web dashboard to display visualizations using Flask

How to Run the Project:--

Clone the Repository:--

git clone <your-repo-url>
cd project
Load the data into MongoDB (you can use electric.ipynb for data insertion).
Navigate to the javascript folder and run the Flask app:
python app.py
Open http://127.0.0.1:5000/ in your browser.