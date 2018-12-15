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
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeInterpolationValue(e) {
        document.getElementById("parameterValue").innerHTML = e.target.value;
        this.bezier.setInterpolationControl(e.target.value);
        this.canvasObj.draw();
    }

    changeVisibility(e){
        this.canvasObj.show[e.target.id] = e.target.checked;
        this.canvasObj.draw();
    }
    
    changeCarreiras(e) {
        this.bezier.setCarreiras(e.target.value);
        this.canvasObj.draw();
    }
    
    changeTCurvesValue(e) {
        this.bezier.setTCurves(e.target.value);
        this.canvasObj.draw();
    }

    mouseDown(e) {
        this.clickedControlPoint = canvas.intersectControlPoint(e);
        
        if(e.which == 1) {
            if(!this.clickedControlPoint) {
                this.canvasObj.addNewControlPoint(e.offsetX, e.offsetY);
            }
        } else if(e.which == 2 && this.clickedControlPoint) {
            this.canvasObj.removePoint(this.clickedControlPoint);
        }
    }

    mouseMove(e) {
        const point = this.clickedControlPoint;
        if (point) {
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
        document.getElementById("pontos").addEventListener("input", this.changeVisibility);
        document.getElementById("segmentos").addEventListener("input", this.changeVisibility);
        document.getElementById("curvas").addEventListener("input", this.changeVisibility);
    }

}