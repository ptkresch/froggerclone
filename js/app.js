// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = getRandomInt(1, 4) * 83 - 30;
    this.speed = getRandomInt(100, 300);
    this.width = 101;
    this.height = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 606) {
        this.x = -101;
    } else {
        this.x = this.x + (dt * this.speed);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 370;
    this.width = 70;
    this.height = 80;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function(dt) {
    if (this.y < 50) {
        LevelReset();
        score = score + 5;
    }
    for (var i = 0; i < allEnemies.length; i++)
        checkCollisions(player, allEnemies[i]);

    for (var i = 0; i < allStars.length; i++)
        checkCollisions(player, allStars[i]);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if (input == 'left' && this.x > 0 && allHearts.length > 0 && movePlayer == true) {
        this.x -= 100;
    } else {
        this.x -= 0;
    }
    if (input == 'right' && this.x < 400 && allHearts.length > 0 && movePlayer == true) {
        this.x += 100;
    } else {
        this.x += 0;
    }
    if (input == 'up' && this.y > 0 && allHearts.length > 0 && movePlayer == true) {
        this.y -= 80;
    } else {
        this.x -= 0;
    }
    if (input == 'down' && this.y < 300 && allHearts.length > 0 && movePlayer == true) {
        this.y += 80;
    } else {
        this.x += 0;
    }
};

var Star = function() {
    this.sprite = 'images/Star.png';
    this.x = getRandomInt(0, 5) * 101;
    this.y = getRandomInt(1, 4) * 83 - 10;
    this.width = 25;
    this.height = 25;
};

Star.prototype.update = function() {
    for (var i = 0; i < allStars.length; i++) {
        for (var j = 0; j < allStars.length; j++) {
            if (i != j) {
                checkCollisions(allStars[i], allStars[j]);
            }
        }
    }
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function() {
    this.sprite = 'images/Heart.png';
    this.x = 110;
    this.y = 40;
}

Heart.prototype.update = function() {

}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 70);
}

//Instantiation//

var player = new Player();
var allEnemies = [];
var allStars = [];
var allHearts = [new Heart(), new Heart(), new Heart()];

allHearts[1].x = 65;
allHearts[2].x = 20;

//Create Enemies//
for (var i = 0; i < 2; i++) {
    allEnemies.push(new Enemy());
}

//Create Stars//
for (var i = 0; i < 4; i++) {
    allStars.push(new Star());
}

//Display numbers//
var difficulty = 1;
var gameTime = 0;
var score = 0;

//Game Conditions//

function checkCollisions(x, y) {
    if (intersectRect(x, y) == true && y.constructor == Enemy) {
        PlayerRestart();
    } else if (intersectRect(x, y) == true && y.constructor == Star && x.constructor !== Star) {
        Score(y);
    } else if (intersectRect(x, y) == true && y.constructor == Star && x.constructor == Star) {
        allStars.splice(allStars.indexOf(y), 1);
    }
}

function PlayerRestart() {
    player.x = 200;
    player.y = 370;
    allHearts.splice(0, 1);
}

function LevelReset() {
    if (player.y < 50) {
        player.x = 200;
        player.y = 370;
        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].speed = allEnemies[i].speed + 20;
        }
        if (allEnemies.length < 10) {
            allEnemies.push(new Enemy());
        }
        if (allStars.length == 0) {
            for (var i = 0; i < 4; i++) {
                allStars.push(new Star());
            }
        }
    }
}

function Score(y) {
    score++;
    allStars.splice(allStars.indexOf(y), 1);
};

//Tools//

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

function intersectRect(a, b) {
    return !(b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

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