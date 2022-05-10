
// Declaring Variables

let capture;
let posenet;
let singlePose;
let skeleton;

// This function runs only ones while setting up.
function setup() {

    // It will create canvas of given size on which everything will be performed
    createCanvas(800, 500);

    //console.log("setup funct");

    // It will start capturing video
    capture = createCapture(VIDEO);

    // hide captured video which shows on another space
    capture.hide();

    // load the PoseNet model
    posenet = ml5.poseNet(capture, modelLoaded);

    // detect pose
    posenet.on('pose', recievedPoses);

}

// function will process on poses captured by video and store data in singlepose and skeleton
function recievedPoses(poses){

    console.log(poses);

    if(poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log("model has loaded");
}

/*
function getRandomArbitrary(min, max) { // generate random num
    return Math.random() * (max - min) + min;
}
*/

// this function code runs in infinite loop
function draw() {
    
    // images and video(webcam)
    image(capture, 0, 0);

    // Red color
    fill(255, 0, 0);
    
    // operations on singlePose
    if(singlePose) {

        // loop to process on every image of video to show poses 17 points
        for(let i=0; i<singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        // stroke for white color
        stroke(255, 255, 255);

        // add strokeweight
        strokeWeight(5);

        // loop to show joining lines between every points i.e. skeleton
        for(let j=0; j<skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // Apply img1 and img2 (process any operations on images)
        // image(img1, singlePose.nose.x-40, singlePose.nose.y-70, 125, 125);
        // image(img2, singlePose.nose.x-35, singlePose.nose.y+28, 50, 50);
    }


    /* These are some functions of P5.js through which you can draw some points. lines, rectangles,
     Triangles and many more on the created canvas.

        // let ab = Math.random()*250

        // background(200);

        // stroke(0,100,100)
        // strokeWeight(5)
        // fill(25,250,25, 100)
        // point(100,100);
        // point(100,300);
        // line(100,200, 100,300);
        // line(300,200, 300,300);
        // triangle(200,100, 100,200, 300,200);
        // ellipse(400,100, 100,200);            ellipse(x, y, w, h);
        // circle(400,400, 100);                circle(point(x,y), size);
        // rect(100,400, 200,100)
        // circle(100,300, 100); 

        // stroke(255,0,0)

        // circle(400,300, 100); 
        // circle(500,300, 50);

        // fill(a)
        // ellipse(mouseX, mouseY, 50)
    */

}