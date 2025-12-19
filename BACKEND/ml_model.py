import pickle
import numpy as np

model = pickle.load(open("crop_model.pkl", "rb"))

def predict_crop_ml(n, p, k, temp, humidity, rainfall, ph):
    input_data = np.array([[n, p, k, temp, humidity, rainfall, ph]])

    predicted_crop = model.predict(input_data)[0]
    confidence = max(model.predict_proba(input_data)[0])

    return predicted_crop, float(confidence)
