const bezier = new Bezier(document.getElementById("interpolationParameter").value, document.getElementById("tCurves").value, document.getElementById("carreiras").value);
const canvas = new Canvas(document.getElementById("canvas"), 5);
canvas.resizeToFit();

const input = new Input(canvas, bezier);
input.startEventListeners();