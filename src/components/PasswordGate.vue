<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { config } from '../config.js'

const emit = defineEmits(['unlocked'])

const input = ref('')
const error = ref(false)
const gateEl = ref(null)
const cardEl = ref(null)

function submit() {
  if (input.value.trim() === config.password) {
    error.value = false
    const tl = gsap.timeline({
      onComplete: () => emit('unlocked'),
    })
    tl.to(cardEl.value, {
      scale: 1.06,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }).to(
      gateEl.value,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.inOut',
      },
      '-=0.2'
    )
  } else {
    error.value = true
    gsap.fromTo(
      cardEl.value,
      { x: -10 },
      { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
    )
  }
}

onMounted(() => {
  gsap.from(cardEl.value, {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2,
  })
})
</script>

<template>
  <div class="gate" ref="gateEl">
    <div class="stars"></div>
    <div class="card" ref="cardEl">
      <svg class="ring-icon" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="58" r="28" stroke="url(#g)" stroke-width="3" />
        <path
          d="M50 30 L38 12 H62 L50 30 Z"
          fill="url(#g)"
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0" stop-color="#f3ecdf" />
            <stop offset="1" stop-color="#c9a86a" />
          </linearGradient>
        </defs>
      </svg>

      <p class="label">A moment, just for you</p>
      <h1 class="display title">This door only opens for one person</h1>

      <form @submit.prevent="submit">
        <input
          v-model="input"
          type="text"
          inputmode="numeric"
          placeholder="ddmmyyyy"
          autocomplete="off"
          :class="{ error }"
        />
        <button type="submit">Unlock</button>
      </form>

      <p class="hint" :class="{ show: error }">
        Not quite — try the date that changed everything.
      </p>
    </div>
  </div>
</template>

<style scoped>
.gate {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 30%, #14182a 0%, #05060a 70%);
  z-index: 100;
  overflow: hidden;
}

.stars {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      1px 1px at 20% 30%,
      rgba(255, 255, 255, 0.5),
      transparent
    ),
    radial-gradient(1px 1px at 70% 60%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1.5px 1.5px at 40% 80%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 90% 15%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 55% 45%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 10% 65%, rgba(255, 255, 255, 0.4), transparent);
  background-size: 100% 100%;
  animation: twinkle 6s ease-in-out infinite alternate;
  opacity: 0.8;
}

@keyframes twinkle {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.card {
  position: relative;
  z-index: 1;
  max-width: 480px;
  width: 90%;
  padding: 3rem 2.5rem;
  text-align: center;
  background: rgba(12, 15, 24, 0.6);
  border: 1px solid var(--line);
  border-radius: 4px;
  backdrop-filter: blur(6px);
}

.ring-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 1.25rem;
}

.title {
  font-size: 1.7rem;
  color: var(--cream);
  margin: 0.75rem 0 2rem;
  line-height: 1.4;
}

form {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--line);
  color: var(--cream);
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-align: center;
  padding: 0.6rem 0.4rem;
  width: 180px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: var(--gold);
}

input.error {
  border-color: #c96a6a;
}

button {
  background: transparent;
  border: 1px solid var(--gold-soft);
  color: var(--gold);
  padding: 0.6rem 1.4rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background: var(--gold);
  color: var(--bg-deep);
}

.hint {
  margin-top: 1.25rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.78rem;
  color: #c96a6a;
  opacity: 0;
  transition: opacity 0.3s;
  height: 1em;
}

.hint.show {
  opacity: 0.85;
}
</style>
