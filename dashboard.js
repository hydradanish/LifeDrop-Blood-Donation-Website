

let donors = JSON.parse(localStorage.getItem("donors")) || [];


let totalRegistered = document.getElementById("totalRegistered");
let slotsBooked = document.getElementById("slotsBooked");
let eligibleDonors = document.getElementById("eligibleDonors");
let donorTable = document.getElementById("donorTable");

function showDashboard() {

    
    totalRegistered.textContent = donors.length;

   
    let eligibleCount = 0;

    donors.forEach(function(donor) {
        if (donor.status === "Cleared") {
            eligibleCount++;
        }
    });

    eligibleDonors.textContent = eligibleCount;

   
    let bookedCount = 0;

    donors.forEach(function(donor) {
        if (donor.slot) {
            bookedCount++;
        }
    });

    slotsBooked.textContent = bookedCount;

    
    donorTable.innerHTML = "";

    
    donors.forEach(function(donor) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${donor.id}</td>
            <td>${donor.name}</td>
            <td><span class="blood">${donor.blood}</span></td>
            <td>${donor.slot || "Not Booked"}</td>
            <td>${donor.status || "Pending Screening"}</td>
            <td>
                <button class="view-btn" onclick="viewDonor('${donor.id}')">View</button>
                <button class="delete-btn" onclick="deleteDonor('${donor.id}')">Delete</button>
            </td>
        `;

        donorTable.appendChild(row);

    });

}


function deleteDonor(donorId) {

    let confirmDelete = confirm("Are you sure you want to delete this donor?");

    if (confirmDelete) {

        donors = donors.filter(function(donor) {
            return donor.id !== donorId;
        });

        localStorage.setItem("donors", JSON.stringify(donors));

        showDashboard();
    }

}


function viewDonor(donorId) {

    let donor = donors.find(function(donor) {
        return donor.id === donorId;
    });

    if (donor) {

        alert(
            "Donor Details\n\n" +
            "ID: " + donor.id + "\n" +
            "Name: " + donor.name + "\n" +
            "Age: " + donor.age + "\n" +
            "Blood Group: " + donor.blood + "\n" +
            "Phone: " + donor.phone + "\n" +
            "Email: " + donor.email + "\n" +
            "Appointment Date: " + donor.date + "\n" +
            "Screening Status: " + donor.status + "\n" +
            "Medical Remarks: " + (donor.remarks || "No remarks")
        );

    }

}


let searchDonor = document.getElementById("searchDonor");

searchDonor.addEventListener("input", function() {

    let searchValue = searchDonor.value.toLowerCase();

    let rows = donorTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let name = rows[i].cells[1].textContent.toLowerCase();
        let id = rows[i].cells[0].textContent.toLowerCase();

        if (name.includes(searchValue) || id.includes(searchValue)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }

});


showDashboard();

