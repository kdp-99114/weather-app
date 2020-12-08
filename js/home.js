// Selectors

const name = document.getElementById("name");

// Event Listener

name.addEventListener("keypress",setName);
name.addEventListener("blur",setName);

// Functions

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

getName();