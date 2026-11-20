
let donorSelect = document.getElementById("donorSelect");

 
let donors = JSON.parse(localStorage.getItem("donors")) || [];

 
donors.forEach(function (donor) {

    let option = document.createElement("option");

    option.value = donor.id;
    option.textContent = donor.name + " (" + donor.id + ")";

    donorSelect.appendChild(option);

});

 
let appointmentForm = document.getElementById("appointmentForm");
let appointmentDate = document.getElementById("appointmentDate");

 
appointmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    
    let donorId = donorSelect.value;

     
    let date = appointmentDate.value;

     
    let selectedSlot = document.querySelector('input[name="slot"]:checked');

    if (!donorId || !date || !selectedSlot) {
        alert("Please select donor, date and time slot!");
        return;
    }

    
    let donor = donors.find(function (donor) {
        return donor.id === donorId;
    });

    if (donor) {

         
        if (donor.slot) {
            alert("This donor has already booked an appointment!");
            return;
        }
         
        let slotName = selectedSlot.parentElement.textContent.trim();

         
        let bookedCount = donors.filter(function (d) {
            return d.appointmentDate === date && d.slot === slotName;
        }).length;
 
        if (bookedCount >= 5) {
            alert("Sorry! This time slot is full. Please select another slot.");
            return;
        }

         
        donor.slot = slotName;
        donor.appointmentDate = date;

         
        localStorage.setItem("donors", JSON.stringify(donors));

        alert("Appointment Booked Successfully!");

        
        appointmentForm.reset();

    }

});
