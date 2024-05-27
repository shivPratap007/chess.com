const socket = io();
const chess=new Chess();
const boardElement=document.querySelector(".chessboard");

let dragPiece=null;
let sourceSquare=null;
let playerRole=null;

const renderBoard=()=>{
    const board=chess.board();
    boardElement.innerHTML="";
    board.forEach((row,rowIndex)=>{
        row.forEach((square,squareIndex)=>{
            const squareElement=document.createElement("div");
            squareElement.classList.add("square",(rowIndex+memberIndex)%2==0 ? "light":"dark")

            squareElement.dataset.row=rowIndex;
            squareElement.dataset.col=squareIndex;

            if
        })
    })
    
}

const handleMove=()=>{

}


const getPiecesUnicode=()=>{

}

renderBoard();

