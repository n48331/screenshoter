currentSlide = $('#wrapper').attr('slide-sequence');
document.addEventListener("touchmove",function(e){e.preventDefault()});
$(document).ready(function () {

  /*----------Please add javascript code here and save!-------------*/

  /*--------------Handling button linking---------------*/


  const presentationIdAttribute = 'presentation-id',
    keyMessageAttribute = 'key-message-name';
  const veevaLinkSelector = `[data-role="veeva-link"]`;
  $('body').on('click', veevaLinkSelector, function (e) {
    const presentationId = $(this).attr(presentationIdAttribute);
    const keyMessageName = $(this).attr(keyMessageAttribute);
    if (presentationId && keyMessageName) {
      console.log('Keymessage-name: ' + keyMessageName + ', Presentation: ' + presentationId);
      com.veeva.clm.runAPIRequest(`veeva:gotoSlide(${keyMessageName}, ${presentationId})`);
    } else if (keyMessageName) {
      console.log('Keymessage-name: ' + keyMessageName);
      com.veeva.clm.runAPIRequest(`veeva:gotoSlide(${keyMessageName})`);
    } else {
      console.log('Key message name not mentioned');
    }
  });
  /*----------------------------------------------*/

  /*------Fixing modal overlay issue for adaptive------*/
  $('.modal').on('show.bs.modal', () => {
    setTimeout(() => {
      console.log('open popup');
      const $backdrop = $('.modal-backdrop');

      $('#wrapper').append($backdrop);
      $('body > .modal-backdrop').remove();
    }, 20);
  });

  // to eliminate issue of popup not fading first time its openend
  if ($('.modal').hasClass('fade')) {
    $('.modal').removeClass('fade');
    $('.modal').modal('show');
    $('.modal').modal('hide');
    $('.modal').addClass('fade');
  }
});

/*--------------Custom Popup Code----------------*/
const popupTriggerAttribute = 'popup-trigger';
const popupAttribute = 'custom-popup';
const popupTargetAttribute = 'data-popup-target';
const popupTriggerSelector = `[data-role="${popupTriggerAttribute}"]`;
const popupTriggerDisplayTypeAttribute = 'data-display-type';
const closeOtherPopupsAttribute = "data-close-other-popups";
$('body').on('click', popupTriggerSelector, function () {
  const shouldCloseOtherPopups = $(this).attr(closeOtherPopupsAttribute) === "yes";
  if(shouldCloseOtherPopups) {
    $(popupSelector).css("display", "");
  }
  const targetValue = $(this).attr(popupTargetAttribute);
  const targetSelector = `[data-role="${popupAttribute}"]${targetValue}`;
  if (targetSelector) {
    const displayType = $(this).attr(popupTriggerDisplayTypeAttribute) || 'block';
    $(targetSelector).css('display', displayType);
    $("#wrapper").addClass("swipeDisable");
  }
});

const isAnyPopupOpen = () => {
  const $allPopups = $(popupSelector);
  for(const popup of $allPopups) {
    if(!["", "none"].includes(popup.style.display)) return true;
  }
  return false;
}

const popupCloseAttribute = 'popup-close';
const popupCloseSelector = `[data-role="${popupCloseAttribute}"]`;
const popupSelector = `[data-role="${popupAttribute}"]`;
const popupCloseAllAttribute = "data-close";
$('body').on('click', popupCloseSelector, function () {
  const $popupCloseParents = $(this).parents(popupSelector);
  if ($popupCloseParents.length > 0) {
    const closeAll = $(this).attr(popupCloseAllAttribute) || "this";
    if(closeAll === "all") {
      $(popupSelector).css("display", "");
      $("#wrapper").removeClass("swipeDisable");
    }
    else {
      const $thisParentPopup = $popupCloseParents.eq(0);
      $thisParentPopup.css('display', '');

      if(!isAnyPopupOpen()) {
        $("#wrapper").removeClass("swipeDisable");
      }
    }
  }
});

// close popup on overlay click
const popupOverlayCloseAttribute = "data-close-on-overlay";
$("body").on("click", popupSelector, function(e) {
  if($(this).attr(popupOverlayCloseAttribute) === "yes") {
    if($(e.target).is(popupSelector)) {
      $(this).css("display", "");
      
      if(!isAnyPopupOpen()) {
        $("#wrapper").removeClass("swipeDisable");
      }
    }
  }
});
/*-----------------------------------------------*/
