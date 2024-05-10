function freehandTool() {
    // Set the icon and name for the tool
    this.icon = "assets/freehand.jpg";
    this.name = "Freehand";

    // Initialize previous mouse coordinates
    var previousMouseX = -1;
    var previousMouseY = -1;

    // Initialize the tool with options
    this.init = function() {
        this.populateOptions();
    };

    // Populate tool-specific options in the UI
    this.populateOptions = function() {
        // Select the options area and set HTML content for brush size
        let optionsArea = select('.options');
        optionsArea.html('<label for="freehandStrokeInput" class="slider-label">Brush Size (0.1 to 10):</label><input type="number" id="freehandStrokeInput" min="0.1" max="10" step="0.1" value="1"><button id="applyStroke">Apply</button>');
        
        // Elements for applying stroke weight
        var applyButton = select('#applyStroke');
        var strokeWeightInput = select('#freehandStrokeInput');

        // Event listener for the Apply button
        applyButton.mousePressed(() => {
            const weight = parseFloat(strokeWeightInput.value());
            if (weight >= 0.1 && weight <= 10) {
                strokeWeight(weight); // Apply the stroke weight
            } else {
                alert("Please enter a value between 0.1 and 10"); // Alert if the input is out of range
            }
        });
    };

    // Handle drawing as mouse is pressed and moved
    this.draw = function() {
        if (mouseIsPressed) {
            if (previousMouseX === -1) {
                // Store initial mouse positions
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                // Draw line from previous to current mouse position
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                // Update previous positions
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            // Reset previous mouse coordinates when not pressing
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    // Clear options when tool is unselected
    this.unselectTool = function() {
        select('.options').html('');
    };
}