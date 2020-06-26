var buttons=document.getElementById('nbar');
var button =buttons.querySelectorAll('.filters');
var photos = document.querySelectorAll('.photo-img');

buttons.addEventListener('click',filter);

function filter(event){
	cleanFilter(); 
	for(let i =0;i<photos.length; i++){ 
	  photos[i].classList.add(event.target.dataset.filter); 
	 } 
 }
function cleanFilter(){
	for(let i =0;i<photos.length; i++){
		photos[i].classList="photo-img";
	}
}
