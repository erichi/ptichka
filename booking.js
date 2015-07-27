(function() {
function addEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Handler could not be attached");
    }
}
function find_by_href(href){
	var element = false;
	var els = document.getElementsByTagName("a"),
			els_length = els.length;
	for (var i = 0, l = els_length; i < l; i++) {
		var el = els[i];
		if (el.href === href) {
    		element = el;
		}
	}
	return element;
}

function activate_msk(){
	var button = MSWidget.gId('booking_button');
	button.onclick = function(evt){
		$("#ms-booking-button-container, #ms_booking_widget, #ms_overlay").remove();
		MSWidget.initSonline();	
        evt.preventDefault();
	}
}
function activate_ms(ms_id){
	var MSWidgetOptions = {
		href: ms_id,
		host: 'http://moresalonov.ru',
		type: 'right',
		lang: 'rus',
		border_color: '',
		main_color: '4A4949'
	};
	MSWidget.initWidget(MSWidgetOptions);
}
function activate_nnov(){
	activate_ms('25809/2/1');
}

function activate_spb(){
 	activate_ms('25825/2/1');	
}

function activate_yrsl(){
	var button = MSWidget.gId('booking_button');
	button.onclick = undefined;
}

function activate_alm(){
	var button = MSWidget.gId('booking_button');
	button.onclick = undefined;
}

function activate_srt(){
    var button = MSWidget.gId('booking_button');
    button.onclick = undefined;
}

function flash(){
    var objObject = document.getElementsByTagName("object");
    var objParam = document.createElement("param");
    objParam.name = "wmode";
    objParam.value = "transparent";
    var lenghParam = objObject.length;
    for (i=0; i<lenghParam; i=i+1) {
        objObject[i].appendChild(objParam);
    }

    var objEmbed = document.getElementsByTagName("embed");
    var lenghEmbed = objEmbed.length;
    for (i=0; i<lenghEmbed; i=i+1) {
        objEmbed[i].setAttribute('wmode', "transparent");
    }

    for (i=0; i<lenghParam; i=i+1) {
        var cont = objObject[i].parentNode.innerHTML;
        objObject[i].parentNode.innerHTML = cont;
    }
	
}

function encode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOP" +
               "QRSTUVWXYZabcdef" +
               "ghijklmnopqrstuv" +
               "wxyz0123456789+/" +
               "=";
	 input = escape(input);
	 var output = "";
	 var chr1, chr2, chr3 = "";
	 var enc1, enc2, enc3, enc4 = "";
	 var i = 0;

	 do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
		   enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
		   enc4 = 64;
		}

		output = output +
		   keyStr.charAt(enc1) +
		   keyStr.charAt(enc2) +
		   keyStr.charAt(enc3) +
		   keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	 } while (i < input.length);

	 return output;
}

