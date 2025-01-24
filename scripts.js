
/*************************************************************
 * STICKY NAV & BACK TO TOP
 *************************************************************/
const headerOffset = document.querySelector(".navbar").offsetHeight;
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
) {
    backToTopButton.classList.add("visible");
} else {
    backToTopButton.classList.remove("visible");
}
};

backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Hamburger Menu Logic
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
});

document.querySelectorAll(".nav-links a") .forEach((link) => link.addEventListener("click", () => {
        navLinksContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    })
);

/*************************************************************
 * LOGIN SECTION - SWITCH FORMS (Purdue / Guest)
 *************************************************************/
document.getElementById("guestLink").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("purdue-login").style.display = "none";
    document.getElementById("guest-login").style.display = "block";
});

document.getElementById("purdueLink").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("guest-login").style.display = "none";
    document.getElementById("purdue-login").style.display = "block";
});

// Mock functions
function purdueLoginClick() {
    alert("Purdue login clicked!");
}
function doGuestLogin() {
    alert("Guest login clicked!");
}

/*************************************************************
 * FADE TEXT ANIMATION (What Is MyFPGA)
 *************************************************************/
const fadeTextElement = document.getElementById("fadeText");
const texts = [
    "ECE Summer Camp — MS and HS outreach program introducing digital logic and hardware programming",
    "Introduction to ECE — Freshman major course with selected topics on digital",
    "Digital Logic — Lower division digital course featuring paper and pen, and breadboard prototyping",
    "Digital Design — Upper division digital course featuring CAD/EDA design tools and FPGA prototyping",
];
let fadeIndex = 0;
fadeTextElement.innerHTML = texts[fadeIndex];
fadeTextElement.style.opacity = 1;

function updateFadeText() {
fadeTextElement.style.opacity = 0;
setTimeout(() => {
    fadeIndex = (fadeIndex + 1) % texts.length;
    fadeTextElement.innerHTML = texts[fadeIndex];
    fadeTextElement.style.opacity = 1;
}, 1500);
}
setInterval(updateFadeText, 4000);

/*************************************************************
 * TYPING ANIMATION (LOGIN DESCRIPTION)
 *************************************************************/
const sentencesPurdue = [
    " experience an intuitive platform.",
    " create amazing digital designs.",
    " test your FPGA designs easily.",
    " succeed in digital logic and design."
];
const sentencesGuest = [
    " explore as a guest user.",
    " access the platform as a guest.",
    " test FPGA designs with a guest account.",
    " start learning with guest access."
];
let partPurdue = 0;
let partIndexPurdue = 0;
let partGuest = 0;
let partIndexGuest = 0;
let intervalPurdue, intervalGuest;

function typePurdue() {
    const text = sentencesPurdue[partPurdue].substring(0, partIndexPurdue + 1);
    document.getElementById("dynamic-text-purdue").innerHTML = text;
    partIndexPurdue++;
    if (text === sentencesPurdue[partPurdue]) {
        clearInterval(intervalPurdue);
        setTimeout(() => {
        intervalPurdue = setInterval(deleteTextPurdue, 50);
        }, 1000);
    }
}

function deleteTextPurdue() {
    const text = sentencesPurdue[partPurdue].substring(0, partIndexPurdue - 1);
    document.getElementById("dynamic-text-purdue").innerHTML = text;
    partIndexPurdue--;
    if (text === "") {
        clearInterval(intervalPurdue);
        partPurdue = (partPurdue + 1) % sentencesPurdue.length;
        partIndexPurdue = 0;
        setTimeout(() => {
            intervalPurdue = setInterval(typePurdue, 100);
        }, 500);
    }
}

function typeGuest() {
    const text = sentencesGuest[partGuest].substring(0, partIndexGuest + 1);
    document.getElementById("dynamic-text-guest").innerHTML = text;
    partIndexGuest++;
    if (text === sentencesGuest[partGuest]) {
        clearInterval(intervalGuest);
        setTimeout(() => {
        intervalGuest = setInterval(deleteTextGuest, 50);
        }, 1000);
    }
}

function deleteTextGuest() {
    const text = sentencesGuest[partGuest].substring(0, partIndexGuest - 1);
    document.getElementById("dynamic-text-guest").innerHTML = text;
    partIndexGuest--;
    if (text === "") {
        clearInterval(intervalGuest);
        partGuest = (partGuest + 1) % sentencesGuest.length;
        partIndexGuest = 0;
        setTimeout(() => {
        intervalGuest = setInterval(typeGuest, 100);
        }, 500);
    }
}

