from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import requests
import io
import os
import csv

# ================== INIT ==================
load_dotenv()

app = Flask(__name__)
CORS(app)

# ================== MONGODB ==================
MONGO_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGO_URI)
db = client["sfas"]

# ================== HOME ==================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend working"})

# ================== ML ADVISORY ==================
from ml_model import predict_crop_ml

@app.route("/api/advisory", methods=["POST"])
def advisory():
    try:
        data = request.get_json()

        crop, confidence, feature_importance = predict_crop_ml(
            data["nitrogen"],
            data["phosphorus"],
            data["potassium"],
            data["temperature"],
            data["humidity"],
            data["rainfall"],
            data["ph"]
        )

        advisory_doc = {
            "crop": crop,
            "nitrogen": data["nitrogen"],
            "phosphorus": data["phosphorus"],
            "potassium": data["potassium"],
            "temperature": data["temperature"],
            "humidity": data["humidity"],
            "rainfall": data["rainfall"],
            "ph": data["ph"],
            "confidence": confidence,
            "feature_importance": feature_importance,
            "created_at": datetime.utcnow()
        }

        db.advisories.insert_one(advisory_doc)

        return jsonify({
            "crop": crop,
            "recommendation": f"Grow {crop}",
            "ml_prediction": confidence,
            "feature_importance": feature_importance,
            "explanation": (
                f"{crop} is recommended based on soil nutrients "
                f"and weather conditions using machine learning."
            ),
            "benefits": {
                "yield": round(confidence * 100, 2),
                "cost": 30,
                "loss": 15
            }
        })

    except Exception as e:
        print("Advisory error:", e)
        return jsonify({"error": "Failed to generate advisory"}), 500

# ================== DAILY ANALYTICS ==================
@app.route("/api/analytics", methods=["GET"])
def analytics_daily():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "crop": "$crop",
                    "date": {
                        "$dateToString": {
                            "format": "%Y-%m-%d",
                            "date": "$created_at"
                        }
                    }
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "_id": 0,
                "crop": "$_id.crop",
                "date": "$_id.date",
                "count": 1
            }
        },
        {"$sort": {"date": 1}}
    ]

    return jsonify(list(db.advisories.aggregate(pipeline)))

# ================== WEEKLY ANALYTICS ==================
@app.route("/api/analytics/weekly", methods=["GET"])
def analytics_weekly():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "crop": "$crop",
                    "week": {"$isoWeek": "$created_at"},
                    "year": {"$isoWeekYear": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "_id": 0,
                "crop": "$_id.crop",
                "week": "$_id.week",
                "year": "$_id.year",
                "count": 1
            }
        },
        {"$sort": {"year": 1, "week": 1}}
    ]

    return jsonify(list(db.advisories.aggregate(pipeline)))

# ================== MONTHLY ANALYTICS ==================
@app.route("/api/analytics/monthly", methods=["GET"])
def analytics_monthly():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "crop": "$crop",
                    "month": {"$month": "$created_at"},
                    "year": {"$year": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "_id": 0,
                "crop": "$_id.crop",
                "month": "$_id.month",
                "year": "$_id.year",
                "count": 1
            }
        },
        {"$sort": {"year": 1, "month": 1}}
    ]

    return jsonify(list(db.advisories.aggregate(pipeline)))

# ================== CSV EXPORT ==================
@app.route("/api/analytics/export", methods=["GET"])
def export_csv():
    records = list(db.advisories.find({}, {"_id": 0}))

    if not records:
        return jsonify({"error": "No data to export"}), 400

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=records[0].keys())
    writer.writeheader()

    for r in records:
        r["created_at"] = r["created_at"].strftime("%Y-%m-%d %H:%M")
        writer.writerow(r)

    output.seek(0)

    return send_file(
        io.BytesIO(output.getvalue().encode()),
        mimetype="text/csv",
        as_attachment=True,
        download_name="sfas_analytics.csv"
    )

# ================== WEATHER ==================
@app.route("/api/weather/<location>")
def weather(location):
    try:
        api_key = os.getenv("OPENWEATHER_API_KEY")
        url = (
            "https://api.openweathermap.org/data/2.5/weather"
            f"?q={location},IN&units=metric&appid={api_key}"
        )

        res = requests.get(url, timeout=5).json()

        return jsonify({
            "temp": res["main"]["temp"],
            "humidity": res["main"]["humidity"],
            "rainfall": res.get("rain", {}).get("1h", 0),
            "condition": res["weather"][0]["description"],
            "wind": res["wind"]["speed"],
            "city": res["name"]
        })

    except Exception as e:
        print("Weather error:", e)
        return jsonify({"error": "Weather fetch failed"}), 500

# ================== PDF REPORT ==================
@app.route("/api/report", methods=["GET"])
def report():
    file = io.BytesIO()
    file.write(b"SFAS - Smart Farming Advisory System\n\nReport Generated")
    file.seek(0)

    return send_file(
        file,
        as_attachment=True,
        download_name="SFAS_Report.txt",
        mimetype="application/octet-stream"
    )

# ================== RUN ==================
if __name__ == "__main__":
    app.run(port=5000, debug=True)
