<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'
import { withBase } from '../assetPath.js'

gsap.registerPlugin(ScrollTrigger)

const opened = ref(false)
const envelope = ref(null)
const flap = ref(null)
const seal = ref(null)
const letter = ref(null)
const sectionEl = ref(null)

const letterLines = computed(() =>
  config.loveLetter.replace('{yourName}', config.yourName).split('\n')
)

function openEnvelope() {
  if (opened.value) return
  opened.value = true

  const tl = gsap.timeline()
  tl.to(seal.value, { scale: 0, rotate: 25, duration: 0.4, ease: 'back.in(2)' })
    .to(
      flap.value,
      { rotateX: 180, duration: 0.7, ease: 'power2.inOut' },
      '-=0.1'
    )
    .to(
      envelope.value,
      { y: 20, opacity: 0, duration: 0.5, ease: 'power1.in' },
      '-=0.2'
    )
    .fromTo(
      letter.value,
      { y: 60, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .from(
      '.letter-line',
      { opacity: 0, y: 10, duration: 0.6, stagger: 0.12, ease: 'power1.out' },
      '-=0.3'
    )
}

onMounted(() => {
  gsap.from(sectionEl.value.querySelectorAll('.reveal'), {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 75%',
    },
  })
})
</script>

<template>
  <section class="letter-section" ref="sectionEl">
    <p class="label reveal">A Letter, Sealed For You</p>
    <h2 class="display reveal">Open when you're ready</h2>

    <div class="stage">
      <div
        v-if="!opened"
        class="envelope"
        ref="envelope"
        @click="openEnvelope"
      >
        <div class="flap" ref="flap"></div>
        <div class="body"></div>
        <div class="seal" ref="seal">&#10084;</div>
        <p class="tap-hint">tap to open</p>
      </div>

      <div class="letter" ref="letter" v-show="opened">
        <p
          v-for="(line, i) in letterLines"
          :key="i"
          class="letter-line"
          :class="{ blank: !line.trim() }"
        >
          {{ line || ' ' }}
        </p>

        <audio
          v-if="config.voiceMessage"
          class="voice-message"
          :src="withBase(config.voiceMessage)"
          controls
        ></audio>
      </div>
    </div>
  </section>
</template>

<style scoped>
.letter-section {
  background: transparent;
  padding: 6rem 1.5rem 8rem;
  text-align: center;
}

.letter-section h2 {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  color: var(--cream);
  margin: 0.5rem 0 3.5rem;
}

.stage {
  max-width: 560px;
  margin: 0 auto;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.envelope {
  position: relative;
  width: 260px;
  height: 170px;
  cursor: pointer;
}

.envelope .body {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #16192a, #0c0f18);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.envelope .flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  background: linear-gradient(160deg, #1c2036, #12162a);
  border: 1px solid var(--line);
  clip-path: polygon(0 0, 100% 0, 50% 90%);
  transform-origin: top center;
  transform-style: preserve-3d;
  border-radius: 4px 4px 0 0;
}

.seal {
  position: absolute;
  top: 68px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 35% 30%, #d98f8f, #8a2f2f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.tap-hint {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-soft);
  opacity: 0.8;
  animation: pulseHint 2s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes pulseHint {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.letter {
  background: linear-gradient(180deg, #fbf6ea, #f3ecdf);
  color: #2a2417;
  padding: 3rem 2.5rem;
  border-radius: 3px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  text-align: left;
  max-width: 480px;
  width: 100%;
}

.letter-line {
  font-size: 1.15rem;
  line-height: 1.7;
  margin: 0 0 0.4rem;
}

.letter-line.blank {
  margin-bottom: 1rem;
}

.voice-message {
  width: 100%;
  margin-top: 1.5rem;
}
</style>
