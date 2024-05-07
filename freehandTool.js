

// function FreehandTool() {
//     this.icon = "assets/freehand.jpg";
//     this.name = "Freehand";
//     var previousMouseX = -1;
//     var previousMouseY = -1;
//     var strokeSlider; // Slider for adjusting the stroke weight
//     var sliderLabel; // Label for the slider

//     // Initialize the slider and label
//     this.init = function() {
//         strokeSlider = createSlider(1, 10, 1);
//         strokeSlider.parent('strokeSlider'); // Append slider to the specific div
//         strokeSlider.style('width', '160px');

//         sliderLabel = select('#sliderLabel'); // Select the label using its ID
//         sliderLabel.style('display', 'block'); // Ensure the label is visible
//     };

//     this.draw = function() {
//         if (mouseIsPressed) {
//             if (previousMouseX == -1) {
//                 previousMouseX = mouseX;
//                 previousMouseY = mouseY;
//             } else {
//                 strokeWeight(strokeSlider.value());
//                 line(previousMouseX, previousMouseY, mouseX, mouseY);
//                 previousMouseX = mouseX;
//                 previousMouseY = mouseY;
//             }
//         } else {
//             previousMouseX = -1;
//             previousMouseY = -1;
//         }
//     };

//     // Remove the slider and hide the label when the tool is not active
//     this.unselectTool = function() {
//         strokeSlider.remove();
//         sliderLabel.style('display', 'none'); // Hide the label
//     };
// }

function FreehandTool() {
    this.icon = "assets/freehand.jpg";
    this.name = "Freehand";
    var previousMouseX = -1;
    var previousMouseY = -1;
    var strokeSlider; // Slider for adjusting the stroke weight
    var sliderLabel; // Label for the slider

    // Initialize the slider and label
	this.init = function() {
		// Check if slider already exists and clean it up if it does
		if (strokeSlider) {
			strokeSlider.remove();
		}
		
		// Select the container for the slider
		var sliderContainer = select('#strokeSlider');
		if (!sliderContainer) {
			console.error('Slider container with ID "strokeSlider" not found in the DOM.');
			return; // Exit if no container is found
		}
		
		// Create a new slider and append it to the container
		strokeSlider = createSlider(1, 10, 1);
		strokeSlider.parent(sliderContainer);
		strokeSlider.style('width', '160px');
	
		// Select and show the label
		sliderLabel = select('#sliderLabel');
		if (sliderLabel) {
			sliderLabel.html('Stroke Weight');
			sliderLabel.style('display', 'block');
		} else {
			console.error('Slider label with ID "sliderLabel" not found in the DOM.');
		}
	};

    this.draw = function() {
        if (mouseIsPressed) {
            if (previousMouseX === -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                strokeWeight(strokeSlider.value());
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    // Remove the slider and hide the label when the tool is not active
    this.unselectTool = function() {
        if (strokeSlider) {
            strokeSlider.remove();
            strokeSlider = null; // Ensure the slider is cleaned up
        }
        if (sliderLabel) {
            sliderLabel.style('display', 'none');
        }
    };
}