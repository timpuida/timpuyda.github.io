var findIcon=document.querySelector('.find-icon'),
	find = document.querySelector('.search-form'),
	navicon=document.querySelector('.navicon'),
	menu = document.querySelector('.menu-items'); 

findIcon.addEventListener('click',function(event){
	if (getComputedStyle(find).display=='none'){
		find.style.display='block';
	} else {
		find.style.display='none'}
});

navicon.addEventListener('click', function(event){
	if(getComputedStyle(menu).display=='none'){
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
});

document.addEventListener('click', function(event){
	if(event.target !== menu && event.target !== navicon){
		menu.style.display = 'none';
	}
	if (event.target == navicon){
		find.style.display = 'none';
	}
});