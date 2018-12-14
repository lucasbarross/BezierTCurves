class Canvas {
    
    constructor(canvas, pointRadius) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.controlPoints = [];
        this.pointRadius = pointRadius;

        this.addNewControlPoint = this.addNewControlPoint.bind(this);
        this.intersectControlPoint = this.intersectControlPoint.bind(this);
        this.draw = this.draw.bind(this);
    }

    resizeCanvas(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    addNewControlPoint(x, y) {
        let path = new Path2D();
        let controlPoint = new ControlPoint(path, x, y, this.pointRadius);
        this.controlPoints.push(controlPoint);
        this.draw();
    }

    resizeToFit() {
        var width = parseFloat(window.getComputedStyle(this.canvas).width);
        var height = parseFloat(window.getComputedStyle(this.canvas).height);
        this.resizeCanvas(width, height);
    }

    intersectControlPoint(click) {
        let controlPoint = null;
    
        this.controlPoints.forEach(point => {
            console.log(point);
            
            if(point.intersect(click.offsetX, click.offsetY)) controlPoint = point;        
        });
    
        return controlPoint;
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    
        this.controlPoints.forEach(point => {
            const path = new Path2D();
            path.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
            point.setPath(path);
            this.ctx.fill(point.path);
        });
    }
}