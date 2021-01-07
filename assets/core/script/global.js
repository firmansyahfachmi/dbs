
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function resetPopup() {
	$(".popup-wrapper").removeClass("in");
}

function visitRefuge() {
	if(!_refuge) {
		_refuge = 1;
		inputPopup('REFUGEE AREA', '', '<img src="assets/images/refugee.jpg" alt="" class="img-refugee">');
	}
}

function inputPopup(title, noted, content) {
	var _parent  = $(".popup-global");
	var _title   = _parent.find(".popup-title h3");
	var _notif   = _parent.find(".noted span");
	var _content = _parent.find(".body-content");

	_parent.parent().addClass("in");
	_title.html(title);
	_notif.html(noted);
	_content.html(content);
}

function showPopup() {
	var _parent  = $(".popup-global");
	resetPopup();
	_parent.parent().addClass("in");
}

function closePopup(_this) {
	var _parent  = $(_this).parents(".popup-wrapper");
	var _title   = _parent.find(".popup-title h3");
	var _notif   = _parent.find(".noted span");
	var _content = _parent.find(".body-content");

	if(currAlarm) {
		$.alarm('stop');
	}

	_parent.removeClass("in");
	_title.html("");
	_notif.html("");
	_content.html("");
}

function showMenu() {
	var _parent  = $(".popup-menu");
	resetPopup();
	_parent.parent().addClass("in");
}

function closeMenu() {
	var _parent  = $(".popup-menu");
	_parent.parent().removeClass("in");
}

function showRefugeMsg(scene) {
	var _parent  = $(".popup-re");
	resetPopup();
	_parent.find(".popup-close").attr("id", scene);
	_parent.parent().addClass("in");
}

function closeRefugeMsg(_this) {
	var _parent  = $(".popup-re");
	_parent.parent().removeClass("in");
	krpano.call("loadscene("+ $(_this).attr("id") +", null, MERGE);");
}

function showIntro() {
	var _parent  = $(".popup-intro");
	resetPopup();
	_parent.parent().addClass("in");
}

function closeIntro() {
	var _parent  = $(".popup-intro");
	_parent.parent().removeClass("in");
}

function showHelp() {
	var _parent  = $(".popup-help");
	resetPopup();
	_parent.parent().addClass("in");
}

function closeHelp() {
	var _parent  = $(".popup-help");
	_parent.parent().removeClass("in");
}

function triggerPin(datas) {
	//var data = eval("("+datas+")"),
		//type = data.type,
		//id 	 = data.id;
	//inputPopup('MINI QUIZ - <span>Answer it correctly and get extra points</span>', '1 of 12', '<div class="text-center"><h2>Sorry, you didn&apos;t answer it correctly</h2><h3>TURUN KE LANTAI DASAR MENGGUNAKAN LIFT<br />DALAM KEADAAN PANIK</h3><p>Hanya akan membuat orang sekitar Anda menjadi panik juga dan membuat keadaan semakin chaos. Selain itu, turun ke lantai dasar menggunakan lift berisiko terkunci otomatis di dalam lift. Hal tersebut merupakan standar keamanan gedung. Sehingga pastikan Anda menghindari menggunakan lift pada saat darurat. Anda dapat menggunakan tangga darurat sebagai gantinya. Namun perlu diingat, untuk tetap tenang.</p><br /><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);" class="btn link-icon font-size-18"><i class="fa fa-check" aria-hidden="true"></i>I GOT IT! THANKS</a></p></div>');

	//inputPopup('MINI QUIZ - <span>Answer it correctly and get extra points</span>', '1 of 12', '<div class="text-center"><h3 style="text-transform:capitalize">Congratulation You Got:</h3><div class="poin-wrap"><label><strong><sup>+</sup>15</strong>POINT</label></div><br /><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);" class="btn link-icon font-size-18"><i class="fa fa-check" aria-hidden="true"></i>YEAY! THANKS</a></p></div>');
	showPopup();
	$.getQuestion(datas);
}

