<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { config } from '../config.js'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)

onMounted(() => {
  gsap.from(sectionEl.value.querySelectorAll('.reveal'), {
    opacity: 0,
    y: 20,
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 75%',
    },
  })
})
</script>

<template>
  <section class="closing" ref="sectionEl">
    <p class="label reveal">{{ config.yourName }} &amp; {{ config.herName }}</p>
    <h2 class="display reveal">{{ config.closingMessage }}</h2>
    <p class="signoff reveal">Until the miles disappear for good.</p>
  </section>
</template>

<style scoped>
.closing {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: transparent;
  padding: 5rem 1.5rem 6rem;
}

.closing h2 {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  max-width: 20ch;
  color: var(--cream);
  margin: 1rem 0;
  font-style: italic;
}

.signoff {
  font-size: 1rem;
  color: var(--cream-dim);
  letter-spacing: 0.05em;
}
</style>
