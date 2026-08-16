<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const canvasHost = ref(null)
const sectionEl = ref(null)
const headingEl = ref(null)

let renderer, scene, camera, ringGroup, sparkles, frameId
let mouseX = 0
let mouseY = 0

function makeSparkleTexture() {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  grad.addColorStop(0, 'rgba(255,250,235,1)')
  grad.addColorStop(0.3, 'rgba(255,235,190,0.8)')
  grad.addColorStop(1, 'rgba(255,235,190,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

function initScene() {
  const host = canvasHost.value
  const width = host.clientWidth
  const height = host.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
  camera.position.set(0, 0.6, 9)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.outputColorSpace = THREE.SRGBColorSpace
  host.appendChild(renderer.domElement)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  const key = new THREE.DirectionalLight(0xfff2df, 2.2)
  key.position.set(3, 4, 5)
  scene.add(key)

  const rim = new THREE.PointLight(0xe3c185, 6, 20)
  rim.position.set(-4, 2, -3)
  scene.add(rim)

  const fill = new THREE.AmbientLight(0x404060, 0.6)
  scene.add(fill)

  ringGroup = new THREE.Group()
  ringGroup.scale.set(0, 0, 0)

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xe6c27a,
    metalness: 1,
    roughness: 0.25,
    envMapIntensity: 1.3,
  })

  const gemMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.02,
    transmission: 1,
    thickness: 0.6,
    ior: 2.4,
    envMapIntensity: 1.6,
    clearcoat: 1,
    flatShading: true,
  })

  // Band + the stone setting are built as siblings sharing the SAME origin
  // and the SAME tilt rotation, so they stay rigidly locked together at
  // every rotation angle instead of drifting apart as the ring spins.
  const bandRadius = 1.3
  const bandTube = 0.1
  const bandTilt = 1.0

  const band = new THREE.Mesh(
    new THREE.TorusGeometry(bandRadius, bandTube, 48, 128),
    goldMat
  )
  band.rotation.x = bandTilt
  ringGroup.add(band)

  function createGem(radius) {
    const h = radius * 1.5
    const profile = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(radius * 0.55, h * 0.14),
      new THREE.Vector2(radius, h * 0.36),
      new THREE.Vector2(radius * 0.5, h * 0.6),
      new THREE.Vector2(radius * 0.14, h * 0.68),
      new THREE.Vector2(0, h * 0.74),
    ]
    return new THREE.Mesh(new THREE.LatheGeometry(profile, 16), gemMat)
  }

  function createProngSet(radius, centerX, girdleY) {
    const group = new THREE.Group()
    const prongHeight = radius * 0.5
    ;[0, 1, 2, 3].forEach((i) => {
      const angle = (Math.PI / 2) * i + Math.PI / 4
      const prong = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, prongHeight, 6),
        goldMat
      )
      prong.position.set(
        centerX + Math.cos(angle) * radius * 1.05,
        girdleY,
        Math.sin(angle) * radius * 1.05
      )
      group.add(prong)
    })
    return group
  }

  // Setting built in the SAME local space as an unrotated (flat) torus,
  // so its "top" sits naturally at y = bandRadius + bandTube. Rotating
  // this whole group by bandTilt (identical to the band's own rotation,
  // around the same origin) keeps it glued to the band's crown.
  const setting = new THREE.Group()
  setting.rotation.x = bandTilt

  const stoneRadius = 0.22
  const spacing = 0.36
  const baseY = bandRadius + bandTube - 0.02
  const girdleY = baseY + stoneRadius * 1.5 * 0.36

  const gallery = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.07, spacing * 2, 4, 12),
    goldMat
  )
  gallery.rotation.z = Math.PI / 2
  gallery.position.y = baseY
  setting.add(gallery)

  ;[-spacing, 0, spacing].forEach((x) => {
    const gem = createGem(stoneRadius)
    gem.position.set(x, baseY, 0)
    setting.add(gem)
    setting.add(createProngSet(stoneRadius, x, girdleY))
  })

  ;[-1, 1].forEach((dir) => {
    const shoulder = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      goldMat
    )
    shoulder.position.set(dir * (spacing + stoneRadius + 0.16), baseY - 0.04, 0)
    shoulder.scale.set(1.4, 0.8, 0.5)
    shoulder.rotation.z = dir * 0.5
    setting.add(shoulder)
  })

  ringGroup.add(setting)

  scene.add(ringGroup)

  const sparkleGeo = new THREE.BufferGeometry()
  const count = 120
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 2.2 + Math.random() * 2.2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.6
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const sparkleMat = new THREE.PointsMaterial({
    size: 0.09,
    map: makeSparkleTexture(),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.85,
  })
  sparkles = new THREE.Points(sparkleGeo, sparkleMat)
  scene.add(sparkles)

  animate()
}

function animate() {
  frameId = requestAnimationFrame(animate)
  if (ringGroup) {
    ringGroup.rotation.y += 0.006
    ringGroup.rotation.x += (mouseY * 0.3 - ringGroup.rotation.x) * 0.04
    ringGroup.rotation.z += (mouseX * 0.15 - ringGroup.rotation.z) * 0.04
  }
  if (sparkles) {
    sparkles.rotation.y -= 0.0015
  }
  renderer.render(scene, camera)
}

function onResize() {
  if (!canvasHost.value) return
  const width = canvasHost.value.clientWidth
  const height = canvasHost.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = (e.clientY / window.innerHeight) * 2 - 1
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)

  gsap.from(headingEl.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 70%',
    },
  })

  ScrollTrigger.create({
    trigger: sectionEl.value,
    start: 'top 60%',
    onEnter: () => {
      gsap.to(ringGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.6,
        ease: 'elastic.out(1, 0.55)',
      })
      gsap.to(camera.position, {
        z: 6,
        duration: 1.8,
        ease: 'power2.out',
      })
    },
    once: true,
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  renderer?.dispose()
})
</script>

<template>
  <section class="ring-section" ref="sectionEl">
    <div class="heading" ref="headingEl">
      <p class="label">The Promise</p>
      <h2 class="display">Made real, from any distance</h2>
    </div>
    <div class="canvas-host" ref="canvasHost"></div>
  </section>
</template>

<style scoped>
.ring-section {
  height: 100vh;
  min-height: 640px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.heading {
  position: absolute;
  top: 3.5rem;
  text-align: center;
  z-index: 1;
}

.heading h2 {
  font-size: clamp(1.6rem, 5vw, 2.6rem);
  color: var(--cream);
  margin-top: 0.5rem;
}

.canvas-host {
  width: 100%;
  height: 100%;
}

.canvas-host :deep(canvas) {
  display: block;
}
</style>
