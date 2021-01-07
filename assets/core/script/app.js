var API_URL = 'http://dbsapi.staging2.salt.co.id/api/';

function getResponse(url) {
	var result;
	switch(url) {
		case 'daily':
			url = 'User/GetDailyWinner';
			break;
		case 'weekly':
			url = 'User/GetWeeklyWinner';
			break;
		case 'main':
			url = 'User/GetMainWinner';
			break;
	}
	if(url) {
		$.ajax({
	        type:'GET',
	        url: API_URL + url,
	        async:false,
	        crossDomain: true,
	    })
        .done(function( results ) {
            if(results.success){
                result = results;
            } else {
                //console.log(results.messageStr);
                result = false;
            }
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
            result = false;
        });
    } else {
 		console.log("Unknown Request!");
 		result = false;
    }
 	return result;
}

(function($){

 	if($(".aboutus-page").length>0) {
 		$(".aboutus-page").slick({
 			infinite: false,
 			vertical: true,
 			adaptiveHeight: true,
 			dots: false,
 			arrows: false
 		}).mousewheel(function(e) {
			e.preventDefault();
	        if (e.deltaY < 0) {
	            $(this).slick('slickNext'); 
	        }
	        else {
	            $(this).slick('slickPrev');
	        }
	    });
 	}

 	if($('.floor-warden-slide').length>0) {
 		$('.floor-warden-slide').slick({
 			infinite: false,
 			dots: true,
 			arrows: true,
 			adaptiveHeight: true,
 			customPaging: function(slider, i) {
 				console.log($(slider.$slides[i]));
	            var getYear     = $(slider.$slides[i]).attr('data-floor');
	            var htmlPaging  = '<strong>' + getYear + '<span>TH</span></strong>';

	            return htmlPaging;
	        }
 		});
 	}

 	if($(".scrollbar").length>0) {
	 	$(window).on("load",function(){
	        $(".scrollbar").mCustomScrollbar({
	        	snapOffset: 100
	        });
	    });
	 }

})(jQuery);