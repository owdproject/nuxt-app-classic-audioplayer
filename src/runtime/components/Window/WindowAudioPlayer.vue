<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  window: IWindowController
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const audioSrc = ref<string | undefined>()
let objectUrl: string | undefined

const trackPath = computed(() => (props.window.meta?.path || props.window.meta?.url) as string | undefined)

function extractFilename(path?: string): string {
  if (!path) return ''
  try {
    const url = new URL(path)
    return url.pathname.split('/').filter(Boolean).pop() || path
  } catch {
    return path.split('/').filter(Boolean).pop() || path
  }
}

const title = computed(() => (props.window.meta?.title as string | undefined) || extractFilename(trackPath.value))

function revokeObjectUrl() {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
    objectUrl = undefined
  }
}

function loadAudioUrl(pathString?: string): string | undefined {
  revokeObjectUrl()

  if (!pathString) {
    return undefined
  }

  if (props.window.meta?.blob instanceof Blob) {
    objectUrl = URL.createObjectURL(props.window.meta.blob)
    return objectUrl
  }

  return pathString
}

async function applyTrack() {
  audioSrc.value = loadAudioUrl(trackPath.value)
  props.window.actions.setTitleOverride(title.value)

  await nextTick()
  const el = audioRef.value
  if (!el || !audioSrc.value) return

  el.load()
  if (props.window.meta?.autoplay) {
    try {
      await el.play()
    } catch {
      /* autoplay blocked or missing source */
    }
  }
}

watch(trackPath, () => {
  void applyTrack()
}, { immediate: true })

watch(
  () => props.window.meta?.autoplay,
  async (autoplay) => {
    const el = audioRef.value
    if (!el || !audioSrc.value) return
    if (autoplay) {
      try {
        await el.play()
      } catch {
        /* ignore */
      }
    } else {
      el.pause()
    }
  },
)

onBeforeUnmount(() => {
  revokeObjectUrl()
})
</script>

<template>
  <DesktopWindow :window="props.window" :content="{ padded: true }">
    <audio
      ref="audioRef"
      :key="trackPath ?? ''"
      :src="audioSrc"
      :controls="!props.window.meta?.noControls"
      :loop="Boolean(props.window.meta?.loop)"
      class="block w-full max-w-full"
    />
  </DesktopWindow>
</template>
