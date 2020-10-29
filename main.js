status = "";
objects = [];
function preload()
{
    img = loadImage("https://i.postimg.cc/HxFk8V7k/torch.jpg");
}

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Intiliazed!");
    status = true;
}

function draw()
{
    image(video, 0, 0, 300, 300);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
           fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
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