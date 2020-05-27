var slider = document.getElementById('slider-feedback');
var slide = slider.querySelectorAll('.slide');
var arrow = document.getElementById('arrow-r');
var count = 0;

function show(index){

	slide.forEach(function(item,i){	
			item.classList.add('hidden');
		});
		if(count<slide.length-1){
			count++;
		}
		else{
			count=0;
		}
		slide[index].classList.remove('hidden');	
}

show(0);

arrow.addEventListener('click', function(event){
	
	show(count);
});
