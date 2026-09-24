"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";

type Message = {
  id: string;
  sender: "HOST" | "GUEST";
  text: string;
  time: string;
  read?: boolean;
};

type Conversation = {
  id: string;
  guest: string;
  property: string;
  initials: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  bookingStatus: "CONFIRMED" | "PENDING";
  checkIn: string;
  checkOut: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: "conversation-1",
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    initials: "AS",
    lastMessage: "Hi, is early check-in possible?",
    lastTime: "10:42 AM",
    unread: 2,
    bookingStatus: "CONFIRMED",
    checkIn: "18 Oct",
    checkOut: "21 Oct",
    messages: [
      {
        id: "m1",
        sender: "GUEST",
        text: "Hi! I have a booking at The Heritage Courtyard.",
        time: "10:32 AM",
        read: true,
      },
      {
        id: "m2",
        sender: "GUEST",
        text: "Is early check-in possible?",
        time: "10:42 AM",
        read: true,
      },
      {
        id: "m3",
        sender: "HOST",
        text: "Hi Aarav, yes. What time are you planning to arrive?",
        time: "10:46 AM",
        read: true,
      },
    ],
  },
  {
    id: "conversation-2",
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    initials: "RM",
    lastMessage: "Can we add one more guest?",
    lastTime: "Yesterday",
    unread: 1,
    bookingStatus: "CONFIRMED",
    checkIn: "24 Oct",
    checkOut: "27 Oct",
    messages: [
      {
        id: "m4",
        sender: "GUEST",
        text: "Hello! I wanted to confirm something about my stay.",
        time: "Yesterday",
        read: true,
      },
      {
        id: "m5",
        sender: "GUEST",
        text: "Can we add one more guest?",
        time: "Yesterday",
        read: false,
      },
    ],
  },
  {
    id: "conversation-3",
    guest: "Kabir Singh",
    property: "The Quiet House",
    initials: "KS",
    lastMessage: "Thank you for the information.",
    lastTime: "20 Sep",
    unread: 0,
    bookingStatus: "PENDING",
    checkIn: "05 Nov",
    checkOut: "08 Nov",
    messages: [
      {
        id: "m6",
        sender: "GUEST",
        text: "Is the property available for five people?",
        time: "20 Sep",
        read: true,
      },
      {
        id: "m7",
        sender: "HOST",
        text: "Yes, the property can accommodate five guests.",
        time: "20 Sep",
        read: true,
      },
      {
        id: "m8",
        sender: "GUEST",
        text: "Thank you for the information.",
        time: "20 Sep",
        read: true,
      },
    ],
  },
];

