<script setup lang="ts">
import { onMounted, ref } from "vue";
import { io, Socket } from "socket.io-client";
import { ChessPeice } from "../models/ChessPeice";
interface ChessBoard {
  [key: string]: ChessPeice | null; // Ensure keys map to `string | null`
}
type Move = { from: string; to: string };

const column = ref<string[]>(["8", "7", "6", "5", "4", "3", "2", "1"]);
const row = ref<string[]>(["a", "b", "c", "d", "e", "f", "g", "h"]);

const color = ref<string | null>("");
const moveInfo = ref<Move>({ from: "", to: "" });
const peiceInfo = ref<string>('');
const chessMetric = ref<ChessBoard>({});
const currentTurn = ref<string>();

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

onMounted(() => {
  socket.on("playerRole", (playerRole) => {
    console.log(playerRole);
    color.value = playerRole;
  });
});
setInitialBoard(chessMetric);
function setInitialBoard(chessMetric) {
  chessMetric.value.a1 = new ChessPeice(R.value, 'w', 'R');
  chessMetric.value.h1 = new ChessPeice(R.value, 'w', 'R')
  chessMetric.value.b1 = new ChessPeice(N.value, 'w', 'N');
  chessMetric.value.g1 = new ChessPeice(N.value, 'w', 'N');
  chessMetric.value.c1 = new ChessPeice(B.value, 'w', 'B');
  chessMetric.value.f1 = new ChessPeice(B.value, 'w', 'B');
  chessMetric.value.a8 = new ChessPeice(r.value, 'b', 'r');
  chessMetric.value.h8 = new ChessPeice(r.value, 'b', 'r');
  chessMetric.value.b8 = new ChessPeice(n.value, 'b', 'n');
  chessMetric.value.g8 = new ChessPeice(n.value, 'b', 'n');
  chessMetric.value.c8 = new ChessPeice(b.value, 'b', 'b');
  chessMetric.value.f8 = new ChessPeice(b.value, 'b', 'b');
  chessMetric.value.d1 = new ChessPeice(Q.value, 'w', 'Q');
  chessMetric.value.e1 = new ChessPeice(K.value, 'w', 'K');
  chessMetric.value.d8 = new ChessPeice(q.value, 'b', 'q');
  chessMetric.value.e8 = new ChessPeice(k.value, 'b', 'k');

  chessMetric.value.a2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.c2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.b2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.d2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.e2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.f2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.g2 = new ChessPeice(P.value, 'w', 'P');
  chessMetric.value.h2 = new ChessPeice(P.value, 'w', 'P');

  chessMetric.value.a7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.b7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.c7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.d7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.e7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.f7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.g7 = new ChessPeice(p.value, 'b', 'p');
  chessMetric.value.h7 = new ChessPeice(p.value, 'b', 'p');
}

socket.on("move", (move,result) => {
  chessMetric.value[move.to] = chessMetric.value[move.from];
  chessMetric.value[move.from] = null;
  currentTurn.value = (result.color =='b') ? 'w' : 'b';
  console.log('=============',result)
});

function startDrag(startSquare: string) {
  peiceInfo.value = startSquare;
}

function onDrop(targetSquare: string) {
  moveInfo.value.from = peiceInfo.value ?? "";
  moveInfo.value.to = targetSquare;
  peiceInfo.value = '';
  socket.emit("move", moveInfo.value);
}

const selectPiece = (startSquare: string) => {
  console.log("============== select peice",peiceInfo.value);
  if(peiceInfo.value === ''){
    console.log("started");
    peiceInfo.value = startSquare;
  }
}

const dropPiece = (targetSquare: string) => {
  console.log("============== drop peice",peiceInfo.value);
  if(peiceInfo.value !== ''){
  console.log("end");
  moveInfo.value.from = peiceInfo.value ?? "";
  moveInfo.value.to = targetSquare;
  peiceInfo.value = '';
  socket.emit("move", moveInfo.value);
  }
}

</script>

<template>
  <div
    class="chessboard"
    :style="{
      transform: color === 'b' ? 'rotate(180deg)' : '',
    }"
  >
    <div v-for="(col, colIndex) in column" :key="col + colIndex" class="cell">
      <div
        v-for="(row, rowIndex) in row"
        :key="col + row"
        :id="col + row"
        :class="['row', (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black']"
        :style="{
          color: (rowIndex + colIndex) % 2 === 0 ? '#5e8cad' : '#fff',
          transform: color === 'b' ? 'rotate(180deg)' : '',

        }"
        @dragover.prevent
        @drop="onDrop(row + col)"
        @click.stop="dropPiece(row + col)"
      >
        <div
          v-if="
            (row === 'a' && color === 'w') || (row === 'h' && color === 'b')
          "
          :class="['col-label']"
        >
          {{ col }}
        </div>
        <div
          v-if="
            (col === '1' && color === 'w') || (col === '8' && color === 'b')
          "
          :class="['row-label']"
        >
          {{ row }}
        </div>
        <img
          :src="chessMetric[row + col]?.img"
          :draggable="chessMetric[row + col]?.color == color"
          @dragstart="startDrag(row + col)"
          @click.stop="selectPiece(row + col)"
          @click="dropPiece(row + col)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chessboard {
  display: flex;
  flex-direction: column;
  width: 700px;
  /* Adjust size */
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
  aspect-ratio: 1;
  /* Make cells square */
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
