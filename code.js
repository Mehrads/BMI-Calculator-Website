var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var unit = document.getElementById("unit");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

modalContext = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function calculate() {
    if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
        modal.style.display = "block";
        modalText.innerHTML = 'ALL fields are required!';
    } else if (!isPositiveNumber(height.value) || !isPositiveNumber(weight.value)) {
        modal.style.display = "block";
        modalText.innerHTML = 'Please enter valid positive values for height and weight!';
    } else {
        validateInputs();
    }
}

function isPositiveNumber(value) {
    return /^\d*\.?\d+$/.test(value) && parseFloat(value) > 0;
}

function validateInputs() {
    var h = parseFloat(height.value);
    var w = parseFloat(weight.value);
    var a = parseInt(age.value);

    if (unit.value === "metric") {
        if (h < 50 || h > 300) {
            showModal('Please enter a height between 50 cm and 300 cm.');
            return;
        }
        if (w < 3 || w > 500) {
            showModal('Please enter a weight between 3 kg and 500 kg.');
            return;
        }
    } else {
        if (h < 20 || h > 120) {
            showModal('Please enter a height between 20 inches and 120 inches.');
            return;
        }
        if (w < 7 || w > 1100) {
            showModal('Please enter a weight between 7 lbs and 1100 lbs.');
            return;
        }
    }
    if (a < 0 || a > 120) {
        showModal('Please enter an age between 0 and 120.');
        return;
    }
    countBmi();
}

function showModal(message) {
    modal.style.display = "block";
    modalText.innerHTML = message;
}

function countBmi() {
    var h = parseFloat(height.value);
    var w = parseFloat(weight.value);

    if (unit.value === "imperial") {
        h = h * 2.54; // convert inches to cm
        w = w * 0.453592; // convert lbs to kg
    }

    var bmi = w / ((h / 100) * (h / 100));
    var result = '';
    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Healthy';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Overweight';
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obese (Class 1)';
    } else if (35 <= bmi && bmi <= 39.9) {
        result = 'Obese (Class 2)';
    } else if (bmi >= 40) {
        result = 'Obese (Class 3)';
    }

    resultArea.style.display = "block";

    // Update the comment first
    document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;

    // Update the result afterwards
    document.querySelector("#result").innerHTML = bmi.toFixed(2);
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}