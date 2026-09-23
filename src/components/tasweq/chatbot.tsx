"use client";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, MessageCircle, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useLanguage } from "./language-context";
import { answerFromKnowledge } from "@/chatbot/knowledge";

const quick = [
  { ar: "أسعار المتابعين", en: "Followers prices" },
  { ar: "أسعار المشاهدات", en: "Views prices" },
  { ar: "أسعار اللايكات", en: "Likes prices" },
  { ar: "خدمات إنستغرام", en: "Instagram services" },
  { ar: "كيف أطلب الخدمة؟", en: "How do I request a service?" },
  { ar: "تواصل مع التسويق", en: "Contact Tasweq" },
  { ar: "كيف أبدأ؟", en: "How do I get started?" },
  { ar: "رابط إنستغرام", en: "Instagram link" },
];

const welcomeMessage = (locale: "ar" | "en") =>
  locale === "ar"
    ? `أهلًا بك في تسويق! 👋✨\n\nأنا مساعدك السريع لخدمات نمو إنستغرام 📈\nأقدر أساعدك في الأسعار، المتابعين 👥، المشاهدات ▶️، واللايكات ❤️\n\nاكتب سؤالك براحتك، أو جرّب: “كم سعر 10K متابع؟” أو “كيف أتواصل معكم؟” 💬\n\nحسابنا الرسمي: https://instagram.com/tasweq.net1 🔗`
    : `Welcome to Tasweq! 👋✨\n\nI’m your quick guide to Instagram growth services 📈\nI can help with prices, followers 👥, views ▶️, and likes ❤️\n\nAsk anything, or try: “What is the price of 10K followers?” or “How can I contact you?” 💬\n\nOfficial Instagram: https://instagram.com/tasweq.net1 🔗`;

type ChatMessage = { id: number; role: "user" | "assistant"; text: string };

export function Chatbot() {
  const { locale } = useLanguage();
  const ar = locale === "ar";
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: welcomeMessage(locale),
    },
  ]);
  useEffect(() => {
    const openChat = () => {
      setOpen(true);
      setMinimized(false);
    };
    window.addEventListener("tasweq:open-chat", openChat);
    return () => window.removeEventListener("tasweq:open-chat", openChat);
  }, []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((current) => [...current, { id: Date.now(), role: "user", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", text: answerFromKnowledge(clean, locale) },
      ]);
      setTyping(false);
    }, 650);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  return (
    <div className="chat-layer">
      <AnimatePresence>
        {open && !minimized && (
          <motion.section
            className="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            aria-label={ar ? "مساعد تسويق" : "Tasweq Assistant"}
          >
            <header className="chat-header">
              <div className="flex min-w-0 items-center gap-3">
                <span className="assistant-mark">
                  <Bot />
                </span>
                <div className="min-w-0">
                  <strong className="block truncate">
                    {ar ? "مساعد تسويق" : "Tasweq Assistant"}
                  </strong>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <i className="status-dot" />
                    {ar ? "مساعد محلي" : "Local assistant"}
                  </span>
                </div>
              </div>
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  onClick={() => setMinimized(true)}
                  aria-label={ar ? "تصغير" : "Minimize"}
                >
                  <Minus />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  onClick={() => setOpen(false)}
                  aria-label={ar ? "إغلاق" : "Close"}
                >
                  <X />
                </Button>
              </div>
            </header>

            <Conversation className="min-h-0">
              <ConversationContent className="gap-5 p-4">
                {messages.map((msg) => (
                  <Message
                    from={msg.role}
                    key={msg.id}
                    className={msg.role === "user" ? "chat-user-message" : ""}
                  >
                    <MessageContent>
                      <MessageResponse>{msg.text}</MessageResponse>
                    </MessageContent>
                  </Message>
                ))}
                {typing && (
                  <Message from="assistant">
                    <MessageContent>
                      <Shimmer>
                        {ar ? "أبحث في خدمات تسويق..." : "Checking Tasweq services..."}
                      </Shimmer>
                    </MessageContent>
                  </Message>
                )}
                <ConversationScrollButton />
              </ConversationContent>
            </Conversation>

            <div className="quick-actions">
              {quick.map((item) => (
                <button key={item.en} onClick={() => send(item[locale])}>
                  {item[locale]}
                </button>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <PromptInput onSubmit={submit} className="chat-prompt">
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={ar ? "اسأل عن سعر أو خدمة..." : "Ask about a price or service..."}
                />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit
                    status={typing ? "submitted" : "ready"}
                    disabled={!input.trim() || typing}
                  />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <Button
        variant="premium"
        className={`chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        aria-label={ar ? "فتح مساعد تسويق" : "Open Tasweq Assistant"}
      >
        {open ? <X /> : <MessageCircle />}
        <span>{ar ? "اسأل تسويق" : "Ask Tasweq"}</span>
      </Button>
    </div>
  );
}
