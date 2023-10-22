var pageWidth, pageHeight;
var $page = $('#wrapper');

var getWrapperheight = parseInt($page.css("height"), 10);
var getWrapperwidth = parseInt($page.css("width"), 10);

var basePage = {
  width: getWrapperwidth,
  height: getWrapperheight,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};

function getPageSize() {
  pageHeight = $(window).height();
  pageWidth = $(window).width();
}

function scalePages(page, maxWidth, maxHeight) {            
  var scaleX = 1, scaleY = 1;                      
  scaleX = maxWidth / basePage.width;
  scaleY = maxHeight / basePage.height;
  basePage.scaleX = scaleX;
  basePage.scaleY = scaleY;
  basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

  var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
  var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));

  page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
}


getPageSize();
scalePages($page, pageWidth, pageHeight);
      

//using underscore to delay resize method till finished resizing window
$(window).resize(_.debounce(function () {
getPageSize();            
scalePages($page, pageWidth, pageHeight);
}, 150));