class Bezier {

    constructor(interpolationControl, tCurves, carreiras) {
        this.interpolationControl = interpolationControl;
        this.tCurves = tCurves;
        this.carreiras = carreiras;

        this.setCarreiras = this.setCarreiras.bind(this);
        this.setInterpolationControl = this.setInterpolationControl.bind(this);
        this.setTCurves = this.setTCurves.bind(this);
        this.deCasteljaus = this.deCasteljaus.bind(this);
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

    /**
     * Calcula um ponto a partir de um grupo de pontos de controle e um parâmetro t utilizando o algoritmo DeCasteljaus
     * @param {ControlPoints[], {x,y}[]} group Grupo de pontos de controle 
     * @param {Number} t parâmetro t a ser calculado o ponto
     * @returns {x, y}
     */
    deCasteljaus(group, t) {
        let points = new Array(...group); 

        for(let i = 0; i < group.length; i++){
            for(let k = 0; k < group.length - i - 1; k++){
                const x = (1-t) * points[k].x + t * points[k+1].x;
                const y = (1-t) * points[k].y + t * points[k+1].y;
                points[k] = { x, y };
            }
        }

        return points[0];
    }
}