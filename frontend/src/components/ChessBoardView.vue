<script setup lang="ts">
import { onMounted, ref } from "vue";
import socket from "../../plugins/socket.js";
const column = ref<string[]>(["8", "7", "6", "5", "4", "3", "2", "1"]);
const row = ref<string[]>(["a", "b", "c", "d", "e", "f", "g", "h"]);
type DraggedItem = { square: string; piece: string | null };
const draggedItem = ref<DraggedItem>({ square: "", piece: null });
const sourceContainer = ref<string>([]);
type ChessBoard = Record<string, null>;
const chessMetric = ref<ChessBoard>({});
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

  setInitialBoard(chessMetric);

function setInitialBoard() {
  chessMetric.value.a1 = whiteRook.value;
  chessMetric.value.h1 = whiteRook.value;
  chessMetric.value.b1 = whiteKnight.value;
  chessMetric.value.g1 = whiteKnight.value;
  chessMetric.value.c1 = whiteBishop.value;
  chessMetric.value.f1 = whiteBishop.value;
  chessMetric.value.a8 = blackRook.value;
  chessMetric.value.h8 = blackRook.value;
  chessMetric.value.b8 = blackKnight.value;
  chessMetric.value.g8 = blackKnight.value;
  chessMetric.value.c8 = blackBishop.value;
  chessMetric.value.f8 = blackBishop.value;
  chessMetric.value.d1 = whiteQueen.value;
  chessMetric.value.e1 = whiteKing.value;
  chessMetric.value.d8 = blackQueen.value;
  chessMetric.value.e8 = blackKing.value;

  chessMetric.value.a2 = whitePawn.value;
  chessMetric.value.b2 = whitePawn.value;
  chessMetric.value.c2 = whitePawn.value;
  chessMetric.value.d2 = whitePawn.value;
  chessMetric.value.e2 = whitePawn.value;
  chessMetric.value.f2 = whitePawn.value;
  chessMetric.value.g2 = whitePawn.value;
  chessMetric.value.h2 = whitePawn.value;

  chessMetric.value.a7 = blackPawn.value;
  chessMetric.value.b7 = blackPawn.value;
  chessMetric.value.c7 = blackPawn.value;
  chessMetric.value.d7 = blackPawn.value;
  chessMetric.value.e7 = blackPawn.value;
  chessMetric.value.f7 = blackPawn.value;
  chessMetric.value.g7 = blackPawn.value;
  chessMetric.value.h7 = blackPawn.value;
}
function startDrag(startSquare: string, pieceInfo: string) {
  draggedItem.value.square = startSquare;
  draggedItem.value.piece = pieceInfo;
}

function onDrop(targetSquare: string) {
  if (draggedItem.value.square && draggedItem.value.square !== targetSquare) {
    chessMetric.value[targetSquare] = draggedItem.value.piece || ""; // Move the piece to the target
    chessMetric.value[draggedItem.value.square] = ""; // Clear the starting square
  }

  // Reset dragged item
  draggedItem.value = { square: "", piece: null };
}
</script>

<template>
  <div class="chessboard">
    <div v-for="(col, colIndex) in column" :key="col + colIndex" class="cell">
      <div
        v-for="(row, rowIndex) in row"
        :key="col + row"
        :id="col + row"
        :class="['row', (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black']"
        :style="{ color: (rowIndex + colIndex) % 2 === 0 ? '#5e8cad' : '#fff' }"
        @dragover.prevent
        @drop="onDrop(row + col)"
      >
        <div v-if="row === 'a'" :class="['col-label']">
          {{ col }}
        </div>
        <div v-if="col === '1'" :class="['row-label']">
          {{ row }}
        </div>
        <img
          :src="chessMetric[row + col]"
          :draggable="true"
          @dragstart="startDrag(row + col, chessMetric[row + col])"
        />
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
  color: black;
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
  margin-left: 5%;
}

.row-label {
  position: absolute;
  align-self: flex-end;
  /* opacity: 0.4; */
  right: 5%;
}
</style>
