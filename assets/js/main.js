const canvas = new Canvas(document.getElementById("canvas"), 5);
canvas.resizeToFit();

const input = new Input(canvas);
input.startEventListeners();