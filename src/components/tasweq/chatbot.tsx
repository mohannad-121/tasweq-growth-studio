"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, MessageCircle, Minus, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useLanguage } from "./language-context";
import { answerFromKnowledge } from "@/chatbot/knowledge";

const quick = [{ ar:"أسعار إنستغرام",en:"Instagram prices"},{ar:"أسعار تيك توك",en:"TikTok prices"},{ar:"خدمات يوتيوب",en:"YouTube services"},{ar:"المنصات المتاحة",en:"Available platforms"},{ar:"كيف تعمل؟",en:"How it works"},{ar:"تواصل مع الدعم",en:"Contact support"}];
type ChatMessage={id:number;role:"user"|"assistant";text:string};

export function Chatbot(){
 const {locale}=useLanguage(); const ar=locale==="ar"; const [open,setOpen]=useState(false); const [minimized,setMinimized]=useState(false); const [input,setInput]=useState(""); const [typing,setTyping]=useState(false); const [messages,setMessages]=useState<ChatMessage[]>([{id:1,role:"assistant",text:ar?"أهلًا 👋 أنا مساعد تسويق. بقدر أساعدك بالأسعار، الخدمات والمنصات المتوفرة. شو حاب تعرف؟":"Hi 👋 I'm the Tasweq Assistant. I can help with services, platforms and pricing. What would you like to know?"}]);
 const send=(text:string)=>{const clean=text.trim();if(!clean||typing)return;setMessages(v=>[...v,{id:Date.now(),role:"user",text:clean}]);setInput("");setTyping(true);window.setTimeout(()=>{setMessages(v=>[...v,{id:Date.now()+1,role:"assistant",text:answerFromKnowledge(clean,locale)}]);setTyping(false)},650)};
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();send(input)};
 return <div className="chat-layer"><AnimatePresence>{open&&!minimized&&<motion.section className="chat-window" initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.97}} aria-label={ar?"مساعد تسويق":"Tasweq Assistant"}>
  <header className="chat-header"><div className="flex min-w-0 items-center gap-3"><span className="assistant-mark"><Bot/></span><div className="min-w-0"><strong className="block truncate">{ar?"مساعد تسويق":"Tasweq Assistant"}</strong><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className="status-dot"/>{ar?"مساعد محلي":"Local assistant"}</span></div></div><div className="flex"><Button variant="ghost" size="icon-sm" className="rounded-full" onClick={()=>setMinimized(true)} aria-label={ar?"تصغير":"Minimize"}><Minus/></Button><Button variant="ghost" size="icon-sm" className="rounded-full" onClick={()=>setOpen(false)} aria-label={ar?"إغلاق":"Close"}><X/></Button></div></header>
  <Conversation className="min-h-0"><ConversationContent className="gap-5 p-4">{messages.map(msg=><Message from={msg.role} key={msg.id} className={msg.role==="user"?"chat-user-message":""}><MessageContent><MessageResponse>{msg.text}</MessageResponse></MessageContent></Message>)}{typing&&<Message from="assistant"><MessageContent><Shimmer>{ar?"أبحث في خدمات تسويق...":"Checking Tasweq services..."}</Shimmer></MessageContent></Message>}<ConversationScrollButton/></ConversationContent></Conversation>
  <div className="quick-actions">{quick.slice(0,4).map(item=><button key={item.en} onClick={()=>send(item[locale])}>{item[locale]}</button>)}</div>
  <div className="border-t border-border p-3"><PromptInput onSubmit={submit} className="chat-prompt"><PromptInputTextarea value={input} onChange={e=>setInput(e.target.value)} placeholder={ar?"اسأل عن منصة أو سعر...":"Ask about a platform or price..."}/><PromptInputFooter className="justify-end"><PromptInputSubmit status={typing?"submitted":"ready"} disabled={!input.trim()||typing}/></PromptInputFooter></PromptInput></div>
 </motion.section>}</AnimatePresence>
 <Button variant="premium" className={`chat-launcher ${open?"is-open":""}`} onClick={()=>{setOpen(!open);setMinimized(false)}} aria-label={ar?"فتح مساعد تسويق":"Open Tasweq Assistant"}>{open?<X/>:<MessageCircle/>}<span>{ar?"اسأل تسويق":"Ask Tasweq"}</span></Button></div>
}
