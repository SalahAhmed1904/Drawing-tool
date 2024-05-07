

function sprayCanTool() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
    this.pointSize = 1;  // Default size of each point

    this.draw = function() {
        if (mouseIsPressed) {
            for (var i = 0; i < this.points; i++) {
                var x = random(mouseX - this.spread, mouseX + this.spread);
                var y = random(mouseY - this.spread, mouseY + this.spread);
                ellipse(x, y, this.pointSize, this.pointSize);  // Use ellipse for variable size
            }
        }
    };
}