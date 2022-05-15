const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

client.set("number", 0);

app.get("/", (req, res) => {
  client.get("number", (err, number) => {
    res.send(`숫자가 1씩 올라갑니다. 숫자: ${number}`);
    client.set("number", number * 1 + 1); // client get 시에 레디스에서 value를 string으로 반환하기 때문에 숫자로 변환해주는 것
  });
});

app.listen(8080, () => {
  console.log("서버 가동");
});
