"use client";

import ChatRoom from "@/components/ChatRoom";
import ChatRooms from "@/components/ChatRooms";
import { User } from "@/types/chat";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleLogin = (nickname: string) => {
    const id = Math.random().toString(36).substring(2, 8);
    setUser({
      id,
      nickname,
      displayName: `${nickname}(${id})`,
    });
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">채팅방 입장</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const nickname = formData.get("nickname") as string;
              handleLogin(nickname);
            }}
          >
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              입장하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatRooms
          user={user}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
        />
      </div>
      <div className="w-3/4">
        {selectedRoomId ? (
          <ChatRoom roomId={selectedRoomId} user={user} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">채팅방을 선택해주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
