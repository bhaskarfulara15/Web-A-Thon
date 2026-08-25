
const festDate = new Date("October 12, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = festDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


const registerModal = document.getElementById("registerModal");

function openRegisterModal() {
    registerModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeRegisterModal() {
    registerModal.classList.remove("active");
    document.body.style.overflow = "";
}

const soloRegistrationSection =
    document.getElementById("soloRegistrationSection");

const teamRegistrationSection =
    document.getElementById("teamRegistrationSection");

const soloTab = document.getElementById("soloTab");
const teamTab = document.getElementById("teamTab");

function showSoloRegistration() {
    soloRegistrationSection.style.display = "block";
    teamRegistrationSection.style.display = "none";

    soloTab.classList.add("active");
    teamTab.classList.remove("active");
}

function showTeamRegistration() {
    soloRegistrationSection.style.display = "none";
    teamRegistrationSection.style.display = "block";

    teamTab.classList.add("active");
    soloTab.classList.remove("active");
}


const registrationForm =
    document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const studentData = {
        id: Date.now(),
        fullName: document.getElementById("soloName").value.trim(),
        email: document.getElementById("soloEmail").value.trim(),
        college: document.getElementById("soloCollege").value.trim(),
        phone: document.getElementById("soloPhone").value.trim(),
        event: document.getElementById("soloEvent").value,
        registrationDate: new Date().toLocaleString()
    };

    if (
        !studentData.fullName ||
        !studentData.email ||
        !studentData.college ||
        !studentData.phone ||
        !studentData.event
    ) {
        alert("Please fill in all registration details.");
        return;
    }

    let registrations =
        JSON.parse(localStorage.getItem("nirvanRegistrations")) || [];

    
    const alreadyRegistered = registrations.some(function (registration) {

        return (
            registration.email.toLowerCase() ===
            studentData.email.toLowerCase() &&

            registration.event === studentData.event
        );

    });

    if (alreadyRegistered) {
        alert(
            "This email is already registered for " +
            studentData.event +
            "."
        );

        return;
    }

    registrations.push(studentData);

    localStorage.setItem(
        "nirvanRegistrations",
        JSON.stringify(registrations)
    );

    alert(
        "Registration successful!\n\n" +
        "Name: " + studentData.fullName +
        "\nEvent: " + studentData.event +
        "\n\nWelcome to NIRVAN '26!"
    );

    registrationForm.reset();
    closeRegisterModal();
});



const teamEvent =
    document.getElementById("teamEvent");

const googleFormRegistration =
    document.getElementById("googleFormRegistration");

googleFormRegistration.addEventListener("click", function (event) {

    if (!teamEvent.value) {

        event.preventDefault();

        alert(
            "Please select a team event before opening the registration form."
        );

        return;
    }

    /*
       IMPORTANT:

       Replace YOUR_GOOGLE_FORM_LINK_HERE in HTML
       with your actual Google Form URL.

       Example:
       https://forms.gle/xxxxxxxxxxxx

       The selected event is checked here before
       the user is allowed to open the form.
    */

});

const eventDetailsModal =
    document.getElementById("eventDetailsModal");

const eventDetailsTitle =
    document.getElementById("eventDetailsTitle");

const eventDetailsDescription =
    document.getElementById("eventDetailsDescription");

const eventRegisterButton =
    document.getElementById("eventRegisterButton");


const eventData = {

    "CTF": {
        type: "solo",
        description:
            "Test your cybersecurity and problem-solving skills. Find hidden flags, solve security challenges and compete individually."
    },

    "Hackathon": {
        type: "team",
        description:
            "Build innovative solutions with your team. Collaborate, create and present your ideas in this exciting technical challenge."
    },

    "Treasure Hunt": {
        type: "team",
        description:
            "Follow clues, solve puzzles and work together with your team to discover the final treasure."
    },

    "E-Sports": {
        type: "team",
        description:
            "Compete with your team in intense gaming battles and prove your skills in the NIRVAN E-Sports arena."
    },

    "Workshop": {
        type: "solo",
        description:
            "Learn practical technologies, tools and skills from experts through interactive technical workshops."
    }

};


let selectedEvent = null;

function showEventDetails(eventName) {

    selectedEvent = eventName;

    const eventInfo = eventData[eventName];

    if (!eventInfo) {
        return;
    }

    eventDetailsTitle.textContent = eventName;
    eventDetailsDescription.textContent =
        eventInfo.description;

    if (eventInfo.type === "solo") {

        eventRegisterButton.textContent =
            "REGISTER AS INDIVIDUAL";

    } else {

        eventRegisterButton.textContent =
            "REGISTER YOUR TEAM";

    }

    eventDetailsModal.classList.add("active");
    document.body.style.overflow = "hidden";
}


function closeEventDetails() {

    eventDetailsModal.classList.remove("active");
    document.body.style.overflow = "";

}


eventRegisterButton.addEventListener("click", function () {

    if (!selectedEvent) {
        return;
    }

    closeEventDetails();
    openRegisterModal();

    const eventInfo = eventData[selectedEvent];

    setTimeout(function () {

        if (eventInfo.type === "solo") {

            showSoloRegistration();

            document.getElementById("soloEvent").value =
                selectedEvent;

        } else {

            showTeamRegistration();

            document.getElementById("teamEvent").value =
                selectedEvent;

        }

    }, 100);

});


function toggleAllEvents() {

    const extraEvents =
        document.querySelectorAll(".extra-event");

    const viewButton =
        document.querySelector(
            "#events .view-all-btn"
        );

    let isHidden = false;

    extraEvents.forEach(function (event) {

        if (
            event.style.display === "none" ||
            getComputedStyle(event).display === "none"
        ) {
            isHidden = true;
        }

    });

    extraEvents.forEach(function (event) {

        if (isHidden) {
            event.style.display = "block";
        } else {
            event.style.display = "none";
        }

    });

    if (isHidden) {

        viewButton.textContent = "SHOW LESS EVENTS ↑";

    } else {

        viewButton.textContent = "VIEW ALL EVENTS →";

    }

}

