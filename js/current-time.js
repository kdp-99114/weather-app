// Selector

const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const date = document.getElementById("date");

// Event listener

name.addEventListener("keypress",setName);
name.addEventListener("blur",setName);

// Functions

function showtime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    let todayDate = today.toDateString();

    const amPm = hour > 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

    date.innerHTML = `${todayDate}`

    setTimeout(showtime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function setGreeting() {
    let today = new Date();
    let hour = today.getHours();

    if(hour < 12) {
        document.body.style.backgroundImage = 'url("../images/morning.jpg")';
        greeting.innerHTML = "Good Morning";
    } else if(hour < 18) {
        document.body.style.backgroundImage = 'url("../images/afternoon.jpg")';
        greeting.innerHTML = "Good Afternoon";
    } else {
        document.body.style.backgroundImage = 'url("../images/night.jpg")';
        greeting.innerHTML = "Good Evening";
        document.body.style.color = "white";
    }
}

function getName() {
    if(localStorage.getItem('inputName') === null) {
        name.innerHTML = "[Enter Name]";
    } else {
        name.innerHTML = localStorage.getItem('inputName');
    }
}

function setName(e) {
    if(e.type === "keypress") {
        if(e.keyCode == 13) {
            localStorage.setItem('inputName', e.target.innerHTML);
            name.blur();
        }
    } else {
        localStorage.setItem('inputName', e.target.innerHTML);
    }
}
// Function Call

showtime();
setGreeting();
getName();