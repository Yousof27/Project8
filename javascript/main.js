// Random Backgrounds Initial Value
if (localStorage.randomBg) {
    span = document.querySelector(`.setting .random-background .selection span.${localStorage.randomBg.toLocaleLowerCase()}`);
    activeToggle(span)
} else {
    localStorage.randomBg = 'Yes';
}

// Control Random Backgrounds From Setting
document.querySelectorAll('.setting .random-background .selection span').forEach(span => {
    span.addEventListener('click', () => {
        localStorage.setItem('randomBg', span.innerText);
        activeToggle(span);
    })
});

// Change Main Section Background Randomly
setInterval(() => {
    if (localStorage.randomBg === 'Yes') {
        // Select Random Background
        document.querySelector('main').style.backgroundImage = `url(../imgs/0${Math.floor(Math.random() * 5 + 1)}.jpg)`;
    }
}, 10000);




// Go Top Button
let goTopBtn = document.querySelector('.go-top');
goTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
});

// Go Top Initial Value
if (localStorage.goTop) {
    span = document.querySelector(`.setting .go-Top-btn .selection span.${localStorage.goTop.toLocaleLowerCase()}`);
    activeToggle(span);
} else {
    localStorage.goTop = 'Yes';
}

// Control Go Top Button From Setting
document.querySelectorAll(`.setting .go-Top-btn .selection span`).forEach(span => {
    span.addEventListener('click', () => {
        localStorage.setItem('goTop', span.innerText);
        activeToggle(span);
        if (span.innerText === 'No') {
            goTopBtn.classList.add('no');
        } else {
            goTopBtn.classList.remove('no');
        }
    })
});




// Go Top Button Animation Initial Value
if (localStorage.goTopAnimation) {
    span = document.querySelector(`.setting .go-Top-btn-animation .selection span.${localStorage.goTopAnimation.toLocaleLowerCase()}`);
    activeToggle(span);
    if (localStorage.goTopAnimation === 'Yes') {
        goTopBtn.firstElementChild.classList.add('fa-bounce');
    }
} else {
    localStorage.goTopAnimation = 'No';
}

// Control Go Top Button Animation From Setting
document.querySelectorAll(`.setting .go-Top-btn-animation .selection span`).forEach(span => {
    span.addEventListener('click', () => {
        localStorage.setItem('goTopAnimation', span.innerText);
        activeToggle(span);
        if (span.innerText === 'No') {
            goTopBtn.firstElementChild.classList.remove('fa-bounce');
        } else {
            goTopBtn.firstElementChild.classList.add('fa-bounce');
        }
    })
});




// Color Initial Value
if (localStorage.mainColor) {
    colorList = document.querySelectorAll('.setting .colors ul li');
    for (const li of colorList) {
        if (li.dataset.color === localStorage.mainColor) {
            activeToggle(li);
            document.documentElement.style.setProperty('--main-color', localStorage.mainColor);
            break;
        }
    }
} else {
    localStorage.mainColor = '#FF9800';
}

// Change The Main Color From Setting
document.querySelectorAll('.setting .colors ul li').forEach(li => {
    li.addEventListener("click", (e) => {
        activeToggle(li);
        let mainColor = e.target.dataset.color;
        localStorage.setItem('mainColor', mainColor);
        document.documentElement.style.setProperty('--main-color', mainColor);
    });
});




// Reset Setting
document.querySelector('.setting .reset').addEventListener('click', () => {
    // Reset Color
    resetSetting('mainColor', '#FF9800', '.setting .colors ul li.first')
    document.documentElement.style.setProperty('--main-color', localStorage.mainColor);

    // Reset Random Background
    resetSetting('randomBg', 'Yes', `.setting .random-background .selection span.yes`);

    // Go Top Button
    resetSetting('goTop', 'Yes', `.setting .go-Top-btn .selection span.yes`);
    // Show Go Top Button On Scroll
    if (window.scrollY > window.innerHeight / 2) {
        goTopBtn.classList.remove('no');
    } else {
        goTopBtn.classList.add('no')
    }

    // Go Top Button Animation
    resetSetting('goTopAnimation', 'No', `.setting .go-Top-btn-animation .selection span.no`);
    goTopBtn.firstElementChild.classList.remove('fa-bounce');
})



