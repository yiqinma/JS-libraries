var films = [];
var imgs = [];
var sounds = [];
var filmNumber = 0;
var buttonX;
var buttonY;
var buttonSize;
var showInfo = false;

function preload(){
  for(var i = 0;i < 7;i ++){
    films[i] = loadJSON("https://swapi.co/api/films/"+(i+1)+"/");
  }
  for(var i = 0;i < 7;i ++){
    imgs[i] = loadImage("assets/img/"+(i+1)+".jpg");
    sounds[i] = loadSound("assets/sound/"+(i+1)+".mp3");
  }
}

function setup() {
  textAlign(CENTER,CENTER);
  textFont("Andale Mono");
  for(var i = 0;i < 7;i ++){
    sounds[i].loop();
    sounds[i].pause();
  }
  
}

function draw() {
  createCanvas(windowWidth,windowHeight*1.7);
  background(53,48,48);
  
  fill(255,232,31);
  textSize(windowHeight/60);
  text("May the Force be with you!",0,windowHeight/60);
  textAlign(CENTER,CENTER);
  fill(0);
  rect(width/2-width/10,windowHeight/7 - windowHeight/50,width/5,windowHeight/25);
  fill(255);
  textSize(windowHeight/50);
  text("STARWARS WIKIA",width/2,windowHeight/7);
  
  fill(255,232,31);
  textAlign(LEFT,LEFT);
  text("Dear StarWars Fake Fans:",0.5*width/3,windowHeight/5,width/3,windowHeight/40);
  text("Are you exhaused trying to join the conversation when all of your friends are talking about the Star Wars? Now we are here to help you. Take a look at the picture below and guess which movie is that. You can click on the button to see the answer. Good luck!",0.5*width/3,windowHeight/5,2*width/3,windowHeight/4);
  
  var t = imgs[filmNumber].height/imgs[filmNumber].width;
  image(imgs[filmNumber],0.5*width/3,windowHeight/2.2,2*width/3,t*2*width/3);
  textAlign(CENTER,TOP);
  if(showInfo){
    var tempY = windowHeight/2.2 + 1.1*t*2*width/3;
    text(films[filmNumber].title,width/2,tempY);
    tempY = windowHeight/2.2 + 1.2*t*2*width/3;
    text(films[filmNumber].opening_crawl,width/2,tempY);
  }else{
    buttonX = width/2;
    buttonY = windowHeight/2.2 + 1.3*t*2*width/3;
    buttonSize = windowHeight / 15;
    stroke(255,232,31);
    if(dist(mouseX,mouseY,buttonX,buttonY)<buttonSize/2){
      fill(200,100);
    }else{
      noFill();
    }
    rect(buttonX - 1.5*buttonSize,buttonY - buttonSize/2,buttonSize*3,buttonSize);
    fill(255,232,31);
    textSize(buttonSize/2);
    text("Get Info",buttonX,buttonY - buttonSize/4);
  }
}

function mouseClicked(){
  if(mouseX < 0.5*width/3){
    sounds[filmNumber].pause();
    filmNumber --;
    if(filmNumber == -1)
      filmNumber = 7;
    showInfo = false;
    sounds[filmNumber].loop();
  }
  if(mouseX > 2.5*width/3){
    sounds[filmNumber].pause();
    filmNumber ++;
    if(filmNumber == 7)
      filmNumber = 0;
    showInfo = false;
    sounds[filmNumber].loop();
  }
  
  if(dist(mouseX,mouseY,buttonX,buttonY)<buttonSize/2 && !showInfo){
    showInfo = true;
  }else if(showInfo && mouseX > 0.5*width/3 && mouseX < 2.5*width/3){
    showInfo = false;
  }
}