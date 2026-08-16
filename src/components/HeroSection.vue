<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { config } from '../config.js'

const nameA = ref(null)
const nameB = ref(null)
const amp = ref(null)
const subtitle = ref(null)
const scrollCue = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3 })
  tl.fromTo(
    nameA.value,
    { y: '110%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
  )
    .fromTo(
      amp.value,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
      '-=0.7'
    )
    .fromTo(
      nameB.value,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
      '-=0.6'
    )
    .fromTo(
      subtitle.value,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
      '-=0.4'
    )
    .from(
      scrollCue.value,
      { opacity: 0, duration: 1, ease: 'power1.out' },
      '-=0.2'
    )
})
</script>

<template>
  <section class="hero">
    <div class="glow"></div>
    <div class="content">
      <p class="label">{{ config.heroTitle }}</p>
      <h1 class="names display">
        <span class="clip-wrap">
          <span ref="nameA" class="name-inner">{{ config.yourName }}</span>
        </span>
        <span ref="amp" class="amp">&</span>
        <span class="clip-wrap">
          <span ref="nameB" class="name-inner">{{ config.herName }}</span>
        </span>
      </h1>
      <p class="subtitle" ref="subtitle">{{ config.heroSubtitle }}</p>
    </div>
    <div class="scroll-cue" ref="scrollCue">
      <span></span>
      <p class="label">scroll</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: transparent;
  overflow: hidden;
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  max-width: 700px;
  max-height: 700px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(227, 193, 133, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
}

.names {
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--cream);
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 3vw, 2rem);
  margin: 0.75rem 0;
  flex-wrap: wrap;
  justify-content: center;
}

.names .clip-wrap {
  padding-bottom: 0.1em;
}

.name-inner {
  display: inline-block;
}

.amp {
  color: var(--gold);
  font-style: italic;
  font-size: 0.7em;
  display: inline-block;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--cream-dim);
  font-style: italic;
  max-width: 30ch;
  margin: 1rem auto 0;
}

.scroll-cue {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.scroll-cue span {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: scrollPulse 1.8s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
