$(document).ready(function() {

});

function fadeInPopup(fadeInElem, triggeredBtn) {
    $(fadeInElem).fadeIn();
    $(triggeredBtn).hide();
}

function fadeOutPopup(fadeOutElem, triggeredBtn) {
    $(fadeOutElem).fadeOut();
    $(triggeredBtn).show();
}



