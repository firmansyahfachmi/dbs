var baseUrlCms = $('#baseUrl').val();
function getResponse(e) {
  var rankNum = 1
    var t;
    switch (e) {
      case "all":
          e = "/backend/api/user/getScore";
          break;
      case "weekly":
          e = "/backend/api/user/getScore/week";
          break;
      case "monthly":
          e = "/backend/api/user/getScore/month";
  }
    return (
        e
            ? $.ajax({ type: "POST", url: baseUrlCms + e, async: !1, crossDomain: !0 })
                  .success(function (e) {
                    if(e.path == 'all'){
                      if(e.data.length>0) {
                          rankNum = 1
                          $(".board-body .winner-list").html('');
                          $.each(e.data, function(idx, item){
                              $(".board-body .winner-list").append('<div class="list-row"><div class="list-cell">'+ zeroPad(rankNum++, 2) +'</div><div class="list-cell">'+ item.name +'</div><div class="list-cell">'+ item.point +'</div></div>');
                          });
                      } else {
                          $(".board-body .winner-list").html('<div class="list-row"><div class="list-cell">00</div><div class="list-cell">-</div><div class="list-cell">-</div></div>'); 
                      }
                  }else if(e.path == 'week'){
                      if(e.data.length>0) {
                        rankNum = 1
                          $(".board-body .winner-list").html('');
                          $.each(e.data, function(idx, item){
                              $(".board-body .winner-list").append('<div class="list-row"><div class="list-cell">'+ zeroPad(rankNum++, 2) +'</div><div class="list-cell">'+ item.name +'</div><div class="list-cell">'+ item.point +'</div></div>');
                          });
                      } else {
                          $(".board-body .winner-list").html('<div class="list-row"><div class="list-cell">00</div><div class="list-cell">-</div><div class="list-cell">-</div></div>'); 
                      }
                  }else if(e.path == 'month'){
                    
                      if(e.data.length>0) {
                        
                        rankNum = 1
                          $(".board-body .winner-list").html('');
                          $.each(e.data, function(idx, item){
                            console.log('m')
                              $(".board-body .winner-list").append('<div class="list-row"><div class="list-cell">'+ zeroPad(rankNum++, 2) +'</div><div class="list-cell">'+ item.name +'</div><div class="list-cell">'+ item.point +'</div></div>');
                          });
                      } else {
                          $(".board-body .winner-list").html('<div class="list-row"><div class="list-cell">00</div><div class="list-cell">-</div><div class="list-cell">-</div></div>'); 
                      }
                  }
                        $('#loader').hide()
                  })
                  .fail(function (e, n, i) {
                      var o = n + ", " + i;
                      console.log("Request Failed: " + o), (t = !1);
                  })
            : (console.log("Unknown Request!"), (t = !1)),
        t
    );
}

function zeroPad(e, t) {
  var n = t - e.toString().length + 1
  return Array(+(n > 0 && n)).join('0') + e
}
function resetPopup() {
  $('.popup-wrapper').removeClass('in')
}
function visitRefuge() {
  _refuge ||
    ((_refuge = 1),
    inputPopupRe(
      'REST AREA',
      '',
      '<img src="assets/images/refugee.jpg" alt="" class="img-refugee">'
    ))
}
function inputPopup(e, t, n) {
  var i = $('.popup-global'),
    o = i.find('.popup-title h3'),
    s = i.find('.noted span'),
    r = i.find('.body-content')
  i.parent().addClass('in'), o.html(e), s.html(t), r.html(n)
}
function inputPopupQuestion(e, t, n) {
  var i = $('.popup-global-q'),
    o = i.find('.popup-title h3'),
    s = i.find('.noted span'),
    r = i.find('.body-content')
  i.parent().addClass('in'), o.html(e), s.html(t), r.html(n)
}
function inputPopupRe(e, t, n) {
  var i = $('.popup-global-re'),
    o = i.find('.popup-title h3'),
    s = i.find('.noted span'),
    r = i.find('.body-content')
  i.parent().addClass('in'), o.html(e), s.html(t), r.html(n)
}
function showPopup() {
  var e = $('.popup-global')
  resetPopup(), e.parent().addClass('in')
}

