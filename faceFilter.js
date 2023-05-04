let facemesh;
let predictions = [];
let Video;
let ps;
let glContext;
let selectedItem = 0;

let t, i, j, n, s;

function preload() {
  mask1 = loadModel("MaskV2.obj");
  mask2 = loadModel("Gogglesobj.obj");
}

function setup() {
  var cnv = createCanvas(640, 480, WEBGL);
  cnv.style('display', 'block');
  var x = windowWidth/2-320;
  var y = windowHeight/2-240;
  cnv.position(x, y);
  glContext = cnv.GL;
  gfx1 = createGraphics(640, 480);
  Video = createCapture(VIDEO);
  Video.hide();
  angleMode(DEGREES);

  facemesh = ml5.facemesh(Video, modelReady);

  facemesh.on("predict", (results) => {
    predictions = results;
  });
  
  t = 1;
  i = 1;
  j = 1;
  n = 1;
  s = 1;
  
}

// when poseNet is ready, do the detection
function modelReady() {
  console.log("Model ready!");
  doPrediction();
}

function doPrediction(){
  facemesh.predict(Video);
}

function draw() {
  background(100);
  if (predictions.length > 0) {
    image(gfx1, -320, -240);
    gfx1.image(Video, 0, 0, 640, 480); //video on canvas, position, dimensions
    glContext.clear(glContext.DEPTH_BUFFER_BIT);

    // console.log(predictions);

    // drawKeypoints();
    item1();
    item2();

    if(selectedItem == 1){
      drawMask();
    }else if(selectedItem == 2){
      drawGoggles();
    }
  
    fill(0);
    stroke(50);
    s = 30;
    
    // noLoop();
  }


}

function drawMask(){
  var noseX = predictions[0]["annotations"]["noseTip"][0][0]-320;
  var noseY = predictions[0]["annotations"]["noseTip"][0][1]-240;
  // var noseZ = predictions[0]["scaledMesh"]["0"][2];

  var leftCheekX = predictions[0]["scaledMesh"]["132"][0]-320;
  var leftCheekY = predictions[0]["scaledMesh"]["132"][1]-240;
  var leftCheekZ = predictions[0]["scaledMesh"]["132"][2];
  
  var rightCheekX = predictions[0]["scaledMesh"]["361"][0]-320;
  var rightCheekY = predictions[0]["scaledMesh"]["361"][1]-240;
  var rightCheekZ = predictions[0]["scaledMesh"]["361"][2];

  var foreHeadX = predictions[0]["scaledMesh"]["10"][0]-320;
  var foreHeadY = predictions[0]["scaledMesh"]["10"][1]-240;
  var foreHeadZ = predictions[0]["scaledMesh"]["10"][2];

  var chinX = predictions[0]["scaledMesh"]["152"][0]-320;
  var chinY = predictions[0]["scaledMesh"]["152"][1]-240;
  var chinZ = predictions[0]["scaledMesh"]["152"][2];


  var leftEyeX = predictions[0]["scaledMesh"]["130"][0]-320;
  var leftEyeY = predictions[0]["scaledMesh"]["130"][1]-240;

  var rightEyeX = predictions[0]["scaledMesh"]["359"][0]-320;
  var rightEyeY = predictions[0]["scaledMesh"]["359"][1]-240;
  var rightEyeZ = predictions[0]["scaledMesh"]["359"][2];

  
  fill("red");
  // circle(noseX,noseY,5);
  // circle(leftCheekX,leftCheekY,5);
  // circle(rightCheekX,rightCheekY,5);
  // circle(leftEyeX,leftEyeY,5);
  // circle(rightEyeX,rightEyeY,5);
  // circle(foreHeadX,foreHeadY,5);
  // circle(chinX,chinY,5);



  push();
  translate(noseX,noseY+20,-50);

  let angleY = atan2(rightCheekX-leftCheekX,rightCheekZ-leftCheekZ);
  let angleX = atan2(chinY-foreHeadY,chinZ-foreHeadZ);
  let angleZ = zCalc(leftCheekX,leftCheekY,rightCheekX,rightCheekY);
  // console.log(angleY);
  // console.log(angleX);
  // console.log(angleZ);
  // console.log(dist(leftCheekX,leftCheekY,rightCheekX,rightCheekY));

  let s = map(dist(leftCheekX,leftCheekY,rightCheekX,rightCheekY),50,400,0.8,6);
  // console.log(rightEyeZ);
  // console.log(s);

  rotateY(angleY*-1+90);
  rotateX(angleX-90);
  rotateZ(angleZ);
  
  // console.log(abs(angleY*-1+90));
  if(abs(angleY*-1+90)< 15){
    scale(s,s,s);
    ps = s;
  }else{
    scale(ps,ps,ps);
  }

  model(mask1);
  pop();

}

