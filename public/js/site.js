$(document).ready(function() {
	$('.nav ul li a').click(function(e) {
		e.preventDefault();

		if($(this).attr('data-hard') == 'false') {
			SH.open($(this).data('name'))
		} else {
			window.location = $(this).data('href');
		}


		// $('.page[data-name="'+currentPage+'"]').addClass('transitionout');

		// setTimeout(function() {
		// 	$('.page[data-name="'+nextPage+'"]').addClass('cur');
		// 	$('.page[data-name="'+nextPage+'"]').addClass('transitionin');
		// 	setTimeout(function() {
		// 		$('.page[data-name="'+currentPage+'"] .animBlock').removeClass('run');
		// 		$('.page[data-name="'+currentPage+'"]').removeClass('transitionout');
		// 		$('.page[data-name="'+nextPage+'"]').removeClass('transitionin');
		// 	}, 200);

		// 	$('.page[data-name="'+nextPage+'"] .animBlock').each(function(i) {
		// 		var $this = $(this);
		// 		setTimeout(function() {
		// 			$this.addClass('run');
		// 		}, 200*(i+1));
		// 	});


		// }, 300);

	});

	SH.pages = {
		home: [],
		cv: [],
		portfolio: [],
		contact: [],
		pagenotfound: []
	}

	SH.firstPage = true;
	SH.loadedFirst = false;

	var openPage = function(page, args) {
		$('footer').hide();
		var currentPage = $('.page.cur').data('name');

		var nextPage = page;

		$('.page.cur, .nav ul li').removeClass('cur');
		$('.nav ul li a[data-name="'+nextPage+'"]').parent().addClass('cur');

		if(currentPage == nextPage) return false;
		if(nextPage == '') nextPage = 'home'

		$('.page[data-name="'+nextPage+'"]').addClass('cur');
		$('.page[data-name="'+currentPage+'"] .animBlock').removeClass('run');
		$('.page[data-name="'+nextPage+'"] .animBlock').each(function(i) {
			var $this = $(this);
			setTimeout(function() {
				$this.addClass('run');
			}, 200*(i+1));
		});

		$('footer').show();


		SH.firstPage = false;
		return false;
	};

	SH.info.root = '';
	SH.init(openPage, {});

	$('#body').css('min-height', window.innerHeight);
});