intervalPurdue = setInterval(typePurdue, 100);
intervalGuest = setInterval(typeGuest, 100);

/*************************************************************
 * TUTORIAL GRID 
 *************************************************************/

function showPrototypeAlert(event) {
    // Prevent the default link action so it doesn’t immediately navigate away
    event.preventDefault()
    // Show the alert
    alert("This is only a prototype of the actual page. To see the full content, please visit ecelabs.io");
  }
  
  // Attach the event listener to each link
  const gridLinks = document.querySelectorAll('.linkCard a');
  gridLinks.forEach(link => {
    link.addEventListener('click', showPrototypeAlert);
  });
  

/*************************************************************
 * FAQ TOGGLE
 *************************************************************/
function toggleFaq(faqItem) {
    faqItem.classList.toggle("expanded");
}

/*************************************************************
 * "HOW TO USE" SLIDER
 *************************************************************/
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const howToDotsContainer = document.getElementById("howToDotsContainer");
let slideTimers = [];
let slideInterval;
const slideDuration = 5000; // 5 seconds per slide

function createSlideTimers() {
slides.forEach((_, index) => {
    const timer = document.createElement("div");
    timer.classList.add("slide-timer");

    const fillBar = document.createElement("div");
    fillBar.classList.add("fill");
    timer.appendChild(fillBar);

    if (index === currentSlideIndex) {
        timer.classList.add("active");
    }

    timer.addEventListener("click", () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        resetSlideInterval();
    });
    howToDotsContainer.appendChild(timer);
    slideTimers.push(timer);
});
}

function showSlide(index) {
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slides[currentSlideIndex].style.display = "block";

    slideTimers.forEach((timer, i) => {
        timer.classList.remove("active");
        const fillBar = timer.querySelector(".fill");
        fillBar.style.width = "0%";
        fillBar.style.transition = "none";
        fillBar.offsetHeight;
    });

    const activeTimer = slideTimers[currentSlideIndex];
    const fillBar = activeTimer.querySelector(".fill");
    activeTimer.classList.add("active");

    fillBar.style.transition = `width ${slideDuration}ms linear`;
    fillBar.style.width = "100%";

    // Animate overlay
    const currentOverlay = slides[currentSlideIndex].querySelector(".howToOverlay");
    currentOverlay.classList.add("animate");
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
    resetSlideInterval();
}

document.querySelector(".prev").addEventListener("click", () => {
    changeSlide(-1);
});
document.querySelector(".next").addEventListener("click", () => {
    changeSlide(1);
});

createSlideTimers();
showSlide(currentSlideIndex);
slideInterval = setInterval(nextSlide, slideDuration);

/*************************************************************
 * FEEDBACK SECTION: CHART + ARROWS
 *************************************************************/
// Example data sets
const dataSets = [
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [2, 3, 15, 33, 81],
        label: "Q1: MyFPGA Demo was clear and easy to follow."
    },
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [2, 4, 16, 23, 89],
        label: "Q2: MyFPGA Labs provided hands-on learning opportunities."
    },
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [5, 10, 20, 30, 35],
        label: "Q3: MyFPGA platform was user-friendly."
    },
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [3, 5, 12, 25, 55],
        label: "Q4: The documentation was helpful in understanding MyFPGA."
    },
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [1, 5, 20, 40, 70],
        label: "Q5: MyFPGA support team was responsive and helpful."
    },
    {
        labels: ["1", "2", "3", "4", "5"],
        data: [4, 8, 16, 32, 40],
        label: "Q6: I felt confident applying what I learned from MyFPGA in other projects."
    }
];

let currentChartIndex = 0;
let feedbackChart;

function initializeChart() {
const ctx = document.getElementById("feedbackChart").getContext("2d");
feedbackChart = new Chart(ctx, {
    type: "bar",
    data: {
    labels: dataSets[currentChartIndex].labels,
    datasets: [
        {
        label: dataSets[currentChartIndex].label,
        data: dataSets[currentChartIndex].data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
        }
    ]
    },
    options: {
    responsive: true,
    scales: {
        x: {
        title: {
            display: true,
            text: "Rating (1-5)"
        }
        },
        y: {
        beginAtZero: true,
        title: {
            display: true,
            text: "Number of Responses"
        }
        }
    },
    plugins: {
        legend: {
        display: true,
        position: "bottom"
        }
    }
    }
});

const surveyTextElement = document.getElementById("currentSurveyText")
    if (surveyTextElement) {
        surveyTextElement.textContent = dataSets[currentChartIndex].label;
    }
}

