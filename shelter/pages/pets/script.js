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
    cards = document.querySelectorAll('.pets-card'),
    body = document.querySelector('.body'),
    title = document.querySelector('.header-logo'),
    subtitle = document.querySelector('.header-subtitle'),
    prevBtn = document.querySelectorAll('.pets-prev'),
    nextBtn = document.querySelectorAll('.pets-next'),
    counterPage = document.querySelector('.pets-btn');
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
    title.classList.toggle('header-logo-none');
    subtitle.classList.toggle('header-logo-burger');
}

function closeMenu() {
    menuOverlay.classList.remove('hamburger-overlay-active')
    menu.classList.remove('hamburger-active');
    nav.classList.remove('header-nav-active');
    body.classList.remove('body-off');
    title.classList.remove('header-logo-none');
    subtitle.classList.remove('header-logo-burger');
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

//slider

let slideIndex = 1;

function showSlides(n) {
    if (n > 1) {
        prevBtn.forEach(btn => {
            btn.classList.add('btn-active')
        })
        nextBtn.forEach(btn => {
            btn.classList.add('btn-active')
        })
    }
    if (n > 5) {
        nextBtn.forEach(btn => {
            btn.classList.remove('btn-active')
        });
    }
    if (n == 1) {
        prevBtn.forEach(btn => {
            btn.classList.remove('btn-active')
        })
        nextBtn.forEach(btn => {
            btn.classList.add('btn-active')
        })
    }
}

showSlides(slideIndex)

function plusSlides (n) {
   showSlides(slideIndex += n);
}

function nextSlide () {
    let endCard = data[data.length - 1];
    data.pop();
    data.unshift(endCard);
    plusSlides(1);
    if (slideIndex > 6) {
        slideIndex = 6;
        return
    }
    counterPage.innerHTML = slideIndex;
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = data[i].img;
        petName[i].innerHTML = data[i].name;
        petInfoBtns[i].dataset.pet = data[i].name;
        cards[i].dataset.pet = data[i].name;
        petPhoto[i].dataset.pet = data[i].name;
        petName[i].dataset.pet = data[i].name;
    }
} 

function prevSlide () {
    let firstCard = data[0];
    data.shift();
    data.push(firstCard);
    plusSlides(-1);
    if (slideIndex < 1) {
        slideIndex = 1;
        return
    }
    counterPage.innerHTML = slideIndex;
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = data[i].img;
        petName[i].innerHTML = data[i].name;
        petInfoBtns[i].dataset.pet = data[i].name;
        cards[i].dataset.pet = data[i].name;
        petPhoto[i].dataset.pet = data[i].name;
        petName[i].dataset.pet = data[i].name;
    }
}

nextBtn[0].addEventListener('click', nextSlide);
prevBtn[1].addEventListener('click', prevSlide);

nextBtn[1].addEventListener('click', function() {
    async function getPets() {
        const res = await fetch(urlPets);
        data = await res.json();
            for(let i = 5; i < petPhoto.length; i++){
                petPhoto[i].src = data[i - 5].img;
                petName[i].innerHTML = data[i - 5].name;
                petInfoBtns[i].dataset.pet = data[i - 5].name;
                cards[i].dataset.pet = data[i - 5].name;
                petPhoto[i].dataset.pet = data[i - 5].name;
                petName[i].dataset.pet = data[i - 5].name;
            }
            for(let i = 0; i < 5; i++){
                petPhoto[i].src = data[i + 3].img;
                petName[i].innerHTML = data[i + 3].name;
                petInfoBtns[i].dataset.pet = data[i + 3].name;
                cards[i].dataset.pet = data[i + 3].name;
                petPhoto[i].dataset.pet = data[i + 3].name;
                petName[i].dataset.pet = data[i + 3].name;
            }
    }
    getPets();
    slideIndex = 6;
    counterPage.innerHTML = slideIndex;
    showSlides(slideIndex);
});
prevBtn[0].addEventListener('click', function() {
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
    slideIndex = 1;
    counterPage.innerHTML = slideIndex;
    showSlides(slideIndex);
});



   








            
