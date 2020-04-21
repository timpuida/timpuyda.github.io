'use strict'


// game===========================================================================================

let area = document.getElementById('area');
let elems = document.querySelectorAll('.el');
let countBalls=elems.length;
let moveEl;


console.log(elems);

let areaSizes = area.getBoundingClientRect(),
	elSize = elems[0].getBoundingClientRect(),

    areaHeight = areaSizes.height-2, // вирахування бордера
	areaWidth = areaSizes.width-2, // вирахування бордера
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


//  elems=========================================================================================
function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
	
let stepEl = 25,
	
	percntToCompare=.93;

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


// hunter el =====================================================================================================

let hunter= document.createElement('div');
hunter.className="hunter";
area.append(hunter);

let	hunterSize = hunter.getBoundingClientRect();
let hunterStep=45;
hunter.x=550;//from css transform
hunter.y=350; //from css transform
// hunter.minMoveX =545;
// hunter.minMoveY=355;

hunter.maxMoveX=hunterStep;
hunter.maxMoveY=hunterStep;
 

// animate===========================================================


area.addEventListener('contextmenu',function(event){
	event.preventDefault();
});


function animateHunter(){
	hunter.minMoveX = hunter.x;
	hunter.minMoveY = hunter.y;
	// console.log('hunter.x = '+hunter.x+' hunter.y = ' + hunter.x);
	wayMake(hunter,hunterStep);
	takeEdge(hunter,hunterSize,hunterStep);
	hunter.x = randomInteger(hunter.minMoveX,hunter.maxMoveX);
	hunter.y = randomInteger(hunter.minMoveY,hunter.maxMoveY);
	hunter.style.transform = 'translate('+hunter.x+'px, '+hunter.y+'px)';

}

function animate(el,isStop){
	if (isStop) return
	// el.addEventListener('mousedown',function(event){
	// 		el.isStopAnimation = true;
	// 		el.remove();
	// });
	if((el.x >= hunter.x-elSize.width)&& (el.x<=(hunter.x+hunterSize.width)) && (el.y>=hunter.y-elSize.height) && (el.y <= (hunter.y+hunterSize.height)))
		{
			el.isStopAnimation = true;
			el.remove();
			hunterSize.width = hunterSize.width+.5;
			hunterSize.height= hunterSize.height+.5;
			hunter.style.width = hunterSize.width+'px';
			hunter.style.height = hunterSize.height+'px';
		}


	el.x = randomInteger(el.minMoveX,el.maxMoveX);
	el.y = randomInteger(el.minMoveY,el.maxMoveY);
	if (el.x<0) {el.x=0;
	// clearInterval(moveEl);
};
	if(el.x>areaWidth+elSize.width) {el.x =  areaWidth+elSize.width;
	// clearInterval(moveEl);
};
	if(el.y<0) {el.y = 0;
	// clearInterval(moveEl);
};
	if(el.y>areaHeight+elSize.height) {el.y = areaHeight+elSize.height;
	// clearInterval(moveEl);
};
	wayMake(el,stepEl);
	takeEdge(el,elSize,stepEl);
	el.minMoveX = el.x;
	el.minMoveY = el.y;

	el.style.transform = 'translate('+el.x+'px,'+el.y+'px)';

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
				// console.log('AUCH lefttttt');
			}
			if(elem.x>(maxRight-minLeft-elementSize.width-step)){
				turnLeft(elem,step);
				// console.log('AUCH rightttttttt');
			}
			if(elem.y<(0 +elementSize.height+step)){
				turnDown(elem,step);
				// console.log('AUCH topppppp');
			}
			if(elem.y>(maxBottom-minTop-elementSize.height-step)){
				turnUp(elem,step);
				// console.log('AUCH bottommm');
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


moveEl=setInterval(function(){
	for(let i=0; i<elems.length; i++){
		animate(elems[i],elems[i].isStopAnimation)
	};
	// animateHunter();
},100);
let moveHunter=setInterval(animateHunter,300);
