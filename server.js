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
        { role: "system", content: "你是一只可爱的猫咪" },
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
