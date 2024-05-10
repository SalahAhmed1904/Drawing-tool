// Defines the eraser tool functionality in a drawing application.
function eraserTool() {
    // Icon and name for the eraser tool in UI.
    this.icon = 'assets/eraser.jpg';
    this.name = 'eraserTool';

    // Eraser size settings.
    this.defaultStrokeWeight = 5;
    this.strokeWeight = this.defaultStrokeWeight;

    // Default eraser shape.
    this.shape = 'circle';

    // Draws the eraser shape based on current settings and mouse position.
    this.draw = function() {
        if (mouseIsPressed) {
            // Set up drawing settings for eraser (white color to "erase").
            stroke(255);
            fill(255);
            strokeWeight(1);

            // Draw the selected eraser shape at the mouse position.
            switch (this.shape) {
                case 'circle':
                    ellipse(mouseX, mouseY, this.strokeWeight, this.strokeWeight);
                    break;
                case 'square':
                    rectMode(CENTER);
                    rect(mouseX, mouseY, this.strokeWeight, this.strokeWeight);
                    break;
                case 'triangle':
                    this.drawTriangle(mouseX, mouseY, this.strokeWeight);
                    break;
                case 'star':
                    this.drawStar(mouseX, mouseY, this.strokeWeight);
                    break;
                case 'pentagon':
                    this.drawPentagon(mouseX, mouseY, this.strokeWeight);
                    break;
            }
        }
    };

    // Draws a triangle with given center coordinates and size.
    this.drawTriangle = function(x, y, size) {
        const height = size * (Math.sqrt(3)/2);
        triangle(x, y - height / 2, x - size / 2, y + height / 2, x + size / 2, y + height / 2);
    };

    // Draws a star with given center coordinates and size.
    this.drawStar = function(x, y, size) {
        const angle = TWO_PI / 5;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
            let x0 = x + cos(i) * size/2;
            let y0 = y + sin(i) * size/2;
            vertex(x0, y0);
            x0 = x + cos(i + angle/2) * size/4;
            y0 = y + sin(i + angle/2) * size/4;
            vertex(x0, y0);
        }
        endShape(CLOSE);
    };

    // Draws a pentagon with given center coordinates and size.
    this.drawPentagon = function(x, y, size) {
        const angle = TWO_PI / 5;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
            const x0 = x + cos(i) * size / 2;
            const y0 = y + sin(i) * size / 2;
            vertex(x0, y0);
        }
        endShape(CLOSE);
    };

    // Populates tool options UI with controls for adjusting eraser size and shape.
    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html(`
            <label for="eraserStrokeInput" class="slider-label">Eraser Size:</label>
            <input type="number" id="eraserStrokeInput" min="1" max="50" step="1" value="${this.strokeWeight}">
            <label for="shapeSelect">Shape:</label>
            <select id="shapeSelect">
                <option value="circle" selected>Circle</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
                <option value="star">Star</option>
                <option value="pentagon">Pentagon</option>
            </select>
        `);
        select('#eraserStrokeInput').input(() => {
            this.strokeWeight = parseInt(select('#eraserStrokeInput').value());
        });
        select('#shapeSelect').changed(() => {
            this.shape = select('#shapeSelect').value();
        });
    };

    // Cleans up UI and resets settings when tool is deselected.
    this.unselectTool = function() {
        select('.options').html('');
        stroke(0);
        this.strokeWeight = this.defaultStrokeWeight;
    };
}