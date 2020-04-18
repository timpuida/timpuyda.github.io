'use strict'
// start playing=========================================================
let counter=document.getElementById('counter'),
	btns=document.getElementById('btns'),
	overlay=document.getElementById('overlay'),
	startBtn=document.getElementById('start-game'),
	countDown = counter.querySelector('.count-down'),
	sec,
	timer,
	startTime,
	stopTime,
	count;


btns.addEventListener('click',function(event){
		if (event.target==startBtn) {
			for(let ball of elems){
			ball.addEventListener('mousedown',function(event){
			countBalls--;
			if(countBalls==0){
				let stopTime= Date.now();
				console.log(stopTime);
				console.warn('countBalls '+countBalls);
				let result = Math.floor((stopTime-startTime)/1000);
				results.innerHTML=result +' s';
				console.log('result = '+result);
				clearInterval(moveEl);
				}
			});
		}
		console.info(countBalls);
		startBtn.disabled=true;
		sec = 3;
		count=0;
		countDown.classList.remove('display-none');
		counter.classList.remove('display-none');
		overlay.classList.remove('display-none');

		timer=setInterval(fade,500);
		
		console.log(startTime);


		
		moveEl=setInterval(function(){
			for(let i=0; i<elems.length; i++){
				animate(elems[i],elems[i].isStopAnimation)
				// if(elems.length==0){
				// 	stopTime=Date.now();
				// 	console.log('stop Time = '+stopTime);
				// 	let result = (stopTime-startTime)/60000;
				// 	results.innerHTML=result;
				// 	console.log('result = '+result);
				// 	console.log(stopTime);
				// }
			}
		},100);

	}
});

function fade(){
	countDown.classList.add('animated-count');

		if(count%2){
			countDown.classList.remove('animated-count');
			sec--;
		}

		if(count>5){
			countDown.classList.add('animated-count');	
			if (count>6) {
				counter.classList.add('display-none');
				countDown.classList.remove('animated-count');	
				sec=3;
				overlay.classList.add('display-none');
				clearInterval(timer);
				startTime=Date.now();


			}
		} 
	count++;
	countDown.textContent=sec;

}
// game===========================================================================================





let area = document.getElementById('area');
let elems = document.querySelectorAll('.el');
let btn = document.getElementById('create-button');
let countBalls=elems.length;
let moveEl;
console.log(elems);

let areaSizes = area.getBoundingClientRect(),
	elSize = elems[0].getBoundingClientRect();
let areaHeight = areaSizes.height, // разом з бордером
	areaWidth = areaSizes.width, // разом з бордером
	minLeft = areaSizes.left+1,
	maxRight = areaSizes.right-1,	
	minTop = areaSizes.top+1,
	maxBottom = areaSizes.bottom-1;
console.groupCollapsed('data');
console.log('areaHeight = '+areaHeight);
console.log('areaWidth = '+areaWidth);
console.log('minLeft = '+minLeft);
console.log('maxRight = '+maxRight);
console.log('minTop = '+minTop);
console.log('maxBottom = '+maxBottom);
console.groupEnd();
btn.addEventListener('click',createNew);

function createNew(){
	let newEl = document.createElement('div');
	newEl.className = "el";
	area.append(newEl);
}


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
	
let step = 75,
	// minMoveX= 1,
	// minMoveY = 1,
	
	percntToCompare=.93;

let isPrevStepRight=true;
let isPrevStepDown=true;

elems.forEach((item)=>{
	item.isStopAnimation=false;
	item.minMoveX= 1;
	item.minMoveY = 1;
	item.maxMoveX=step;
	item.maxMoveY=step;
	item.isPrevStepRight=true;
	item.isPrevStepDown=true;
});


area.addEventListener('contextmenu',function(event){
	event.preventDefault();
});

function animate(el,isStop){
	el.addEventListener('mousedown',function(event){
		// if(event.which == 1){
			el.isStopAnimation = true;
			el.remove();
		// }
		
	});
	if (isStop) return

	el.x = randomInteger(el.minMoveX,el.maxMoveX);
	el.y = randomInteger(el.minMoveY,el.maxMoveY);
	wayMake(el);
	takeEdge(el);
	el.minMoveX = el.x;
	el.minMoveY = el.y;
	// el.innerHTML='<p>x: '+el.x+' y: '+el.y+'</p>'
		


	el.style.transform = 'translate('+el.x+'px,'+el.y+'px)';


	// console.log('X = '+x);
	// console.log('Y = '+y);

	function wayMake(elem){
		if(elem.isPrevStepRight){
			if(Math.random() <= percntToCompare){
				turnRight(elem);
			} else{
				turnLeft(elem);
			}
		}else {
			if(Math.random() <= percntToCompare){
				turnLeft(elem);
			}else{
				turnRight(elem);
			}
		}
		if(elem.isPrevStepDown){
			if(Math.random() <= percntToCompare){
				turnDown(elem);
			}else{
				turnUp(elem);
			}
		}else {
			if(Math.random() <= percntToCompare){
				turnUp(elem);
			}else{
				turnDown(elem);
			}
		}
	}

		function takeEdge(elem){

			if(elem.x<(0 +elSize.width +step)){
				turnRight(elem);
				// console.log('AUCH lefttttt');
			}
			if(elem.x>(maxRight-minLeft-elSize.width-step)){
				turnLeft(elem);
				// console.log('AUCH rightttttttt');
			}
			if(elem.y<(0 +elSize.height+step)){
				turnDown(elem);
				// console.log('AUCH topppppp');
			}
			if(elem.y>(maxBottom-minTop-elSize.height-step)){
				turnUp(elem);
				// console.log('AUCH bottommm');
			}
		}

		// console.log('minMoveX = '+ minMoveX);
		// console.log('maxMoveX = '+ maxMoveX);
		// console.log('maxBottom: '+maxBottom);
		// console.log('elSizeLeftX = ' +elSizeLeftX);
		// console.log(elSize);
		// console.log('minLeft: '+minLeft);
		// console.log('maxRight: '+maxRight);
		// console.log('maxMoveX: '+maxMoveX);
		// console.log('maxMoveY: '+maxMoveY);
		// console.log('elSizeTopY: '+elSizeTopY);
		// console.log('x= '+x);
		// console.log('y= '+y);


	
	function turnLeft(elemItem){
		elemItem.maxMoveX = elemItem.minMoveX-step;
		elemItem.isPrevStepRight=false;
	}
	function turnRight(elemItem){
		elemItem.maxMoveX = elemItem.minMoveX+step;
		elemItem.isPrevStepRight=true;
	}
	function turnUp(elemItem){
		 elemItem.maxMoveY = elemItem.minMoveY-step;
		 elemItem.isPrevStepDown=false;
	}
	function turnDown(elemItem){
		 elemItem.maxMoveY = elemItem.minMoveY+step;
		 elemItem.isPrevStepDown=true;
	}
}






// first try to code ideal jumping
// setInterval(function(){
// 	let x = randomInteger(minLeft+ elSize.width,maxRight- elSize.width) - minLeft;
// 	let y = randomInteger(minTop + elSize.height,maxBottom - elSize.height)-minTop;
// 	console.log('x = ' + x);
// 	console.log('y = ' + y);
// 	elems.style.transform = 'translate('+x+'px,'+y+'px)';
// },700);