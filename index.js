let sequence = [];
let count = 0;
let level = 1;
let state = "idle";

const greenSound = new Audio("sounds/green.mp3");
const redSound = new Audio("sounds/red.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");



const gameIdle = () => {
    $("#level-title").text("Press A Key to Start");
    $("body").keypress(gameInit);
}
const gameInit = () => {
    $("body").unbind("keypress");
    
    sequence = [];
    count = 0;
    level = 1;
    
    gamePlay();    
}

const gamePlay = () => {
    $(".btn").unbind("click");
    $("#level-title").text("Level " + level);
    // Select new color and play sound
    var numColor = Math.floor(Math.random()*4);
    sequence.push(numColor);
    console.log(sequence);
    console.log(count + ", " + level);

    $("#"+ mapNumToColor(numColor)).fadeOut(100).fadeIn(100);
    playSound(numColor);

    // Attach listeners
    $(".btn").click((btnClicked)=>{
        console.log(btnClicked.target.id, sequence[count]);
        if (btnClicked.target.id == mapNumToColor(sequence[count])) {
            clickColor(btnClicked.target.id);
            count++;
            
            if (count == level) {
                level++;
                count = 0;
                setTimeout(gamePlay,1000);
            }
        }
        else {
            gameOver();
        }
    });


}
    
const gameOver = () => {
    $("#level-title").text("Game Over, Press Any key to Restart");
    $(".btn").unbind("click");
    $("body").addClass("game-over");
    setTimeout(()=>{$("body").removeClass("game-over");},100);
    wrongSound.play();
    $("body").keypress(gameInit);
}

const clickColor = color => {
    $("#"+color).addClass("pressed");
    setTimeout(()=>{$("#"+color).removeClass("pressed");},100);
    playSound(mapColorToNum(color));
}

const mapNumToColor = num => {
    switch(num) {
        case 0:
            return "green";
        case 1:
            return "red";
        case 2:
            return "yellow";
        case 3:
            return "blue";
    }
}

const mapColorToNum = num => {
    switch(num) {
        case "green":
            return 0;
        case "red":
            return 1;
        case "yellow":
            return 2;
        case "blue":
            return 3;
        default:
            return -1;
    }
}

const playSound = color => {
    switch (color) {
        case 0: // green
            greenSound.play();
            break;
        case 1: // red
            redSound.play();
            break;
        case 2: // yellow
            yellowSound.play();
            break;
        case 3: // blue
            blueSound.play();
            break;
        default:
            break;
    }
}


gameIdle();

