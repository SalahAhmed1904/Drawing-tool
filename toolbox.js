

function Toolbox(colourPalette) {
    var self = this;

    this.tools = [];
    this.selectedTool = null;
    this.colourPalette = colourPalette;  // Store the reference to ColourPalette

    var toolbarItemClick = function() {
        var items = selectAll(".sideBarItem");
        for (var i = 0; i < items.length; i++) {
            items[i].style('border', '0');
        }

        var toolName = this.id().split("sideBarItem")[0];
        self.selectTool(toolName);
        loadPixels();
    };

    var addToolIcon = function(icon, name) {
        var sideBarItem = createDiv("<img src='" + icon + "'></div>");
        sideBarItem.class("sideBarItem");
        sideBarItem.id(name + "sideBarItem");
        sideBarItem.parent("sidebar");
        sideBarItem.mouseClicked(toolbarItemClick);
    };

    this.addTool = function(tool) {
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("Make sure your tool has both a name and an icon");
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    this.resetDrawingState = function() {
        stroke(0);
        strokeWeight(1);
    };

    this.selectTool = function(toolName) {
        this.resetDrawingState();
        
        if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
            this.selectedTool.unselectTool();
        }

        // Reset color selection if switching to a non-drawing tool
        if (toolName !== "freehandTool" && toolName !== "lineToTool" && toolName !== "sprayCanTool" && toolName !== "mirrorDrawTool") {
            this.colourPalette.resetColourSelection();
        }

        this.selectedTool = this.tools.find(tool => tool.name === toolName);
        if (!this.selectedTool) {
            console.error("Tool not found: " + toolName);
            return;
        }

        var items = selectAll(".sideBarItem");
        items.forEach(item => item.style('border', '0'));
        select("#" + toolName + "sideBarItem").style("border", "2px solid blue");

        if (this.selectedTool.hasOwnProperty("init")) {
            this.selectedTool.init();
        }

        if (this.selectedTool.hasOwnProperty("populateOptions")) {
            this.selectedTool.populateOptions();
        }
    };
}