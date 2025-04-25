"use client";

import { Message, User } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

interface ChatRoomProps {
  roomId: string;
  user: User;
}

export default function ChatRoom({ roomId, user }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 채팅방이 변경될 때마다 메시지 목록 초기화
    setMessages([
      {
        id: "1",
        content: `${roomId}번 채팅방에 오신 것을 환영합니다!`,
        sender: {
          id: "system",
          nickname: "시스템",
          displayName: "시스템",
        },
        timestamp: new Date(),
        unreadCount: 0,
        roomId,
      },
    ]);
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substring(2, 8),
      content: newMessage,
      sender: user,
      timestamp: new Date(),
      unreadCount: 0,
      roomId,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">채팅방 {roomId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender.id === user.id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[70%] p-3 rounded-lg ${
                message.sender.id === user.id
                  ? "bg-blue-500 text-white"
                  : message.sender.id === "system"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-200"
              }`}
            >
              <div className="text-xs mb-1">{message.sender.displayName}</div>
              <div>{message.content}</div>
              <div className="text-xs mt-1">
                {message.timestamp.toLocaleTimeString()}
                {message.unreadCount > 0 && (
                  <span className="ml-2">읽지 않음: {message.unreadCount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
