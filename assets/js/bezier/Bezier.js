class Bezier {

    constructor(interpolationControl, tCurves, carreiras) {
        this.interpolationControl = interpolationControl;
        this.tCurves = tCurves;
        this.carreiras = carreiras;

        this.setCarreiras = this.setCarreiras.bind(this);
        this.setInterpolationControl = this.setInterpolationControl.bind(this);
        this.setTCurves = this.setTCurves.bind(this);
        this.deCasteljaus = this.deCasteljaus.bind(this);
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

    deCasteljausPoints(pointsGroup) {
        pointsGroup.forEach(group => {
            for(let t = 0; t <= 1; t += 1/this.carreiras){
                const points = group;
                for(let i = 0; i < group.length; i++){
                    for(let k = group.length; k >= 0; k--){
                        points[k].x = (1-t) * points[k].x + t * points[k+1].x; 
                        points[i].y = (1-t) * points[i].y + t * points[i+1].y; 
                    }
                }
            }
        });
    }
}