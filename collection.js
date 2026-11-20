
let donors = JSON.parse(localStorage.getItem("donors")) || [];

let totalDonors = document.getElementById("totalDonors");
let waitingDonors = document.getElementById("waitingDonors");
let completedDonors = document.getElementById("completedDonors");
let queueList = document.getElementById("queueList");


let nextToken = 101;

donors.forEach(function(donor) {

    if (donor.collectionToken && donor.collectionToken >= nextToken) {
        nextToken = donor.collectionToken + 1;
    }

});


function showQueue() {

    
    let queue = donors.filter(function(donor) {
        return donor.slot &&
               donor.appointmentDate &&
               donor.status === "Cleared";
    });

    
    queue.forEach(function(donor) {

        if (!donor.collectionToken) {
            donor.collectionToken = nextToken;
            nextToken++;
        }

        if (!donor.collectionStatus) {
            donor.collectionStatus = "Waiting";
        }

    });

    
    localStorage.setItem("donors", JSON.stringify(donors));

    
    totalDonors.textContent = queue.length;

    let waitingCount = queue.filter(function(donor) {
        return donor.collectionStatus === "Waiting";
    }).length;

    let completedCount = queue.filter(function(donor) {
        return donor.collectionStatus === "Completed";
    }).length;

    waitingDonors.textContent = waitingCount;
    completedDonors.textContent = completedCount;

     
    queueList.innerHTML = "";

    
    if (queue.length === 0) {
        queueList.textContent = "No donors in the collection queue.";
        return;
    }

     
    queue.forEach(function(donor) {

        let item = document.createElement("div");
        item.className = "queue-item";

        let details = document.createElement("div");

        let token = document.createElement("h4");
        token.textContent = "Token #" + donor.collectionToken;

        let name = document.createElement("p");
        name.textContent = donor.name;

        details.appendChild(token);
        details.appendChild(name);

        let status = document.createElement("span");
        status.textContent = donor.collectionStatus;
        status.className = donor.collectionStatus.toLowerCase().replace(" ", "-");

        item.appendChild(details);
        item.appendChild(status);

         
        if (donor.collectionStatus === "Waiting") {

            let button = document.createElement("button");
            button.className = "start-btn";
            button.textContent = "Start Collection";

            button.addEventListener("click", function() {
                updateStatus(donor.id, "In Progress");
            });

            item.appendChild(button);

        }
        else if (donor.collectionStatus === "In Progress") {

            let button = document.createElement("button");
            button.className = "complete-btn";
            button.textContent = "Mark Completed";

            button.addEventListener("click", function() {
                updateStatus(donor.id, "Completed");
            });

            item.appendChild(button);

        }

        queueList.appendChild(item);

    });

}

 
function updateStatus(donorId, newStatus) {

    let donor = donors.find(function(donor) {
        return donor.id === donorId;
    });

    if (donor) {

        donor.collectionStatus = newStatus;

        localStorage.setItem("donors", JSON.stringify(donors));

        showQueue();

    }

}

 
showQueue();