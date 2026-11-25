const storageKey = 'greytmove:snow';

export function useSnow() {
  const snowEnabled = ref(false);
  const reducedMotion = ref(false);
  const snowActive = computed(() => snowEnabled.value && !reducedMotion.value);
  let motionPreference: MediaQueryList | undefined;

  function updateMotionPreference(event: MediaQueryListEvent) {
    reducedMotion.value = event.matches;
  }

  onMounted(() => {
    motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.value = motionPreference.matches;
    motionPreference.addEventListener('change', updateMotionPreference);

    try {
      snowEnabled.value = localStorage.getItem(storageKey) !== 'off';
    } catch {
      snowEnabled.value = true;
    }
  });

  onBeforeUnmount(() => {
    motionPreference?.removeEventListener('change', updateMotionPreference);
  });

  function setSnowEnabled(enabled: boolean) {
    snowEnabled.value = enabled;
    try {
      localStorage.setItem(storageKey, enabled ? 'on' : 'off');
    } catch {
      // The preference is already applied in memory.
    }
  }

  return { snowActive, reducedMotion, setSnowEnabled };
}
