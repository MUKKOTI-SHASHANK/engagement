<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)
const dayEl = ref(null)
const monthEl = ref(null)
const yearEl = ref(null)
const detailEl = ref(null)

const dots = Array.from({ length: 14 }, () => ({
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  size: `${Math.random() * 3 + 1.5}px`,
  duration: `${Math.random() * 6 + 5}s`,
  delay: `${Math.random() * 4}s`,
}))

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: '+=180%',
        scrub: 2,
        pin: true,
        pinSpacing: true,
      },
    })
    tl.fromTo(
      dayEl.value,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, ease: 'power4.out', duration: 0.7 },
      0
    )
      .fromTo(
        monthEl.value,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, ease: 'power4.out', duration: 0.7 },
        0.35
      )
      .fromTo(
        yearEl.value,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, ease: 'power4.out', duration: 0.7 },
        0.65
      )
      .fromTo(
        detailEl.value,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 },
        1.05
      )
  }, sectionEl.value)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section class="date-section" ref="sectionEl">
    <p class="label corner-label">The Date</p>

    <div class="glow"></div>

    <div
      v-for="(dot, i) in dots"
      :key="i"
      class="dot"
      :style="{
        left: dot.left,
        top: dot.top,
        width: dot.size,
        height: dot.size,
        animationDuration: dot.duration,
        animationDelay: dot.delay,
      }"
    ></div>

    <div class="rails">
      <span></span>
      <span></span>
    </div>

    <div class="content">
      <div class="clip-wrap">
        <p class="day" ref="dayEl">{{ config.anniversary.day }}</p>
      </div>
      <div class="clip-wrap month-wrap">
        <p class="month" ref="monthEl">{{ config.anniversary.month }}</p>
      </div>
      <div class="clip-wrap">
        <p class="year" ref="yearEl">{{ config.anniversary.year }}</p>
      </div>

      <div class="detail" ref="detailEl">
        <div class="rule"></div>
        <p class="detail-text">{{ config.anniversary.detail }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.date-section {
  min-height: 100vh;
  background: linear-gradient(160deg, #05060a 0%, #12101c 55%, #1b1522 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.corner-label {
  position: absolute;
  top: 2.2rem;
  left: 2.2rem;
  z-index: 3;
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  max-width: 600px;
  max-height: 600px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(227, 193, 133, 0.09) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
  animation: pulseGlow 5s ease-in-out infinite;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(227, 193, 133, 0.5);
  animation-name: floatGold;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  z-index: 2;
  pointer-events: none;
}

.rails {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  padding: 0 3vw;
}

.rails span {
  height: 1px;
  width: 18vw;
  background: rgba(227, 193, 133, 0.12);
}

.content {
  position: relative;
  z-index: 5;
  text-align: center;
  user-select: none;
}

.day {
  font-family: 'Italiana', serif;
  font-size: clamp(5.5rem, 24vw, 16rem);
  font-weight: 400;
  color: var(--cream);
  line-height: 0.85;
  letter-spacing: -0.02em;
  margin: 0;
}

.month-wrap {
  margin: clamp(0.2rem, 0.8vw, 0.8rem) 0;
}

.month {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 7vw, 6.5rem);
  font-weight: 300;
  font-style: italic;
  color: var(--gold);
  letter-spacing: 0.2em;
  line-height: 1;
  margin: 0;
}

.year {
  font-family: 'Italiana', serif;
  font-size: clamp(1.6rem, 5vw, 4.5rem);
  font-weight: 400;
  color: rgba(243, 236, 223, 0.2);
  letter-spacing: 0.5em;
  line-height: 1;
  margin: 0;
  padding-left: 0.5em;
}

.detail {
  margin-top: clamp(1.8rem, 3.5vw, 3rem);
  padding: 0 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.rule {
  width: 1px;
  height: 36px;
  background: rgba(227, 193, 133, 0.3);
  margin: 0 auto 1.2rem;
}

.detail-text {
  font-family: 'Manrope', sans-serif;
  color: rgba(243, 236, 223, 0.5);
  letter-spacing: 0.08em;
  font-size: clamp(0.85rem, 1.3vw, 1.05rem);
  font-weight: 300;
  line-height: 1.6;
}
</style>
