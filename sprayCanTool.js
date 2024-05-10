function sprayCanTool() {
    // Tool identification
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    // Spray settings
    this.points = 13;      // Number of points per spray
    this.spread = 10;      // Radius of spray spread
    this.pointSize = 1;    // Default size of each paint point

    // Adds a control interface for the spray can tool
    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="sprayCanStrokeInput" class="slider-label">Spray Density (0.1 to 10):</label><input type="number" id="sprayCanStrokeInput" min="0.1" max="10" step="0.1" value="1"><button id="applySprayStroke">Apply</button>');

        let applyButton = select('#applySprayStroke');
        let strokeWeightInput = select('#sprayCanStrokeInput');

        // Apply new point size from user input
        applyButton.mousePressed(() => {
            const weight = parseFloat(strokeWeightInput.value());
            if (weight >= 0.1 && weight <= 10) {
                this.pointSize = weight;  // Update point size based on input
            } else {
                alert("Please enter a value between 0.1 and 10");
            }
        });
    };

    // Function to draw spray effect
    this.draw = function() {
        if (mouseIsPressed) {
            for (let i = 0; i < this.points; i++) {
                let x = random(mouseX - this.spread, mouseX + this.spread);
                let y = random(mouseY - this.spread, mouseY + this.spread);
                ellipse(x, y, this.pointSize, this.pointSize);
            }
        }
    };

    // Clears the options panel when the tool is deselected
    this.unselectTool = function() {
        select('.options').html('');
    };
}