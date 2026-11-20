
let donorForm = document.getElementById("donorForm");

if (donorForm) {

    donorForm.addEventListener("submit", function(event) {

        event.preventDefault();

        
        let donors = JSON.parse(localStorage.getItem("donors")) || [];

        
        let donor = {
            id: "LL" + (donors.length + 1),
            name: donorForm.elements["fullname"].value,
            age: donorForm.elements["age"].value,
            blood: donorForm.elements["bloodgroup"].value,
            phone: donorForm.elements["phone"].value,
            email: donorForm.elements["email"].value,
            date: donorForm.elements["date"].value,
            status: "Pending Screening"
        };

        
        donors.push(donor);

        
        localStorage.setItem("donors", JSON.stringify(donors));

        
        alert("Registration Successful!");

     
        donorForm.reset();

    });
    

}


