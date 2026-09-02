if (localStorage.getItem('money') === null) {
    localStorage.setItem('money', JSON.stringify(0));
    let dogarray = [];
    localStorage.setItem('dogs', JSON.stringify(dogarray));
}
let money = JSON.parse(localStorage.getItem('money'));
let dogarray = [];
dogarray = JSON.parse(localStorage.getItem('dogs'));

const dogplace = document.getElementById('dog');
const dogpopup = document.getElementById('dogpopup');
const kirby = document.getElementById('kirby');
const balance = document.getElementById('balance');
const gallery = document.getElementById('gallery');

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
     .then(reg => console.log("Service Worker zaregistrován!", reg))
     .catch(err => console.log("Registrace selhala:", err));
  })};

window.onload = function() {
    tabchange('job');
    changebalance();
    updategallery();
}

function makekirbymove () {
    if (money >= 10) {
        money = money - 10;
        localStorage.setItem('money', JSON.stringify(money));
        changebalance();
        kirby.src = 'res/kirby.gif';
        setTimeout(function(){
            kirby.src = 'res/kirbyball.png';
            setTimeout(function(){
                getdog();
                kirby.src = 'res/kirby.jpg';
                // There has to be a better way to do this but I don't have the time or patience
            }, 500)
        }, 2720);
    }
}

async function getdog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    dogplace.src = data.message;
    dogarray.push(data.message);
    localStorage.setItem('dogs', JSON.stringify(dogarray));
    dogpopup.style.display = 'flex';
}

function discarddog() {
    dogpopup.style.display = 'none';
}

function snatchdog() {
    dogpopup.style.display = 'none';
    updategallery();
}

function updategallery() {
    while (gallery.firstChild) {
        gallery.firstChild.remove()
    }
    for (let i = 0; i < dogarray.length; i++) { 
        const dogpic = document.createElement('img');
        dogpic.style.margin = '10px';
        dogpic.src = dogarray[i];
        gallery.appendChild(dogpic);
    }
}

function tabchange (tab) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tab).style.display = 'flex';
    // I took this off W3Schools but I understand it
}

function workclicked(wh, ww) {
    let height = 0;
    let width = 0;
    money = money + 1;
    localStorage.setItem('money', JSON.stringify(money));
    changebalance();

    const particle = document.createElement('p');
    document.body.appendChild(particle);
    while(height < 60 || height > wh - 45) {
        height = Math.random() * wh + 1;
    }
        while(width < 1 || width > ww - 30) {
            width = Math.random() * ww + 1;
    }
    particle.style.position = 'absolute';
    particle.style.marginLeft = width + 'px';
    particle.style.marginTop = height + 'px';
    particle.style.padding = '0px';
    particle.innerText = '+1$';

    setTimeout(function(){particle.remove()}, 1500);
}

function changebalance() {
    balance.innerHTML = money + '$';
}