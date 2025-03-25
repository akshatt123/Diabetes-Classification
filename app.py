from flask import Flask, request, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load trained model
with open("model/model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from form
        input_features = [
            float(request.form["Pregnancies"]),
            float(request.form["Glucose"]),
            float(request.form["BloodPressure"]),
            float(request.form["SkinThickness"]),
            float(request.form["Insulin"]),
            float(request.form["BMI"]),
            float(request.form["DiabetesPedigreeFunction"]),
            float(request.form["Age"])
        ]

        # Convert input into NumPy array
        input_array = np.array(input_features).reshape(1, -1)

        # Predict
        prediction = model.predict(input_array)[0]
        probability = model.predict_proba(input_array)[0][1]  # Probability of diabetes

        result = "Diabetes Detected" if prediction == 1 else "No Diabetes"
        probability_percentage = f"{probability * 100:.2f}%"

        return render_template('result.html', result=result, probability=probability_percentage)
    
    except Exception as e:
        return render_template('result.html', result="Error", probability=str(e))

if __name__ == '__main__':
    app.run(debug=True)
