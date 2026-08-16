<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasEl = ref(null)
let ctx, frameId, resizeHandler
const petals = []

const COLORS = [
  'rgba(227,193,133,0.55)',
  'rgba(243,236,223,0.4)',
  'rgba(201,168,106,0.4)',
  'rgba(255,255,255,0.3)',
]

function makePetal(width) {
  return {
    x: Math.random() * width,
    y: -20,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 0.9 + 0.35,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    size: Math.random() * 7 + 4,
    opacity: Math.random() * 0.5 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.floor(Math.random() * 3),
  }
}

function drawPetal(c, p) {
  c.save()
  c.translate(p.x, p.y)
  c.rotate((p.rotation * Math.PI) / 180)
  c.globalAlpha = p.opacity
  c.fillStyle = p.color
  if (p.shape === 0) {
    c.beginPath()
    c.moveTo(0, -p.size)
    c.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size * 0.6, p.size * 0.3, 0, p.size * 0.6)
    c.bezierCurveTo(-p.size * 0.6, p.size * 0.3, -p.size * 0.5, -p.size * 0.5, 0, -p.size)
    c.fill()
  } else if (p.shape === 1) {
    c.beginPath()
    c.ellipse(0, 0, p.size * 0.42, p.size * 0.72, 0, 0, Math.PI * 2)
    c.fill()
  } else {
    c.beginPath()
    c.ellipse(0, 0, p.size * 0.55, p.size * 0.38, 0, 0, Math.PI * 2)
    c.fill()
  }
  c.restore()
}

onMounted(() => {
  const canvas = canvasEl.value
  ctx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  resizeHandler = resize
  window.addEventListener('resize', resizeHandler)

  for (let i = 0; i < 26; i++) {
    const p = makePetal(canvas.width)
    p.y = Math.random() * canvas.height
    petals.push(p)
  }

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    petals.forEach((p) => {
      p.x += p.vx + Math.sin(Date.now() * 0.0008 + p.y * 0.008) * 0.2
      p.y += p.vy
      p.rotation += p.rotationSpeed
      if (p.y > canvas.height + 20) {
        Object.assign(p, makePetal(canvas.width))
        p.y = -20
      }
      drawPetal(ctx, p)
    })
    frameId = requestAnimationFrame(loop)
  }
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <canvas ref="canvasEl" class="petal-canvas"></canvas>
</template>

<style scoped>
.petal-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  pointer-events: none;
  opacity: 0.7;
}
</style>
