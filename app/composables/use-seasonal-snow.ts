const storageKey = 'greytmove:snow';

export function useSeasonalSnow() {
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

    const month = new Intl.DateTimeFormat('en', { month: 'numeric', timeZone: 'Europe/Moscow' });
    snowEnabled.value = month.format(new Date()) === '12';
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'on' || saved === 'off') snowEnabled.value = saved === 'on';
    } catch {
      // The preference still works for the current visit when storage is blocked.
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
