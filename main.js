status="";
object=[];
input=document.getElementById("object_name").value;
synth=window.speechSynthesis;
utter_this=new SpeechSynthesisUtterance()
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    object_detector.detect(video, gotResult);
}


function modelLoaded(){
    console.log("Model is initalized");
    status="true";
}

function gotResult(results,error){
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,400,400);

    if (status!="") {
        for( var i=0;i<object.length;i++) {  
            document.getElementById("status").innerHTML="Status: Game is loading";
           percent=floor(object[i].confidence*100);
        text(objects[i].label+""+percent,objects[i].x+15,objects[i].y+15);
        noFill();
           stroke("black");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           if (objects==input) {
            video.stop();
            object_detector.detect(gotResult);
            document.getElementById("object_finded").innerHTML=input+"finded";
           }
        }
    }
}