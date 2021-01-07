	
showIntro();

embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"only", mobilescale:1.0, passQueryParameters:false});
var krpano = document.getElementById("krpanoSWFObject");

krpano.set("events.onloadcomplete","markone()");
krpano.set("events.keep",true);
//krpano.call("startup('37', '02')");

$(function(){

	$(document).on("click", ".popup-help.start .help-close", function(){
		startGame(); 
	});
	
	$(document).on("submit", "#submit-name", function(e){
		e.preventDefault();
		$.submitName();
	});

});