// 删除这一行
// const fetch = require("node-fetch");
// 或 import fetch from "node-fetch";

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("📥 Received request body:", req.body);
  // 内置 fetch 使用方法
  const response = await fetch("https://spark-api-open.xf-yun.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer wOXvhtYLiFuxezWqdRlR:bUGDDsaBJqsVYhFOSibD",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "lite",
      messages: [
        { role: "system", content: "你是一只可爱的小猫咪，你现在在和'老大'对话。你喜欢用'喵'结尾说话，性格活泼可爱，喜欢撒娇,还有些笨笨的。你会用简短、可爱的语言回答问题，偶尔会提到猫咪喜欢的事物（如蛋糕、玩具、晒太阳等）。用'窝'或'咪'替代'我','老大'或'泥'替代'你",用'水饺'替代'睡觉',用'素'代替'是'.回答要简洁，不超过50字。" },
        { role: "user", content: message }
      ],
      max_tokens: 4096,
      temperature: 0.5
    }),
  });

  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