function drawGoggles(){
  var noseX = predictions[0]["annotations"]["noseTip"][0][0]-320;
  var noseY = predictions[0]["annotations"]["noseTip"][0][1]-240;
  // var noseZ = predictions[0]["scaledMesh"]["0"][2];

  var leftCheekX = predictions[0]["scaledMesh"]["132"][0]-320;
  var leftCheekY = predictions[0]["scaledMesh"]["132"][1]-240;
  var leftCheekZ = predictions[0]["scaledMesh"]["132"][2];
  
  var rightCheekX = predictions[0]["scaledMesh"]["361"][0]-320;
  var rightCheekY = predictions[0]["scaledMesh"]["361"][1]-240;
  var rightCheekZ = predictions[0]["scaledMesh"]["361"][2];

  var foreHeadX = predictions[0]["scaledMesh"]["10"][0]-320;
  var foreHeadY = predictions[0]["scaledMesh"]["10"][1]-240;
  var foreHeadZ = predictions[0]["scaledMesh"]["10"][2];

  var chinX = predictions[0]["scaledMesh"]["152"][0]-320;
  var chinY = predictions[0]["scaledMesh"]["152"][1]-240;
  var chinZ = predictions[0]["scaledMesh"]["152"][2];


  var leftEyeX = predictions[0]["scaledMesh"]["130"][0]-320;
  var leftEyeY = predictions[0]["scaledMesh"]["130"][1]-240;

  var rightEyeX = predictions[0]["scaledMesh"]["359"][0]-320;
  var rightEyeY = predictions[0]["scaledMesh"]["359"][1]-240;
  var rightEyeZ = predictions[0]["scaledMesh"]["359"][2];

  
  fill("red");
  // circle(noseX,noseY,5);
  // circle(leftCheekX,leftCheekY,5);
  // circle(rightCheekX,rightCheekY,5);
  // circle(leftEyeX,leftEyeY,5);
  // circle(rightEyeX,rightEyeY,5);
  // circle(foreHeadX,foreHeadY,5);
  // circle(chinX,chinY,5);



  push();
  translate(noseX,leftEyeY,-50);

  let angleY = atan2(rightCheekX-leftCheekX,rightCheekZ-leftCheekZ);
  let angleX = atan2(chinY-foreHeadY,chinZ-foreHeadZ);
  let angleZ = zCalc(leftCheekX,leftCheekY,rightCheekX,rightCheekY);
  // console.log(angleY);
  // console.log(angleX);
  // console.log(angleZ);
  // console.log(dist(leftCheekX,leftCheekY,rightCheekX,rightCheekY));

  let s = map(dist(leftCheekX,leftCheekY,rightCheekX,rightCheekY),50,400,0.8,6);
  // console.log(rightEyeZ);
  // console.log(s);

  rotateY(angleY*-1+90);
  rotateX(angleX-90);
  rotateZ(angleZ);
  
  // console.log(abs(angleY*-1+90));
  if(abs(angleY*-1+90)< 15){
    scale(s*10,s*10,s*10);
    ps = s;
  }else{
    scale(ps*10,ps*10,ps*10);
  }

  model(mask2);
  pop();

}

function zCalc(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx) * (180 / Math.PI); // range (-PI, PI]
  return theta;
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
                          
  // console.log(predictions);
                          
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x-320, y-240, 5, 5);
    }
  }
    // noLoop();
}

function item1(){
  push();
  translate(250,-180,0);
  scale(1,1,1);
  rotateY(millis() / 10);
  model(mask1);

  pop();

}

function item2(){
  push();
  translate(-250,-180,0);
  scale(8,8,8);
  rotateY(millis() / 10);
  model(mask2);

  pop();

}

function mousePressed(){
  console.log(mouseX,mouseY);
  // if(mouseX > 475 && mouseX < 553 && mouseY > 0 && mouseY < 68)
  selectedItem +=1;
  if(selectedItem > 2){
    selectedItem = 0;
  }
}