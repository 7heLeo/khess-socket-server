const express = require("express");
const Socket = require("socket.io");
const PORT = 5000;

const app = express();
const server = require("http").createServer(app);

const io = Socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["room"],
  },
});

//const users = []; //NOT USED IN KHESS



io.on("connection", socket => {
	const room = socket.handshake.headers["room"];
	socket.join(room);
	socket.on("getRoomList", () => {
		var playerList=io.sockets.adapter.rooms.get(room);
		if(playerList.size==2){
			io.to(room).emit("players_ready");
		}
	});
	socket.on("khessMove", message => {
		io.to(room).emit("khessMove",message);
	});
	socket.on("khessSurrend", message => {
		io.to(room).emit("khessSurrend",message);
	});
/* //NOT USED IN KHESS
    socket.on("adduser", username => {
    socket.user = username;
    users.push(username);
    io.sockets.emit("users", users);

    io.to(socket.id).emit("private", {
      id: socket.id,
      name: socket.user,
      msg: "secret message",
    });
  });
*/
/* //NOT USED IN KHESS
  socket.on("message", message => {
    io.sockets.emit("message", {
      message,
      user: socket.user,
      id: socket.id,
    });
  });
*/
/* //NOT USED IN KHESS
  socket.on("pvt", message => {
	  json=JSON.parse(message);
    io.to(json.id).emit("message", {
      message:json.message,
      user: socket.user,
      id: socket.id,
    });
  });
*/

  socket.on("disconnect", () => {
/* //NOT USED IN KHESS
    console.log(`user ${socket.user} is disconnected`);
    if (socket.user) { 
      users.splice(users.indexOf(socket.user), 1);
      io.sockets.emit("user", users);
      console.log("remaining users:", users);
    }
*/
  });
});
app.get('/', (req, res) => {
    res.send("Server is up and running")
})
server.listen(PORT, () => {
  console.log("listening on PORT: ", PORT);
});