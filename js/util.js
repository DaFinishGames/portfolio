// Script to toggle the hidden bar
var burger = document.querySelector('.burger');
var hiddenBar = document.querySelector('.hidden-bar');

burger.addEventListener('click', function() {
    hiddenBar.classList.toggle('show-bar');
});

var objs = document.getElementsByClassName("cell");

for (var obj of objs) {
    obj.addEventListener(
        "mouseover",
        function (){
            this.classList.add("hovered");
        }
    )
}