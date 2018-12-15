const interpolationParameter = document.getElementById("interpolationParameter").value;
const tCurves = document.getElementById("tCurves").value;
const carreiras = document.getElementById("carreiras").value;

const bezier = new Bezier(interpolationParameter, tCurves, carreiras);

const canvas = new Canvas(document.getElementById("canvas"), 5, bezier, { lineWidthBezier: 8, lineColorBezier: "#251b41" });
canvas.resizeToFit();

const input = new Input(canvas, bezier);
input.startEventListeners();