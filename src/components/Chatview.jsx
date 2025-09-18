import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MessageBubble from "./MessageBubble";
import { BsArrowUpCircleFill } from "react-icons/bs";


function Chatview ({navOpened, showChatview}) {
    const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Initialize Gemini client correctly
  // ISSUE: Hardcoded key + wrong SDK usage caused "not connected" errors.
  // FIX: Read from Vite env if present, else fall back to provided key.
  const apiKey = import.meta.env?.VITE_GENAI_API_KEY || "AIzaSyAlH-BHXbjHo6H0lhOL1VoApG872djraFU";
  const genAI = new GoogleGenerativeAI(apiKey);
  // The correct way is to get a model instance first, then call generateContent
  // NOTE: Using a widely-available model for stability.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Clear input

    try {
      // Correct SDK call: pass a string prompt or contents[]
      const result = await model.generateContent(input);
      const botText = result?.response?.text?.() || "(No response)";
      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Commented explanation for common browser issues:
      // - Invalid API key or missing billing → 401/403
      // - Ad-blockers or CORS can block requests in the browser
      console.error("Gemini API Error:", error);
      const errorMsg = { sender: "bot", text: "⚠️ Error connecting to AI. Check API key and network." };
      setMessages((prev) => [...prev, errorMsg]);
    }
    };

    return (
        <>
        <div className={`flex-1 w-[100%] relative h-screen md:flex flex-col justify-center items-center overflow-hidden md:border-1 md:border-stroke md:h-[100%] md:rounded-xl md:p-4 p-2 transition-colors duration-500 ease-in-out ${!showChatview && 'hidden'}`}>
            <div className="flex md:w-[60%] absolute top-0 bottom-[17vh] items-bottom pt-5 mx-auto justify-center">
                <div className="flex-1 overflow-y-scroll no-scrollbar space-y-8 mb-2">
                {messages.map((msg, idx) => (
                <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
                ))}
                </div>
            </div>

            <div className="flex gap-2 border-1 md:w-[60%] border-stroke w-[95%] absolute left-[50%] -translate-x-[50%] md:p-4 md:px-5 p-2 pl-3 bg-inputbg rounded-4xl bottom-[6vh]">
                <input
                type="text"
                className="flex-1 text-hue focus:outline-0 p-2 rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                />
                <button
                onClick={sendMessage}
                className="text-white rounded"
                >
                <BsArrowUpCircleFill className="text-4xl text-hue active:scale-95 cursor-pointer"/>
                </button>
            </div>
        </div>
        </>
    );
}

export default Chatview;