export default function HostMessagesPage() {
  const [conversations, setConversations] = useState(
    initialConversations
  );

  const [selectedId, setSelectedId] = useState(
    initialConversations[0].id
  );

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return conversations;

    return conversations.filter(
      (conversation) =>
        conversation.guest.toLowerCase().includes(query) ||
        conversation.property.toLowerCase().includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query)
    );
  }, [conversations, search]);

  const totalUnread = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0
  );

  function selectConversation(id: string) {
    setSelectedId(id);
    setShowChat(true);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function sendMessage() {
    const text = message.trim();

    if (!text || !selectedConversation) return;

    const newMessage: Message = {
      id: `message-${Date.now()}`,
      sender: "HOST",
      text,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      }),
      read: true,
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: text,
              lastTime: "Now",
              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-9 lg:px-10">
          <Link
            href="/host"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Host dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                HOST COMMUNICATION
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Messages
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Communicate directly with guests before and during
                their stay.
              </p>
            </div>

            {totalUnread > 0 && (
              <div className="w-fit rounded-full bg-[#EEF2FF] px-4 py-2 text-xs font-semibold text-[#03045E]">
                {totalUnread} unread{" "}
                {totalUnread === 1 ? "message" : "messages"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MESSAGES */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[30px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.05)]">
          <div className="grid min-h-[680px] lg:grid-cols-[350px_1fr]">
            {/* CONVERSATIONS */}
            <aside
              className={`border-r border-[#03045E]/10 ${
                showChat ? "hidden lg:block" : "block"
              }`}
            >
              <div className="border-b border-[#03045E]/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      Conversations
                    </h2>

                    <p className="mt-1 text-xs text-[#94A3B8]">
                      {conversations.length} active conversations
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search guests..."
                    className="w-full rounded-xl border border-[#03045E]/10 bg-[#FAFAF8] px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#03045E]"
                  />
                </div>
              </div>

              <div className="max-h-[590px] overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm font-semibold">
                      No conversations found
                    </p>

                    <p className="mt-1 text-xs text-[#94A3B8]">
                      Try another guest or property name.
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() =>
                        selectConversation(conversation.id)
                      }
                      className={`w-full border-b border-[#03045E]/10 p-5 text-left transition ${
                        selectedId === conversation.id
                          ? "bg-[#F5F7FF]"
                          : "hover:bg-[#FAFAF8]"
                      }`}
                    >
                      <div className="flex gap-3">
                        <Avatar
                          initials={conversation.initials}
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="truncate text-sm font-semibold">
                              {conversation.guest}
                            </p>

                            <span className="shrink-0 text-[10px] text-[#94A3B8]">
                              {conversation.lastTime}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-xs text-[#64748B]">
                            {conversation.property}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <p className="truncate text-xs text-[#94A3B8]">
                              {conversation.lastMessage}
                            </p>

                            {conversation.unread > 0 && (
                              <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#03045E] px-1 text-[9px] font-bold text-white">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            {/* CHAT */}
            <section
              className={`flex min-w-0 flex-col ${
                showChat ? "flex" : "hidden lg:flex"
              }`}
            >
              {selectedConversation ? (
                <>
                  {/* CHAT HEADER */}
                  <div className="flex items-center gap-3 border-b border-[#03045E]/10 px-5 py-4 sm:px-7">
                    <button
                      onClick={() => setShowChat(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#03045E]/10 lg:hidden"
                      aria-label="Back to conversations"
                    >
                      ←
                    </button>

                    <Avatar
                      initials={selectedConversation.initials}
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-semibold">
                        {selectedConversation.guest}
                      </h2>

                      <p className="truncate text-xs text-[#64748B]">
                        {selectedConversation.property}
                      </p>
                    </div>

                    <div className="hidden sm:block">
                      <BookingStatus
                        status={
                          selectedConversation.bookingStatus
                        }
                      />
                    </div>
                  </div>

                  {/* BOOKING CONTEXT */}
                  <div className="border-b border-[#03045E]/10 bg-[#FAFAF8] px-5 py-4 sm:px-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
                          STAY DETAILS
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {selectedConversation.property}
                        </p>
                      </div>

                      <div className="flex gap-6">
                        <StayDetail
                          label="Check-in"
                          value={selectedConversation.checkIn}
                        />

                        <StayDetail
                          label="Check-out"
                          value={selectedConversation.checkOut}
                        />
                      </div>
                    </div>
                  </div>

                  {/* MESSAGE AREA */}
                  <div className="flex-1 space-y-5 overflow-y-auto bg-white p-5 sm:p-7">
                    <div className="flex justify-center">
                      <span className="rounded-full bg-[#FAFAF8] px-3 py-1 text-[10px] font-medium text-[#94A3B8]">
                        Conversation
                      </span>
                    </div>

                    {selectedConversation.messages.map(
                      (item) => (
                        <MessageBubble
                          key={item.id}
                          message={item}
                        />
                      )
                    )}
                  </div>

                  {/* COMPOSER */}
                  <div className="border-t border-[#03045E]/10 bg-white p-4 sm:p-5">
                    <div className="flex items-end gap-3 rounded-2xl border border-[#03045E]/10 bg-[#FAFAF8] p-2">
                      <textarea
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            !event.shiftKey
                          ) {
                            event.preventDefault();
                            sendMessage();
                          }
                        }}
                        rows={1}
                        placeholder="Write a message..."
                        className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#94A3B8]"
                      />

                      <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="rounded-xl bg-[#03045E] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Send
                      </button>
                    </div>

                    <p className="mt-2 px-2 text-[10px] text-[#94A3B8]">
                      Press Enter to send · Shift + Enter for a new line
                    </p>
                  </div>
                </>
              ) : (
                <EmptyChat />
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------- */
/* AVATAR */
/* -------------------------------- */

function Avatar({
  initials,
}: {
  initials: string;
}) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#03045E]">
      {initials}
    </div>
  );
}

/* -------------------------------- */
/* MESSAGE */
/* -------------------------------- */

function MessageBubble({
  message,
}: {
  message: Message;
}) {
  const isHost = message.sender === "HOST";

  return (
    <div
      className={`flex ${
        isHost ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[70%] ${
          isHost ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isHost
              ? "rounded-br-md bg-[#03045E] text-white"
              : "rounded-bl-md bg-[#F1F3F8] text-[#03045E]"
          }`}
        >
          {message.text}
        </div>

        <div
          className={`mt-1.5 flex items-center gap-2 px-1 ${
            isHost ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[10px] text-[#94A3B8]">
            {message.time}
          </span>

          {isHost && message.read && (
            <span className="text-[10px] font-semibold text-[#0D21A1]">
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* BOOKING STATUS */
/* -------------------------------- */

function BookingStatus({
  status,
}: {
  status: "CONFIRMED" | "PENDING";
}) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
        status === "CONFIRMED"
          ? "bg-[#ECFDF5] text-emerald-700"
          : "bg-[#FFF7E6] text-[#9A6700]"
      }`}
    >
      {status === "CONFIRMED" ? "Confirmed" : "Pending"}
    </span>
  );
}

/* -------------------------------- */
/* STAY DETAIL */
/* -------------------------------- */

function StayDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* EMPTY CHAT */
/* -------------------------------- */

function EmptyChat() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#03045E]">
          💬
        </div>

        <h2 className="mt-5 font-serif text-2xl font-semibold">
          Select a conversation
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
          Choose a guest from your conversations to start
          messaging.
        </p>
      </div>
    </div>
  );
}