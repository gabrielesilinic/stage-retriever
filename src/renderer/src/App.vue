<template>
  <div>
    <div
      v-for="stream in renderableStreams"
      :key="stream.displayId"
    >
      <StreamVisualizer
        v-show="stream.visible"
        :stream-id="stream.streamId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import StreamVisualizer from './components/StreamVisualizer.vue'

interface IStreamRenderableOptions {
  streamId: string;
  displayId: string;
  visible: boolean;
}

console.log({ ...window.api })

// get all screens
const displays = ref<Electron.Display[]>(window.api.getAvailableDisplays())
const mouseDisplay = ref<Electron.Display>(window.api.getMouseDisplay())

const allDisplaySources = computed(() => {
  const sources: Record<string, string> = {}
  displays.value.forEach((display) => {
    sources[display.id] = window.api.getDisplayStream(display.id)
  })
  return sources
})

const handleGlobalMouseMove = () => {
  const oldMouseDisplayId: number = mouseDisplay.value.id;
  const newMouseDisplay: Electron.Display = window.api.getMouseDisplay();
  if (oldMouseDisplayId !== newMouseDisplay.id) {
    mouseDisplay.value = newMouseDisplay;
  }
}
const renderableStreams = ref<IStreamRenderableOptions[]>([]);

const updateRenderableStreams = () => {
  // nextTick to ensure the DOM is updated before we update the renderableStreams
  window.requestAnimationFrame(() => {
    const streams: IStreamRenderableOptions[] = []
    // map through allDisplaySources, visible if the display is the mouse display
    Object.keys(allDisplaySources.value).forEach((displayId) => {
      streams.push({
        streamId: allDisplaySources.value[displayId],
        displayId,
        visible: displayId === mouseDisplay.value.id.toString(),
      })
    })
    renderableStreams.value = streams
  })
}

// watch for changes in the mouseDisplay and then call updateRenderableStreams
watch(mouseDisplay, updateRenderableStreams)


onMounted(() => {
  // Add a global mouse move event listener
  window.api.onGlobalMouseMove(handleGlobalMouseMove)
  updateRenderableStreams()
})

onUnmounted(() => {

})
</script>
