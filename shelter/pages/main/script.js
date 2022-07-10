const urlPets = './pets.json',
    petPhoto = document.querySelectorAll('.pets-img'),
    petName = document.querySelectorAll('.pets-name'),
    menuOverlay = document.querySelector('.hamburger-overlay'),
    menu = document.querySelector('.hamburger'),
    nav = document.querySelector('.header-nav'),
    navLinks = document.querySelectorAll('.header-item'),
    petInfoBtns = document.querySelectorAll('.pets-info'),
    petModalWindow = document.querySelector('.pets-modal-window'),
    petModal = document.querySelector('.pets-modal'),
    closeModal = document.querySelector('.pets-modal-close'),
    cards = document.querySelectorAll('.pets-card')
    body = document.querySelector('.body'),
    title = document.querySelector('.header-title'),
    subtitle = document.querySelector('.header-subtitle'),
    prevBtn = document.querySelector('.pets-prev'),
    nextBtn = document.querySelector('.pets-next')
let data;

async function getPets() {
    const res = await fetch(urlPets);
    data = await res.json();
        for(let i = 0; i < petPhoto.length; i++){
            petPhoto[i].src = data[i].img;
            petName[i].innerHTML = data[i].name;
            petInfoBtns[i].dataset.pet = data[i].name;
            cards[i].dataset.pet = data[i].name;
            petPhoto[i].dataset.pet = data[i].name;
            petName[i].dataset.pet = data[i].name;
        }
}
getPets();

//burger menu

    function toggleMenu() {
        menuOverlay.classList.toggle('hamburger-overlay-active')
        menu.classList.toggle('hamburger-active');
        nav.classList.toggle('header-nav-active');
        body.classList.toggle('body-off');
    }

    function closeMenu() {
        menuOverlay.classList.remove('hamburger-overlay-active')
        menu.classList.remove('hamburger-active');
        nav.classList.remove('header-nav-active');
        body.classList.remove('body-off');
    }

    menu.addEventListener('click', toggleMenu);
    navLinks.forEach((el) => el.addEventListener('click', closeMenu))
    menuOverlay.addEventListener('click', closeMenu)

//modal

function getInfo (e) {
    petModalWindow.style.display = 'block';
    body.style.overflow = 'hidden';
    for (let i = 0; i < data.length; i++){
        if(e.target.dataset.pet === data[i].name) {
            document.querySelector('.pets-modal-img').src = data[i].img;
            document.querySelector('.pets-modal-name').innerHTML = data[i].name;
            document.querySelector('.pets-modal-subname').innerHTML = data[i].type;
            document.querySelector('.pets-modal-descr').innerHTML = data[i].description;
            document.querySelector('.Age').innerHTML = data[i].age;
            document.querySelector('.Inoculations').innerHTML = data[i].inoculations;
            document.querySelector('.Diseases').innerHTML = data[i].diseases;
            document.querySelector('.Parasites').innerHTML = data[i].parasites;
        }
    }    
}  


    function closeModalWindow() {
            petModalWindow.style.display = 'none';
            body.style.overflow = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', getInfo);
    })

    petInfoBtns.forEach(btn => {
        btn.addEventListener('click', getInfo);
    })

    closeModal.addEventListener('click', closeModalWindow)
    petModalWindow.addEventListener('click', closeModalWindow)

    petModal.addEventListener('mouseleave', () => {
        closeModal.style.backgroundColor = "#F1CDB3";
     });
  
     petModal.addEventListener('mouseenter', (e) => {
      closeModal.style.backgroundColor = null;
     });

// slider

let startIndex = 0;
let endIndex = petPhoto.length - 1;
function nextSlide () {
    if (endIndex + 1 === data.length) {
        startIndex = 0;
    } else {
        startIndex = endIndex + 1;
    }
    for(let i = 0; i < petPhoto.length; i++){
        if (endIndex + 1 === data.length) {
            endIndex = 0;
        } else {
            endIndex++;
        }
        render (i, endIndex);
    }
}   

function prevSlide () {
    if (startIndex - 1 < 0) {
        endIndex = 0;
    } else {
        endIndex = startIndex - 1;
    }
    for(let i = 0; i < petPhoto.length; i++){
        if (startIndex - 1 < 0) {
            startIndex = data.length - 1;
        } else {
            startIndex--;
        }
        console.log(startIndex);
        render (i, startIndex);
    }
} 

function render (imgIndex, dataIndex) {
    petPhoto[imgIndex].src = data[dataIndex].img;
    petName[imgIndex].innerHTML = data[dataIndex].name;
    petInfoBtns[imgIndex].dataset.pet = data[dataIndex].name;
    cards[imgIndex].dataset.pet = data[dataIndex].name;
    petPhoto[imgIndex].dataset.pet = data[dataIndex].name;
    petName[imgIndex].dataset.pet = data[dataIndex].name;
}



nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

