// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;



function setup() {
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.parent("content");

    helpers = new HelperFunctions();
    colourP = new ColourPalette();
    toolbox = new Toolbox(colourP);  // Pass the ColourPalette instance

    // Initialize tools
    toolbox.addTool(new freehandTool());
    toolbox.addTool(new lineToTool());
    toolbox.addTool(new sprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new eraserTool());
    toolbox.addTool(new rainbowStamp());
    toolbox.addTool(new shapeTool());
    background(255);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

