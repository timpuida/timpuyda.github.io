'use strict'

let coord = document.getElementById("coordId"),
 	box = document.getElementById('boxId'),
 	button = document.getElementById('buttonId'),
 	cellMeanErrors=document.getElementById('meanErrorsId'),
 	cellCoeffErrors =document.getElementById('coeffErrorsId'),
 	cellbtpsId = document.getElementById('btpsId');

let sizeBox= box.getBoundingClientRect();



let left = sizeBox.left+1,
up = sizeBox.top +1,
right = sizeBox.right,
height = sizeBox.bottom - up,
start=0,
count = 0,
arr =[];


document.addEventListener('keydown', leaveMark);
button.addEventListener('click',reset);

function reset(){
	let points =document.querySelectorAll('.point');
	points.forEach((item,i)=>item.remove())
	left = sizeBox.left+1;
	up = sizeBox.top +1;
	right = sizeBox.right;
	height = sizeBox.bottom - up;
	start=0;
	count = 0;
	arr =[];
	document.addEventListener('keydown', leaveMark);
}

function leaveMark(){
	if(event.code!='KeyM' && event.code!='KeyC' ) return;
	if (event.repeat) return;
	let time = performance.now(),
		period = time - start;

	arr.push(period);

	start = time;


	if(count){
		left+=period/10;
	}
	if(left >= right-15){
		up+=25;
		left=(left-right)+sizeBox.left+15;
	}
	if(up>=height+15 ){
		
		document.removeEventListener('keydown', leaveMark);
		calculate();
	}

	let point = document.createElement('div');
	point.className = "point";

	point.style.left = left+ 'px';
	point.style.top = up +'px';

	document.body.append(point);
	let audio = document.querySelector('audio');
	
	
	audio.currentTime = 0;
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

