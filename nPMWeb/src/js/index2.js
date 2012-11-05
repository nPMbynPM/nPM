var numberOfDiv;
var currentPosition = 0;

$(document).ready(function () {
    numberOfDiv = 3;
    $("#in").css("width", 461 * numberOfDiv);
});

function toLeftButtonClick() {
    currentPosition--;
    if (currentPosition < 0) {
        currentPosition = numberOfDiv - 1;
    }
    animation();
}
function toRightButtonClick() {
    currentPosition++;
    if (currentPosition >= numberOfDiv) {
        currentPosition = 0;
    }
    animation();
}
function animation() {
    var willMove = 461 * (-currentPosition);
    $("#in").animate({ 'marginLeft': willMove }, "slow");
}
