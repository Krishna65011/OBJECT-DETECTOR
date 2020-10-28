status = "";
objects = [];
function preload()
{
    img = loadImage("https://i.postimg.cc/HxFk8V7k/torch.jpg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Intiliazed!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function draw()
{
    image(img, 0, 0, 640, 420);
    if(status != "")
    {
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
        
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    else
    {
        document.getElementById("status").innerHTML = "Status = IMAGES NOT DETECTED"
    }
    
   

}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}