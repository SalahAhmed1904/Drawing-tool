function Toolbox(colourPalette) {
    var self = this;

    this.tools = [];  // Array to store tool objects
    this.selectedTool = null;  // Currently selected tool
    this.colourPalette = colourPalette;  // Reference to ColourPalette for managing colors

    // Helper function to handle clicks on tool icons in the toolbar
    var toolbarItemClick = function() {
        var items = selectAll(".sideBarItem");
        // Reset style for all items
        items.forEach(item => item.style('border', '0'));

        // Identify clicked tool using the ID attribute
        var toolName = this.id().split("sideBarItem")[0];
        self.selectTool(toolName);  // Select the clicked tool
        loadPixels();
    };

    // Adds a tool icon to the sidebar
    var addToolIcon = function(icon, name) {
        var sideBarItem = createDiv("<img src='" + icon + "'>");
        sideBarItem.class("sideBarItem");
        sideBarItem.id(name + "sideBarItem");
        sideBarItem.parent("sidebar");
        sideBarItem.mouseClicked(toolbarItemClick);
    };

    // Adds a tool to the toolbox
    this.addTool = function(tool) {
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("Make sure your tool has both a name and an icon");
            return;
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        // Automatically select the first added tool
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    // Resets drawing state to default settings
    this.resetDrawingState = function() {
        stroke(0);
        strokeWeight(1);
    };

    // Selects a tool by name and updates UI accordingly
    this.selectTool = function(toolName) {
        this.resetDrawingState();

        // Unselect previous tool if applicable
        if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
            this.selectedTool.unselectTool();
        }

        // Reset color selection for non-drawing tools
        if (toolName !== "freehandTool" && toolName !== "lineToTool" && toolName !== "sprayCanTool" && toolName !== "mirrorDrawTool") {
            this.colourPalette.resetColourSelection();
        }

        // Find and set the new selected tool
        this.selectedTool = this.tools.find(tool => tool.name === toolName);
        if (!this.selectedTool) {
            console.error("Tool not found: " + toolName);
            return;
        }

        // Highlight the selected tool in the sidebar
        selectAll(".sideBarItem").forEach(item => item.style('border', '0'));  // Clear previous selections
        select("#" + toolName + "sideBarItem").style("border", "2px solid blue");  // Highlight selected tool

        // Initialize the tool if applicable
        if (this.selectedTool.hasOwnProperty("init")) {
            this.selectedTool.init();
        }

        // Populate options for the selected tool
        if (this.selectedTool.hasOwnProperty("populateOptions")) {
            this.selectedTool.populateOptions();
        }
    };
}