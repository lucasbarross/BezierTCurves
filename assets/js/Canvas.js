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
    /**
     * Altera largura e altura do canvas
     * @param {float} width nova largura do canvas
     * @param {float} height nova altura do canvas
     */
    resizeCanvas(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    /**
     * Adiciona um novo ponto de controle ao canvas
     * @param {float} x posição X do ponto de controle
     * @param {float} y posição Y do ponto de controle
     */
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
    /**
     * Função básica para melhor resolução do canvas
     */
    resizeToFit() {
        var width = parseFloat(window.getComputedStyle(this.canvas).width);
        var height = parseFloat(window.getComputedStyle(this.canvas).height);
        this.resizeCanvas(width, height);
    }
    /**
     * Detecta se um clique do mouse intersectou em algum dos pontos de controle
     * @param {MouseClickEvent} click evento de click gerado pelo listener do javascript 
     */
    intersectControlPoint(click) {
        let controlPoint = null;
    
        this.controlPointsGroup.forEach(group => {
            group.forEach((point) => {
                if(point.intersect(click.offsetX, click.offsetY)) controlPoint = point;        
            })
        });
    
        return controlPoint;
    }

    /**
     * Faz o desenho no canvas de todos os elementos que estão com a opção de serem mostrados
     */
    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        this.controlPointsGroup.forEach(group => {
            if(this.show.segmentos) this.drawLinesToControlPoints(group);
            if(this.show.pontos) this.drawControlPoints(group);
            if(this.show.curvas) this.drawBezierCurves(group);
        });
    }
    
    /**
     * Desenha os segmentos de um ponto de controle a outro em um dado grupo de pontos de controle.
     * @param {ControlPoints[]} group o grupo de pontos de controle que terá linhas renderizadas de um a outro.
     */
    drawLinesToControlPoints(group){
        const path = new Path2D();
        
        for(let i = 0; i < group.length-1; i++){
            path.moveTo(group[i].x, group[i].y);
            path.lineTo(group[i+1].x, group[i+1].y);
        }
    
        this.strokePath(3, "#c1ccd3", path);
    }
    /**
     * Desenha os pontos de controle
     * @param {ControlPoints[]} group grupo de pontos de controle a serem renderizados. 
     */
    drawControlPoints(group) {
        group.forEach((point) => {
            const path = new Path2D();
            path.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
            point.setPath(path);
            this.ctx.fill(point.path);
        });
    }


    /**
     * Desenha a curva de bezier associada a pontos de controle
     * @param {ControlPoints[]} group grupo de pontos de controle a terem a curva de bézier calculada e desenhada
     */
    drawBezierCurves(group){
        const path = new Path2D();
        this.bezier.deCasteljausPoints(group, path);
        this.strokePath(this.lineWidthBezier, this.lineColorBezier, path);
    }
    /**
     * Remove um ponto de controle
     * @param {ControlPoint} point ponto a ser removido
     */
    removePoint(point){
        this.controlPointsGroup.forEach((group) => {
            let index = group.indexOf(point);
            if(index !== -1) group.splice(index, 1);
        })

        this.draw();
    }
    /**
     * Desenha linhas de determinado path    
     * @param {Number} lineWidth largura da linha
     * @param {String} strokeStyle estilo da linha (cor, hexadecimal)
     * @param {Path2D} path path que possui a linha a ser renderizada
     */
    strokePath(lineWidth, strokeStyle, path){
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke(path);
    }
}