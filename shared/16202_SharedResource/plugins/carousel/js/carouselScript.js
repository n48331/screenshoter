$(document).ready(function () {

  
  $('.leftArrow').unbind().bind(touchEvent, function(e) {
    var prevSlideId = '';
    // var slideLenth = $("#wrapper .item").length;
    // console.log(slideLenth);
    $("#wrapper .item").each(function(){
        if($(this).hasClass('active') == true) {
          prevSlideId = $(this);
        }
      });
      var curSlide = $(prevSlideId).find('section').attr('class');console.log(curSlide);
      var nextId = $(prevSlideId).prev('div.item');
      var sectionName = nextId.find('section').attr('class');
      if (curSlide != 'section-1') {
          var sectionId = sectionName.split('-')[1];
          sectionId = Number(sectionId) - 1;
          $('.leftArrow').attr('data-slide-to' , sectionId);
          console.log(sectionId);
      }
      else {
        app.goPrevSlide();
      }
      // Reset animation


//      if(app.var.currentSlide == 's2') {
//        if(curSlide == 'section-2'){
//          $(".slide_1.layer_1_text").css({'top':'-134px','opacity':'0'});
//          $(".slide_1.layer_2_img2").css({'left':'-608px','opacity':'0'});
//          $(".slide_1.layer_3_text").css({'bottom':'-140px','opacity':'0'});
//            // slide2
//          setTimeout(function(){ 
//            $(".slide_1.layer_1_text").animate({ top: 169, opacity: "1" }, 500);
//            $(".slide_1.layer_2_img2").animate({ left:  405, opacity: "1" }, 1000);
//            $(".slide_1.layer_3_text").animate({ bottom:  345, opacity: "1" }, 1200);
//          }, 200)
//
//        }
//        
//      }

//      if(app.var.currentSlide == 's3') {
//        if(curSlide == 'section-2'){
//          $(".slide_1.layer_1_text").css({'top':'-80px','opacity':'0'});
//          $(".slide_1.layer_2_img").css({'left':'-200px','opacity':'0'});
//          $(".slide_1.layer_3_text").css({'right':'-523px','opacity':'0'});
//          $(".slide_1.layer_4_text").css({'bottom':'-230px','opacity':'0'});
//            // slide3
//          setTimeout(function(){ 
//            $(".slide_1.layer_1_text").animate({ top: 84, opacity: "1" }, 500);
//            $(".slide_1.layer_2_img").animate({ left:  29, opacity: "1" }, 1000);
//            $(".slide_1.layer_3_text").animate({ right:  264, opacity: "1" }, 1200);
//            $(".slide_1.layer_4_text").animate({ bottom:  187, opacity: "1" }, 1500);
//          }, 200)
//
//        }
//        
//      }
//      if(app.var.currentSlide == 's5') {
//        if(curSlide == 'section-2'){
//          // slide5
//          $(".slide_1.layer_1_text").css({'top':'-134px','opacity':'0'});
//          $(".slide_1.layer_2_img").css({'left':'-409px','opacity':'0'});
//          $(".slide_1.layer_3_text").css({'right':'-368px','opacity':'0'});
//          $(".slide_1.layer_4_text").css({'bottom':'-382px','opacity':'0'});
//          $(".slide_1.layer_5_text").css({'bottom':'-225px','opacity':'0'});
//            // slide5
//          setTimeout(function(){ 
//            $(".slide_1.layer_1_text").animate({ top: 114, opacity: "1" }, 500);
//            $(".slide_1.layer_2_img").animate({ left:  38, opacity: "1" }, 1000);
//            $(".slide_1.layer_3_text").animate({ right:  49, opacity: "1" }, 1200);
//            $(".slide_1.layer_4_text").animate({ bottom:  91, opacity: "1" }, 1500);
//            $(".slide_1.layer_5_text").animate({ bottom:  -57, opacity: "1" }, 2000);
//          }, 200)
//        }
//        if(curSlide == 'section-3'){
//          // slide5
//          $(".slide_2.layer_1_text").css({'top':'-80px','opacity':'0'});
//          $(".slide_2.layer_2_text").css({'left':'-506px','opacity':'0'});
//          $(".slide_2.layer_3_text").css({'top':'-230px','opacity':'0'});
//          $(".slide_2.layer_4_text").css({'right':'-230px','opacity':'0'});
//          $(".slide_2.layer_5_text").css({'bottom':'-230px','opacity':'0'});
//            // slide5
//          setTimeout(function(){ 
//            $(".slide_2.layer_1_text").animate({ top: 47, opacity: "1" }, 500); 
//            $(".slide_2.layer_2_img").animate({ left:  20, opacity: "1" }, 1000);
//            $(".slide_2.layer_3_text").animate({ bottom:  89, opacity: "1" }, 1200);
//            $(".slide_2.layer_7_text").animate({ right:  -3, opacity: "1" }, 1500);
//            $(".slide_2.layer_8_text").animate({ bottom:  89, opacity: "1" }, 2000);
//          }, 200)
//        }
//      }
    //   // Reset animation
    //   //reset item active
    //   if (app.var.currentSlide == 's5') {
    //     localStorage.setItem('goToHome', 0);
    //   }
      //reset item active

  });

  $('.rightArrow').unbind().bind(touchEvent, function(e) {
    var nextSlideId = '';
    var slideLenth = $("#wrapper .item").length;
    // console.log(slideLenth);
    $("#wrapper .item").each(function(){
        if($(this).hasClass('active') == true) {
          nextSlideId = $(this);
        }
      });
      var curSlide = $(nextSlideId).find('section').attr('class');console.log(curSlide);
      var nextId = $(nextSlideId).next('div.item');
      var sectionName = nextId.find('section').attr('class');
      if (curSlide != 'section-'+slideLenth) {
          var sectionId = sectionName.split('-')[1];
          sectionId = Number(sectionId) - 1;
          $('.rightArrow').attr('data-slide-to' , sectionId);
          console.log(sectionId);
      }
      else {
        app.goNextSlide();
      }
      
      if (app.var.currentSlide == 's5') {
        localStorage.setItem('goToHome', 0);
      }
      //reset item active
  });

})


           