function LineToTool() {
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var strokeWeightInput; // Input for adjusting the stroke weight
    var applyButton; // Button to apply stroke weight

    this.init = function() {
        // Select the input and button elements
        strokeWeightInput = select('#strokeInput');
        applyButton = select('#applyStroke');

        // Add event listener to the button
        applyButton.mousePressed(() => {
            const weight = parseFloat(strokeWeightInput.value());
            if (weight >= 0.1 && weight <= 10) {
                strokeWeight(weight);
            } else {
                alert("Please enter a value between 0.1 and 10");
            }
        });
    };

    this.draw = function() {
        // Get the current stroke weight from input
        var currentStrokeWeight = parseFloat(strokeWeightInput.value());
        strokeWeight(currentStrokeWeight); // Set stroke weight dynamically

        if (mouseIsPressed) {
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            } else {
                updatePixels();
                line(startMouseX, startMouseY, mouseX, mouseY);
            }
        } else if (drawing) {
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    this.unselectTool = function() {
        if (strokeWeightInput) {
            strokeWeightInput.value(1); // Reset input field to default value
        }
        strokeWeight(1); // Reset the actual stroke weight used by the canvas
    };
}