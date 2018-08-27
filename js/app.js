class Enemy {
    constructor(y=0,speed=20,sprite = 'images/enemy-bug.png'){
        this.sprite=sprite;
        this.x=0;
        this.y= 90*y+50;
        this.speed=speed;
    }
    update(dt){
        this.x+=(this.speed*dt);
        if(this.x>=400){
            this.x=0;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(sprite='images/char-boy.png' , x=200,y= 320){
        this.sprite=sprite;
        this.x=x;
        this.y=y;
    }
    update(){
        let xpos=this.x;
        let ypos=this.y;
        let collision=0;
       allEnemies.forEach(function(enemy){
            if((Math.abs(enemy.x-xpos)<40) && (Math.abs(enemy.y-ypos)<40)){
                collision=1;
            }
            
       });
       if(collision){
        this.reset();
       }
       //console.log(allEnemies);
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(move){
        if(move==='left'){
          //  console.log('left');
            if(this.x>0){
        //        console.log('leftmove');
                this.x-=100;
            }
        }
        if(move==='right'){
            //console.log('right');
            if(this.x<400){
                this.x+=100;
             //   console.log('rightmove');
            }
        }
        if(move==='up'){
            //console.log('up');
            if(this.y>0){
                this.y-=90;
             //   console.log('upmove');
             if(this.y<0){
                
                this.won();
             }
            }
        }
        if(move==='down'){
         //  console.log('down');
            if(this.y<400){
                this.y+=90;
           //     console.log('downmove');
            }
        }
       // this.update();
    }
    async won(){
        await new Promise(resolve => setTimeout(resolve, 500));
        this.reset();
    }
    reset(){
        this.y=320;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const e1= new Enemy(0,50);
const e2= new Enemy(1,30);
const e3= new Enemy(0,10);
const e4= new Enemy(2,40);
const allEnemies=[e1,e2,e3,e4];
const player=new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
