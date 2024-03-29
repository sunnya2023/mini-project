const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const { MongoClient } = require("mongodb");

let db;
const url =
  "mongodb+srv://sunny:admin1234@sunny.31klerr.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/news", (요청, 응답) => {
  db.collection("post").insertOne({ title: "duck" });
  // 응답.send("data");
});

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  // 응답.send(result[1].title);
  응답.render("list.ejs", { 글목록: result });
});

app.get("/time", (요청, 응답) => {
  응답.render("time.ejs", { date: new Date() });
});