// Open And Close Setting
document.querySelector('.setting .icon').addEventListener("click", openAndCloseSetting);
document.querySelector('.setting-overlay').addEventListener("click", openAndCloseSetting);



// Open Menue Icon
document.querySelector('header button').addEventListener("click", openMenu);
document.querySelector('.header-overlay').addEventListener("click", openMenu);
document.querySelectorAll('header nav ul li a').forEach(a => {
    a.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
            openMenu();
        }
    });
});



// Progress Bar
let startCount = false;
let progressKey = true;
let progressSpans = document.querySelectorAll('.skills .box .progress span');
document.onscroll = () => {
    let skillsSection = document.querySelector('.skills');
    let skillsOffsetTop = skillsSection.offsetTop;
    let skillsHeight = skillsSection.offsetHeight;
    let windowHeight = window.innerHeight;
    let top = window.scrollY;
    let percent = +((top * 100) / (skillsHeight + skillsOffsetTop - windowHeight)).toFixed()
    let percent2 = (skillsHeight + skillsOffsetTop);

    if (percent > 63 && top < percent2) {
        startCount = true;
        count();
        progressSpans.forEach(span => {
            span.style.width = `${span.dataset.progress}`;
        })
    } else if (top > percent2 || percent < 40) {
        progressKey = true;
        progressSpans.forEach(span => {
            span.style.width = `0%`;
            span.setAttribute('content', 0);
        })
    }

    // Show Go Top Button On Scroll
    if (top > windowHeight / 2 && localStorage.goTop === 'Yes') {
        goTopBtn.classList.remove('no');
    } else {
        goTopBtn.classList.add('no')
    }
}


// Gallery Popup
let galleryImages = document.querySelectorAll('.gallery .container .img-con img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        let popup = document.createElement('div');
        popup.innerHTML = showImage(img.getAttribute('src'), img.getAttribute('alt'));
        document.body.appendChild(popup);
        let span = document.querySelector('.popup-box>span');
        span.addEventListener('click', () => {
            span.parentElement.parentElement.remove();
        })
        document.querySelector('.popup-overlay').addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    })
})



// Helping Functions
// Create Popup Function
function showImage(src, alt) {
    return `
    <div class="popup-overlay"></div>
    <div class="popup-box">
        <h3 class="title">${alt.toLocaleLowerCase()}</h3>
        <img src="${src}" alt="img">
        <span><i class="fa-solid fa-xmark"></i></span>
    </div>
    `;
}

// Change The Active Element Function
function activeToggle(span) {
    for (const child of span.parentElement.children) {
        child.classList.remove('active');
    }
    span.classList.toggle('active');
}

// Count Progress Par Function
function count() {
    if (startCount && progressKey) {
        progressKey = false;
        let c = 0;
        let counter = setInterval(() => {
            progressSpans.forEach(span => {
                span.setAttribute('content', c);
            })
            c++;
            startCount = false;
            if (c > 100) {
                clearInterval(counter);
            }
        }, 7);
    }
}

// Open And Close Menu Function
function openMenu() {
    document.querySelector('header nav ul').classList.toggle('open');
    document.querySelector('.header-overlay').classList.toggle('active');
}

// Open And Close Setting Function
function openAndCloseSetting() {
    document.querySelector('.setting').classList.toggle('open');
    document.querySelector('.setting .icon i').classList.toggle('fa-spin');
}

// Reset Setting Function
function resetSetting(local, value, element) {
    localStorage.setItem(local, value);
    activeToggle(document.querySelector(element));
}