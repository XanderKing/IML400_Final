let mask1;

function preload() {
    mask1 = loadModel("Mask.obj");
}

function setup() {
    createCanvas(640, 480, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(200);
    // ambientLight(0, 255, 0);
    rotateZ(180);
    rotateY(frameCount);
    model(mask1);
}