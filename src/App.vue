<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CosmicBackground from './components/CosmicBackground.vue'
import FloatingPetals from './components/FloatingPetals.vue'
import PasswordGate from './components/PasswordGate.vue'
import HeroSection from './components/HeroSection.vue'
import TheDate from './components/TheDate.vue'
import StoryTimeline from './components/StoryTimeline.vue'
import LoveLetter from './components/LoveLetter.vue'
import RingReveal from './components/RingReveal.vue'
import ClosingSection from './components/ClosingSection.vue'

gsap.registerPlugin(ScrollTrigger)

const unlocked = ref(false)
let lenis

onMounted(() => {
  lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
})

onBeforeUnmount(() => {
  lenis?.destroy()
})

watch(unlocked, async (val) => {
  if (val) {
    await nextTick()
    ScrollTrigger.refresh()
  }
})
</script>

<template>
  <CosmicBackground />
  <FloatingPetals />
  <PasswordGate v-if="!unlocked" @unlocked="unlocked = true" />
  <main v-else class="experience">
    <HeroSection />
    <TheDate />
    <StoryTimeline />
    <LoveLetter />
    <RingReveal />
    <ClosingSection />
  </main>
</template>

<style scoped>
.experience {
  width: 100%;
}
</style>
