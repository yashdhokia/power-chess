<script setup lang="ts">
import { ref } from "vue";
import socket from "../../plugins/socket.js";
import { io } from "socket.io-client";
const column = ref<string[]>(["8", "7", "6", "5", "4", "3", "2", "1"]);
const row = ref<string[]>(["a", "b", "c", "d", "e", "f", "g", "h"]);
const blackKing = ref<string>("src/assets/chessPieces/black_king.svg");
const whiteKing = ref<string>("src/assets/chessPieces/white_king.svg");
const blackQueen = ref<string>("src/assets/chessPieces/black_queen.svg");
const whiteQueen = ref<string>("src/assets/chessPieces/white_queen.svg");
const blackRook = ref<string>("src/assets/chessPieces/black_rook.svg");
const whiteRook = ref<string>("src/assets/chessPieces/white_rook.svg");
const blackKnight = ref<string>("src/assets/chessPieces/black_knight.svg");
const whiteKnight = ref<string>("src/assets/chessPieces/white_knight.svg");
const blackBishop = ref<string>("src/assets/chessPieces/black_bishop.svg");
const whiteBishop = ref<string>("src/assets/chessPieces/white_bishop.svg");
const blackPawn = ref<string>("src/assets/chessPieces/black_pawn.svg");
const whitePawn = ref<string>("src/assets/chessPieces/white_pawn.svg");
function setPeice(row: string, col: string){
    const colNumber:number = Number(col);
    if(colNumber === 2) 
        return whitePawn.value;
    else if(colNumber === 7)
        return blackPawn.value;
    const index = row+col;
    if(index === 'a1' || index === 'h1')
        return whiteRook.value;
    if(index === 'b1' || index === 'g1')
        return whiteKnight.value;
    if(index === 'c1' || index === 'f1')
        return whiteBishop.value;
    if(index === 'a8' || index === 'h8')
        return blackRook.value;
    if(index === 'b8' || index === 'g8')
        return blackKnight.value;
    if(index === 'c8' || index === 'f8')
        return blackBishop.value;
    if(index === 'd1')
        return whiteQueen.value;
    if(index === 'e1')
        return whiteKing.value;
    if(index === 'd8')
        return blackQueen.value;
    if(index === 'e8')
        return blackKing.value;
    return
}
const startDrag = (event) => {
  console.log('==============>'); 
}
const onDrop = (event) => {

}
socket.on('playerRole', (playerRole) => console.log(playerRole));

</script>

<template>
  <div class="chessboard">
    <div v-for="(col, colIndex) in column" :key="col + colIndex" class="cell">
      <div
        v-for="(row, rowIndex) in row"
        :key="col+row"
        :id="col+row"
        :class="['row', (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black']"
        :style="{color:(rowIndex + colIndex) % 2 === 0 ? '#5e8cad' : '#fff'}"
        @drop="onDrop($event)"
        @dropenter.prevent
        @dropover.prevent
      >
          <div v-if="row === 'a'" :class="['col-label']">
            {{ col }}
          </div>
          <div v-if="col === '1'" :class="['row-label']">
            {{ row }}
          </div>
          <img :src="setPeice(row,col)" :draggable="true" @dragstart="startDrag($event)"/>
          
      </div>
    </div>
  </div>
</template>

<style scoped>
.chessboard {
  display: flex;
  flex-direction: column;
  width: 700px; /* Adjust size */
  /* height: 390px; */
  color:black;
  font-size: 100%;
  font-weight: bold;
}

.cell {
  display: flex;
  flex: 1;
}

.row {
    position: relative;
    display: flex;
  flex: 1;
  aspect-ratio: 1; /* Make cells square */
}

.white {
  background-color: #fff;
}

.black {
  background-color: #5e8cad;
}

.col-label {
    position: absolute;
  justify-self: flex-start;
  /* opacity: 0.4; */
  margin-right: 5%;
  margin-left:5%;
}

.row-label {
    position: absolute;
    align-self: flex-end;
  /* opacity: 0.4; */
  right: 5%;
}

</style>
