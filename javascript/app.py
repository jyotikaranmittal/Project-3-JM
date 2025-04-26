from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template
from pymongo import MongoClient

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/EVP_db"
mongo = PyMongo(app)



@app.route("/")
def home():
    return render_template("index.html")

@app.route("/EVP")
def EVP():

    print("get_data")
    # query={"Make":"TOYOTA"}
    # results =EV.find(query)
    # return jsonify(list(results))
    # query={"Make":"BMW"}
    results= mongo.db.Electric_vehicle.find().limit(5000)
    data=list(results)
    return jsonify(data)
    # return jsonify(list(results))
    # return render_template("EVP.html", results=list(results))

@app.route("/alt_fuel_stations")
def alt_fuel_stations():

    # print("get_data")
    # query={"State":"TX"}
    results= mongo.db.alt_fuel_stations.find().limit(7000)
    return jsonify(list(results))

@app.route("/script")
def script_page():
    return render_template("script.html")


@app.route("/fuel_script")
def fuel_script_page():
    return render_template("fuel_script.html")



    
if __name__ == '__main__':
    app.run(debug=True)
