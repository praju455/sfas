from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient



app = Flask(__name__)
CORS(app)

# ✅ MongoDB connection (NO SPACES)
client = MongoClient(
    "mongodb+srv://prajwal:Praju%402006@sfas.hd7dxqp.mongodb.net/sfas?retryWrites=true&w=majority"
)
db = client["sfas"]

# ---------------- HOME ----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend working"})

# ---------------- ADVISORY API ----------------
from ml_model import predict_yield

@app.route("/api/advisory", methods=["POST"])
def advisory():
    data = request.get_json(force=True)

    crop = data.get("crop")
    soil = data.get("soil")
    season = data.get("season")
    location = data.get("location", "India")

    # Location override
    if location == "Karnataka":
        crop = "Ragi"
    elif location == "Punjab":
        crop = "Wheat"

    # ✅ ML prediction AFTER final crop
    ml_score = predict_yield(crop, soil, season, location)

    advisory_data = {
        "crop": crop,
        "soil": soil,
        "season": season,
        "location": location,
        "recommendation": f"Grow {crop}",
        "ml_prediction": ml_score,
        "explanation": f"{crop} suits {soil} soil in {season} season at {location}",
        "benefits": {
            "yield": ml_score,
            "cost": 30,
            "loss": 15
        }
    }

    db.advisories.insert_one(advisory_data)
    advisory_data.pop("_id", None)

    return jsonify(advisory_data)




# ---------------- ANALYTICS API ----------------
@app.route("/api/analytics", methods=["GET"])
def analytics():
    pipeline = [
        {
            "$group": {
                "_id": "$crop",
                "count": {"$sum": 1}
            }
        }
    ]

    results = list(db.advisories.aggregate(pipeline))

    analytics_data = [
        {
            "crop": item["_id"],
            "count": item["count"]
        }
        for item in results
    ]

    return jsonify(analytics_data)


    

@app.route("/api/weather")
def weather():
    return jsonify({
        "temp": 29,
        "rainfall": "Moderate",
        "humidity": 65
    })



# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
