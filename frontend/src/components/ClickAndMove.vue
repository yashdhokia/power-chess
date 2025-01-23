<template>
    <div class="container">
      <!-- Source Boxes -->
      <div class="source-container">
        <div
          v-for="(box, index) in boxes"
          :key="index"
          class="box"
          :class="{ selected: selectedBox === index }"
          @click="selectBox(index)"
        >
          {{ box }}
        </div>
      </div>
  
      <!-- Target Areas -->
      <div class="target-container">
        <div
          v-for="(area, index) in targets"
          :key="index"
          class="target"
          @click="dropBox(index)"
        >
          {{ area || 'Drop Here' }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, reactive } from "vue";
  
  export default {
    setup() {
      const boxes = ref(["Box 1", "Box 2", "Box 3"]); // List of boxes
      const targets = reactive<string[]>(Array(3).fill("")); // Empty target slots
      const selectedBox = ref<number | null>(null); // Currently selected box
  
      // Select a box
      function selectBox(index: number) {
        selectedBox.value = index;
      }
  
      // Drop the box into a target
      function dropBox(targetIndex: number) {
        if (selectedBox.value !== null) {
          // Move the box to the target
          targets[targetIndex] = boxes.value[selectedBox.value];
  
          // Remove the box from the source
          boxes.value.splice(selectedBox.value, 1);
  
          // Clear the selection
          selectedBox.value = null;
        }
      }
  
      return {
        boxes,
        targets,
        selectedBox,
        selectBox,
        dropBox,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    gap: 20px;
  }
  
  .source-container,
  .target-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .box,
  .target {
    width: 100px;
    height: 50px;
    border: 1px solid #c23c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
  
  .box.selected {
    border-color: blue;
    background-color: #e0f75a;
  }
  
  .target {
    background-color: #f9f6;
  }
  
  .target:hover {
    background-color: #e037fa;
  }
  </style>
  