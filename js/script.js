var app = angular.module('nikApp', ['ngRoute']);

app.controller('MainCtrl',  ['$scope', function($scope) {
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	$scope.isPhone = getMobileOperatingSystem();
			
	function getMobileOperatingSystem() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return true;
		}

		if (/android/i.test(userAgent)) {
			return true;
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return true;
		}
		
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)){
			return true;
		}

		return false;
	}
}]);

app.config(['$routeProvider', function ($routeProvider) {
	
  $routeProvider
    .when("/", {templateUrl: "pages/main.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "pages/about.html", controller: "AboutCtrl"})
    .when("/comics", {templateUrl: "pages/comics.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "pages/pricing.html", controller: "AboutCtrl"})
    .when("/bookillustrations", {templateUrl: "pages/bookillustrations.html", controller: "PageCtrl"})
    .when("/characterdesign", {templateUrl: "pages/characterdesign.html", controller: "PageCtrl"})
    .when("/websitedesign", {templateUrl: "pages/websitedesign.html", controller: "PageCtrl"})
    .when("/digitaldesign", {templateUrl: "pages/digitaldesign.html", controller: "PageCtrl"})
    .when("/paintings", {templateUrl: "pages/paintings.html", controller: "PageCtrl"})
    .when("/wallpaintings", {templateUrl: "pages/wallpaintings.html", controller: "PageCtrl"})
    .when("/ofto", {templateUrl: "pages/ofto.html", controller: "PageCtrl"})

    .when("/404", {templateUrl: "pages/404.html", controller: "AboutCtrl"})	
	.otherwise({ redirectTo: '/404' });
	
}]);

app.controller('AboutCtrl', function ( ) {
	console.log("Working OK");
});

app.controller('PageCtrl', function () {

	// OffCanvass
	var offCanvass = function() {
		$('body').on('click', '.js-fh5co-menu-btn, .js-fh5co-offcanvass-close', function(){
			$('#fh5co-offcanvass').toggleClass('fh5co-awake');
		});
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvass, .js-fh5co-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
	    		$('#fh5co-offcanvass').removeClass('fh5co-awake');
	    	}
	    }
		});

		$(window).scroll(function(){
			if ( $(window).scrollTop() > 500 ) {
				if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
		    		$('#fh5co-offcanvass').removeClass('fh5co-awake');
		    	}
	    	}
		});
	};

	// Magnific Popup
	
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			titleSrc: 'title',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

	var animateBoxWayPoint = function() {

		if ($('.animate-box').length > 0) {
			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {
					$(this.element).addClass('bounceIn animated');
				}

			} , { offset: '75%' } );
		}

	};
	
	$(function(){
		magnifPopup();
		//offCanvass();
		mobileMenuOutsideClick();
		animateBoxWayPoint();
	});
});
