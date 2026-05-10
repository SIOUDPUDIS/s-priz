const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const hearts = [];
const heartEmojis = ['❤️', '💖', '💕', '🌸', '✨'];

class Heart {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 1.5 + 0.8;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        this.wind = Math.random() * 0.5 - 0.25;
    }

    draw() {
        ctx.font = `${this.size}px serif`;
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.emoji, this.x, this.y);
    }

    update() {
        this.y -= this.speed;
        this.x += this.wind;
        if (this.y < -50) {
            this.reset();
        }
    }
}

function init() {
    for (let i = 0; i < 35; i++) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();
