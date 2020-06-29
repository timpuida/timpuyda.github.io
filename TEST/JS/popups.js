const wrap = document.querySelector(".wrap-items");
const itemMenus = document.querySelectorAll(".item-menu");
const popupOpen = document.querySelectorAll(".popup-opening");
const overlay = document.querySelector("#overlay");
const block = document.querySelectorAll('.item');
const addBtn = document.querySelector('.add-box')
const popupAdd = document.querySelector('.popup-new')

addBtn.addEventListener('click', function(event){
	popupAdd.classList.toggle('hide');
	overlay.classList.toggle('hide');
})
wrap.addEventListener('click', function(event){
	for(let i = 0; i<itemMenus.length;i++){	
			if(event.target ==itemMenus[i]) {
				if(event.target==itemMenus[i]){
						for(let i of block) i.style.zIndex = '';
						popupOpen[i].classList.toggle('hide');
						overlay.classList.toggle('hide');
						block[i].style.zIndex = '2';
						block[i].classList.toggle('absolute')
				}
			}
		}
})
overlay.addEventListener('click', function(event){
	for(let pops of popupOpen){
		pops.classList.add('hide');
	}
	for(let item of block){
		item.classList.remove('absolute')
	}
	overlay.classList.add('hide')
	popupAdd.classList.add('hide');
})
