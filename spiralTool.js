function spiralTool() {
    // Tool icon and name
    this.icon = 'assets/spiral.jpg'; // Replace with actual path if necessary
    this.name = 'spiralTool';

    // Shape and color options for the spiral
    this.shapes = ['circle', 'square', 'triangle', 'star', 'pentagon', 'ellipse', 'hexagon'];
    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    
    // Default spiral density
    this.density = 10;

    // Draws a gradient-filled circle
    this.drawGradient = function(x, y, size, innerColor, outerColor) {
        let dContext = drawingContext;
        let radius = size / 2;
        let gradient = dContext.createRadialGradient(x, y, radius * 0.1, x, y, radius);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(1, outerColor);
    
        dContext.fillStyle = gradient;
        ellipse(x, y, size, size);
        dContext.fillStyle = 'white'; // Reset to avoid affecting subsequent drawings
    };
    
    // Draws the spiral pattern
    this.draw = function() {
        let numArms = 3; // Number of spiral arms
        let framesPerSpiral = 10; // Frequency of spiral drawing
    
        if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            if (frameCount % framesPerSpiral === 0) {
                for (let arm = 0; arm < numArms; arm++) {
                    let armAngle = arm * (TWO_PI / numArms);
    
                    for (let i = 0; i < this.density; i++) {
                        let angle = i * (TWO_PI / this.density) + armAngle;
                        let radius = i * (10 * this.density / 10);
                        let x = mouseX + radius * cos(angle);
                        let y = mouseY + radius * sin(angle);
                        let color = random(this.colors);
                        let shape = random(this.shapes);
                        let size = random(5, 15);
    
                        fill(color);
                        stroke(color);
                        this.drawShape(shape, x, y, size, color);
                    }
                }
            }
        }
    };

    // Draws a specific shape at a given position and size
    this.drawShape = function(shape, x, y, size, color) {
        switch (shape) {
            case 'circle':
                this.drawGradient(x, y, size, color, 'white');
                break;
            case 'square':
                rectMode(CENTER);
                rect(x, y, size, size);
                break;
            case 'triangle':
                this.drawTriangle(x, y, size);
                break;
            case 'star':
                this.drawStar(x, y, size);
                break;
            case 'pentagon':
                this.drawPentagon(x, y, size);
                break;
            case 'ellipse':
                ellipse(x, y, size * random(0.6, 1.4), size);
                break;
            case 'hexagon':
                this.drawHexagon(x, y, size);
                break;
        }
    };

    // Draws a triangle
    this.drawTriangle = function(x, y, size) {
        const height = size * (Math.sqrt(3)/2);
        triangle(x, y - height / 2, x - size / 2, y + height / 2, x + size / 2, y + height / 2);
    };

    // Draws a star
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

    // Draws a pentagon
    this.drawPentagon = function(x, y, size) {
        const angle = TWO_PI / 5;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
            const x0 = x + cos(i) * size / 2;
            const y0 = y + sin(i) *size / 2;
            vertex(x0, y0);
        }
        endShape(CLOSE);
    };

    // Draws a hexagon
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

    // Adds a slider to adjust the spiral density
    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="spiralDensity">Spiral Density:</label>');
        let slider = createSlider(5, 20, this.density);
        slider.parent(optionsArea);
        slider.input(() => this.density = slider.value());
    };

    // Clears the options when the tool is unselected
    this.unselectTool = function() {
        select('.options').html('');
    };
}