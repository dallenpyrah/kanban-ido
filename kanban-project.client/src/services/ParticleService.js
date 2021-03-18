const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particlesArray
const mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 100) * (canvas.width / 100)
}
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x
    mouse.y = event.y
  }
)
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, Math.PI * 2, false)
    ctx.fillStyle = '#BA147D'
    ctx.fill()
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY
    }
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 5
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 5
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 5
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 5
      }
    }
    this.x += this.directionX
    this.y += this.directionY
    this.draw()
  }
}
function init() {
  particlesArray = []
  const numberOfParticles = (canvas.height * canvas.width) / 9000
  for (let i = 0; i < numberOfParticles; i++) {
    const size = (Math.random() * 5) + 1
    const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
    const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
    const directionX = (Math.random() * 5) - 2.5
    const directionY = (Math.random() * 5) - 2.5
    const color = '#BA147D'
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const distance = ((particlesArray[a].x - particlesArray[b].x) *
      (particlesArray[a].x - particlesArray[b].x)) +
      ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y))
      if (distance < (canvas.width / 10) * (canvas.height / 10)) {
        ctx.strokeStyle = 'rgba(30, 30, 31, 1)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
        ctx.stroke()
      }
    }
  }
}
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
  }
  connect()
}
init()
animate()
export const particle = new Particle()
