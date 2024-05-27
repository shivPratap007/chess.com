const express=require('express');
const socket=require("socket.io");
const http=require("http");
const {Chess}=require("chess.js");
const path=require("path");

const app=express();
const server=http.createServer(app);

const io=socket(server);

const chess=new Chess();

let players={};
let currentPlayer="W";
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    return res.render("index",{title:"Chess game"});
})

io.on("connection",(socket)=>{
    console.log("connected");
    if(!players.white){
        players.white=socket.id;
        socket.emit("playerRole","W");
    }else if(!players.black){
        players.black=socket.id;
        socket.emit("playerRole","B");
    }else{
        socket.emit("spectatorRole");
    }
    // socket.on('message', (data) => {
    //     console.log('Received message:', data);
        
    //     // Broadcast the message to all clients
    //     io.emit('message', data);
    // });
    socket.on('disconnect',()=>{
        if(socket.id==players.white){
            delete players.white;
        }
        else if(socket.id==players.black){
            delete players.left;
        }
    })

    socket.on("move",(move)=>{
        try{
            if(chess.turn()==="w" && socket.id!==players.white) return;
            if(chess.turn()==="b" && socket.id!==players.black) return;

            const result=chess.move(move);
            if(result){
                currentPlayer=chess.turn();
                io.emit("move",move);
                io.emit("boardState",chess.fen());
            }else{
                console.log("Invalid move");
                socket.emit("Invalidmove",move);
            }

        }catch(err){
            console.log(error);
            socket.emit("Invalid move",move);
        }
    })
})


server.listen(3000,()=>{
    console.log("Sever is listening on port 3000");
})