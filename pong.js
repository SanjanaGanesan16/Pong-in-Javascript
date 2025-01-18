// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let WINDOW_WIDTH = canvas.width;
let WINDOW_HEIGHT = canvas.height;

function random(max) {
    return Math.floor(Math.random() * max);
}

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity_x = 6;
        this.velocity_y = 6;
        this.colors = ['red', 'yellow', 'limegreen', 'navy', 'blueviolet'];
        this.random_index = random(this.colors.length - 1);
    }

    draw() {
        ctx.fillStyle = this.colors[this.random_index];
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

     update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
        if (this.y > WINDOW_HEIGHT - this.h || this.y < 0) {
            this.velocity_y *= -1;
            this.random_index = random(this.colors.length - 1);
        }
    }

    reset() {
        this.x = WINDOW_WIDTH / 2 - this.w / 2;
        this.y = WINDOW_HEIGHT / 2 - this.h / 2;
        this.velocity_x *= -1;
    }
}

class Paddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 8;
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    move(dy) {
        this.y += dy * this.speed;
        if (this.y < 0) this.y = 0;
        if (this.y > WINDOW_HEIGHT - this.h) this.y = WINDOW_HEIGHT - this.h;
    }
}

const ball = new Rect(WINDOW_WIDTH / 2 - 10, WINDOW_HEIGHT / 2 - 10, 20, 20);
const leftPaddle = new Paddle(10, WINDOW_HEIGHT / 2 - 50, 10, 100);
const rightPaddle = new Paddle(WINDOW_WIDTH - 20, WINDOW_HEIGHT / 2 - 50, 10, 100);

let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function handleInput() {
    if (keys['w']) leftPaddle.move(-1);
    if (keys['s']) leftPaddle.move(1);
    if (keys['ArrowUp']) rightPaddle.move(-1);
    if (keys['ArrowDown']) rightPaddle.move(1);
}

function detectCollision(paddle) {
    if (
        ball.x < paddle.x + paddle.w &&
        ball.x + ball.w > paddle.x &&
        ball.y < paddle.y + paddle.h &&
        ball.y + ball.h > paddle.y
    ) {
        ball.velocity_x *= -1;
    }
}

function checkOutOfBounds() {
    if (ball.x < 0 || ball.x > WINDOW_WIDTH) {
        ball.reset();
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    ball.update();
    checkOutOfBounds();
    leftPaddle.draw();
    rightPaddle.draw();
    ball.draw();
    handleInput();
    detectCollision(leftPaddle);
    detectCollision(rightPaddle);
}

animate();