function closePopup(e) {
  $.alarm('stop')
  $('.popup-global').attr(
    'style',
    'max-width:100%;height:auto;bottom:30px;top:30px;'
  )
  var t = $(e).parents('.popup-wrapper'),
    n = t.find('.popup-title h3'),
    i = t.find('.noted span'),
    o = t.find('.body-content')
  currAlarm && $.alarm('stop'),
    t.removeClass('in'),
    n.html(''),
    i.html(''),
    o.html('')
}
function showMenu() {
  var e = $('.popup-menu')
  resetPopup(), e.parent().addClass('in')
}
function closeMenu() {
  var e = $('.popup-menu')
  e.parent().removeClass('in')
}
function showRefugeMsg(e) {
  var t = $('.popup-re')
  resetPopup(), t.find('.popup-close').attr('id', e), t.parent().addClass('in')
}
function closeRefugeMsg(e) {
  var t = $('.popup-re')
  t.parent().removeClass('in'),
    krpano.call('loadscene(' + $(e).attr('id') + ', null, MERGE);')
}
function showIntro() {
  var e = $('.popup-intro')
  resetPopup(), e.parent().addClass('in')
}
function closeIntro() {
  var e = $('.popup-intro')
  e.parent().removeClass('in')
}
function showHelp() {
  var e = $('.popup-help')
e.parent().addClass('in')
}
function closeHelp() {
  var e = $('.popup-help')
  e.parent().removeClass('in')
}
function triggerPin(e) {
  $('.popup-global-q .popup-body-q .body-content').attr(
    'style',
    'width:100%;margin:0px 0 0 0;text-align:center;'
  )
  $('.popup-global-q').attr(
    'style',
    'max-width:600px;height:auto;bottom:auto;top:30px;'
  )
  $('.popup-global-q .popup-body-q').attr('style', 'min-height:300px;')
  pilihData(e)
}

