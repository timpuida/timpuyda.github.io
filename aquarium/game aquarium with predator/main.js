'use strict'


// game===========================================================================================

let area = document.getElementById('area');
for(let i=0; i<91;i++){
	let els = document.createElement('div');
	els.className= "el";
	area.append(els);
}
let elems = document.querySelectorAll('.el');
let countBalls=elems.length;
let moveEl;


let areaSizes = area.getBoundingClientRect(),
	elSize = elems[0].getBoundingClientRect(),
    areaHeight = areaSizes.height-2, // вирахування бордера
	areaWidth = areaSizes.width-2, // вирахування бордера
	minLeft = areaSizes.left+1,
	maxRight = areaSizes.right-1,	
	minTop = areaSizes.top+1,
	maxBottom = areaSizes.bottom-1;

//  elems==================================================================
let stepEl = 5,
	
	percntToCompare=.98;

let isPrevStepRight=true;
let isPrevStepDown=true;

elems.forEach((item)=>{
	item.isStopAnimation=false;
	item.minMoveX= 1;
	item.minMoveY = 1;
	item.maxMoveX=stepEl;
	item.maxMoveY=stepEl;
	item.isPrevStepRight=true;
	item.isPrevStepDown=true;
});


// hunter el =========================================================

let hunter= document.createElement('div');
hunter.className="hunter";
hunter.x=areaSizes.width/3;
hunter.y=areaSizes.height-60; 
hunter.style.transform = 'translate('+hunter.x+'px, '+hunter.y+'px)';
area.append(hunter);

let hunterSize = hunter.getBoundingClientRect();
let hunterStep=5;
hunter.isStopAnimation = false;
hunter.maxMoveX=hunterStep;
hunter.maxMoveY=hunterStep;

// myEl========================================================

let myEl = document.createElement('div');
myEl.id = 'me';
myEl.x=areaSizes.right-150;
myEl.y=areaSizes.height-60;
myEl.style.transform = 'translate('+myEl.x+'px, '+myEl.y+'px)';
myEl.isStopAnimation=false;
area.append(myEl);
let	myElSize = myEl.getBoundingClientRect();


let arrowUp =1,
arrowRight = 0,
arrowDown = 0,
arrowLeft = 0;
let timesLeft=0;

let playGame=window.requestAnimationFrame(function animateAll() {

    for(let i=0; i<elems.length; i++){
		animate(elems[i],elems[i].isStopAnimation)
	};
	animateMyEl(myEl.isStopAnimation);
	animateHunter(hunter.isStopAnimation)
    if ( myEl.isStopAnimation==false && (hunter.isStopAnimation==false || document.querySelector('.el')!== null) ){
      requestAnimationFrame(animateAll);
		
	}else{
		timesLeft++;
	    if (timesLeft<200) requestAnimationFrame(animateAll);
	}
});


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
	
// events=============================================	 

area.addEventListener('contextmenu',function(event){
	event.preventDefault();
});
document.addEventListener('keydown',moveMyEl);


// animate=====================================================

function animateHunter(isStop){
	if (isStop) return;
	if (myElSize.width > hunterSize.width) {
		ifConsumed(myEl,myElSize, hunter,hunterSize);
		hunter.style.zIndex = '3';
	}else{
		hunter.style.zIndex = '4';
	}
	hunter.minMoveX = hunter.x;
	hunter.minMoveY = hunter.y;
	wayMake(hunter,hunterStep);
	takeEdge(hunter,hunterSize,hunterStep);
	hunter.x = randomInteger(hunter.minMoveX,hunter.maxMoveX);
	hunter.y = randomInteger(hunter.minMoveY,hunter.maxMoveY);
	hunter.style.transform = 'translate('+hunter.x+'px, '+hunter.y+'px)';
}

function ifConsumed(predator,predatorSize, victim,victimSize){
	
	if ( (victim.x >= predator.x - victimSize.width*0.3) &&
		 (victim.x <= predator.x + predatorSize.width - victimSize.width*0.7) && 
		 (victim.y >= predator.y - victimSize.height*0.3) &&
		 (victim.y <= predator.y + predatorSize.height - victimSize.height*0.7 ) ){
	victim.isStopAnimation = true;
	victim.remove();
	predator.style.width = predatorSize.width + 'px';
	predator.style.height = predatorSize.height + 'px';
	}
}

