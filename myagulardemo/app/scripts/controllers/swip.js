//滑动切换        
var swiper = new Swiper('#swiper-container', {
		resistanceRatio: 0,
		pagination: '.swiper-pagination',
		parallax: true,
		paginationClickable: true,
		resistance: '100%',
		speed: 300,
		loop:true,
		autoplay: 5000,
		paginationBulletRender: function(index, className) {
			var name;
			// console.log(index);
			switch (className) {
				case 0:
					name = '主播人气榜';
					className += ' ranking-btn';
					break;
				case 1:
					name = '主播魅力榜';
					className += ' charm-btn';
					break;
				default:
					name = '';
			}
			return '<div class="' + className + '">' + name + '</div>';
		}
	});