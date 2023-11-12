// const express = require("express");
// const fetch = require("node-fetch");
import express from "express";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

// 通过代理clash访问
const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
const app = express();
const PORT = 3000;

app.get("/getGoogleData", async (req, res) => {
  console.log("请求进入");
  try {
    const response = await fetch("https://www.google.com", {
      agent: proxyAgent,
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
