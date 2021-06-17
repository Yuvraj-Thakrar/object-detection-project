status="";
object=[];

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    input=document.getElementById("object_name").value;
    document.getElementById("status").innerHTML="Status: Detecting Object";
}


function modelLoaded(){
    console.log("Model is initalized");
    status="true";
}

function gotResult(error,results){
    if (error) {
        console.log(error);
    }
    else{
       console.log(results);
        object=results;
    }
}

function draw(){
    image(video,0,0,400,400);

    if (status!="") {
        object_detector.detect(video,gotResult);
        for( var i=0;i<object.length;i++) {  
            document.getElementById("status").innerHTML="Status: Detecting Objects";
           percent=floor(object[i].confidence*100);
        text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
           stroke("black");
           rect(object[i].x,object[i].y,object[i].width,object[i].height);
           if (object[i].label==input) {
            video.stop();
    object_detector.detect(gotResult);
            
            document.getElementById("object_finded").innerHTML=input+" finded";
            synth=window.speechSynthesis;
            utterThis=new SpeechSynthesisUtterance(input+" found");
            synth.speak(utterThis);
           }
           else {
               document.getElementById("object_finded").innerHTML=input+" not found";
           }
        }
    }
}