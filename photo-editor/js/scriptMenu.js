var naviconId = document.getElementById('navicon');
var nav = document.getElementById('nav');
var elemsMenu = nav.querySelector('.nav-menu');
var displayNav= getComputedStyle(naviconId).display;
if (displayNav!='none'){
	function hideMenu(){	
			elemsMenu.classList.add('hide');
		}
	hideMenu();
	
	function showMenu(event){
			if(elemsMenu.classList.contains('hide')){
		elemsMenu.classList.remove('hide');
			}else {
				elemsMenu.classList.add('hide');
			}
	}
	naviconId.addEventListener('click',showMenu);
}
