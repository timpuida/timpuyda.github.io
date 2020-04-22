'use strict'

let coord = document.getElementById("coordId"),
 	box = document.getElementById('boxId'),
 	button = document.getElementById('buttonId'),
 	cellMeanErrors=document.getElementById('meanErrorsId'),
 	cellCoeffErrors =document.getElementById('coeffErrorsId'),
 	cellbtpsId = document.getElementById('btpsId'),
	audio = document.querySelector('audio');


let sizeBox= box.getBoundingClientRect();

	let left = 0,
		up=0,
		right = sizeBox.right-sizeBox.left,
		height = sizeBox.bottom - sizeBox.top,
		start=0,
		count = 0,
		arr = [];

document.addEventListener('keydown', leaveMark);
button.addEventListener('click',reset);

function leaveMark(){
	if(event.code!='KeyM' && event.code!='KeyC' ) return;
	if (event.repeat) return;
	let time = performance.now(),
		period = time - start;


	start = time;

	arr.push(period);
	let point = document.createElement('div');
	point.className = "point";

	if (count){
		left += period/6;
	}
	if (left >= right-15) {
		up+=25;
		left=(left-right);
		if (left<0) {
			left = 0;
		}
	}
	point.style.left = left+ 'px';
	point.style.top = up +'px';
	box.append(point);
	if( up > height-15 ){
		point.remove();
		document.removeEventListener('keydown', leaveMark);
		calculate();
	}

	audio.pause();
	audio.currentTime = 0.0;
	audio.play();
	count++;

}	 	

function calculate(){
	arr.shift();

	let total = arr.reduce((sum, current) => (sum + current));		
	let mean = total/count;

	let btps = Math.round(60000/mean);
	let arrErrors=[];

	for(let i = 0; i<arr.length; i++){
		arrErrors.push(Math.pow((arr[i]-mean),2));
	}

	let totalErrors = arrErrors.reduce((sum, current) => (sum + current));	

	let meanErrors =  Math.floor(Math.sqrt(totalErrors/count)); 
	let coeffErrors = Math.floor((100 - (meanErrors/mean * 100))*100)/100;
	if(coeffErrors<50){
		cellCoeffErrors.textContent = 'Дуже погано, спробуйте ще раз';
		btps = 'Не визначено';
	}else {
		btps+='btps';
		cellCoeffErrors.textContent = coeffErrors+'%';
		if(coeffErrors > Number(coord.textContent)){
			coord.textContent=coeffErrors;
		}
		
	}

	cellbtpsId.textContent = btps;
	cellMeanErrors.textContent = meanErrors +' мс';

}
function reset(){
	let points =document.querySelectorAll('.point');
	points.forEach((item)=>item.remove())
	left = 0;
	up = 0;
	start=0;
	count = 0;
	arr =[];
	document.addEventListener('keydown', leaveMark);
}

