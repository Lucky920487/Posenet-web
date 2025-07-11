let capture;
let posenet;
let singlePose;
let skeleton;
let snapshotButton;

function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', gotPoses);

  // 📸 Create Snapshot Button
  snapshotButton = createButton('📸 Take Snapshot');
  snapshotButton.position(10, height + 20); // place just below canvas
  snapshotButton.mousePressed(takeSnapshot);
}

function modelLoaded() {
  console.log('PoseNet Model Loaded');
}

function gotPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  background(220);
  image(capture, 0, 0, 800, 500);

  if (singlePose) {
    // 🔴 Medium red keypoints
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let kp = singlePose.keypoints[i];
      if (kp.score > 0.2) {
        ellipse(kp.position.x, kp.position.y, 14, 14);
      }
    }

    // ⚪ White skeleton
    stroke(255);
    strokeWeight(2.5);
    for (let i = 0; i < skeleton.length; i++) {
      let partA = skeleton[i][0];
      let partB = skeleton[i][1];
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// 📸 Save the canvas image
function takeSnapshot() {
  saveCanvas('pose_snapshot', 'png');
}



