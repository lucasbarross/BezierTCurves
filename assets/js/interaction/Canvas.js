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
            curvas: true,
            tCurves: false
        }

        this.addNewControlPoint = this.addNewControlPoint.bind(this);
        this.intersectControlPoint = this.intersectControlPoint.bind(this);
        this.draw = this.draw.bind(this);
        this.drawDeCasteljaus = this.drawDeCasteljaus.bind(this);
        this.drawBezierCurves = this.drawBezierCurves.bind(this);
        this.drawTCurves = this.drawTCurves.bind(this);
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

        if(this.show.tCurves) this.drawTCurves();
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
        this.drawDeCasteljaus(group, path, this.bezier.carreiras);
        this.strokePath(this.lineWidthBezier, this.lineColorBezier, path);
    }
    
    /**
     * Calcula o algoritmo de De Casteljaus para determinado grupo de pontos de controle e 
     * desenha uma linha até cada ponto calculado em um canvas.
     * @param {ControlPoints[]} group grupo de pontos de controle a terem uma curva de bézier calculada sobre
     * @param {CanvasRenderingContext2D} canvas contexto do canvas para desenhar as linhas 
     */
    drawDeCasteljaus(group, canvas, stepSize) {
        if(group.length <= 1) return;
        
        let point;
        
        for(let t = 0; t <= 1; t += 1/stepSize){
            
            point = this.bezier.deCasteljaus(group, t);
            
            canvas.lineTo(point.x, point.y);
        }
        
        canvas.lineTo(group[group.length-1].x, group[group.length-1].y);
    }
    
    /**
     * Desenha as curvas transformadas no canvas
     */
    drawTCurves(){
        //checa se tem 16 pontos postos no canvas
        if(this.controlPointsGroup.reduce((p, c) => { return p + c.length }, 0) < 16) return;

        const path = new Path2D();
        const groups = this.controlPointsGroup;

        for(let t = 0; t <= 1; t += 1/this.bezier.interpolationControl) { 
            
            const group = [];

            //Para cada grupo de pontos de controle que representam as primeiras curvas entradas pelo usuário, 
            //calcula o De Casteljaus como se os pontos de controle fossem os primeiros, segundos, terceiros, e quartos pontos de cada um desses grupos.
            //No fim, será retornado novos quatro pontos de controle, que serão utilizados para gerar as curvas transformadas.
            for(let i = 0; i < 4; i++){
                const point = this.bezier.deCasteljaus([groups[0][i], groups[1][i], groups[2][i], groups[3][i]], t);
                group.push(point);
            }
            
            path.moveTo(group[0].x, group[0].y);

            //Desenha as curvas na vertical, a partir dos pontos de controle calculados para o "t" atual.
            this.drawDeCasteljaus(group, path, this.bezier.tCurves);
        }

        this.strokePath(2, this.lineColorBezier, path);
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