function startGame() {
	closeIntro();
	closeHelp();

	//inputPopup('LET\'S TEST YOUR KNOWLEDGE', 'BEGIN', '<div><h5>Do you know how to escape?</h5><p class="black">Assuming you are in the meeting room, and you feel the earth shaking.<br/>Everything around you suddenly moving. And in the very exact moment<br />the floor warden tell everybody to evacuate immedietly.<br />Follow floor warden ? </p><br /><select id="floor-sel"><option value="0">Choose Floor</option><option value="32">Floor 32</option><option value="33">Floor 33</option><option value="34">Floor 34</option><option value="35">Floor 35</option><option value="36">Floor 36</option><option value="37">Floor 37</option></select><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);$.letsGo()" class="btn btn-red font-size-18">START NOW</a></p></div>');
	inputPopup('LET\'S TEST YOUR KNOWLEDGE', 'BEGIN', '<div><h5>Do you know how to escape?</h5><br/><br/><p>Answer all mini quiz on your chosen floor to collect more points!</p><p>Choose your floor to maximize your escape experience</p><button type="button" class="random-floor active">Random Floor</button> <span>or</span> <select id="floor-sel" name="floor-sel" class="custom-select floor-sel" placeholder="Choose Floor"><option value="32">Floor 32</option><option value="34">Floor 34</option><option value="37">Floor 37</option></select><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);$.letsGo()" class="btn btn-red font-size-18">START NOW</a></p></div>');
	showPopup();

	//$.letsGo();
	setTimeout(customSelect, 50);
}

function customSelect() {
	// CUSTOM SELECT
	$(".custom-select").each(function() {
	  var classes = $(this).attr("class"),
	      id      = $(this).attr("id"),
	      name    = $(this).attr("name");
	  var template =  '<div class="' + classes + '">';
	      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
	      template += '<div class="custom-options">';
	      $(this).find("option").each(function() {
	        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
	      });
	  template += '</div></div>';

	  $(this).wrap('<div class="custom-select-wrapper"></div>');
	  $(this).hide();
	  $(this).after(template);
	});
	$(".custom-option:first-of-type").hover(function() {
	  $(this).parents(".custom-options").addClass("option-hover");
	}, function() {
	  $(this).parents(".custom-options").removeClass("option-hover");
	});
	$(".custom-select-trigger").on("click", function(event) {
	  $('html').one('click',function() {
	    $(".custom-select").removeClass("opened");
	  });
	  $(this).parents(".custom-select").toggleClass("opened");
	  event.stopPropagation();
	});
	$(".custom-option").on("click", function() {
		console.log($(this).parents(".custom-select-wrapper").find("select").val());
	  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
	  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
	  $(this).addClass("selection");
	  $(this).parents(".custom-select").removeClass("opened");
	  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text()).addClass('active');
	});
	// END CUSTOM SELECT
}

(function($){

	$(document).on("change", ".answer-item input[name='answer']", function(){
		var idx = $(this).parents("li").index();
		$(".ans-opt li").removeClass("active");
		$(".ans-opt li").eq(idx).addClass("active");
	});

	$(document).on("click", ".custom-option", function(){
		$(".random-floor").removeClass('active');
		_floor = $(this).parents(".custom-select-wrapper").find("select").val();
	});

	$(document).on("click", ".random-floor", function(){
		$(this).addClass('active');
		$(".custom-select-trigger").removeClass('active');
		_floor = 0;
	})

	// Ex. Popup Message
	/*
	setTimeout(function(){
		showPopup('i know how to escape - <span>Answer it correctly and get extra points</span>', 'Begin', '<div class="text-center"><h2>Sorry, you didn&apos;t answer it correctly</h2><h3>TURUN KE LANTAI DASAR MENGGUNAKAN LIFT<br />DALAM KEADAAN PANIK</h3><p>Hanya akan membuat orang sekitar Anda menjadi panik juga dan membuat keadaan semakin chaos. Selain itu, turun ke lantai dasar menggunakan lift berisiko terkunci otomatis di dalam lift. Hal tersebut merupakan standar keamanan gedung. Sehingga pastikan Anda menghindari menggunakan lift pada saat darurat. Anda dapat menggunakan tangga darurat sebagai gantinya. Namun perlu diingat, untuk tetap tenang.</p><br /><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);" class="btn link-icon font-size-18"><i class="fa fa-check" aria-hidden="true"></i>I GOT IT! THANKS</a></p></div>');
	}, 2000);
	*/

})(jQuery);
