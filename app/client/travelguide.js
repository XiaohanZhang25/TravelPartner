//Make sure the rgb(, , ,) in the format with space btw , and number
var colorNum = 6;
var color = generateColor(colorNum);

var pickedColorId = document.querySelector("#pickedColorId");
var pickedColor = pickColor(color); //the picked color as target
pickedColorId.textContent = pickedColor;

var squaresId = document.querySelectorAll(".squares");
var messageId = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");

//Easy Button
easyBtn.addEventListener("click", function(){
	this.classList.add("select");
	hardBtn.classList.remove("select");
	colorNum = 3;
    color = generateColor(colorNum);
    pickedColor = pickColor(color);
    for(var i = 0; i<squaresId.length ; i++){
    	if(color[i])
    		// assign and display the first 3 squares
    		squaresId[i].style.backgroundColor = color[i];
    	else 
    		//do not display the rest
    		squaresId[i].style.display ="none";
    	
    	
    }

});

//Hard Button
hardBtn.addEventListener("click", function(){
	this.classList.add("select");
	easyBtn.classList.remove("select");
	colorNum = 6;
    color = generateColor(colorNum);
    pickedColor = pickColor(color);
    for(var i = 0; i<squaresId.length ; i++){
    	// to assign color to each square and display it
    		squaresId[i].style.backgroundColor = color[i];
    		squaresId[i].style.display ="block";
    	}

});

resetBtn.addEventListener("click", function(){
	resetBtn.textContent = "New Color";
	messageId.textContent = "";
	h1.style.backgroundColor = "steelblue";
	color = generateColor(colorNum);
	pickedColor = pickColor(color);
	pickedColorId.textContent = pickedColor;
	for(var i = 0; i< color.length; i++){
		squaresId[i].style.backgroundColor = color[i];
	}
});

//assaign the colors to the squares in a loop
for(var i = 0; i< color.length; i++){
	squaresId[i].style.backgroundColor = color[i];
	squaresId[i].addEventListener("click", changeColor);
}





function pickColor(color){
	var pickedNum = Math.floor(Math.random()*color.length);
	return color[pickedNum];
}

function changeColor(){
	if(this.style.backgroundColor === pickedColor){
		for(var i = 0; i< squaresId.length; i++)
			squaresId[i].style.backgroundColor = pickedColor;
		messageId.textContent = "Correct!";
		h1.style.backgroundColor = pickedColor;
		resetBtn.textContent = "Player Again?";
	}		
	else{
		messageId.textContent = "Try Again!";
		// make sure it is string
		this.style.backgroundColor = "#232323"; 
	}
	
}

function generateColor(num){
	var arr = [];
	for (var i = num - 1; i >= 0; i--) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+ r +", "+ g +", " + b +")";
}