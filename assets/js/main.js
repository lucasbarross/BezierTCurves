/**
 * Pega os valores padrões dos atributos no HTML
 */
const interpolationParameter = document.getElementById("interpolationParameter").value;
const tCurves = document.getElementById("tCurvesValue").value;
const carreiras = document.getElementById("carreiras").value;
/////////////////

const bezier = new Bezier(interpolationParameter, tCurves, carreiras);
const canvas = new Canvas(document.getElementById("canvas"), 5, bezier, { lineWidthBezier: 8, lineColorBezier: "#251b41" });
const input = new Input(canvas, bezier);

canvas.resizeToFit();
input.startEventListeners();