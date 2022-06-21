/* global $, alert, console*/

/* ---------------------------------------------------
Template Name: Marqa
Description: Responsive HTML5 / CSS3 One-Page Portfolio-Resume Template
Version: 2.0
Author: Ahmed Beheiry 
URL: https://themeforest.net/user/ahmedbeheiry

/* ---------------------------------------------------
	*** Table Of Content:
-----------------------------------------------------
1 - Preloader Page
2 - Give the full size hero full height of the screen
3 - Move to About section on clicking mouse icon
4 - Adding backgrounds to sections
5 - Adjusting the top nav Visibility 
6 - Adjusting Side Menu showing / hiding 
7 - Accordion in About-me Section
8 - Back To Top Button
9 - Animating Numbers at Fun-Facts Section
10 - Easy Pie Chart in Skills Section
11 - MixItUp Plugin in Portfolio Section
12 - Owl Carousel in Testimonials Section
13 - Owl Carousel in Partners Section
14 - Contact Form Validation
15 - Launching Google map
----------------------------------------------------- */

(function ($) {
	"use strict";

	/* ---------------------------------------------------
		1 - Loading Page 
	----------------------------------------------------- */
	$(window).on("load", function () {
		$(".preloader").delay(400).fadeOut(600);
	});

	/* ---------------------------------------------------
		2 - Give the full size hero full height of the screen 
	----------------------------------------------------- */
	var fullSizeHero = $('.full-size-hero');
	fullSizeHero.height($(window).height());
	$(window).on('resize', function () {
		fullSizeHero.height($(window).height());
	});

	/* ---------------------------------------------------
		3 - Move to About section on clicking mouse icon 
	----------------------------------------------------- */
	$("#mouse").on("click", function () {
		$("html, body").animate({
			scrollTop: $("#about_me").offset().top - navbarHt
		}, 1000);
	});

	/* ---------------------------------------------------
		4 - Adding backgrounds to sections
	----------------------------------------------------- */
	var hasBg = $('.has-bg');
	hasBg.each(function () {
		var bgSrc = $(this).attr('data-bg-url'),
			bgUrl = "url('" + bgSrc + "')";
		$(this).css('backgroundImage', bgUrl);
	});

	/* ---------------------------------------------------
		6 - Adjusting Side Menu showing / hiding 
	----------------------------------------------------- */
	var menuTrigBtn = $('.menu-trigger-btn'),
		menuCloseBtn = $('.close-menu-btn'),
		menuOverlay = $('.menu-overlay'),
		navbarHt = $('.main-header-wrapper').height();

	// When clicking on the Menu Triggr Button
	menuTrigBtn.on('click', function() {
		menuOverlay.addClass('shown');
		$('body').css('overflow', 'hidden');
	});
	// Close Menu using close-menu-btn
	menuCloseBtn.on('click', function() {
		menuOverlay.removeClass('shown');
		$('body').css('overflow', 'visible');
	});
	// Close Menu when click on any link in the menu
	menuOverlay.on('click', '.scroll-link', function() {
		menuOverlay.removeClass('shown');
		$('body').css('overflow', 'visible');
	});
	// Move to Specific Section after clicking its link in the menu
	$("a[href^='#']").on("click", function (event) {
		var target = $($(this).attr("href"));
		if (target.length) {
			event.preventDefault();
			$("html, body").animate({
				scrollTop: target.offset().top - navbarHt
			}, 1500);
		}
	});

	/* ---------------------------------------------------
		7 - Accordion in About-me Section 
	----------------------------------------------------- */
	$(".acc-title").on("click", function () {
		$(".acc-title").not(this).removeClass("active");
		$(this).toggleClass("active");
		$(this).siblings(".acc-content").slideToggle(350);
		$(".acc-title").not(this).siblings(".acc-content").slideUp(300);
	});

	/* ---------------------------------------------------
		8 - Back To Top Button
	----------------------------------------------------- */
	// showing the button when scroll > 400 
	var backToTop = $(".back-to-top");
	$(window).on("scroll", function () {
		if ($(this).scrollTop() >= 400) {
			backToTop.addClass("show-button");
		} else {
			backToTop.removeClass("show-button");
		}
	});

	// back to top on clicking the button
	backToTop.on("click", function () {
		$("html, body").animate({
			scrollTop: 0
		}, 1200);
	});

	/* ---------------------------------------------------
		9 - Animating Numbers at Fun-Facts Section 
	----------------------------------------------------- */
	$("#facts").appear(function () {
		$("#number_1").animateNumber({
			number: 6853	// Change to your number			
		}, 2200);
		$("#number_2").animateNumber({
			number: 120		// Change to your number	
		}, 2200);
		$("#number_3").animateNumber({
			number: 345		// Change to your number
		}, 2200);
		$("#number_4").animateNumber({
			number: 195		// Change to your number
		}, 2200);
	}, {
			accX: 0,
			accY: -150
		});

	/* ---------------------------------------------------
		10 - Easy Pie Chart in Skills Section
	----------------------------------------------------- */
	$("#skills").appear(function () {
		$(".chart").easyPieChart({
			barColor: "#eaeaea",
			trackColor: false,
			scaleColor: false,
			lineWidth: 10,
			lineCap: "round",
			size: 150,
			animate: 1500
		});

		// start numbers animate at skills section //
		$("#chart_num_1").animateNumber({
			number: 88		// Change to your number
		}, 1500);
		$("#chart_num_2").animateNumber({
			number: 95		// Change to your number
		}, 1500);
		$("#chart_num_3").animateNumber({
			number: 73		// Change to your number
		}, 1500);
		$("#chart_num_4").animateNumber({
			number: 55		// Change to your number
		}, 1500);
	}, {
			accX: 0,
			accY: -150
		});

	/* ---------------------------------------------------
		11 - MixItUp Plugin in Portfolio Section
	----------------------------------------------------- */
	$("#Container").mixItUp();

	/* ---------------------------------------------------
		12 - Owl Carousel in Testimonials Section
	----------------------------------------------------- */
	$(".test-owl").owlCarousel({
		loop: true,
		responsiveClass: true,
		margin: 10,
		nav: false,
		dots: false,
		dotsEach: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			}
		}
	});

	/* ---------------------------------------------------
		13 - Owl Carousel in Partners Section
	----------------------------------------------------- */
	$(".partners-owl-carousel").owlCarousel({
		loop: true,
		responsiveClass: true,
		margin: 10,
		nav: false,
		dots: false,
		dotsEach: false,
		autoplay: true,
		autoplayTimeout: 1500,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	});

	/* ---------------------------------------------------
		14 - Contact Form Validation
	----------------------------------------------------- */
	var contactForm = $("#contact-form"),
		submitBtn = $(".submit-btn"),
		formResponse = $(".form-response");
	contactForm.validator().on("submit", function (e) {
		if (e.isDefaultPrevented()) {
			formResponse.text("Sorry, you didn't fill the form.").fadeIn(1000);
		} else {
			e.preventDefault();
			submitForm();
		}
	});
	// Submit Form
	function submitForm() {
		// Some Variables
		var name = $("#name").val(),
			mail = $("#mail").val(),
			message = $("#message").val();
		// Ajax    
		$.ajax({
			type: "POST",
			url: "php/contact.php",
			data: "name=" + name + "&mail=" + mail + "&message=" + message,
			beforeSend: function (text) {
				submitBtn.html("Sending...");
				formResponse.fadeOut(500).text("");
			},
			success: function (text) {
				if (text == "success") {
					contactForm[0].reset();
					formResponse.text("Thanks! Your message sent correctly.").fadeIn(1000);
					submitBtn.html("Send Message");
				} else {
					formResponse.text(text).fadeIn(1000);
				}
			}
		});
	}

	// Moving placeholder on focus on any input in contact-me section //
	$(".contact .form-control").focusout(function () {
		var textValue = $(this).val();
		if (textValue === "") {
			$(this).removeClass("has-value");
		} else {
			$(this).addClass("has-value");
		}
	});
})(jQuery);

/* ---------------------------------------------------
	15 - Launching Google map
----------------------------------------------------- */
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, "load", init);

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 17,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(30.609788, 32.268555),	// Change to your latitude & longitude

		scrollwheel: false,

		// How you would like to style the map. 
		// This is where you would paste any style found on Snazzy Maps.
		styles: [{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [{
				"saturation": 36
			}, {
				"color": "#000000"
			}, {
				"lightness": 40
			}]
		}, {
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#000000"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "all",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 17
			}, {
				"weight": 1.2
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 21
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 17
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 29
			}, {
				"weight": 0.2
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 18
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 19
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 17
			}]
		}]
	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById("map");

	// Create the Google Map using our element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Let"s also add a marker while we"re at it
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(30.609788, 32.268555),	// Change to your latitude & longitude
		/* animation:google.maps.Animation.BOUNCE, Make the marker bounce */
		map: map,
		title: "Marqa Studio"		// Change to your text
	});

	var infowindow = new google.maps.InfoWindow({
		content: "Marqa Studio"		// Change to your text
	});

	google.maps.event.addListener(marker, "click", function () {
		infowindow.open(map, marker);
	});
}