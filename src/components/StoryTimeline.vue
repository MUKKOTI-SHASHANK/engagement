<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)
const slideRefs = ref([])
const dotRefs = ref([])
const activeIndex = ref(0)

const count = config.timeline.length

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: `+=${count * 140}%`,
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          activeIndex.value = Math.min(
            count - 1,
            Math.floor(self.progress * count)
          )
        },
      },
    })

    slideRefs.value.forEach((slide, i) => {
      if (!slide) return
      const photo = slide.querySelector('.photo-frame')
      const dateLabel = slide.querySelector('.label')
      const caption = slide.querySelector('.caption')
      const t = i

      tl.fromTo(
        photo,
        { scale: 0.85, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' },
        t
      )
        .fromTo(
          dateLabel,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.25, ease: 'power4.out' },
          t + 0.1
        )
        .fromTo(
          caption,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
          t + 0.18
        )
        .to(
          [photo, dateLabel, caption],
          { opacity: 0, y: -30, scale: 0.94, duration: 0.28, ease: 'power2.in' },
          t + 0.72
        )
    })
  }, sectionEl.value)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section class="story" ref="sectionEl">
    <p class="label corner-label">Our Story</p>


    <div class="glow"></div>

    <div class="stage">
      <div
        v-for="(item, i) in config.timeline"
        :key="i"
        class="slide"
        :ref="(el) => (slideRefs[i] = el)"
      >
        <div class="photo-frame">
          <div class="ring"></div>
          <img :src="item.photo" :alt="item.date" />
        </div>
        <div class="clip-wrap">
          <p class="label">{{ item.date }}</p>
        </div>
        <p class="caption" v-html="item.caption"></p>
      </div>
    </div>

    <div class="progress-dots">
      <span
        v-for="(item, i) in config.timeline"
        :key="i"
        class="prog-dot"
        :class="{ active: i === activeIndex }"
      ></span>
    </div>
  </section>
</template>

<style scoped>
.story {
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.corner-label {
  position: absolute;
  top: 2.2rem;
  left: 2.2rem;
  z-index: 3;
}

.heading {
  position: absolute;
  top: 2.1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  color: var(--cream);
  z-index: 3;
  text-align: center;
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 70vw;
  max-width: 700px;
  max-height: 700px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(227, 193, 133, 0.09) 0%, transparent 65%);
  pointer-events: none;
  animation: pulseGlow 5s ease-in-out infinite;
}

.stage {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 560px;
  margin-top: 4.5rem;
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.4rem;
}

.photo-frame {
  width: clamp(200px, 26vw, 270px);
  aspect-ratio: 4 / 5;
  height: auto;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--line);
  box-shadow: 0 0 45px rgba(227, 193, 133, 0.18), 0 20px 40px rgba(0, 0, 0, 0.4);
}

.photo-frame .ring {
  position: absolute;
  inset: -10px;
  border-radius: 26px;
  border: 1px solid rgba(227, 193, 133, 0.3);
  pointer-events: none;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.caption {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--cream-dim);
  font-style: italic;
  line-height: 1.5;
  max-width: 34ch;
  white-space: pre-line;
}

.caption :deep(strong) {
  color: var(--gold);
  font-weight: 500;
}

.progress-dots {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 3;
}

.prog-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(227, 193, 133, 0.25);
  transition: background 0.4s, transform 0.4s;
}

.prog-dot.active {
  background: var(--gold);
  transform: scale(1.4);
}
</style>
