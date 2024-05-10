function lineToTool() {
    // Set the icon and name for the tool
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";

    // Initialize starting coordinates and drawing state
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var strokeWeightInput; // Input element for stroke weight

    // Define option elements in the UI for this tool
    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="lineStrokeWeight">Line Width:</label><input type="range" id="lineStrokeWeight" min="1" max="10" value="1">');

        // Setup stroke weight adjustment input
        strokeWeightInput = select('#lineStrokeWeight');
        strokeWeightInput.input(() => {
            const weight = parseFloat(strokeWeightInput.value());
            strokeWeight(weight); // Apply the selected stroke weight
        });
    };

    // Handle drawing of lines
    this.draw = function() {
        if (mouseIsPressed) {
            if (startMouseX === -1) {
                // Capture the initial mouse position and start drawing
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels(); // Capture the pixel state at the start of drawing
            } else {
                updatePixels(); // Restore the pixel state before redrawing the line
                line(startMouseX, startMouseY, mouseX, mouseY); // Draw the line from start to current mouse position
            }
        } else if (drawing) {
            // Finalize the line when the mouse is released
            line(startMouseX, startMouseY, mouseX, mouseY);
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    // Clear settings and temporary states when the tool is unselected
    this.unselectTool = function() {
        select('.options').html(''); // Clear the options area
    };
}