const express = require('express');
const messageRoute = express.Router();
require("dotenv").config()
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Your API key
const apiKey = process.env.TestKey1;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Make sure express can parse JSON request bodies
messageRoute.use(express.json());

messageRoute.post('/api/Question', (req, res) => {
  const { Question } = req.body; // Extract 'Question' from the request body
  const chatSession = model.startChat({ generationConfig, history: [] });

  async function Datasend() {
    try {
      const result = await chatSession.sendMessage(Question+ "Also write the question at the top too"); // Send the question text
      res.json({ response: result.response }); // Send response back to the client
    } catch (error) {
      console.error('Error in Datasend:', error);
      res.status(500).send('Error in processing the request');
    }
  }

  Datasend();
});

module.exports = messageRoute;