function updateChart(index) {
    feedbackChart.data.labels = dataSets[index].labels;
    feedbackChart.data.datasets[0].label = dataSets[index].label;
    feedbackChart.data.datasets[0].data = dataSets[index].data;
    feedbackChart.update();

    const surveyTextElement = document.getElementById("currentSurveyText");

    if (surveyTextElement) {
    surveyTextElement.textContent = dataSets[index].label;
    }

}

function switchChart(direction) {
    const totalCharts = dataSets.length;
    currentChartIndex = (currentChartIndex + direction + totalCharts) % totalCharts;
    updateChart(currentChartIndex);
}

document.getElementById("prevBtn").addEventListener("click", () => {
    switchChart(-1);
});
document.getElementById("nextBtn").addEventListener("click", () => {
    switchChart(1);
});

initializeChart();

/*************************************************************
 * MEET THE TEAM - CAROUSEL & GRID
 *************************************************************/
const allTeamMembers = [
    {
      name: "Junfei Li",
      role: "Program Director",
      image: "../static/teamPfp/junfei.png",
      teams: ["Program Director", "Software", "Hardware"],
      linkedin: "https://www.linkedin.com/in/junfei-li-0bb22b33/",
      github: "https://github.com"
    },
    {
      name: "Ethan Dawes",
      role: "Software Team Lead",
      image: "../static/teamPfp/ethan.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/ethan-dawes/",
      github: "https://github.com"
    },
    {
      name: "Rauf Emre Erkiletioglu",
      role: "Hardware Team Lead",
      image: "../static/teamPfp/rauf.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/rerkilet/",
      github: "https://github.com"
    },
    {
      name: "Eduard Tanase",
      role: "Software Team",
      image: "../static/teamPfp/eduard.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/eduard-tanase/",
      github: "https://github.com"
    },
    {
      name: "Evan Miller",
      role: "Software Team",
      image: "../static/teamPfp/evan.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/evan-miller-profile/",
      github: "https://github.com"
    },
    {
      name: "Lane Crowder",
      role: "Software Team",
      image: "../static/teamPfp/lane.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/crowderlane001/",
      github: "https://github.com"
    },
    {
      name: "Seth Deegan",
      role: "Software Team",
      image: "../static/teamPfp/seth.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/sethdeegan/",
      github: "https://github.com"
    },
    {
      name: "George Nolan",
      role: "Software Team",
      image: "../static/teamPfp/george.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/george-nolan-122514252/",
      github: "https://github.com"
    },
    {
      name: "Ji Bing Ni",
      role: "Software Team",
      image: "../static/teamPfp/jiBing2.png",
      teams: ["Software"],
      linkedin: "https://www.linkedin.com/in/jibing-ni/",
      github: "https://github.com"
    },
    {
      name: "William Lee",
      role: "Hardware Team",
      image: "../static/teamPfp/william.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/william-lee-51570a167/",
      github: "https://github.com"
    },
    {
      name: "Noah Rediker",
      role: "Hardware Team",
      image: "../static/teamPfp/noah.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/nrediker",
      github: "https://github.com"
    },
    {
      name: "Seeun Kim",
      role: "Hardware Team",
      image: "../static/teamPfp/seeun.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/seeunkim98/",
      github: "https://github.com"
    },
    {
      name: "Ching-Hsiang Huang",
      role: "Hardware Team",
      image: "../static/teamPfp/ching-hsiang.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/ching-hsiang-huang-74bba0224/",
      github: "https://github.com"
    },
    {
      name: "Harry Chen",
      role: "Hardware Team",
      image: "../static/teamPfp/default.png",
      teams: ["Hardware"],
      linkedin: "some_link",
      github: "https://github.com"
    },
    {
      name: "Adam Selby",
      role: "Hardware Team",
      image: "../static/teamPfp/adam.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/adam-selby-424553288/",
      github: "https://github.com"
    },
    {
      name: "Sudarshan Nambiar",
      role: "Hardware Team",
      image: "../static/teamPfp/sudarshan.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/sudarshan-nambiar/",
      github: "https://github.com"
    },
    {
      name: "Minh Nguyen",
      role: "Hardware Team",
      image: "../static/teamPfp/minh.png",
      teams: ["Hardware"],
      linkedin: "https://www.linkedin.com/in/tony-minh-nguyen/",
      github: "https://github.com"
    }
];

