status = "";
function preload()
{
    dog = loadImage("dog_cat.jpg");
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
    objectDetector.detect(dog, gotResults);
}

function draw()
{
    image(dog, 0, 0, 640, 420);
    fill("red");
    text("Dog", 45, 75);
    noFill();
    stroke("red")
    rect(30, 60, 450, 350)
    
    text("Cat", 320, 120)
    noFill();
    stroke("red");
    rect(300, 90, 270, 320)

}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
    }
}