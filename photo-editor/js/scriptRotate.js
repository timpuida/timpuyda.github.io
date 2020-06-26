const pics = document.querySelectorAll('.pic');
for(let i =0; i<pics.length; i++){
	pics[i].addEventListener('mousemove', rotate);
	pics[i].addEventListener('mouseout', setInitial);
}

function rotate(event){
	const img = this.querySelector(".photo-img");
	const halfHeight=this.offsetHeight/2;
	const halfWidth=this.offsetWidth/2;
	img.style.transform = 'rotateX('+(-event.offsetY+halfHeight)/10+'deg) rotateY('+(event.offsetX-halfWidth)/10+'deg)';
}
function setInitial(event){
	img = this.querySelector(".photo-img");
	img.style.transform = 'rotate(0)';
}

