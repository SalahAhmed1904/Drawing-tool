function shapeTool() {
    this.icon = 'assets/shape.jpg';  // Path to the icon image for the shape tool
    this.name = 'shapeTool';

    this.mouseStartX = 0;
    this.mouseStartY = 0;
    this.drawing = false;
    
    this.draw = function() {
        if (mouseIsPressed && !this.drawing) {
            // Start drawing
            this.mouseStartX = mouseX;
            this.mouseStartY = mouseY;
            this.drawing = true;
            loadPixels();  // Save the pixel state at the start of drawing
        } else if (this.drawing) {
            // Update drawing
            updatePixels();  // Restore to the state when the mouse was first pressed
            switch (this.shape) {
                case 'ellipse':
                    let rx = abs(mouseX - this.mouseStartX) / 2;
                    let ry = abs(mouseY - this.mouseStartY) / 2;
                    ellipse(this.mouseStartX + rx, this.mouseStartY + ry, rx * 2, ry * 2);
                    break;
                case 'rectangle':
                    rect(this.mouseStartX, this.mouseStartY, mouseX - this.mouseStartX, mouseY - this.mouseStartY);
                    break;
                case 'triangle':
                    let baseLength = dist(this.mouseStartX, this.mouseStartY, mouseX, mouseY);
                    triangle(this.mouseStartX, this.mouseStartY, mouseX, mouseY, this.mouseStartX - (mouseX - this.mouseStartX), mouseY);
                    break;
                case 'circle':
                    let diameter = dist(this.mouseStartX, this.mouseStartY, mouseX, mouseY) * 2;
                    ellipse(this.mouseStartX, this.mouseStartY, diameter, diameter);
                    break;
            }
        }
    
        if (!mouseIsPressed && this.drawing) {
            // Finish drawing
            this.drawing = false;
        }
    };

    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html(`
            <label for="shapeSelect">Shape:</label>
            <select id="shapeSelect">
                <option value="ellipse" selected>Ellipse</option>
                <option value="rectangle">Rectangle</option>
                <option value="triangle">Triangle</option>
                <option value="circle">Circle</option>
            </select>
        `);
        select('#shapeSelect').changed(() => {
            this.shape = select('#shapeSelect').value();
        });
    };

    this.unselectTool = function() {
        select('.options').html('');
    };

    this.shape = 'ellipse';  // Default shape
}