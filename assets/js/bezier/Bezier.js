class Bezier {

    constructor(interpolationControl, tCurves, carreiras) {
        this.interpolationControl = interpolationControl;
        this.tCurves = tCurves;
        this.carreiras = carreiras;

        this.setCarreiras = this.setCarreiras.bind(this);
        this.setInterpolationControl = this.setInterpolationControl.bind(this);
        this.setTCurves = this.setTCurves.bind(this);
        this.deCasteljaus = this.deCasteljausPoints.bind(this);
        // setInterval(() => {
        //     console.log(this.interpolationControl)
        //     console.log(this.carreiras)
        //     console.log(this.tCurves)
        // }, 1000);
    }

    setCarreiras(value) {
        this.carreiras = value;
    };
    
    setInterpolationControl(value) {
        this.interpolationControl = value;
    };
    
    setTCurves(value) {
        this.tCurves = value;
    };

    deCasteljausPoints(group, canvas) {
        if(group.length <= 1) return;
        
        for(let t = 0; t <= 1; t += 1/this.carreiras){
            
            let points = new Array(...group); 

            for(let i = 0; i < group.length; i++){
                for(let k = 0; k < group.length - i - 1; k++){
                    const x = (1-t) * points[k].x + t * points[k+1].x;
                    const y = (1-t) * points[k].y + t * points[k+1].y;
                    points[k] = { x, y };
                }
            }
            
            canvas.lineTo(points[0].x, points[0].y);
        }
    }
}