var header= document.querySelectorAll('.select-header p');
var select = document.querySelectorAll('.select');
var selects = document.querySelector('.selects');
var bodySelect = selects.querySelectorAll('.select-body');

document.addEventListener('click',function(event){
			
	bodySelect.forEach(function(el){
		if(event.target!==selects){

			if(el.classList.contains('is-active')){
				el.classList.remove('is-active');
			};
		}	
	});
			
});


select.forEach(function(item,i){

	// body.classList.remove('is-active');

	item.addEventListener('mouseover', function(event){

		// if(body.classList.contains('is-active')){
		// 	body.classList.remove('is-active')
		// };
		bodySelect[i].classList.add('is-active');
		// console.log(this.querySelector('.is-active'));		
	});
	item.addEventListener('mouseout', function(event){

		// if(body.classList.contains('is-active')){
		// 	body.classList.remove('is-active')
		// };
		bodySelect[i].classList.remove('is-active');
		// console.log(this.querySelector('.is-active'));		
	});

	item.addEventListener('click', function(event){
		var option = item.querySelectorAll('.select-item');

		option.forEach(function(element,index){
			if(event.target==element){
				var text = element.innerText;
				header[i].innerText = text;
				// var input = document.getAttribute('data-input');
				var value = element.getAttribute('data-value');
				// console.log(value);
				var input = element.parentNode.parentNode.querySelector('input');
				input.value = value;
				// console.log(input);
			}
		});
	});
});
				// 	select.addEventListener('click', function(event){
				// 	option[0].closest("div").classList.toggle('is-active');
				// 	option.forEach(function(item, i){
				// 		if(event.target == option[i]){
				// 			text=option[i].innerText;
				// 			header.innerText = text;
				// 		var value = option[i].getAttribute('data-value');
				// 	document.getElementById('type-of-furniture').value= value;
				// 			console.log(value);
				// 		}
				// 	});
					 
				// });


// document.addEventListener('click', function(){console.log(event.target)});

