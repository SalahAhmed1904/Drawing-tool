

function sprayCanTool() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
    this.pointSize = 1;  // Default size of each point

    this.populateOptions = function() {
        let optionsArea = select('.options');
        // Clear previous options and set up new ones for the spray can tool
        optionsArea.html('<label for="sprayCanStrokeInput" class="slider-label">Spray Density (0.1 to 10):</label><input type="number" id="sprayCanStrokeInput" min="0.1" max="10" step="0.1" value="1"><button id="applySprayStroke">Apply</button>');

        var applyButton = select('#applySprayStroke');
        var strokeWeightInput = select('#sprayCanStrokeInput');

        applyButton.mousePressed(() => {
            const weight = parseFloat(strokeWeightInput.value());
            if (weight >= 0.1 && weight <= 10) {
                this.pointSize = weight;  // Adjust point size based on input
            } else {
                alert("Please enter a value between 0.1 and 10");
            }
        });
    };

    this.draw = function() {
        if (mouseIsPressed) {
            for (var i = 0; i < this.points; i++) {
                var x = random(mouseX - this.spread, mouseX + this.spread);
                var y = random(mouseY - this.spread, mouseY + this.spread);
                ellipse(x, y, this.pointSize, this.pointSize);
            }
        }
    };

    this.unselectTool = function() {
        // Clear the options area when another tool is selected
        select('.options').html('');
    };
}

