export interface User {
  id: string;
  nickname: string;
  displayName: string; // nickname + (id)
}

export interface ChatRoom {
  id: string;
  name: string;
  unreadCount: number;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  unreadCount: number;
  roomId: string;
}
