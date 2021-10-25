song= "";
leftWristY=0;
rightWristY=0;
rightWristX=0;
leftWristX=0;
leftWristScore=0;
rightWristScore=0;

function preload () {
song= loadSound("music.mp3")
}
function setup() {
    canvas= createCanvas(600, 500);
    canvas.position(650, 300);

        video= createCapture(VIDEO); 
        video.hide();
        posenet= ml5.poseNet(video, loadedModel);
        posenet.on('pose', gotPoses);     
    }
function loadedModel() {
console.log("Years of travelling...");
}

function gotPoses(result) {
console.log(result);


leftWristX= result[0].pose.leftWrist.x;
leftWristY= result[0].pose.leftWrist.y;
rightWristX= result[0].pose.rightWrist.x;
rightWristY= result[0].pose.rightWrist.y;

leftWristScore= result[0].pose.keypoints[9].score;
rightWristScore= result[0].pose.keypoints[10].score;


}





function draw() {
    image(video, 0, 0, 600, 500);

    fill('cyan');
    stroke('blue');

    if(rightWristScore>0.2) {
circle(rightWristX, rightWristY, 25);

if(rightWristY>0 && rightWristY<100) {

    document.getElementById("speed").innerHTML="speed: 0.5x";
    song.rate(0.5);

}
if(rightWristY>100 && rightWristY<200) {
    
    document.getElementById("speed").innerHTML="speed: 1x";
    song.rate(1);
}
if(rightWristY>200 && rightWristY<300) {
    
    document.getElementById("speed").innerHTML="speed: 1.5x";
    song.rate(1.5);
}
if(rightWristY>300 && rightWristY<400) {
    
    document.getElementById("speed").innerHTML="speed: 2x";
    song.rate(2);
}
if(rightWristY>400) {
    
    document.getElementById("speed").innerHTML="speed: 2.5x";
    song.rate(2.5);
}
    }

    if(leftWristScore>0.2) {
        circle(leftWristX, leftWristY, 26);
        holdy=Number(leftWristY);
        without_decimal=floor(holdy);
        volume=without_decimal/500;
        
        document.getElementById("volume").innerHTML="volume: " + volume;
        song.setVolume(volume);
    }


}
function play_play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}