function pilihData(e) {

	let htmlData = '';

	var str_nilai = '';
	var str_jawab1 = 'checked';
	var str_jawab2 = '';
	var str_quis = '';
	$.ajax({
        method:'POST',
        url: baseUrl+'/backend/api/user/getFloor?location=ciputra',
        data: 'info_lantai='+e,
        dataType: "json",
        beforeSend: function(xhr) {
        	$('.loadingpopup').show();
	    },
	    // success: function(results) {
	    // 	alert(1)
	    // });
    })
    .success(function( results ) {
      console.log('ss')
		$('.loadingpopup').hide();
		str_nilai = results.str_nilai;
		str_jawaban = results.str_jawaban;
		str_quis = results.str_quis;
		str_pengurangan = results.str_pengurangan;
		$('#str_nilai').val(str_nilai);
    $('#str_quis').val(str_quis);
    $('#str_pengurangan').val(str_pengurangan);
		if (str_jawaban == 1){
			$('#radio_data_1').prop('checked', true);
			$('#radio_data_2').prop('checked', false);
		} else {
			$('#radio_data_1').prop('checked', false);
			$('#radio_data_2').prop('checked', true);
		}
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

	htmlData += '<div class="">Info<input id="str_id" type="text" disabled style="display:block;margin-bottom:10px;width:100%;border:1px solid #ccc;padding:10px;" value="'+e+'">';
	htmlData += '<br><table><tr><td>Nilai Plus<input id="str_nilai" type="number" style="display:block;margin-bottom:10px;width:150px;border:1px solid #ccc;padding:10px;" value=""></td><td style="vertical-align:top;padding-left:20px;">';
	htmlData += 'Jawaban<div style="clear:both;height:10px;"></div><input type="radio" name="radio_data" value="1" id="radio_data_1"> <label for="radio_data_1">True</label>&nbsp;';
	htmlData += '<input type="radio" value="0" id="radio_data_2" name="radio_data"> <label for="radio_data_2">False</label>';
	htmlData += '</td><td style="padding-left:20px;">Nilai Minus<input id="str_pengurangan" type="number" style="display:block;margin-bottom:10px;width:150px;border:1px solid #ccc;padding:10px;" value=""></td>';
	htmlData += '</tr></table>';
	htmlData += '<br>Questionnaire<textarea id="str_quis" style="width:100%;border:1px solid #ccc;padding:10px;height:200px;"></textarea>';
	htmlData += '<a onclick="simpanData(this)" class="btn btn-red font-size-18" style="margin:20px 0 0 0;">Simpan</a></div>';
	// htmlData += e;
	inputPopupQuestion('data questionnaire','','');
	$('.popup-global-q .popup-body-q .body-quisioner').html(htmlData);
	// showPopup();
}

function simpanData(e){
	var str_id = $('#str_id').val();
	var str_nilai = $('#str_nilai').val();
	var str_jawab = $('input[name="radio_data"]:checked').val();
  var str_quis = $('#str_quis').val();
  var str_pengurangan = $('#str_pengurangan').val();
	$.ajax({
        method:'POST',
        url: baseUrl+'/backend/api/user/saveFloor',
        data: 'str_id='+str_id+'&str_nilai='+str_nilai+'&str_jawab='+str_jawab+'&str_quis='+str_quis+'&str_pengurangan='+str_pengurangan,
        beforeSend: function(xhr) {
        	$('.loadingpopup').show();
	    }
    })
    .done(function( results ) {
		$('.loadingpopup').hide();
		closePopup(e)
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
}
function startGame() {
  closeIntro(),
    closeHelp(),
    inputPopup(
      "LET'S TEST YOUR KNOWLEDGE",
      'BEGIN',
      '<div><h5>Do you know how to escape?</h5><br/><br/><p>Answer all mini quiz on your chosen floor to collect more points!</p><p>Choose your floor to maximize your escape experience</p><select id="floor-sel" name="floor-sel" class="custom-select floor-sel" placeholder="Choose Floor"><option selected value="32">Floor 32</option><option selected value="33">Floor 33</option><option value="34">Floor 34</option><option selected value="35">Floor 35</option><option selected value="36">Floor 36</option><option value="37">Floor 37</option></select><label class="warn-label">*choose your floor</label><br /><br /><p><a href="javascript:void(0);" onclick="$.letsGo(this)" class="btn btn-red font-size-18">START NOW</a></p></div>'
    ),
    showPopup()
    // setTimeout(customSelect, 50)
}
function customSelect() {
  $('.custom-select').each(function () {
    var e = $(this).attr('class'),
      t = ($(this).attr('id'), $(this).attr('name'), '<div class="' + e + '">')
    ;(t +=
      '<span class="custom-select-trigger">' +
      $(this).attr('placeholder') +
      '</span>'),
      (t += '<div class="custom-options">'),
      $(this)
        .find('option')
        .each(function () {
          t +=
            '<span class="custom-option ' +
            $(this).attr('class') +
            '" data-value="' +
            $(this).attr('value') +
            '">' +
            $(this).html() +
            '</span>'
        }),
      (t += '</div></div>'),
      $(this).wrap('<div class="custom-select-wrapper"></div>'),
      $(this).hide(),
      $(this).after(t)
  }),
    $('.custom-option:first-of-type').hover(
      function () {
        $(this).parents('.custom-options').addClass('option-hover')
      },
      function () {
        $(this).parents('.custom-options').removeClass('option-hover')
      }
    ),
    $('.custom-select-trigger').on('click', function (e) {
      $('html').one('click', function () {
        $('.custom-select').removeClass('opened')
      }),
        $(this).parents('.custom-select').toggleClass('opened'),
        e.stopPropagation()
    }),
    $('.custom-option').on('click', function () {
      console.log(
        $(this).parents('.custom-select-wrapper').find('select').val()
      ),
        $(this)
          .parents('.custom-select-wrapper')
          .find('select')
          .val($(this).data('value')),
        $(this)
          .parents('.custom-options')
          .find('.custom-option')
          .removeClass('selection'),
        $(this).addClass('selection'),
        $(this).parents('.custom-select').removeClass('opened'),
        $(this)
          .parents('.custom-select')
          .find('.custom-select-trigger')
          .text($(this).text())
          .addClass('active')
    })
}
var API_URL = 'http://dbsapi.staging2.salt.co.id/api/'
!(function (e) {
  e('.aboutus-page').length > 0 &&
    e('.aboutus-page')
      .slick({
        infinite: !1,
        vertical: !0,
        adaptiveHeight: !0,
        dots: !1,
        arrows: !1,
      })
      .mousewheel(function (t) {
        t.preventDefault(),
          t.deltaY < 0 ? e(this).slick('slickNext') : e(this).slick('slickPrev')
      }),
    e('.floor-warden-slide').length > 0 &&
      e('.floor-warden-slide').slick({
        infinite: !1,
        dots: !0,
        arrows: !0,
        adaptiveHeight: !0,
        customPaging: function (t, n) {
          console.log(e(t.$slides[n]))
          var i = e(t.$slides[n]).attr('data-floor'),
            o = '<strong>' + i + '<span>TH</span></strong>'
          return o
        },
      }),
    e('.scrollbar').length > 0 &&
      e(window).on('load', function () {
        e('.scrollbar').mCustomScrollbar({ snapOffset: 100 })
      })
})(jQuery),
  (function (e) {
    e(document).on('change', ".answer-item input[name='answer']", function () {
      var t = e(this).parents('li').index()
      e('.ans-opt li').removeClass('active'),
        e('.ans-opt li').eq(t).addClass('active')
    }),
      e(document).on('click', '.custom-option', function () {
        e('.random-floor').removeClass('active'),
          (_floor = e(this)
            .parents('.custom-select-wrapper')
            .find('select')
            .val())
      }),
      e(document).on('click', '.random-floor', function () {
        e(this).addClass('active'),
          e('.custom-select-trigger').removeClass('active'),
          (_floor = 0)
      })
  })(jQuery)
