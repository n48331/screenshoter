(function($) { 
  $.fn.swipeEvents = function() {
    return this.each(function() {
      
      var startX,
          startY,
          $this = $(this),
          dX;
      
      $this.bind('touchstart', touchstart);
	  $this.bind('mousedown',touchstart);
     $this.bind('touchend mouseup',function(){
         if((dX<2 && dX>-2) || dX==undefined){
             $this.trigger("swipeClick");
             dX=0;
         }else{
             dX=0;
         }
         $this.unbind('touchmove', touchmove);
      })
      function touchstart(event) {
		  if (event.type=='mousedown')
		  {
              event.preventDefault();
			var touches = event.originalEvent;
			if (touches) {
			  startX = touches.pageX;
			  startY = touches.pageY;
			}
			
		  }else{
			var touches = event.originalEvent.touches;
			if (touches && touches.length) {
			  startX = touches[0].pageX;
			  startY = touches[0].pageY;
			}
		  }
		  $this.bind('touchmove', touchmove);
		  $this.bind('mousemove',touchmove);
		  $this.bind('mouseup',touchcancel);
      }

	  function touchcancel(event) {
		 $this.unbind('touchmove', touchmove);
		 $this.unbind('mousemove',touchmove);
	  }
      
      function touchmove(event) {
		  if (event.type=='mousemove')
		  {

			var touches = event.originalEvent;
			if (touches) {
			  var deltaX = startX - touches.pageX;
			  var deltaY = startY - touches.pageY;
                dX=deltaX;
			  if (deltaX >= 50) {
				$this.trigger("swipeLeft");
			  }
			  if (deltaX <= -50) {
				$this.trigger("swipeRight");
			  }
			  if (deltaY >= 50) {
				$this.trigger("swipeUp");
			  }
			  if (deltaY <= -50) {
				$this.trigger("swipeDown");
			  }
			  if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
				$this.unbind('touchmove', touchmove);
				$this.unbind('mousemove', touchmove);
			  }
			}
		  }else{
			var touches = event.originalEvent.touches;
			if (touches && touches.length) {
			  var deltaX = startX - touches[0].pageX;
			  var deltaY = startY - touches[0].pageY;
                dX=deltaX;
			  if (deltaX >= 50) {
				$this.trigger("swipeLeft");
			  }
			  if (deltaX <= -50) {
				$this.trigger("swipeRight");
			  }
			  if (deltaY >= 50) {
				$this.trigger("swipeUp");
			  }
			  if (deltaY <= -50) {
				$this.trigger("swipeDown");
			  }
			  if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
				$this.unbind('touchmove', touchmove);
				$this.unbind('mousemove', touchmove);
			  }
			}
		  }
        event.preventDefault();
      }
      
    });
  };
})(jQuery);