function animate(el,isStop){
	if (isStop) return
	ifConsumed(hunter,hunterSize,el,elSize);
	ifConsumed(myEl,myElSize,el,elSize);

	el.x = randomInteger(el.minMoveX,el.maxMoveX);
	el.y = randomInteger(el.minMoveY,el.maxMoveY);
	edge(el,elSize);

	wayMake(el,stepEl);
	takeEdge(el,elSize,stepEl);
	el.minMoveX = el.x;
	el.minMoveY = el.y;

	el.style.transform = 'translate('+el.x+'px,'+el.y+'px)';

}

function edge(element,elementSize){
	if (element.x < 0) {
	element.x = 0;
	};
	if(element.x > areaWidth - elementSize.width) {
		element.x =  areaWidth - elementSize.width;
	};
	if(element.y < 0) {
		element.y = 0;
	};
	if(element.y > areaHeight - elementSize.height) {
	element.y = areaHeight - elementSize.height;
	};
}

function wayMake(elem,step){
	if(elem.isPrevStepRight){
		if(Math.random() <= percntToCompare){
			turnRight(elem,step);
		} else{
			turnLeft(elem,step);
		}
	}else {
		if(Math.random() <= percntToCompare){
			turnLeft(elem,step);
		}else{
			turnRight(elem,step);
		}
	}
	if(elem.isPrevStepDown){
		if(Math.random() <= percntToCompare){
			turnDown(elem,step);
		}else{
			turnUp(elem,step);
		}
	}else {
		if(Math.random() <= percntToCompare){
			turnUp(elem,step);
		}else{
			turnDown(elem,step);
		}
	}
}

function takeEdge(elem,elementSize,step){

	if(elem.x<(0 +elementSize.width +step)){
		turnRight(elem,step);
	}
	if(elem.x>(maxRight-minLeft-elementSize.width-step)){
		turnLeft(elem,step);
	}
	if(elem.y<(0 +elementSize.height+step)){
		turnDown(elem,step);
	}
	if(elem.y>(maxBottom-minTop-elementSize.height-step)){
		turnUp(elem,step);
	}
}

function turnLeft(elemItem,step){
	elemItem.maxMoveX = elemItem.minMoveX-step;
	elemItem.isPrevStepRight=false;
}
function turnRight(elemItem,step){
	elemItem.maxMoveX = elemItem.minMoveX+step;
	elemItem.isPrevStepRight=true;
}
function turnUp(elemItem,step){
	 elemItem.maxMoveY = elemItem.minMoveY-step;
	 elemItem.isPrevStepDown=false;
}
function turnDown(elemItem,step){
	 elemItem.maxMoveY = elemItem.minMoveY+step;
	 elemItem.isPrevStepDown=true;
}

function resetKeys(){
	arrowUp =0;
	arrowRight = 0;
	arrowDown = 0;
	arrowLeft = 0;
}

function moveMyEl(){
	if(event.repeat) return; 
	switch (event.code) {
		case 'KeyW':
		case 'ArrowUp':
			resetKeys();
			arrowUp = 1;
			event.preventDefault();
			break;
		case 'KeyS':
		case 'ArrowDown':
			resetKeys();
			arrowDown = 1;
			event.preventDefault();
			break;
		case 'KeyA':	
		case 'ArrowLeft':
			resetKeys();
			arrowLeft = 1;
			event.preventDefault();
			break;
		case 'KeyD':	
		case 'ArrowRight':
			resetKeys();
			arrowRight = 1;
			event.preventDefault();
			break;
	}
}

function animateMyEl(isStop){
	if(isStop) return 

	if (myElSize.width < hunterSize.width) {
		ifConsumed(hunter,hunterSize, myEl,myElSize);	
		myEl.style.zIndex = '3';
	}else{
		myEl.style.zIndex = '4';
	}

	let myElStep= hunterStep/2;

	if(arrowUp){
		myEl.y -=myElStep;
	}
	if(arrowRight){
		myEl.x +=myElStep;
	}
	if(arrowLeft){
		myEl.x -=myElStep;
	}if(arrowDown){
		myEl.y +=myElStep;
	}
	 edge(myEl,myElSize);
	myEl.style.transform = 'translate('+myEl.x+'px, '+myEl.y+'px)';

	
}

