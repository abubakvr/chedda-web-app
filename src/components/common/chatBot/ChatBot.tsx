"use client";
import "@n8n/chat/style.css";

import { createChat } from "@n8n/chat";
import { useEffect } from "react";

export const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://chedda.app.n8n.cloud/webhook/7bc4e919-195e-4109-8663-35cecfe8a484/chat",
      initialMessages: [
        "Eyy, welcome to the Family! 👋🧀",
        "I'm Don Nathan, your consigliere in the world of DeFi. What can I help you with today?",
      ],
    });
  }, []);

  return null; // This component doesn't render anything
};