function toggleAllSpeakers() {

    const speakers =
        document.querySelectorAll(".speaker-card");

    
    const extraSpeakers =
        document.querySelectorAll(".extra-speaker");

    if (extraSpeakers.length === 0) {

        alert(
            "All currently available speakers are already displayed."
        );

        return;
    }

    const viewButton =
        document.querySelector(
            "#speakers .view-all-btn"
        );

    let showSpeakers = false;

    extraSpeakers.forEach(function (speaker) {

        if (
            getComputedStyle(speaker).display === "none"
        ) {
            showSpeakers = true;
        }

    });

    extraSpeakers.forEach(function (speaker) {

        speaker.style.display =
            showSpeakers ? "block" : "none";

    });

    viewButton.textContent =
        showSpeakers
            ? "SHOW LESS SPEAKERS ↑"
            : "VIEW ALL SPEAKERS →";

}



const galleryData = {

    hackathon: {
        title: "Hackathon Gallery",
        images: [
            "./gallery/hackathon/1.jpeg",
            "./gallery/hackathon/2.jpeg",
            "./gallery/hackathon/3.jpeg",
            "./gallery/hackathon/4.jpeg",
            "./gallery/hackathon/5.jpeg",
            "./gallery/hackathon/6.jpeg"
        ]
    },

    treasure: {
        title: "Treasure Hunt Gallery",
        images: [
            "images/gallery/treasure/1.jpeg",
            "images/gallery/treasure/2.jpeg",
            "images/gallery/treasure/3.jpeg",
            "images/gallery/treasure/4.jpeg",
            "images/gallery/treasure/5.jpeg",
            "images/gallery/treasure/6.jpeg"
        ]
    },

    esports: {
        title: "E-Sports Gallery",
        images: [
            "images/gallery/esports/1.jpeg",
            "images/gallery/esports/2.jpeg",
            "images/gallery/esports/3.jpeg",
            "images/gallery/esports/4.jpeg",
            "images/gallery/esports/5.jpeg",
            "images/gallery/esports/6.jpeg"
        ]
    },

    ctf: {
        title: "CTF Gallery",
        images: [
            "images/gallery/ctf/1.jpeg",
            "images/gallery/ctf/2.jpeg",
            "images/gallery/ctf/3.jpeg",
            "images/gallery/ctf/4.jpeg",
            "images/gallery/ctf/5.jpeg",
            "images/gallery/ctf/6.jpeg"
        ]
    },

    

};


const eventGalleryModal =
    document.getElementById("eventGalleryModal");

const eventGalleryTitle =
    document.getElementById("eventGalleryTitle");

const fullEventGallery =
    document.getElementById("fullEventGallery");



function openEventGallery(eventName) {

    const eventGallery =
        galleryData[eventName];

    if (!eventGallery) {
        return;
    }

    eventGalleryTitle.textContent =
        eventGallery.title;

    fullEventGallery.innerHTML = "";

    eventGallery.images.forEach(function (imagePath, index) {

        const image =
            document.createElement("img");

        image.src = imagePath;

        image.alt =
            eventGallery.title +
            " - Image " +
            (index + 1);

        image.loading = "lazy";

        image.addEventListener(
            "click",
            function () {
                openImageViewer(imagePath);
            }
        );

        fullEventGallery.appendChild(image);

    });

    eventGalleryModal.classList.add("active");

    document.body.style.overflow = "hidden";

    eventGalleryModal.scrollTop = 0;

}


function closeEventGallery() {

    eventGalleryModal.classList.remove("active");

    document.body.style.overflow = "";

}


function showAllEventGalleries() {

    openEventGallery("hackathon");

}


const imageViewer =
    document.getElementById("imageViewer");

const fullScreenImage =
    document.getElementById("fullScreenImage");


function openImageViewer(imagePath) {

    fullScreenImage.src = imagePath;

    imageViewer.classList.add("active");

}


function closeImageViewer() {

    imageViewer.classList.remove("active");

    fullScreenImage.src = "";

}


function closeHighlightsVideo() {

    videoModal.classList.remove("active");

    highlightsVideoFrame.src = "";

    document.body.style.overflow = "";

}



window.addEventListener("click", function (event) {

    if (event.target === registerModal) {
        closeRegisterModal();
    }

    if (event.target === eventDetailsModal) {
        closeEventDetails();
    }

    if (event.target === videoModal) {
        closeHighlightsVideo();
    }

    if (event.target === eventGalleryModal) {
        closeEventGallery();
    }

    if (event.target === imageViewer) {
        closeImageViewer();
    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (
            imageViewer.classList.contains("active")
        ) {
            closeImageViewer();
            return;
        }

        if (
            eventGalleryModal.classList.contains("active")
        ) {
            closeEventGallery();
            return;
        }

        if (
            videoModal.classList.contains("active")
        ) {
            closeHighlightsVideo();
            return;
        }

        if (
            eventDetailsModal.classList.contains("active")
        ) {
            closeEventDetails();
            return;
        }

        if (
            registerModal.classList.contains("active")
        ) {
            closeRegisterModal();
        }

    }

});

const scheduleTabs =
    document.querySelectorAll(".schedule-tabs button");

scheduleTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        scheduleTabs.forEach(function (button) {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        /*
           Add separate Day 1 and Day 2 schedule
           data here later if needed.
        */

    });

});

showSoloRegistration();