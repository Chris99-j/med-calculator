function calculateBMI() {
  const weight = parseFloat(document.getElementById("bmi-weight").value);
  const height = parseFloat(document.getElementById("bmi-height").value) / 100;
  const bmiReco = document.getElementById("bmi-reco");

  if (weight > 0 && height > 0) {
    const bmi = weight / (height * height);
    let category = "";
    let reco = "";

    if (bmi < 18.5) {
      category = "Underweight";
      reco = "Consider increasing your calorie intake with nutrient-rich foods.";
    } else if (bmi < 24.9) {
      category = "Normal";
      reco = "Great job! Maintain your current lifestyle.";
    } else if (bmi < 29.9) {
      category = "Overweight";
      reco = "Try to incorporate regular exercise and a balanced diet.";
    } else {
      category = "Obese";
      reco = "Consult a doctor or dietitian for a weight management plan.";
    }

    document.getElementById("bmi-result").textContent = `BMI: ${bmi.toFixed(2)} (${category})`;
    bmiReco.textContent = `Recommendation: ${reco}`;
  }
}


function calculateBMR() {
  const w = parseFloat(document.getElementById("bmr-weight").value);
  const h = parseFloat(document.getElementById("bmr-height").value);
  const a = parseFloat(document.getElementById("bmr-age").value);
  const g = document.getElementById("bmr-gender").value;
  const bmrReco = document.getElementById("bmr-reco");

  if (w > 0 && h > 0 && a > 0) {
    const bmr = g === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    document.getElementById("bmr-result").textContent = `BMR: ${bmr.toFixed(2)} kcal/day`;
    bmrReco.textContent = "This is your base calorie burn at rest. Use it as a guide to adjust your food intake based on your goals.";
  }
}


function calculateWater() {
  const w = parseFloat(document.getElementById("water-weight").value);
  const waterReco = document.getElementById("water-reco");

  if (w > 0) {
    const ml = w * 35;
    const liters = (ml / 1000).toFixed(2);
    document.getElementById("water-result").textContent = `Recommended: ${liters} L/day (${ml} ml)`;
    waterReco.textContent = "Drink steadily throughout the day. Increase intake during exercise or hot weather.";
  }
}

function copyToClipboard() {
  const bmi = document.getElementById("bmi-result").textContent;
  const bmr = document.getElementById("bmr-result").textContent;
  const water = document.getElementById("water-result").textContent;

  const text = `Health Calculator Results:\n\n${bmi}\n${bmr}\n${water}`;
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById("export-status").textContent = "✅ Results copied to clipboard!";
  });
}
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get all results
  const bmi = document.getElementById("bmi-result").textContent || "Not calculated";
  const bmr = document.getElementById("bmr-result").textContent || "Not calculated";
  const water = document.getElementById("water-result").textContent || "Not calculated";
  const calorie = document.getElementById("calorie-result").textContent || "Not calculated";
  const dose = document.getElementById("dose-result").textContent || "Not calculated";

  // Get all recommendations
  const bmiReco = document.getElementById("bmi-reco").textContent || "";
  const bmrReco = document.getElementById("bmr-reco").textContent || "";
  const waterReco = document.getElementById("water-reco").textContent || "";
  const calorieReco = document.getElementById("calorie-reco").textContent || "";
  const doseReco = document.getElementById("dose-reco").textContent || "";

  let y = 15;
  doc.setFontSize(16);
  doc.text("Health Calculator Results", 10, y);
  doc.setFontSize(12);
  y += 15;

  // Helper to write block
  function writeSection(title, result, reco) {
    doc.setFont(undefined, "bold");
    doc.text(title, 10, y);
    y += 7;
    doc.setFont(undefined, "normal");
    doc.text(result, 10, y);
    y += 7;
    if (reco) {
      doc.text("Recommendation: " + reco, 10, y);
      y += 10;
    }
  }

  writeSection("BMI", bmi, bmiReco);
  writeSection("BMR", bmr, bmrReco);
  writeSection("Water Intake", water, waterReco);
  writeSection("Daily Calorie Needs", calorie, calorieReco);
  writeSection("Dosage Estimator", dose, doseReco);

  doc.save("health-results.pdf");
}


function calculateCalories() {
  const bmr = parseFloat(document.getElementById("calorie-bmr").value);
  const level = parseFloat(document.getElementById("activity-level").value);
  const calorieReco = document.getElementById("calorie-reco");

  if (bmr > 0 && level > 0) {
    const calories = bmr * level;
    document.getElementById("calorie-result").textContent =
      `Estimated Daily Calories: ${calories.toFixed(2)} kcal`;

    calorieReco.textContent =
      "This is your estimated energy need per day. Eat less to lose weight or more to gain weight.";
  }
}

function calculateDosage() {
  const weight = parseFloat(document.getElementById("dose-weight").value);
  const mgPerKg = parseFloat(document.getElementById("dose-mgkg").value);
  const frequency = parseInt(document.getElementById("dose-frequency").value);
  const doseReco = document.getElementById("dose-reco");

  if (weight > 0 && mgPerKg > 0 && frequency > 0) {
    const totalDose = weight * mgPerKg;
    const dosePerTime = totalDose / frequency;

    document.getElementById("dose-result").textContent =
      `Total daily dose: ${totalDose.toFixed(2)} mg (${dosePerTime.toFixed(2)} mg per dose × ${frequency}x/day)`;

    doseReco.textContent =
      "Always double-check this result with a licensed healthcare professional before administering any medication.";
  }
}
