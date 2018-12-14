class Input {

    constructor(canvas){
        this.canvasObj = canvas;
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    changeParameterValue(e) {
        document.getElementById("parameterValue").innerHTML = e.target.value;
    }

    mouseDown(e) {
        this.clickedControlPoint = canvas.intersectControlPoint(e);

        if(!this.clickedControlPoint) {
            this.canvasObj.addNewControlPoint(e.offsetX, e.offsetY);
        }
    }

    mouseMove(e) {
        const point = this.clickedControlPoint;
        if (point) {
            point.path = new Path2D();
            point.x = e.offsetX;
            point.y = e.offsetY;
            this.canvasObj.draw();
        }
    }

    mouseUp(e) {
        this.clickedControlPoint = null;
    }

    startEventListeners() {
        this.canvasObj.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvasObj.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvasObj.canvas.addEventListener('mouseup', this.mouseUp);
        document.getElementById("interpolationParameter").addEventListener("input", this.changeParameterValue);
    }

}