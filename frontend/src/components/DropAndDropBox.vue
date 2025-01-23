<template>
    <div class="drag-drop-container">
      <!-- Source Container -->
      <div
        class="container"
        @dragover.prevent
        @drop="onDrop('source')"
      >
        <h3>Source</h3>
        <img
          v-for="(img, index) in sourceImages"
          :key="index"
          :src="img"
          class="draggable-img"
          :draggable="true"
          @dragstart="startDrag(img, 'source', index)"
        />
      </div>
  
      <!-- Target Container -->
      <div
        class="container"
        @dragover.prevent
        @drop="onDrop('target')"
      >
        <h3>Target</h3>
        <img
          v-for="(img, index) in targetImages"
          :key="index"
          :src="img"
          class="draggable-img"
          :draggable="true"
          @dragstart="startDrag(img, 'target', index)"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from "vue";
  
  export default {
    setup() {
      // Reactive arrays for images in source and target containers
      const sourceImages = ref<string[]>([
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/150",
      ]);
      const targetImages = ref<string[]>([]);
  
      // State for currently dragged item
      const draggedItem = ref<{ img: string; from: string; index: number } | null>(
        null
      );
  
      // Start dragging
      function startDrag(img: string, from: string, index: number) {
        draggedItem.value = { img, from, index };
      }
  
      // Handle drop
      function onDrop(target: string) {
        if (draggedItem.value) {
          const { img, from, index } = draggedItem.value;
  
          // Remove the image from the source container
          if (from === "source") {
            sourceImages.value.splice(index, 1);
          } else if (from === "target") {
            targetImages.value.splice(index, 1);
          }
  
          // Add the image to the target container
          if (target === "source") {
            sourceImages.value.push(img);
          } else if (target === "target") {
            targetImages.value.push(img);
          }
  
          // Clear dragged item state
          draggedItem.value = null;
        }
      }
  
      return {
        sourceImages,
        targetImages,
        startDrag,
        onDrop,
      };
    },
  };
  </script>
  
  <style scoped>
  .drag-drop-container {
    display: flex;
    gap: 20px;
  }
  
  .container {
    width: 200px;
    min-height: 300px;
    border: 2px dashed #ce1010;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    background-color: #f9f9f9;
  }
  
  .draggable-img {
    width: 100px;
    height: 100px;
    margin: 10px;
    cursor: grab;
  }
  </style>
  