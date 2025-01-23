<template>
    <div class="container-wrapper">
      <!-- Source Div -->
      <div
        class="source-div"
        @click="moveToTarget('source')"
      >
        <p>Source Div</p>
        <div v-if="sourceDivContent" class="small-box">
          {{ sourceDivContent.id }}
        </div>
        <p v-else>Empty Slot</p>
      </div>
  
      <!-- Target Div -->
      <div
        class="target-div"
        @click="moveToSource('target')"
      >
        <p>Target Div</p>
        <div v-if="targetDivContent" class="small-box">
          {{ targetDivContent.id }}
        </div>
        <p v-else>Empty Slot</p>
      </div>
  
      <!-- Smaller Divs (Available to move) -->
      <div class="small-divs">
        <p>Available Smaller Divs:</p>
        <div
          v-for="(box, index) in smallerDivs"
          :key="box.id"
          :class="['small-box', { selected: selectedBox === box.id }]"
          @click="selectSmallerDiv(box.id)"
        >
          {{ box.id }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref } from "vue";

interface SmallerDiv {
  id: string;
}

export default defineComponent({
  setup() {
    // Track the content of the source and target divs
    const sourceDivContent = ref<SmallerDiv | null>(null);
    const targetDivContent = ref<SmallerDiv | null>(null);

    // List of available smaller divs
    const smallerDivs = ref<SmallerDiv[]>([
      { id: "box1" },
      { id: "box2" },
      { id: "box3" },
    ]);

    // Track the currently selected smaller div
    const selectedBox = ref<string | null>(null);

    // Select a smaller div
    const selectSmallerDiv = (boxId: string) => {
      selectedBox.value = selectedBox.value === boxId ? null : boxId;
    };

    // Move selected smaller div to the target div
    const moveToTarget = (container: string) => {
      if (selectedBox.value) {
        const selectedDiv = smallerDivs.value.find((div) => div.id === selectedBox.value);
        
        if (selectedDiv) {
          // Move the selected div to the target (override if necessary)
          if (container === 'source') {
            sourceDivContent.value = selectedDiv;
            targetDivContent.value = null;
          } else {
            targetDivContent.value = selectedDiv;
            sourceDivContent.value = null;
          }
          selectedBox.value = null; // Deselect the smaller div after dropping
        }
      }
    };

    // Move selected smaller div to the source div
    const moveToSource = (container: string) => {
      if (selectedBox.value) {
        const selectedDiv = smallerDivs.value.find((div) => div.id === selectedBox.value);
        
        if (selectedDiv) {
          // Move the selected div to the source (override if necessary)
          if (container === 'target') {
            targetDivContent.value = selectedDiv;
            sourceDivContent.value = null;
          } else {
            sourceDivContent.value = selectedDiv;
            targetDivContent.value = null;
          }
          selectedBox.value = null; // Deselect the smaller div after dropping
        }
      }
    };

    return {
      sourceDivContent,
      targetDivContent,
      smallerDivs,
      selectedBox,
      selectSmallerDiv,
      moveToTarget,
      moveToSource,
    };
  },
});
</script>

  
<style scoped>
.container-wrapper {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.source-div, .target-div {
  border: 2px solid #ccc;
  padding: 20px;
  width: 200px;
  text-align: center;
}

.small-divs {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.small-box {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #000;
  cursor: pointer;
}

.small-box.selected {
  background-color: #5e8cad;
  color: white;
}
</style>
