
	
var baseAPIUrl = 'http://dbsapi.staging2.salt.co.id/api/',
	finishAt = '',
	strict = 0,
	key = '',
	bgAlarm = 0,
	qtCurr = 0,
	qtTot = 0,
	_refuge = 0,
	_floor = 0,
	currAlarm = 0;
	myArray = [32, 34, 37]; 

(function(){

	var init = function() {
		//var data = request('question', {id_point:1,spot_id:1});

		getAuth();
		//var floor = request('floor'),
			//spot  = getSpot(floor.data.floor);
		/*
		var	floor = myArray[(Math.random() * myArray.length) | 0],
			spot  = getSpot(floor);
			*/
		if(!_floor) {
			_floor = myArray[(Math.random() * myArray.length) | 0]
		}
		var spot  = getSpot(parseInt(_floor));

		//krpano.call("playsound(bgsnd, 'media/backsound.mp3', 0);");
		//krpano.call("pausesound(alarm)"); 

		krpano.call("loadscene('scene_"+ _floor +"_"+ spot +"', null, MERGE);");
		//krpano.call("loadscene('scene_34_ex', null, MERGE);");
		startTimer();

	},

	alarm = function(evt){
		switch(evt) {
			case 'play':
				krpano.call("pausesound(bgsnd)");
				krpano.call("playsound(alarm, 'media/alarm.aac', 0)");
				break;
			case 'stop':
				krpano.call("resumesound(bgsnd)");
				krpano.call("stopsound(alarm)");
				break;
		}
	},   
 
	startTimer = function() { 
		var val = 10 * 60 * 1000;
		//var val = 5 * 1000; 
		var selectedDate = new Date().valueOf() + val;
		$('div#time').countdown(selectedDate)
			.on('update.countdown', function(event) {
			  var format = '%H : %M : %S';
			  if(event.offset.totalDays > 0) {
			    format = '%-d day%!d ' + format;
			  }
			  if(event.offset.weeks > 0) {
			    format = '%-w week%!w ' + format;
			  }
			  $(this).html(event.strftime(format));
			})
			.on('finish.countdown', endOver);
	}, 

	leaderboard = function() {
		var all = request('leaderboard-daily'),
			weekly = request('leaderboard-weekly');
			//console.log(all);
			//console.log(weekly);
	},

	endOver = function(event) { 
		if(!strict) { 
			request('over');
			var poin = request('getPoin');
			if(poin.success) {
				var poins = poin.data;
				var strbody = '<div class="popup-wrapper gameover in"><div class="popup-gameover"><div class="popup-body"><div class="container"><div class="row"><div class="col-sm-12 text-center"><h3 class="red-title">SORRY...</h3><br /><h2 class="big-title">You Don’t know how to escape!</h2><p>YOUR POINTS<span>'+ poins +'</span></p><p><strong>You do not reach the assembly-point on time!</strong>Try again, learn more on how to protect yourself and<br />find your way out of the building when disasters occurred.</p><a href="javascript:void(0)" onclick="location.reload()" class="btn btn-red">TRY AGAIN</a><br /><br /><a href="/" class="btn btn-back">BACK TO HOME</a></div></div></div></div></div></div>';
				$("body").append(strbody);
			}
		}
	},

	getSpot = function(lv) {
		var ret = 0;
		switch(lv) {
			case 32: 
				ret = '01';
				qtTot = 8;
				break;
			case 34: 
				ret = '01';
				qtTot = 10;
				break;
			case 37: 
				ret = '01';
				qtTot = 10;
				break;
		}
		return ret;
	},

	getHeader = function(key) {
		$.ajaxSetup({
	        dataType:'json',
	        contentType: "application/json",
	        beforeSend: function(xhr) {
	        	xhr.setRequestHeader("Accept", "application/json");
		        xhr.setRequestHeader('Access-Key', key);
		    }
	        /*
	        beforeSend: function(xhr) {
	        	xhr.setRequestHeader("Accept", "application/json");
		        xhr.setRequestHeader('Access-Key', key);
		    }
		    */
            /*
	        headers: {
                'Access-Key': key
            },
			beforeSend: function(xhr) {
		        xhr.setRequestHeader('Access-Key', key);
		    }
		    */
		});		
	},

	getAuth = function() {

		
		var _return = request('token', {});
		if(_return) {
			//getHeader(_return.data.Token);
			key = _return.data.Token;
		}
		
		/*
		var _return = 'asdasdasddadsadasdasdasd';
		if(_return) {
			getHeader(_return);
		}
		*/

	},

	score = function(value) {
		$("#poin span").html(zeroPad(value, 5));
	},


	/* API URL 

	Get Floor
	http://dbsapi.staging5.salt.co.id/api/Floor/GetFloor

	Get Spot
	http://dbsapi.staging5.salt.co.id/api/Spot/GetSpot?id_lantai=1

	Get Point
	http://dbsapi.staging5.salt.co.id/api/Point/GetPoint?id_spot=1

	Get Token
	http://dbsapi.staging5.salt.co.id/api/User/GetToken

	Get Question
	http://dbsapi.staging5.salt.co.id/api/Question/GetQuestion?id_point=1&spot_id=1

	*/

	requestUrl = function(type) {
		switch(type) {
			case 'floor' :
				return baseAPIUrl + 'Floor/GetFloor';
				break;
			case 'spot' :
				return baseAPIUrl + 'Spot/GetSpot';
				break;
			case 'point' :
				return baseAPIUrl + 'Point/GetPoint';
				break;
			case 'token' :
				return baseAPIUrl + 'User/GetToken';
				break;
			case 'getPoin' :
				return baseAPIUrl + 'User/UserPoint';
				break;
			case 'submitname' :
				return baseAPIUrl + 'User/SubmitName';
				break;
			case 'over' :
				return baseAPIUrl + 'User/FinishedGame';
				break;
			case 'totalpoint' :
				return baseAPIUrl + 'User/UserPointTotal';
				break;
			case 'scan' :
				return baseAPIUrl + 'User/ScaneFloor';
				break;
			case 'leaderboard-daily' :
				return baseAPIUrl + 'User/GetDailyWinner';
				break;
			case 'leaderboard-weekly' :
				return baseAPIUrl + 'User/GetWeeklyWinner';
				break;
			case 'leaderboard-main' :
				return baseAPIUrl + 'User/GetMainWinner';
				break;
			case 'info' :
				return baseAPIUrl + 'Info/GetInfo';
				break;
			case 'question' :
				//return baseAPIUrl + 'Question/GetQuestion';
				return baseAPIUrl + 'Question/GetQuestionByIDPoin';
				break;
			case 'answerQuestion' :
				return baseAPIUrl + 'Question/AnswerQuestion';
				break;
			default :
				return false;
		}
	},

	request = function(type, param) {
		var url = requestUrl(type);
		var result;
		if(url) {
			$.ajax({
		        type:'GET',
		        url: url,
		        data: param,
		        async:false,
		        crossDomain: true,
		        beforeSend: function(xhr) {
		        	xhr.setRequestHeader("Accept", "application/json");
			        xhr.setRequestHeader('Access-Key', key);
			    }
		    })
	        .done(function( results ) {
	            if(results.success){
	                result = results;
	            } else {
	                console.log(results.messageStr);
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
	},

	requestPost = function(type, param) {
		var url = requestUrl(type);
		var result;
		if(url) { 
			$.ajax({
		        type:'POST',
		        url: url,
		        data: param,
		        async:false,
		        crossDomain: true,
		        beforeSend: function(xhr) {
		        	xhr.setRequestHeader("Accept", "application/json");
			        xhr.setRequestHeader('Access-Key', key);
			    }
		    })
	        .done(function( results ) {
	            if(results.success){
	                result = results;
	            } else {
	                //console.log(results.messageStr);
	                result = results;
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
	},

	finishedGame = function() {
		//finishAt = param;
		finishAt = 'Meeting Point';
		request('over');
		strict = 1;
		$('div#time').countdown('stop');
		//appendName();
		setTimeout(function(){appendMessage();}, 500);
	},

	appendName = function() { 
		var poins = request('totalpoint'),
			poin  = (poins.success ? poins.data : 0);

		var strMessage = '<div id="finish-name"><div class="finish-wrap"><h5>CONGRATULATIONS</h5><p>MY POINTS<span>'+ poin +'</span></p><form id="submit-name"><input type="text" name="ipt-name" placeholder="INSERT YOUR NAME HERE" /><br /><input type="text" name="ipt-id" placeholder="INSERT YOUR ID" /><br /><input type="submit" class="btn btn-red" value="SUBMIT" /></form></div></div>';

		$("body").append(strMessage);
		score(poin);
		animateName(); 
	},

	animateName = function() {
		setTimeout(function(){$("#finish-message").fadeOut("fast");$("#finish-name").fadeIn("slow");}, 3000); 
	},

	appendMessage = function() {
		switch (finishAt) {
			case 'east':
				finishAt = 'EAST'; 
				break;
			case 'west':
				finishAt = 'WEST';
				break;
		}

		var strMessage = '<div id="finish-message"><div class="finish-wrap"><h5>CONGRATULATIONS! YOU HAVE ARRIVED AT</h5><h2>ASSEMBLY POINT</h2><h3>'+ finishAt +' EXIT</h3><p>NOW YOU ARE SAFE, KEEP CALM AND WAIT FOR DIRECTION FROM OFFICER.</p></div></div>';

		$("body").append(strMessage); 
		animateMessage(); 
	},

	animateMessage = function() {
		setTimeout(function(){$("#finish-message").fadeIn("slow");}, 1000);
		setTimeout(function(){appendName();}, 3000);
	},

	submitName = function(name, id){
		var submitname = requestPost('submitname', { "Name": name, "StaffID": id });
		$(".error-message").remove();
		if(submitname.success) {
			$("#finish-name").fadeOut("normal", function(){
				$(this).remove();
				//appendMessage(); 
				setTimeout(function(){window.location.href = '/leader-board.html';}, 1000);
			});
		} else {
			$("#submit-name").prepend('<div class="error-message">'+ submitname.messageStr +'</div>');
		}
	},

	mark = function(data) {
		requestPost('scan', { "Scane": data });
	},

	submitAnswer = function() {
		var opt = $(".ans-opt li.active"),
			sent = opt.find("input[name='answer']").val();
		if(opt.length==1) {
			var answer = requestPost('answerQuestion', { "id_answer": sent });
			if(answer.success) {
				if(answer.data.success) {
					inputPopup('MINI QUIZ - <span>Answer it correctly and get extra points</span>', qtCurr + ' of 20', '<div class="text-center"><h3 style="text-transform:capitalize">Congratulation You Got:</h3><div class="poin-wrap"><label><strong><sup>+</sup>'+ answer.data.MsgData +'</strong>POINT</label></div><br /><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);" class="btn link-icon font-size-18"><i class="fa fa-check" aria-hidden="true"></i>YEAY! THANKS</a></p></div>');
					score(answer.data.TotalPoin);
				} else {
					inputPopup('MINI QUIZ - <span>Answer it correctly and get extra points</span>', qtCurr + ' of 20', answer.data.MsgData);
				}
			} else { 
				inputPopup('MINI QUIZ - <span>Answer it correctly and get extra points</span>', qtCurr + ' of 20', '<div class="text-center"><h2>'+ answer.messageStr +'</h2><br /><br /><br /><p><a href="javascript:void(0);" onclick="closePopup(this);" class="btn link-icon font-size-18"><i class="fa fa-check" aria-hidden="true"></i>I GOT IT! THANKS</a></p></div>'); 
			} 
		}
	},

	requestQuestion = function(datas) {
		var data 	= eval("("+datas+")");
			scene  	= data.sceneId.split("-"),
			floor 	= scene[0],
			spot 	= scene[1],
			type 	= data.type,
			id 	 	= data.id,
			dtalarm = data.alarm;
			qtCurr  = id;
			cfg 	= 0;

		/* TESTING */
		switch (type) {
			case 'info' :
				qtCurr -= 20;
				cfg = 10;
				title = "DID YOU KNOW?";
				break;
			case 'question' :
				cfg = 20;
				title = "MINI QUIZ - <span>Answer it correctly and get extra points</span>";
				break;
		}
		/* TESTING */
	
		var param = {
			id_point: id,
			spot_id: floor
		}

		if(dtalarm) {
			currAlarm = 1;
			alarm('play');
		}

		var retData = request('question', param);

		if(retData.success) {
			//title = retData.data.title, 
			title = title,
			//noted = retData.data.noted,
			noted = qtCurr + ' of ' + cfg,
			content = retData.data.content;

			if(retData.data.isanswer) {
				$(".popup-global").addClass("quest");
				var ansHtml = '<ul class="ans-opt">';
				var answer = retData.data.answer;
				$.each(answer, function(idx,value){ 
					ansHtml += '<li><div class="answer-item"><label><span class="check-ipt"><input type="radio" name="answer" value="'+ value.id_answer +'" /></span></label><span class="ans-text">'+ value.answer +'</span></div></li>';
				});
				ansHtml += '</ul>'; 
				content = '<div class="question-wrap"><p>'+ content +'</p>' + ansHtml + '<div class="text-right"><br /><br /><a href="javascript:void(0)" class="btn btn-red" onclick="$.submitAnswer()">SUBMIT ANSWER</a></div></div>';
			} else {
				$(".popup-global").addClass("inform");
				image = retData.data.img_url;
				noted = '';
				content = '<div class="question-wrap"><div class="info-text">'+ content +'</div><div class="info-img"><img src="'+ image +'" alt="'+ content +'" /></div></div>';
			}

			inputPopup(title, noted, content);
		} 
	};

	jQuery.leaderboard = function() {
		leaderboard();
	};

	jQuery.submitAnswer = function() {
		submitAnswer();
	};

	jQuery.markScene = function(data) {
		mark(data);
	};

	jQuery.getQuestion = function(data) {
		requestQuestion(data);
	};

	jQuery.letsGo = function() {
		$(".start").removeClass("start"); 
		init();
    };

	jQuery.toend = function() {
		finishedGame();
    };

	jQuery.submitName = function() { 
		var name = $("#submit-name input[name='ipt-name']").val();
		var empid= $("#submit-name input[name='ipt-id']").val();
		submitName(name, empid);
    };

    jQuery.alarm = function(stat) {
    	alarm(stat);
    };

})(jQuery);