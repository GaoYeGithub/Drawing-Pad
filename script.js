var config = {
  apiKey: "AIzaSyCntsGwcx23zoQxFXgkxj76-8xgwGM8nJg",
  authDomain: "drawing-test-fc89d.firebaseapp.com",
  projectId: "drawing-test-fc89d",
  storageBucket: "drawing-test-fc89d.appspot.com",
  messagingSenderId: "622905699981",
  appId: "1:622905699981:web:385b2f7d00185f7a25bcc4",
  measurementId: "G-V2NTMLZJW9"
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];
var currentColor = "#000000";
var currentSize = 5;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0);
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  canvas.mousePressed(drawPoint);

  canvas.mouseMoved(function () {
    if (mouseIsPressed) {
      drawPoint();
    }
  });

  $("#colorPicker").on("input", function() {
    currentColor = this.value;
  });

  $("#sizePicker").on("input", function() {
    currentSize = this.value;
  });
}

function draw() {
  background(255);
  stroke(currentColor);
  strokeWeight(currentSize);
  noFill();
  beginShape();
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    vertex(point.x, point.y);
  }
  endShape();
}

function drawPoint() {
  pointsData.push({ x: mouseX, y: mouseY, color: currentColor, size: currentSize });
  points.push({ x: mouseX, y: mouseY, color: currentColor, size: currentSize });
}

function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint();
  }
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas("Painter Orpheus");
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
  pointsData.remove();
  points = [];
}
