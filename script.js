/* ========================================
   TEACHER INFINITE CAROUSEL
======================================== */

const carousel = document.querySelector(".staff-carousel");
const track = document.querySelector(".staff-track");


/* ========================================
   DUPLICATE STAFF CARDS
   This creates the infinite loop
======================================== */

const originalCards = Array.from(
    track.querySelectorAll(".staff-card")
);


/* Duplicate the cards */

originalCards.forEach(card => {

    const clone = card.cloneNode(true);

    track.appendChild(clone);

});


/* ========================================
   CAROUSEL VARIABLES
======================================== */

let position = 0;

let speed = 0.5;

let isPaused = false;

let isDragging = false;

let startX = 0;

let startPosition = 0;


/* ========================================
   GET LOOP WIDTH
======================================== */

let loopWidth = 0;


function calculateLoopWidth() {

    const cards = track.querySelectorAll(".staff-card");

    const firstSet = Array.from(cards).slice(
        0,
        originalCards.length
    );

    if (firstSet.length === 0) return;


    const firstCard = firstSet[0];

    const lastCard =
        firstSet[firstSet.length - 1];


    loopWidth =
        lastCard.offsetLeft +
        lastCard.offsetWidth -
        firstCard.offsetLeft;

}


calculateLoopWidth();


window.addEventListener(
    "resize",
    calculateLoopWidth
);


/* ========================================
   AUTO MOVEMENT
======================================== */

function animateCarousel() {

    if (!isPaused && !isDragging) {

        position -= speed;

        if (Math.abs(position) >= loopWidth) {

            position += loopWidth;

        }


        track.style.transform =
            `translateX(${position}px)`;

    }


    requestAnimationFrame(animateCarousel);

}


animateCarousel();



/* ========================================
   PAUSE WHEN MOUSE ENTERS
======================================== */

carousel.addEventListener(
    "mouseenter",
    () => {

        isPaused = true;

    }
);



/* ========================================
   CONTINUE WHEN MOUSE LEAVES
======================================== */

carousel.addEventListener(
    "mouseleave",
    () => {

        if (!isDragging) {

            isPaused = false;

        }

    }
);



/* ========================================
   MOUSE DRAG START
======================================== */

carousel.addEventListener(
    "mousedown",
    (e) => {

        isDragging = true;

        isPaused = true;

        startX = e.pageX;

        startPosition = position;

        carousel.classList.add("dragging");

        e.preventDefault();

    }
);



/* ========================================
   MOUSE DRAGGING
======================================== */

carousel.addEventListener(
    "mousemove",
    (e) => {

        if (!isDragging) return;


        const distance =
            e.pageX - startX;


        position =
            startPosition + distance;


        if (position > 0) {

            position -= loopWidth;

        }

        if (Math.abs(position) >= loopWidth) {

            position += loopWidth;

        }


        track.style.transform =
            `translateX(${position}px)`;

    }
);



/* ========================================
   MOUSE DRAG END
======================================== */

document.addEventListener(
    "mouseup",
    () => {

        if (!isDragging) return;


        isDragging = false;

        carousel.classList.remove(
            "dragging"
        );

        if (
            carousel.matches(":hover")
        ) {

            isPaused = true;

        } else {

            isPaused = false;

        }

    }
);



/* ========================================
   TOUCH SUPPORT
======================================== */

carousel.addEventListener(
    "touchstart",
    (e) => {

        isDragging = true;

        isPaused = true;

        startX =
            e.touches[0].pageX;

        startPosition =
            position;

    },
    { passive: true }
);



/* ========================================
   TOUCH MOVE
======================================== */

carousel.addEventListener(
    "touchmove",
    (e) => {

        if (!isDragging) return;


        const currentX =
            e.touches[0].pageX;


        const distance =
            currentX - startX;


        position =
            startPosition + distance;


        if (position > 0) {

            position -= loopWidth;

        }

        if (Math.abs(position) >= loopWidth) {

            position += loopWidth;

        }


        track.style.transform =
            `translateX(${position}px)`;

    },
    { passive: true }
);



/* ========================================
   TOUCH END
======================================== */

carousel.addEventListener(
    "touchend",
    () => {

        isDragging = false;


        isPaused = false;

    }
);
/* ========================================
   REAL-TIME NEPAL DATE & TIME
======================================== */

function updateNepalTime() {

    const now = new Date();

    const options = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const time = new Intl.DateTimeFormat(
        "en-GB",
        options
    ).format(now);


    const dateOptions = {
        timeZone: "Asia/Kathmandu",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const date = new Intl.DateTimeFormat(
        "en-GB",
        dateOptions
    ).format(now);


    /* Convert English numbers to Nepali numbers */

    function nepaliNumbers(value) {

        const nepaliDigits = [
            "०", "१", "२", "३", "४",
            "५", "६", "७", "८", "९"
        ];

        return value.replace(
            /\d/g,
            digit => nepaliDigits[digit]
        );
    }


    /* Convert day names */

    const nepaliDays = {
        Sunday: "आइतबार",
        Monday: "सोमबार",
        Tuesday: "मंगलबार",
        Wednesday: "बुधबार",
        Thursday: "बिहिबार",
        Friday: "शुक्रबार",
        Saturday: "शनिबार"
    };


    const englishDay = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "Asia/Kathmandu",
            weekday: "long"
        }
    ).format(now);


    /* Update time */

    document.getElementById("live-time").textContent =
        nepaliNumbers(time) + " बजे";


    /* Update day */

    document.getElementById("live-day").textContent =
        nepaliDays[englishDay];


    /* Update date */

    document.getElementById("live-date").textContent =
        nepaliNumbers(date);

}


/* Run immediately */

updateNepalTime();


/* Update every second */

setInterval(updateNepalTime, 1000);