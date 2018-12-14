class ControlPoint {
    /**
     * Classe de representação dos pontos de controle.
     * @param {Path2D} path 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     */
    constructor(path, x, y, radius){
        this.path = path;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.intersect = this.intersect.bind(this);
    }
    /**
     * 
     * @param {Path2D} path 
     */
    setPath(path) {
        this.path = path;
    }

    /**
     * Checa se determinada posição intersecta com o ponto de controle.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {boolean}
     */
    intersect(x, y) {
        var v = {
            x: this.x - x,
            y: this.y - y
        };
        
        const isInCircle = (Math.sqrt(v.x * v.x + v.y * v.y) <= this.radius);

        return isInCircle;
    }
}