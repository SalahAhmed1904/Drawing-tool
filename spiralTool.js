

function spiralTool() {
    this.icon = 'assets/spiral.jpg'; // Placeholder, replace with actual path
    this.name = 'spiralTool';
    this.shapes = ['circle', 'square', 'triangle', 'star', 'pentagon', 'ellipse', 'hexagon'];
    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    this.density = 10; // Default density

    this.drawGradient = function(x, y, size, innerColor, outerColor) {
        let dContext = drawingContext;
        let radius = size / 2;
        let gradient = dContext.createRadialGradient(x, y, radius * 0.1, x, y, radius);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(1, outerColor);
    
        dContext.fillStyle = gradient;
        ellipse(x, y, size, size);
        dContext.fillStyle = 'white'; // Reset to default to avoid affecting other drawings
    };
    
    this.draw = function() {
        let numArms = 3; // Number of spiral arms
        let framesPerSpiral = 10; // Draw a spiral every 60 frames
    
        // Check if the mouse is pressed and the cursor is within the canvas bounds
        if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            // Only draw when the frameCount is divisible by framesPerSpiral
            if (frameCount % framesPerSpiral === 0) {
                for (let arm = 0; arm < numArms; arm++) {
                    let armAngle = arm * (TWO_PI / numArms); // Starting angle for each arm
    
                    for (let i = 0; i < this.density; i++) {
                        let angle = i * (TWO_PI / this.density) + armAngle; // Adjust angle for spiral spread
                        let radius = i * (10 * this.density / 10); // Adjust the spiral's spread based on density
                        let x = mouseX + radius * cos(angle);
                        let y = mouseY + radius * sin(angle);
    
                        let color = random(this.colors); // Select a random color
                        let shape = random(this.shapes); // Select a random shape
                        let size = random(5, 15); // Random size for more variety
    
                        fill(color);
                        stroke(color);
                        this.drawShape(shape, x, y, size, color);
                    }
                }
            }
        }
    };

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
                ellipse(x, y, size * random(0.6, 1.4), size * random(0.6, 1.4));
                break;
            case 'hexagon':
                this.drawHexagon(x, y, size);
                break;
        }
    };




    // Sample functions for drawing different shapes
    this.drawTriangle = function(x, y, size) {
        const height = size * (Math.sqrt(3)/2);
        triangle(x, y - height / 2, x - size / 2, y + height / 2, x + size / 2, y + height / 2);
    };

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


    this.populateOptions = function() {
        let optionsArea = select('.options');
        optionsArea.html('<label for="spiralDensity">Spiral Density:</label>');  // Use .html() to set inner HTML
        let slider = createSlider(5, 20, this.density);  // Use createSlider for creating slider
        slider.parent(optionsArea);  // Append slider to options area
        slider.input(() => {
            this.density = slider.value();
        });
    };

    this.unselectTool = function() {
        select('.options').html(''); // Clear options when tool is unselected
    };
}