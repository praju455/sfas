from ml_model import predict_yield

def get_advisory(crop, soil, season):
    advisory = {
        "Crop": crop,
        "Soil": soil,
        "Season": season,
        "Fertilizer": "NPK 120:60:40 kg/ha",
        "Irrigation": "Every 7 days",
        "Pests": "Stem borer, Aphids",
        "ML Prediction": predict_yield(28, "High")
    }
    return advisory
