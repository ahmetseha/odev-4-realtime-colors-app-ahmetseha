const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
let port= process.env.PORT||3000;

app.get("/", (req, res) => {
  res.end("Color-Picker");
});

io.on("connection", (socket) => {
  console.log("an user connected!");

  socket.on("send-color", (color) => {
    console.log("backend", color);
    socket.broadcast.emit("recieve-color", color);
  });
 // socket.on("disconnect", () => console.log("a user disconnected"));
});

http.listen(port, () => {
  console.log('listening on *:3000');
});
