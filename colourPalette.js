// Represents and manages a colour palette for UI.
function ColourPalette() {
    // Array of predefined color strings.
    this.colours = [
        "black", "silver", "gray", "white", "maroon", "red", "purple",
        "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
        "blue", "teal", "aqua"
    ];

    // Initially selected colour.
    this.selectedColour = "black";

    // Reference to this instance to use in nested functions.
    var self = this;

    // Handles color swatch click events.
    var colourClick = function() {
        // Remove border from previously selected colour swatch.
        select("#" + self.selectedColour + "Swatch").style("border", "0");

        // Set the new selected colour based on clicked swatch.
        self.selectedColour = this.id().split("Swatch")[0];
        fill(self.selectedColour);
        stroke(self.selectedColour);

        // Highlight the newly selected colour swatch.
        this.style("border", "2px solid blue");
    };

    // Initializes the colour swatches in the UI.
    this.loadColours = function() {
        // Set the initial paint and stroke colours.
        fill(this.colours[0]);
        stroke(this.colours[0]);

        // Create and append colour swatches to the palette.
        this.colours.forEach(function(colour) {
            var colourID = colour + "Swatch";
            var colourSwatch = createDiv();
            colourSwatch.class("colourSwatches");
            colourSwatch.id(colourID);
            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", colour);
            colourSwatch.mouseClicked(colourClick);
        });

        // Setup custom color button container and button.
        var buttonContainer = createDiv();
        buttonContainer.class("customColorButtonContainer");
        select(".colourPalette").child(buttonContainer);
        var customColorButton = createButton('Custom Color');
        customColorButton.parent(buttonContainer);
        customColorButton.mouseClicked(function() {
            self.promptForCustomColor();
        });
    };

    // Prompts user for custom RGB colour input and adds it if valid.
    this.promptForCustomColor = function() {
        var rgbString = prompt("Enter a custom color in RGB format (R, G, B):", "255, 0, 0");
        if (rgbString) {
            var rgbParts = rgbString.split(',').map(function(item) {
                return parseInt(item.trim());
            });

            if (rgbParts.length === 3 && rgbParts.every(function(value) { return !isNaN(value) && value >= 0 && value <= 255; })) {
                var newColor = `rgb(${rgbParts[0]}, ${rgbParts[1]}, ${rgbParts[2]})`;
                self.colours.push(newColor);
                self.addColourSwatch(newColor);
            } else {
                alert("Invalid RGB values. Please enter values like 255, 0, 0.");
            }
        }
    };

    // Adds a new colour swatch to the palette.
    this.addColourSwatch = function(color) {
        var colourID = color + "Swatch";
        var colourSwatch = createDiv();
        colourSwatch.class("colourSwatches");
        colourSwatch.id(colourID);
        select(".colourPalette").child(colourSwatch);
        select("#" + colourID).style("background-color", color);
        colourSwatch.mouseClicked(colourClick);
    };

    // Resets the colour selection to the default.
    this.resetColourSelection = function() {
        // Optionally remove the border from the current colour swatch.
        var currentSwatch = select("#" + this.selectedColour + "Swatch");
        currentSwatch && currentSwatch.style("border", "0");

        // Reset to default color and reapply border.
        this.selectedColour = "black";
        fill(this.selectedColour);
        stroke(this.selectedColour);
        select("#" + this.selectedColour + "Swatch").style("border", "2px solid blue");
    };

    // Initialize the colour swatches.
    this.loadColours();
}