function lineToTool(){
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var strokeWeightInput; // Input for adjusting the stroke weight

    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="lineStrokeWeight">Line Width:</label><input type="range" id="lineStrokeWeight" min="1" max="10" value="1">');

        strokeWeightInput = select('#lineStrokeWeight');
        strokeWeightInput.input(() => {
            const weight = parseFloat(strokeWeightInput.value());
            strokeWeight(weight);
        });
    };

    this.draw = function(){
        if(mouseIsPressed){
            if(startMouseX === -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels(); // Ensures we capture the state at the start of drawing
            } else {
                updatePixels(); // Restore the initial state before redrawing the line
                line(startMouseX, startMouseY, mouseX, mouseY);
            }
        } else if(drawing){
            line(startMouseX, startMouseY, mouseX, mouseY); // Ensure line is drawn on mouse release
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    this.unselectTool = function() {
        // Clear any settings or temporary states when this tool is no longer active
        select('.options').html(''); // Clears the options area
    };
}