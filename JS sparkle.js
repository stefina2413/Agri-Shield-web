class SparkleCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
        this.particles = [];
        this.init();
        
        window.addEventListener('resize', () => {
            this.w = this.canvas.width = window.innerWidth;
            this.h = this.canvas.height = window.innerHeight;
        });
    }

    init() {
        for(let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random()
            });
        }
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.w, this.h);
        
        for(let p of this.particles) {
            p.x += p.dx;
            p.y += p.dy;
            
            p.opacity += (Math.random() - 0.5) * 0.05;
            if (p.opacity < 0) p.opacity = 0;
            if (p.opacity > 1) p.opacity = 1;
            
            if (p.x < 0 || p.x > this.w) p.dx *= -1;
            if (p.y < 0 || p.y > this.h) p.dy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'white';
            this.ctx.fill();
        }
    }
}

function initParticles() {
    new SparkleCanvas('footer-sparkles');
    new SparkleCanvas('bg-sparkles');
}
