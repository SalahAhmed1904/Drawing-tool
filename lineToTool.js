function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//initialises global variables for the start of the line and whether the mouse is pressed

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//when the mouse is pressed, the start of the line is set to the mouse position and the pixels are loaded
	this.draw = function(){

		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}
//if the mouse is pressed and the start of the line has been set, the pixels are updated and a line is drawn from the start of the line to the mouse position
			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
//if the mouse is not pressed and the start of the line has been set, the pixels are updated and a line is drawn from the start of the line to the mouse position
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
