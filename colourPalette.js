
// Displays and handles the colour palette.
function ColourPalette() {
    // a list of web color strings
    this.colours = [
        "black", "silver", "gray", "white", "maroon", "red", "purple",
        "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
        "blue", "teal", "aqua"
    ];
    // make the start colour be black
    this.selectedColour = "black";

    var self = this;

    var colourClick = function() {
        // remove the old border
        var current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");

        // get the new colour from the id of the clicked element
        var c = this.id().split("Swatch")[0];

        // set the selected colour and fill and stroke
        self.selectedColour = c;
        fill(c);
        stroke(c);

        // add a new border to the selected colour
        this.style("border", "2px solid blue");
    };

    // load in the colours
    this.loadColours = function() {
        fill(this.colours[0]);
        stroke(this.colours[0]);

        for (var i = 0; i < this.colours.length; i++) {
            var colourID = this.colours[i] + "Swatch";
            var colourSwatch = createDiv();
            colourSwatch.class("colourSwatches");
            colourSwatch.id(colourID);
            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", this.colours[i]);
            colourSwatch.mouseClicked(colourClick);
        }
    };

    // Adds method to reset the colour selection
    this.resetColourSelection = function() {
        // Remove the border from the currently selected swatch
        var currentSwatch = select("#" + this.selectedColour + "Swatch");
        if (currentSwatch) {
            currentSwatch.style("border", "0");
        }

        // Reset to default color (black in this case)
        this.selectedColour = "black";
        fill(this.selectedColour);
        stroke(this.selectedColour);

        // Optionally add border back to the default selected color swatch
        var defaultSwatch = select("#" + this.selectedColour + "Swatch");
        if (defaultSwatch) {
            defaultSwatch.style("border", "2px solid blue");
        }
    };

    // Call the loadColours function now it is declared
    this.loadColours();
}
