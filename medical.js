


let donorSelect = document.getElementById("donorSelect");
let donorDetails = document.getElementById("donorDetails");
let screeningStatus = document.getElementById("screeningStatus");
let medicalRemarks = document.getElementById("medicalRemarks");
let saveScreening = document.getElementById("saveScreening");


let checklistItems = [
    "ageCheck",
    "weightCheck",
    "illnessCheck",
    "tattooCheck",
    "hemoglobinCheck",
    "donationCheck"
];


let donors = JSON.parse(localStorage.getItem("donors")) || [];


donors.forEach(function(donor, index) {

    let option = document.createElement("option");

    option.value = index;
    option.textContent = donor.name + " (" + donor.id + ")";

    donorSelect.appendChild(option);

});


donorSelect.addEventListener("change", function() {

    let index = donorSelect.value;

    if (index === "") {

        donorDetails.textContent = "Select a donor to see details.";

        screeningStatus.value = "";
        medicalRemarks.value = "";

        checklistItems.forEach(function(id) {
            document.getElementById(id).checked = false;
        });

    }
    else {

        let donor = donors[index];

        donorDetails.innerHTML =
            "Donor ID: " + donor.id + "<br>" +
            "Name: " + donor.name + "<br>" +
            "Age: " + donor.age + "<br>" +
            "Blood Group: " + donor.blood + "<br>" +
            "Appointment Date: " + donor.date;

        
        screeningStatus.value =
            ["Cleared", "Not Cleared", "Pending"].includes(donor.status)
                ? donor.status : "";

        
        medicalRemarks.value = donor.remarks || "";

        
        let checks = donor.checks || [];

        checklistItems.forEach(function(id, index) {
            document.getElementById(id).checked = checks[index] || false;
        });

    }

});


saveScreening.addEventListener("click", function() {

    let index = donorSelect.value;

    if (index === "") {

        alert("Please select a donor!");

    }
    else if (screeningStatus.value === "") {

        alert("Please select screening status!");

    }
    else {

        
        donors[index].status = screeningStatus.value;

        
        donors[index].remarks = medicalRemarks.value;

        
        donors[index].checks = [];

        checklistItems.forEach(function(id) {

            let checked = document.getElementById(id).checked;

            donors[index].checks.push(checked);

        });

        
        localStorage.setItem("donors", JSON.stringify(donors));

        alert("Screening Record Saved Successfully!");

    }
    
    


});
