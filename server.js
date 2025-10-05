import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body; // 获取前端传来的消息数组
  console.log("📥 Received request body:", req.body);

  try {
    const response = await fetch(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer sk-lflmdptqpdazclbludnanpjyzwjzeshvbcehpmmyfarqxxuh`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/QwQ-32B",
          messages: messages.slice(-10), // 保留最近 10 条对话
          max_tokens: 4096,
          temperature: 1.0,
          top_p: 1.0,
          stream: false,
        }),
      }
    );

    const data = await response.json();
    console.log("📤 API Response:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
