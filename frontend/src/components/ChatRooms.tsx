"use client";

import { ChatRoom, User } from "@/types/chat";
import { useState } from "react";

interface ChatRoomsProps {
  user: User;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatRooms({
  user,
  selectedRoomId,
  onSelectRoom,
}: ChatRoomsProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([
    { id: "1", name: "일반 채팅방", unreadCount: 0 },
    { id: "2", name: "게임 채팅방", unreadCount: 3 },
    { id: "3", name: "음악 채팅방", unreadCount: 1 },
  ]);

  const handleCreateRoom = () => {
    const newRoom: ChatRoom = {
      id: Math.random().toString(36).substring(2, 8),
      name: "새 채팅방",
      unreadCount: 0,
    };
    setRooms([...rooms, newRoom]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">채팅방 목록</h2>
        <button
          onClick={handleCreateRoom}
          className="mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          새 채팅방 만들기
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
              selectedRoomId === room.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onSelectRoom(room.id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{room.name}</span>
              {room.unreadCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {room.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
