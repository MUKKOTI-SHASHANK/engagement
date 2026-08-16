<template>
  <div class="cosmic-bg">
    <div class="stars"></div>
  </div>
</template>

<style scoped>
.cosmic-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse at 50% 20%, #14182a 0%, #05060a 65%);
}

.stars {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      1px 1px at 12% 22%,
      rgba(255, 255, 255, 0.5),
      transparent
    ),
    radial-gradient(1px 1px at 68% 55%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1.5px 1.5px at 34% 78%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 88% 12%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 52% 40%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 8% 62%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 92% 70%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 24% 8%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 76% 88%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 44% 92%, rgba(255, 255, 255, 0.3), transparent);
  background-size: 100% 100%;
  animation: twinkle 7s ease-in-out infinite alternate;
  opacity: 0.7;
}

@keyframes twinkle {
  from {
    opacity: 0.45;
  }
  to {
    opacity: 0.9;
  }
}
</style>
