function sprayCanTool() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
    this.pointSize = 1;  // Default size of each point
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
        if (mouseIsPressed) {
            for (var i = 0; i < this.points; i++) {
                var x = random(mouseX - this.spread, mouseX + this.spread);
                var y = random(mouseY - this.spread, mouseY + this.spread);
                ellipse(x, y, this.pointSize, this.pointSize);  // Use ellipse for variable size
            }
        }
    };

    this.unselectTool = function() {
        if (strokeWeightInput) {
            strokeWeightInput.value(1); // Reset to default value when tool is unselected
        }
    };
}