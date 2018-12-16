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
        this.generateTCurves = this.generateTCurves.bind(this);
    }

    /**
     * Função de evento quando o usuário mudar o valor de interpolação (parâmetro)
     * @param {Event} e evento javascript input
     */
    changeInterpolationValue(e) {
        document.getElementById("parameterValue").innerHTML = e.target.value;
        this.bezier.setInterpolationControl(e.target.value);
        this.canvasObj.draw();
    }

    /**
     * Função de evento quando o usuário mudar a visibilidade de algum elemento (curvas, segmentos...)
     * @param {Event} e evento javascript input
     */
    changeVisibility(e){
        this.canvasObj.show[e.target.id] = e.target.checked;
        this.canvasObj.draw();
    }

    /**
     * Função de evento quando o usuário mudar o valor de carreiras das curvas
     * @param {Event} e evento javascript input
     */
    changeCarreiras(e) {
        this.bezier.setCarreiras(e.target.value);
        this.canvasObj.draw();
    }
    
    /**
     * Função de evento quando o usuário mudar o valor de parâmetro das T-Curvas
     * @param {Event} e evento javascript input
     */
    changeTCurvesValue(e) {
        this.bezier.setTCurves(e.target.value);
        this.canvasObj.draw();
    }

    generateTCurves(e) {
        this.canvasObj.show["tCurves"] = true;
        this.canvasObj.draw();
    }
    /**
     * Função de evento quando o usuário clicar com o mouse.
     * @param {Event} e evento javascript mousedown
    */
    mouseDown(e) {
        this.clickedControlPoint = canvas.intersectControlPoint(e);
        /**
         * é checado se foi com o botao direito e caso tenha sido,
         * e o click nao intersecta nenhum ponto de controle, cria um novo ponto de controle.
         * Caso o click tenha sido com o botão do meio do mouse e tenha sido em algum ponto de controle, esse ponto
         * de controle é removido.
         */
        if(e.which == 1) {
            if(!this.clickedControlPoint) {
                this.canvasObj.addNewControlPoint(e.offsetX, e.offsetY);
                if(this.canvasObj.controlPointsGroup.reduce((p, c) => { return p + c.length }, 0) == 16) this.enableButtonAndSlide();
            }
        } else if(e.which == 2 && this.clickedControlPoint) {
            this.canvasObj.removePoint(this.clickedControlPoint);
            document.getElementById("desenharCurvas").setAttribute("disabled", true)
            document.getElementById("interpolationParameter").setAttribute("disabled", true);
            this.canvasObj.show["tCurves"] = false;
        }
    }

    enableButtonAndSlide() {
        document.getElementById("desenharCurvas").removeAttribute("disabled");
        document.getElementById("interpolationParameter").removeAttribute("disabled");
    }
    /**
     * Função de evento quando o usuário mexe o mouse: move um ponto de controle que esteja sendo clicado.
     * @param {Event} e evento javascript mousemove
     */
    mouseMove(e) {
        const point = this.clickedControlPoint;
        if (point) {
            point.x = e.offsetX;
            point.y = e.offsetY;
            this.canvasObj.draw();
        }
    }

    /**
     * Função de evento quando o click do usuário solta
     * @param {Event} e evento javascript mouseup
     */
    mouseUp(e) {
        this.clickedControlPoint = null;
    }
    /**
     * Adiciona os event listeners do javascript com suas respectivas funções
     */
    startEventListeners() {
        this.canvasObj.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvasObj.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvasObj.canvas.addEventListener('mouseup', this.mouseUp);
        document.getElementById("interpolationParameter").addEventListener("input", this.changeInterpolationValue);
        document.getElementById("carreiras").addEventListener("input", this.changeCarreiras);
        document.getElementById("tCurvesValue").addEventListener("input", this.changeTCurvesValue);
        document.getElementById("pontos").addEventListener("input", this.changeVisibility);
        document.getElementById("segmentos").addEventListener("input", this.changeVisibility);
        document.getElementById("curvas").addEventListener("input", this.changeVisibility);
        document.getElementById("tCurves").addEventListener("input", this.changeVisibility);
        document.getElementById("desenharCurvas").addEventListener("click", this.generateTCurves);
    }

}