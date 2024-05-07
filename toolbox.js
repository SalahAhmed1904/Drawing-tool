//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

	var self = this;

	this.tools = [];
	this.selectedTool = null;

	var toolbarItemClick = function() {
		//remove any existing borders
		var items = selectAll(".sideBarItem");
		for (var i = 0; i < items.length; i++) {
			items[i].style('border', '0');
		}

		var toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};

	//add a new tool icon to the html page
	var addToolIcon = function(icon, name) {
		var sideBarItem = createDiv("<img src='" + icon + "'></div>");
		sideBarItem.class("sideBarItem");
		sideBarItem.id(name + "sideBarItem");
		sideBarItem.parent("sidebar");
		sideBarItem.mouseClicked(toolbarItemClick);


	};

	//add a tool to the tools array
	this.addTool = function(tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};


	this.selectTool = function(toolName) {
		// Unselect the previous tool, if there is one
		if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
			this.selectedTool.unselectTool();
		}
	
		// Find and select the new tool
		this.selectedTool = this.tools.find(tool => tool.name === toolName);
		if (!this.selectedTool) {
			console.error("Tool not found: " + toolName);
			return;
		}
	
		// Highlight the selected tool in the UI
		var items = selectAll(".sideBarItem");
		items.forEach(item => item.style('border', '0')); // Remove borders from all tools
		select("#" + toolName + "sideBarItem").style("border", "2px solid blue");
	
		// Initialize the selected tool, if it has an init method
		if (this.selectedTool.hasOwnProperty("init")) {
			this.selectedTool.init();
		}
	
		// Populate tool options, if available
		if (this.selectedTool.hasOwnProperty("populateOptions")) {
			this.selectedTool.populateOptions();
		}
	};


}