var MSWidget = {
    href : 0,
    host: 0,
    master_href : 0,
    type: 0,
    lang: 'rus',
    position: 0,
    overflow : 0,
    height : 0,
    flag: true,
    
    isMobile : {     
    	Android: function() {         
    		return navigator.userAgent.match(/Android/i);     
    	},    
    	BlackBerry: function() {         
    		return navigator.userAgent.match(/BlackBerry/i);     
    	},     
    	iOS: function() {         
    		return navigator.userAgent.match(/iPhone|iPad|iPod/i);     
    	},     
    	Opera: function() {         
    		return navigator.userAgent.match(/Opera Mini/i);     
    	},     
    	Windows: function() {         
    		return navigator.userAgent.match(/IEMobile/i);     
    	},     
    	any: function() {         
    		return (MSWidget.isMobile.Android() || MSWidget.isMobile.BlackBerry() || MSWidget.isMobile.iOS() || MSWidget.isMobile.Opera() || MSWidget.isMobile.Windows() || (window.innerWidth <= 767));     
    	} 
    },    
    
    mobileEvent :  ('ontouchstart' in window) ? true : false,
    
    gId : function(id){
        return document.getElementById(id);
    },

    initSonline : function(){
		var site='http://sonline.su/order_new2b_group/group_68';
		var css=document.createElement("link");
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", 'http://sonline.su/css/widget.css');
		document.getElementsByTagName("head")[0].appendChild(css);
		var url=site;
		if(window.innerHeight!=undefined){
			var iH=window.innerHeight,
			Yo=window.pageYOffset;
		}else{
			var d=document.documentElement,
			iH=d.clientHeight,
			Yo=d.scrollTop;
		}
		var h=iH/2+Yo-345;
		if(iH<768){
			h=0;
		}
		var popup=document.createElement("div");
		popup.innerHTML='<div class="conline-signup-popup-wrap" id="conline_signup_overlay"><div class="conline-overlay">&#160;</div><div class="conline-signup-popup-inner" style="z-index: 99; top:'+h+'px"><span style="top:30px;margin-right:5px;" class="conline-popup-close" onclick="var po=document.getElementById(\'conline_signup_overlay\');po.parentNode.removeChild(po)">&nbsp;</span><iframe style="width:1024px; height:661px;" scrolling="no" src="'+url+'"></iframe></div></div>';
		document.getElementsByTagName("body")[0].appendChild(popup);

    },
	
    initWidget : function(options) {
        MSWidget.href = options.href;
        MSWidget.host = options.host;
        MSWidget.type = options.type;
        MSWidget.lang = options.lang;
        MSWidget.border_color = options.border_color;
        MSWidget.main_color = options.main_color;
        if (MSWidget.isMobile.any() || MSWidget.type == 'top' || MSWidget.type == 'bottom') {
        if ((MSWidget.isMobile.any() || MSWidget.type == 'top') && MSWidget.type != 'bottom' && MSWidget.type != 'inline') {
        	var str = "html{padding-top:50px !important;}";
        }
        if (MSWidget.isMobile.any() && (MSWidget.type == 'left' || MSWidget.type == 'right')){
	        MSWidget.type = 'top';
        }
        var scss = ".widget-back {background-image:url('"+MSWidget.host+"/images/widget-back.png');width: 780px;padding: 0 17px;margin: 0 auto; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}.widget-back.no-shadow {background-image:none}.widget-back.wi-middle {background-position:-814px 0;position: relative;background-repeat:repeat-y; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}.widget-back.wi-bottom {height: 27px!important;background-position: -1628px 100%!important; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}";
        scss = scss + " #ms_overlay {position: fixed; top: 0px; left: 0px; z-index: 9999; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4375); background-position: initial initial; background-repeat: initial initial;}";
        var css = scss +"#ms_booking_widget{\n				width:960px;\n				height: 603px;\n				position: fixed;\n				top:50%;\n				left:50%;\n				margin-left:-480px;\n				margin-top:-250px;\n				z-index: 99999;\n			}\n			#ms-close-icon {\n	            background: url("+MSWidget.host+"/images/new-widget-close.png) no-repeat scroll 0 0;\n				position:absolute !important;\n				overflow: hidden !important;\n	                        top:-8px !important;\n				right:8px !important;\n				width:22px !important;\n				height:22px !important;\n				text-indent: -9999px !important;\n				overflow:hidden !important;\n			}\n			.ms-inline{\n				background: #C7518C url("+MSWidget.host+"/images/ms-booking-inline_rus.png?1) no-repeat 0 0;\n				width:205px;\n				height:38px;\n				display: block;\n				-webkit-border-radius: 5px;\n				-moz-border-radius: 5px;\n	            border-radius:  5px;\n			}\n	        .ms-inline.rus{\n				width: 205px;\n				height: 38px; \n				background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_rus.png?1) no-repeat 0 0;\n			}\n			.ms-inline.en{\n				width: 205px;\n				height: 38px; \n				background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_eng.png?2) no-repeat 0 0;\n			}\n	        .ms-inline.lt{\n				width: 225px;\n				height: 38px; \n				background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_lt.png) no-repeat 0 0;\n			}\n	        .ms-inline.ee{\n				width: 194px;\n				height: 38px; \n				background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_ee.png) no-repeat 0 0;\n			}\n	        .ms-inline.lv{\n				width: 233px;\n				height: 38px; \n				background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_lv.png) no-repeat 0 0;\n			}\n			"+str; 
        } else {
        
        var ie = 0 ;
        if (ie) var str = "";
        var scss = ".widget-back {background-image:url('"+MSWidget.host+"/images/widget-back.png');width: 780px;padding: 0 17px;margin: 0 auto; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}.widget-back.no-shadow {background-image:none}.widget-back.wi-middle {background-position:-814px 0;position: relative;background-repeat:repeat-y; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}.widget-back.wi-bottom {height: 27px!important;background-position: -1628px 100%!important; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box;}";
        scss = scss + " #ms_overlay {position: fixed; top: 0px; left: 0px; z-index: 9999; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4375); background-position: initial initial; background-repeat: initial initial;}";
        var css = scss +"#ms_booking_widget{\n			width:960px;\n			height: 603px;\n			position: fixed;\n			top:50%;\n			left:50%;\n			margin-left:-480px;\n			margin-top:-300px;\n			z-index: 99999;\n		}\n		.ms-absolute{\n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking_rus.png?1) no-repeat 0 0;\n			width:42px;\n			height:202px;\n			display: block;\n			/*border:solid 2px #"+MSWidget.border_color+";*/\n			border-radius: 5px;\n			-moz-border-radius: 5px;\n			-webkit-border-radius: 5px;\n		}\n		#ms-close-icon {\n                        background: url("+MSWidget.host+"/images/new-widget-close.png) no-repeat scroll 0 0;\n			position:absolute !important;\n			overflow: hidden !important;\n                        top:-8px !important;\n			right:8px !important;\n			width:22px !important;\n			height:22px !important;\n			text-indent: -9999px !important;\n			overflow:hidden !important;\n		}\n		#ms-close-icon:hover{\n			/*background: url("+MSWidget.host+"/images/btn-close.png) no-repeat scroll 0 -17px transparent;*/\n		}\n		.ms-inline{\n			background: #C7518C url("+MSWidget.host+"/images/ms-booking-inline_rus.png?1) no-repeat 0 0;\n			width:205px;\n			height:38px;\n			display: block;\n			-webkit-border-radius: 5px;\n			-moz-border-radius: 5px;\n                        border-radius:  5px;\n		}\n                .ms-inline.rus{\n			width: 205px;\n			height: 38px; \n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_rus.png?1) no-repeat 0 0;\n		}\n		.ms-inline.en{\n			width: 205px;\n			height: 38px; \n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_eng.png?2) no-repeat 0 0;\n		}\n        .ms-inline.lt{\n			width: 225px;\n			height: 38px; \n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_lt.png) no-repeat 0 0;\n		}\n        .ms-inline.ee{\n			width: 194px;\n			height: 38px; \n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_ee.png) no-repeat 0 0;\n		}\n        .ms-inline.lv{\n			width: 233px;\n			height: 38px; \n			background: #"+MSWidget.main_color+" url("+MSWidget.host+"/images/ms-booking-inline_lv.png) no-repeat 0 0;\n		}\n		"+str+"\n}"; 
		}
		var old_style = document.getElementById('ms_widget_style');
		if (old_style) {
		    old_style.parentNode.removeChild(old_style);
		}
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'ms_widget_style';
        if(style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            var rules = document.createTextNode(css);
            style.appendChild(rules);
        }
    	head.appendChild(style);


		var button = MSWidget.gId('booking_button');
		if (!MSWidget.mobileEvent){
			button.onclick = MSWidget.showIframe; 
		} else {
			button.ontouchstart = MSWidget.showIframe;    
		}
    },
		
    showIframe : function(){
    	if (MSWidget.isMobile.any()) {
    		var str = '?from='+encode64(window.location.href);
    		var url_arr = MSWidget.href.split("#");
    		location.href = 'https://yclients.com/ru/bookmob/'+url_arr[0]+str+'#'+url_arr[1];
    		return false;
    	}
        if(MSWidget.flag){
            flash();
            MSWidget.flag = false;
        }
        if(MSWidget.gId('ms_booking_widget')){
            MSWidget.gId('ms_booking_widget').style.display = 'block';
            MSWidget.gId('ms_overlay').style.display = 'block';
        }
        else{
            var overlay = document.createElement('div');
            overlay.id = 'ms_overlay';
            //overlay.style = "";
            document.body.insertBefore(overlay, document.body.getElementsByTagName('*')[0]); 
                                    
            var wrap = document.createElement('div');
            wrap.id = 'ms_booking_widget';
            var str = '?from='+encode64(window.location.href);
			var url_arr = MSWidget.href.split("#");
    		var full_url = url_arr[0]+str+'#'+url_arr[1];
            wrap.innerHTML = '<div class="widget-back wi-middle">\n								<a href="#" id="ms-close-icon" onclick="return MSWidget.hideIframe();" ></a>\n								<iframe src="https://yclients.com/booking/'+full_url+'" scrolling="no" frameborder="0" allowtransparency="true" style="border: medium none; width: 780px; height: 545px; margin: 0; padding: 0;" />\n							</div>\n							';
            wrap.innerHTML = wrap.innerHTML + '<div class="widget-back wi-bottom">&nbsp;</div>';
            document.body.insertBefore(wrap, document.body.getElementsByTagName('*')[0]); 
        }
        return false;
    },
	
    hideIframe : function(){
        MSWidget.gId('ms_booking_widget').style.display = 'none';
        MSWidget.gId('ms_overlay').style.display = 'none';
        return false;
    }
 
};

	setTimeout(function(){
		el = find_by_href('http://sonline.su/order_new2b_group/group_68');
		el.href = '#';
		el.id = 'booking_button'

		activate_msk();
		// setTimeout(function(){
		// 	['moscow', 'spb', 'nn', 'almaty', 'yar'].forEach(function(element, index, array){
	 //          var city = find_by_href('/'+element+'/');
	 //          console.log(city);
	 //          city.onclick = function(){
	 //            switch (element) {
	 //              case 'moscow': 
	 //                activate_msk(); break;
	 //              case 'spb': 
	 //                activate_spb(); break;
	 //              case 'nn': 
	 //                activate_nnov(); break;
	 //              case 'almaty': 
	 //                activate_alm(); break;
	 //              case 'yar': 
	 //                activate_yrsl(); break;
	 //            }
	 //          }
	 //        });
	 //        console.log('cities here!')
		// }, 3000);   	
	}, 3000);    
	
})()