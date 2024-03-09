<template>
  <video
    ref="videoElement"
    autoplay
    muted
    style="max-width: 100%;max-height: 100%;"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
const videoElement = ref<HTMLVideoElement>(null!);
const props = defineProps({
  streamId: {
    type: String,
    required: true,
  },
})
const mediaInit = async () => {
  
  const videoSettings: object = {
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: props.streamId,
      },
    },
  };
  const stream = await navigator.mediaDevices.getUserMedia(videoSettings)
  if(!videoElement.value) {
      console.error('videoElement is null')
      return
    }
    // set the src object
    videoElement.value.srcObject = stream
};
onMounted(() => {
  mediaInit()
})

onUnmounted(() => {
  // stop the stream
  const stream = videoElement.value.srcObject as MediaStream
  stream.getTracks().forEach((track) => {
    track.stop()
  })
})

watch(() => props.streamId, () => {
  mediaInit()
})
</script>

<style scoped>

</style>