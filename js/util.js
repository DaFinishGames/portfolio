let headerHeight = getComputedStyle(document.documentElement).getPropertyValue("--heading-height");
headerHeight = headerHeight.substring(0, headerHeight.indexOf("px"));

// Script to toggle the hidden bar
var burger = document.querySelector('.burger');
var sidebar = document.querySelector('.sidebar');

burger.addEventListener('click', function() {
    sidebar.classList.toggle('show-sidebar');
});

// Script to perform the reverse animation only after hover
var projects = document.getElementsByClassName("project");
for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener(
        "mouseover",
        () => {
            projects[i].classList.add("hovered");
        }
    )
}

/*
//Script for the slideshow behaviour
var prev = document.querySelector(".previous-button");
var next = document.querySelector(".next-button");
var slides = document.getElementsByClassName("slide");
var dots = document.getElementsByClassName("dot");

prev.addEventListener("click", () =>{
    nextSlide(false);
})

next.addEventListener("click", () =>{
    nextSlide(true);
})

function nextSlide(direction){
    var found = false;
    var check = direction ? slides.length-1 : 0;
    var index = direction ? -1 : slides.length;

    for (let i = 0; i < slides.length && !found; i++) {
        if(slides[i].classList.contains("active")){
            if(i === check){
                i = index;
            }
            selectSlide(direction?++i:--i);
        }
    }
}

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () =>{
        selectSlide(i);
    })
}

function selectSlide(index){
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("dot-selected");
    }
    dots[index].classList.add("dot-selected");
}
*/

/* Start skill appearing effect */

var skills = document.querySelectorAll(".pointer-container");

const rotationObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if(entry.isIntersecting){
            entry.target.classList.add("rotate");
        }else{
            entry.target.classList.remove("rotate");
        }
    }
});
for (const skill of skills) {
    rotationObserver.observe(skill);
}

/* Start scrolling effect */
let scrolling = false;
var scrollingList = [];
var scrollingSlides = document.querySelectorAll(".scrolling-slide");

for (const slide of scrollingSlides) {
    scrollingList.push({element:slide,selected:false});
}

const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if(entry.intersectionRatio >= 1){
            scrollingList.find( e => e.element === entry.target).selected = true;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    for (let scrollingListElement of scrollingList) {
        sectionObserver.observe(scrollingListElement.element);
    }
}, false);

window.addEventListener("wheel", activateScrollingEffect);
window.addEventListener("wheel", e => e.preventDefault(), { passive:false });

function activateScrollingEffect(e){
    if(!scrolling){
        scrollToNextSection(e.deltaY > 0);
    }
}

function scrollToNextSection(forward){
    let elementIndexActive = scrollingList.findIndex(e => e.selected);
    let nextIndex = elementIndexActive + ( forward? 1 : -1);
    scrollToPage(nextIndex,true);
}

function scrollToPage(index,removeListeners){
    if(!isOutOfBounds(scrollingList,index)){
        if(removeListeners){
            window.removeEventListener("wheel", activateScrollingEffect);
            setTimeout(() => {
                scrolling = false;
                window.addEventListener("wheel",activateScrollingEffect);
            }, 1500);
        }
        for (const scrollingElement of scrollingList) {
            scrollingElement.selected = false;
        }
        let elementToScroll = scrollingList[index].element;
        scrollingList[index].selected = true;
        window.scrollTo(0,elementToScroll.offsetTop-headerHeight);
    }
}

function isOutOfBounds(array, index){
    return index >= array.length || index < 0;
}