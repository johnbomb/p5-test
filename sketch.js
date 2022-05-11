var song //
var img
var fft
var particles= []
 

function preload() {
  song = loadSound('Trap-Power-Intro-4.mp3')

  img = loadImage('andy-holmes-unsplash.jpg')
}


function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES)
  imageMode(CENTER)
  fft = new p5.FFT()
  img.filter(BLUR, 5)

}



function draw() {
  background("#003366");
  stroke("#ffff00");
  strokeWeight(4)
  noFill()
  
  
  translate(width /2, height /2)
  image(img, 0, 0, width, height)
  textSize(25);
  textFont ("Georgia"); 
  textStyle(ITALIC);
  
  text("click to play/stop",-85,15);
  
  fft.analyze()
  amp = fft.getEnergy(20, 200)
  
  var wave = fft.waveform()
  beginShape()
  for (var i = 0; i <width; i++){
var index = floor(map(i,0,width,0,wave.length))

var r = map(wave[index], -1, 1, 150, 350)

var x = r * sin(i)
var y = r * cos(i)
    vertex(x, y)
    
  }
  endShape()

  var p = new Particle()
  particles.push(p)

  for(var i = particles.length -1; i >= 0; i--){
    if(!particles[i].edges()) {
      
      particles[i].update(amp > 210)
    particles[i].show()
    } else{
      particles.splice(i, 1)
    }
      
    }
      

}





function mouseClicked(){
  if (song.isPlaying()) {
      song.pause()
      noLoop()
  }else {
    song.play()
      loop()
  }
}

class Particle {
  constructor(){
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.001, 0.0001))
    
    this.w =random(2, 4)
    this.color = [random(200, 255), random(200, 255), random(200, 255)]
  
  } 
 update(cond){
   this.vel.add(this.acc)
    this.pos.add(this.vel)
 if (cond) {
   this.pos.add(this.vel)
   this.pos.add(this.vel)
   this.pos.add(this.vel)
 }
 
 }
  edges() { 
    
    if (this.pos.x < -width /2 || this.pos.x > width /2 || this.pos.y <- height /2 || this.pos.y > height /2) {
      return true
    } else{
      return false
    }
  
  
  
  
  
  }
  
   
  
                                                    
  
  show(){
   noStroke()
   fill(this.color)
   ellipse(this.pos.x, this.pos.y, this.w)
 }

}
