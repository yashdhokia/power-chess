<script setup lang="ts">
import { onMounted, ref } from "vue";
import { io, Socket } from "socket.io-client";
type ChessBoard = Record<string, null>;
type Piece = { square: string; piece: string | null };

const column = ref<string[]>(["8", "7", "6", "5", "4", "3", "2", "1"]);
const row = ref<string[]>(["a", "b", "c", "d", "e", "f", "g", "h"]);

const boxSelectedFlag = ref<boolean>(true);
const peiceInfo = ref<Piece>({ square: "", piece: null });
const chessMetric = ref<ChessBoard>({});

const k = ref<string>("src/assets/chessPieces/black_king.svg");
const K = ref<string>("src/assets/chessPieces/white_king.svg");
const q = ref<string>("src/assets/chessPieces/black_queen.svg");
const Q = ref<string>("src/assets/chessPieces/white_queen.svg");
const r = ref<string>("src/assets/chessPieces/black_rook.svg");
const R = ref<string>("src/assets/chessPieces/white_rook.svg");
const n = ref<string>("src/assets/chessPieces/black_knight.svg");
const N = ref<string>("src/assets/chessPieces/white_knight.svg");
const b = ref<string>("src/assets/chessPieces/black_bishop.svg");
const B = ref<string>("src/assets/chessPieces/white_bishop.svg");
const p = ref<string>("src/assets/chessPieces/black_pawn.svg");
const P = ref<string>("src/assets/chessPieces/white_pawn.svg");
const socket: Socket = io("http://localhost:3000");

// onMounted(() => {
//   socket.on("playerRole", (playerRole) => {
//     console.log(playerRole);
//   });
// });

setInitialBoard(chessMetric);
function setInitialBoard() {
  chessMetric.value.a1 = R.value;
  chessMetric.value.h1 = R.value;
  chessMetric.value.b1 = N.value;
  chessMetric.value.g1 = N.value;
  chessMetric.value.c1 = B.value;
  chessMetric.value.f1 = B.value;
  chessMetric.value.a8 = r.value;
  chessMetric.value.h8 = r.value;
  chessMetric.value.b8 = n.value;
  chessMetric.value.g8 = n.value;
  chessMetric.value.c8 = b.value;
  chessMetric.value.f8 = b.value;
  chessMetric.value.d1 = Q.value;
  chessMetric.value.e1 = K.value;
  chessMetric.value.d8 = q.value;
  chessMetric.value.e8 = k.value;

  chessMetric.value.a2 = P.value;
  chessMetric.value.b2 = P.value;
  chessMetric.value.c2 = P.value;
  chessMetric.value.d2 = P.value;
  chessMetric.value.e2 = P.value;
  chessMetric.value.f2 = P.value;
  chessMetric.value.g2 = P.value;
  chessMetric.value.h2 = P.value;

  chessMetric.value.a7 = p.value;
  chessMetric.value.b7 = p.value;
  chessMetric.value.c7 = p.value;
  chessMetric.value.d7 = p.value;
  chessMetric.value.e7 = p.value;
  chessMetric.value.f7 = p.value;
  chessMetric.value.g7 = p.value;
  chessMetric.value.h7 = p.value;
}
function startDrag(startSquare: string, pieceInfo: string) {
  peiceInfo.value.square = startSquare;
  peiceInfo.value.piece = pieceInfo;
}

function onDrop(targetSquare: string) {
    if (peiceInfo.value.square && peiceInfo.value.square !== targetSquare) {
      chessMetric.value[targetSquare] = peiceInfo.value.piece || ""; // Move the piece to the target
      chessMetric.value[peiceInfo.value.square] = ""; // Clear the starting square
    }
    // Reset dragged item
    peiceInfo.value = { square: "", piece: null };
}

function selectPiece(selectedPieceSquare: string, selectedPiece: string) {
  if (boxSelectedFlag) {
    peiceInfo.value.square = selectedPieceSquare;
    peiceInfo.value.piece = selectedPiece;
    boxSelectedFlag.value = !boxSelectedFlag.value;
  }
}

function dropPiece(droppedSquare: string) {
    if (boxSelectedFlag && peiceInfo.value.square !== droppedSquare) {
      chessMetric.value[droppedSquare] = peiceInfo.value.piece || ""; // Move the piece to the target
      chessMetric.value[peiceInfo.value.square] = "";
      boxSelectedFlag.value = !boxSelectedFlag.value;

      // Reset dragged item
      peiceInfo.value = { square: "", piece: null };
    }
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
        @click="dropPiece(row + col)"
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
          @click="selectPiece(row + col, chessMetric[row + col])"
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
