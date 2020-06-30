const wrap = document.querySelector(".wrap-items");
const itemMenus = document.querySelectorAll(".item-menu");
const popupOpen = document.querySelectorAll(".popup-opening");
const overlay = document.querySelector("#overlay");
const block = document.querySelectorAll('.item');
const addBtn = document.querySelector('.add-box');
const popupAdd = document.querySelector('.popup-new');
const closeBtn = document.querySelectorAll('.item-menu-close');
const menuCircles = document.querySelectorAll('.item-menu-circles');
addBtn.addEventListener('click', function(event){
	event.preventDefault();
	popupAdd.classList.toggle('hide');
	overlay.classList.toggle('hide');
})
wrap.addEventListener('click', function(event){
	for(let i = 0; i<itemMenus.length;i++){	
			if(event.target==itemMenus[i]){
				event.preventDefault();
					for(let i of block) i.style.zIndex = '';
					popupOpen[i].classList.toggle('hide');
					overlay.classList.toggle('hide');
					block[i].style.zIndex = '2';
					closeBtn[i].classList.toggle('hide');
					menuCircles[i].classList.toggle('hide');
			}
		}
})
overlay.addEventListener('click', function(event){
	closeBtn.forEach((i)=> i.classList.add('hide'));
	menuCircles.forEach(i=>i.classList.remove('hide'));
	popupOpen.forEach(i=>i.classList.add('hide'))
	overlay.classList.add('hide');
	popupAdd.classList.add('hide');
})
