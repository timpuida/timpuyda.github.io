document.addEventListener("DOMContentLoaded", function(){
	

	var nextArrow = document.querySelector('.next'),
		prevArrow = document.querySelector('.previous'),
		photo = document.getElementsByClassName('slide'),
		indexSlide =0,
		countSlides = 4;
		if(window.matchMedia('(max-width: 600px)').matches){
			countSlides = 1;
		}
	var names = slider.getElementsByTagName('h2');
	var img = slider.getElementsByTagName('img');

	function altTitler(){
		for(let i = 0; i< img.length; i++){
			img[i].alt = names[i].textContent;
		}
	}
	altTitler();


	function show(index){
		for (let i = 0; i < photo.length; i++){
			photo[i].classList.add("hide");
		}
		for (let i = index; i < photo.length && i < index + countSlides; i++){
			photo[i].classList.remove("hide");
		}
	}

	show(indexSlide);

	nextArrow.addEventListener('click', function(event){
		if (indexSlide < photo.length-countSlides){ 
			indexSlide ++;
			show(indexSlide);
		}
		else{
				indexSlide = 0;
				show(indexSlide);
			}
	});

	prevArrow.addEventListener('click', function(event){
		if (indexSlide > 0){ 
			indexSlide--;
			show(indexSlide);
		} else{
			indexSlide= photo.length-countSlides;
			show(indexSlide);
		}
	});
	// SlideHoverEffect= = = = = = = = = = = = = =
	var profile = document.querySelectorAll('.profile');

	slider.addEventListener('mouseover',function(event){
		for (let i = 0; i<profile.length; i++){
			if(event.target == profile[i]){
				// profile[i].style.opacity = '0.5';
			}
		}
	});

	// // LATEST WORKS = = = = = = = = = = = = = = =
	const
		navigate = document.querySelector('.navigate'),
		nav = document.querySelectorAll('.navigate a');

	nav[0].style.color='#c0301c';
	let currentFilter = 'all'

	const worksPictures = document.body.querySelectorAll('#works > div');
	navigate.addEventListener('click', function(event){
		event.preventDefault();
		if (event.target.tagName !== "A" ) return;
		for (let i = 0; i < nav.length; i++){
			nav[i].style.color='#555';
		}
		event.target.style.color='#c0301c';
		currentFilter = event.target.dataset.filter;

		for (let i = 0; i < worksPictures.length; i++) {
			worksPictures[i].classList.remove('hidden');
			if (currentFilter !== 'all'
				&& worksPictures[i].dataset.filterValue !== currentFilter
			) {
				worksPictures[i].classList.add('hidden')
			}
		}
	});


	// READ MORE = = = = = = = = = =
	var more = document.querySelectorAll('.read-more'),
		post = document.querySelectorAll('.post-text'),
		numberMax = 438;

		for(let i = 0; i < post.length; i++){
			var text = post[i].textContent;
			var	smallText = text.slice(0, numberMax) ;
			
			if (text.length > numberMax) {
				var news = text.replace(text, smallText);
				post[i].innerHTML = news;
			}	
		}

	for(let i = 0; i < post.length; i++){
		more[i].addEventListener('click', function(event){
			event.preventDefault()
			for (let i = 0; i < post.length; i++){
				if(event.target == more[i]){
					post[i].innerHTML = text;
				}
			}
			this.remove();
		});
	}	

	var 
		portrait = document.querySelectorAll('.profile img'),
		socials = slider.querySelectorAll('.socials'),
		slide = document.querySelectorAll('.profile'),
		box = slider.querySelectorAll('.box');	

	for (let i  = 0; i < portrait.length; i++){
		
		socials[i].style.display = 'none';
		
		function notHoverSlide(){
			portrait[i].classList.remove('brightness');
			socials[i].style.display = 'none';
		}
		
		slide[i].addEventListener('mouseout', notHoverSlide);
		slide[i].addEventListener('mouseover', function(event){
			
			portrait[i].classList.add('brightness');
			socials[i].style.display = '';
			for (let k = 0; k < box.length; k++){
					if (event.target.closest('.box') == box[k]){
						portrait[i].classList.add('brightness');
					}

				}
		});
	}

	if(window.matchMedia('(min-width: 768px)').matches){
			
		var 
			pic = works.querySelectorAll('.pic'),
			picWork = works.querySelectorAll('.pic img'),
			zoomIcon = works.querySelectorAll('.zoom-icon');


		for (let i = 0; i< picWork.length;i++ ){
			

			pic[i].addEventListener('mouseover', function(event) {
					if(event.target == picWork[i]||zoomIcon[i]){
						picWork[i].classList.add('brightness');
						zoomIcon[i].style.display = 'block';

					}
			});

			pic[i].addEventListener('mouseout', function(event) {
				if(event.target == picWork[i]||zoomIcon[i]){
					picWork[i].classList.remove('brightness');
					zoomIcon[i].style.display = 'none';

				}
			});

			
			
			pic[i].addEventListener('click', function(event){
				var blackBack = document.getElementById('overlay');
				var modals = document.querySelectorAll('.modal');
				var thisImage = picWork[i].getAttribute('data-name-img');
				var modal=modals[i].getAttribute('data-modal-name');

					if (modal == thisImage){
						modals[i].style.display = 'block';
						blackBack.style.display = 'block';
					}
			});

			var close = document.querySelectorAll('.close-modal');
			var blackBack = document.getElementById('overlay');

			close.forEach( function(element, index) {
				close[index].addEventListener('click', hideModal);
			});


			blackBack.addEventListener('click', hideModal);
			
		}	

		function hideModal(){
			var modals = document.querySelectorAll('.modal');
			var blackBack = document.getElementById('overlay');

			for (let i = 0; i<modals.length; i++){
				modals[i].style.display = 'none';
				blackBack.style.display = 'none';
			}
		}

	}
});	

