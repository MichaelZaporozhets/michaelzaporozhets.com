$(document).ready(function() {
	$('.nav ul li a').click(function(e) {
		e.preventDefault();

		var currentPage = $('.page.cur').attr('data-name');
		var nextPage = $(this).attr('data-name');

		$('.page.cur, .nav ul li').removeClass('cur');
		$(this).parent().addClass('cur');

		$('.page[data-name="'+nextPage+'"]').addClass('cur');
		$('.page[data-name="'+currentPage+'"] .animBlock').removeClass('run');
		$('.page[data-name="'+nextPage+'"] .animBlock').each(function(i) {
			var $this = $(this);
			setTimeout(function() {
				$this.addClass('run');
			}, 200*(i+1));
		});


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

	$('.nav ul li.cur a').click();

	$('#body').css('min-height', window.innerHeight);
});