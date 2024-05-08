// function freehandTool() {
//     this.icon = "assets/freehand.jpg";
//     this.name = "Freehand";
//     var previousMouseX = -1;
//     var previousMouseY = -1;
//     var strokeWeightInput; // Input for adjusting the stroke weight
//     var applyButton; // Button to apply stroke weight

//     this.init = function() {
//         // Select the input and button elements
//         strokeWeightInput = select('#strokeInput');
//         applyButton = select('#applyStroke');

//         // Add event listener to the button
//         applyButton.mousePressed(() => {
//             const weight = parseFloat(strokeWeightInput.value());
//             if (weight >= 0.1 && weight <= 10) {
//                 strokeWeight(weight);
//             } else {
//                 alert("Please enter a value between 0.1 and 10");
//             }
//         });
//     };

//     this.draw = function() {
//         if (mouseIsPressed) {
//             if (previousMouseX === -1) {
//                 previousMouseX = mouseX;
//                 previousMouseY = mouseY;
//             } else {
//                 line(previousMouseX, previousMouseY, mouseX, mouseY);
//                 previousMouseX = mouseX;
//                 previousMouseY = mouseY;
//             }
//         } else {
//             previousMouseX = -1;
//             previousMouseY = -1;
//         }
//     };

//     this.unselectTool = function() {
//         if (strokeWeightInput) {
//             strokeWeightInput.value(1); // Reset to default value when tool is unselected
//         }
//     };
// }


function freehandTool() {
    this.icon = "assets/freehand.jpg";
    this.name = "Freehand";

    var previousMouseX = -1;
    var previousMouseY = -1;

    this.init = function() {
        this.populateOptions();
    };

    this.populateOptions = function() {
        let optionsArea = select('.options');
        // Clear previous options and create new ones for the freehand tool
        optionsArea.html('<label for="freehandStrokeInput" class="slider-label">Brush Size (0.1 to 10):</label><input type="number" id="freehandStrokeInput" min="0.1" max="10" step="0.1" value="1"><button id="applyStroke">Apply</button>');
        
        var applyButton = select('#applyStroke');
        var strokeWeightInput = select('#freehandStrokeInput');

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
            if (previousMouseX === -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.unselectTool = function() {
        select('.options').html(''); // Clears the options area
    };
}