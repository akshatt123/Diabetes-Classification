// static/script.js
document.getElementById("predictionForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    let inputData = {
        Pregnancies: parseFloat(document.getElementById("Pregnancies").value),
        Glucose: parseFloat(document.getElementById("Glucose").value),
        BloodPressure: parseFloat(document.getElementById("BloodPressure").value),
        SkinThickness: parseFloat(document.getElementById("SkinThickness").value),
        Insulin: parseFloat(document.getElementById("Insulin").value),
        BMI: parseFloat(document.getElementById("BMI").value),
        DiabetesPedigreeFunction: parseFloat(document.getElementById("DiabetesPedigreeFunction").value),
        Age: parseFloat(document.getElementById("Age").value)
    };

    try {
        // Send request to backend
        let response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });

        let result = await response.json();
        if (result.error) {
            document.getElementById("result").innerText = "Error: " + result.error;
        } else {
            let message = result.prediction === 1 ? "Diabetes Detected" : "No Diabetes";
            document.getElementById("result").innerText = `${message} (Probability: ${(result.probability * 100).toFixed(2)}%)`;
        }
    } catch (error) {
        document.getElementById("result").innerText = "Error connecting to the server!";
    }
});