const teamFilterDropdown = document.getElementById("teamFilter");
const carouselInner = document.getElementById("carouselInner");
const gridContainer = document.getElementById("gridContainer");
const dotsContainer = document.getElementById("dotsContainer");

let currentGroupIndex = 0;
let dots = [];
let teamGroups = [];

function createTeamMemberDiv(member) {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("teamMember");

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = member.name;
    img.classList.add("teamPfp");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const role = document.createElement("p");
    role.textContent = member.role;

    const socialLinks = document.createElement("div");
    socialLinks.classList.add("socialLinks");

    if (member.linkedin) {
        const linkedinLink = document.createElement("a");
        linkedinLink.href = member.linkedin;
        linkedinLink.target = "_blank";
        const linkedinIcon = document.createElement("i");
        linkedinIcon.classList.add("fab", "fa-linkedin");
        linkedinLink.appendChild(linkedinIcon);
        socialLinks.appendChild(linkedinLink);
    }

    if (member.github) {
        const githubLink = document.createElement("a");
        githubLink.href = member.github;
        githubLink.target = "_blank";
        const githubIcon = document.createElement("i");
        githubIcon.classList.add("fab", "fa-github");
        githubLink.appendChild(githubIcon);
        socialLinks.appendChild(githubLink);
    }
    memberDiv.appendChild(img);
    memberDiv.appendChild(name);
    memberDiv.appendChild(role);
    memberDiv.appendChild(socialLinks);
    return memberDiv;
}

function renderGridView() {
    gridContainer.innerHTML = "";
    const selectedTeam = teamFilterDropdown.value;
    const filteredMembers = allTeamMembers.filter(
        (member) => selectedTeam === "All" || member.teams.includes(selectedTeam)
    );
    filteredMembers.forEach((member) => {
        const memberDiv = createTeamMemberDiv(member);
        gridContainer.appendChild(memberDiv);
    });
}

function renderCarousel() {
    carouselInner.innerHTML = "";
    dotsContainer.innerHTML = "";
    dots = [];
    const selectedTeam = teamFilterDropdown.value;
    const filteredMembers = allTeamMembers.filter(
        (member) => selectedTeam === "All" || member.teams.includes(selectedTeam)
    );
    teamGroups = [];
    for (let i = 0; i < filteredMembers.length; i += 3) {
        const group = filteredMembers.slice(i, i + 3);
        teamGroups.push(group);
    }
    teamGroups.forEach((group, index) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("teamGroup");
        groupDiv.style.display = index === currentGroupIndex ? "flex" : "none";
        group.forEach((member) => {
            const memberDiv = createTeamMemberDiv(member);
            groupDiv.appendChild(memberDiv);
        });
        carouselInner.appendChild(groupDiv);

        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === currentGroupIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
            currentGroupIndex = index;
            updateCarouselDisplay();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
    updateCarouselDisplay();
}

function updateCarouselDisplay() {
    const teamGroupDivs = carouselInner.querySelectorAll(".teamGroup");
    teamGroupDivs.forEach((groupDiv, index) => {
        groupDiv.style.display = index === currentGroupIndex ? "flex" : "none";
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentGroupIndex);
    });
}

teamFilterDropdown.addEventListener("change", () => {
    currentGroupIndex = 0;
    renderGridView();
    renderCarousel();
});

document.getElementById("prevTeamBtn").addEventListener("click", () => {
    currentGroupIndex = (currentGroupIndex - 1 + teamGroups.length) % teamGroups.length;
    updateCarouselDisplay();
});

document.getElementById("nextTeamBtn").addEventListener("click", () => {
    currentGroupIndex = (currentGroupIndex + 1) % teamGroups.length;
    updateCarouselDisplay();
});

document.getElementById("carouselViewBtn").addEventListener("click", function () {
    document.getElementById("carouselView").style.display = "flex";
    document.getElementById("dotsContainer").style.display = "flex";
    document.getElementById("gridView").style.display = "none";
    this.classList.add("active");
    document.getElementById("gridViewBtn").classList.remove("active");
});

document.getElementById("gridViewBtn").addEventListener("click", function () {
    document.getElementById("carouselView").style.display = "none";
    document.getElementById("dotsContainer").style.display = "none";
    document.getElementById("gridView").style.display = "flex";
    this.classList.add("active");
    document.getElementById("carouselViewBtn").classList.remove("active");
});

// Initialize team
renderGridView();
renderCarousel();