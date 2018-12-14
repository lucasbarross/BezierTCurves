class Input {

    constructor(canvas, bezier){
        this.canvasObj = canvas;
        this.bezier = bezier;
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.changeCarreiras = this.changeCarreiras.bind(this);
        this.changeTCurvesValue = this.changeTCurvesValue.bind(this);
        this.changeInterpolationValue = this.changeInterpolationValue.bind(this);
    }

    changeInterpolationValue(e) {
        document.getElementById("parameterValue").innerHTML = e.target.value;
        this.bezier.setInterpolationControl(e.target.value);
    }
    
    changeCarreiras(e) {
        this.bezier.setCarreiras(e.target.value);
    }
    
    changeTCurvesValue(e) {
        this.bezier.setTCurves(e.target.value);
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
        document.getElementById("interpolationParameter").addEventListener("input", this.changeInterpolationValue);
        document.getElementById("carreiras").addEventListener("input", this.changeCarreiras);
        document.getElementById("tCurves").addEventListener("input", this.changeTCurvesValue);
    }

}