function rainbowStamp() {
    // Tool properties
    this.icon = 'assets/rainbow.jpg'; // Placeholder; replace with actual path
    this.name = 'rainbowStamp';
    this.shapes = ['circle', 'square', 'triangle', 'star', 'pentagon', 'ellipse', 'hexagon'];
    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    // Draws a gradient circle
    this.drawGradient = function(x, y, size, innerColor, outerColor) {
        let dContext = drawingContext;
        let radius = size / 2;
        let gradient = dContext.createRadialGradient(x, y, radius * 0.1, x, y, radius);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(1, outerColor);

        dContext.fillStyle = gradient;
        ellipse(x, y, size, size);
        dContext.fillStyle = 'white'; // Reset to avoid affecting other drawings
    };

    // Main drawing function, handles shape selection and drawing
    this.draw = function() {
        if (mouseIsPressed) {
            let color = random(this.colors); // Randomly select a color
            let shape = random(this.shapes); // Randomly select a shape
            let size = random(15, 25); // Random size for variety

            // Draw selected shape at mouse position
            switch (shape) {
                case 'circle':
                    this.drawGradient(mouseX, mouseY, size, color, 'white');
                    break;
                case 'square':
                    rectMode(CENTER);
                    fill(color);
                    stroke(color);
                    rect(mouseX, mouseY, size, size);
                    break;
                case 'triangle':
                    fill(color);
                    stroke(color);
                    this.drawTriangle(mouseX, mouseY, size);
                    break;
                case 'star':
                    fill(color);
                    stroke(color);
                    this.drawStar(mouseX, mouseY, size);
                    break;
                case 'pentagon':
                    fill(color);
                    stroke(color);
                    this.drawPentagon(mouseX, mouseY, size);
                    break;
                case 'ellipse':
                    let randomWidth = random(5, 15);
                    let randomHeight = random(5, 15);
                    this.drawGradient(mouseX, mouseY, Math.max(randomWidth, randomHeight), color, 'white');
                    break;
                case 'hexagon':
                    fill(color);
                    stroke(color);
                    this.drawHexagon(mouseX, mouseY, size);
                    break;
            }
        }
    };

    // Helper functions to draw various shapes
    this.drawTriangle = function(x, y, size) {
        const height = size * (Math.sqrt(3) / 2);
        triangle(x, y - height / 2, x - size / 2, y + height / 2, x + size / 2, y + height / 2);
    };

    this.drawStar = function(x, y, size) {
        const angle = TWO_PI / 5;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
            let x0 = x + cos(i) * size / 2;
            let y0 = y + sin(i) * size / 2;
            vertex(x0, y0);
            x0 = x + cos(i + angle / 2) * size / 4;
            y0 = y + sin(i + angle / 2) * size / 4;
            vertex(x0, y0);
        }
        endShape(CLOSE);
    };

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

    this.drawHexagon = function(x, y, size) {
        const angle = TWO_PI / 6;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
            const x0 = x + cos(i) * size / 2;
            const y0 = y + sin(i) * size / 2;
            vertex(x0, y0);
        }
        endShape(CLOSE);
    };

    // Populate tool options in the UI
    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="stampInfo">Rainbow Stamp:Click on the canvas to stamp random shapes with random colors!</label>');
    };

    // Clears the tool options when the tool is unselected
    this.unselectTool = function() {
        select('.options').html(''); // Clear options area
    };
}