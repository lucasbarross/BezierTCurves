class Canvas {
    
    constructor(canvas, pointRadius, bezier, { lineWidthBezier, lineColorBezier }) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.controlPointsGroup = [[], [], [], []];
        this.pointRadius = pointRadius;
        this.bezier = bezier;
        this.lineWidthBezier = lineWidthBezier;
        this.lineColorBezier = lineColorBezier;
        
        this.show = {
            pontos: true,
            segmentos: true,
            curvas: true
        }


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
        let foundFreeGroup = false;

        this.controlPointsGroup.forEach(group => {
            if(group.length < 4 && !foundFreeGroup) {
                group.push(controlPoint);
                foundFreeGroup = true;
            }
        });

        this.draw();
    }

    resizeToFit() {
        var width = parseFloat(window.getComputedStyle(this.canvas).width);
        var height = parseFloat(window.getComputedStyle(this.canvas).height);
        this.resizeCanvas(width, height);
    }

    intersectControlPoint(click) {
        let controlPoint = null;
    
        this.controlPointsGroup.forEach(group => {
            group.forEach((point) => {
                if(point.intersect(click.offsetX, click.offsetY)) controlPoint = point;        
            })
        });
    
        return controlPoint;
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        this.controlPointsGroup.forEach(group => {
            if(this.show.segmentos) this.drawLinesToControlPoints(group);
            if(this.show.pontos) this.drawControlPoints(group);
            if(this.show.curvas) this.drawBezierCurves(group);
        });
    }
    
    drawLinesToControlPoints(group){
        const path = new Path2D();
        
        for(let i = 0; i < group.length-1; i++){
            path.moveTo(group[i].x, group[i].y);
            path.lineTo(group[i+1].x, group[i+1].y);
        }
    
        this.strokePath(3, "#c1ccd3", path);
    }

    drawControlPoints(group) {
        group.forEach((point, i) => {
            const path = new Path2D();
            path.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
            point.setPath(path);
            this.ctx.fill(point.path);
        });
    }

    drawBezierCurves(group){
        const path = new Path2D();
        this.bezier.deCasteljausPoints(group, path);
        this.strokePath(this.lineWidthBezier, this.lineColorBezier, path);
    }

    removePoint(point){
        this.controlPointsGroup.forEach((group) => {
            let index = group.indexOf(point);
            if(index !== -1) group.splice(index, 1);
        })

        this.draw();
    }

    strokePath(lineWidth, strokeStyle, path){
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke(path);
    }
}