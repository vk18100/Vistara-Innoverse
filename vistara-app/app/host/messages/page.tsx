"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  ChevronRight,
  Clock3,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Navbar from "@/components/navbar";

/* -------------------------------------------------------------------------- */
/* Vistara Host Messages                                                       */
/* Premium palette: ivory + charcoal + gold. No blue.                       */
/* -------------------------------------------------------------------------- */

type MessageStatus = "READ" | "DELIVERED" | "SENT";
type ConversationStatus = "ACTIVE" | "ARCHIVED";

type Message = {
  id: string;
  sender: "HOST" | "GUEST";
  text: string;
  createdAt: string;
  status?: MessageStatus;
};

type Conversation = {
  id: string;
  guestName: string;
  initials: string;
  propertyName: string;
  bookingId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: ConversationStatus;
  online?: boolean;
  messages: Message[];
};

type MessagesResponse = {
  success?: boolean;
  data?: Conversation[];
  message?: string;
};

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    guestName: "Aarav Sharma",
    initials: "AS",
    propertyName: "Dubai Skyline Residence",
    bookingId: "VS-1048",
    lastMessage: "Thank you! I will share the check-in details with my family.",
    lastMessageAt: "2026-10-03T10:42:00",
    unreadCount: 2,
    status: "ACTIVE",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "GUEST",
        text: "Hi! We are arriving in Dubai on Friday. Is early check-in possible?",
        createdAt: "2026-10-03T10:12:00",
        status: "READ",
      },
      {
        id: "m2",
        sender: "HOST",
        text: "Hi Aarav, welcome! I can arrange an early check-in if the apartment is ready. I’ll confirm it the evening before your arrival.",
        createdAt: "2026-10-03T10:18:00",
        status: "READ",
      },
      {
        id: "m3",
        sender: "GUEST",
        text: "Perfect. Also, could you share the check-in instructions?",
        createdAt: "2026-10-03T10:31:00",
        status: "READ",
      },
      {
        id: "m4",
        sender: "HOST",
        text: "Absolutely. I’ll send the complete instructions and access details once your arrival time is confirmed.",
        createdAt: "2026-10-03T10:36:00",
        status: "DELIVERED",
      },
      {
        id: "m5",
        sender: "GUEST",
        text: "Thank you! I will share the check-in details with my family.",
        createdAt: "2026-10-03T10:42:00",
        status: "READ",
      },
    ],
  },
  {
    id: "conv-2",
    guestName: "Meera Kapoor",
    initials: "MK",
    propertyName: "Vistara Beach House",
    bookingId: "VS-1052",
    lastMessage: "Is there parking available near the house?",
    lastMessageAt: "2026-10-03T09:15:00",
    unreadCount: 1,
    status: "ACTIVE",
    online: false,
    messages: [
      {
        id: "m6",
        sender: "GUEST",
        text: "Hello! Is there parking available near the house?",
        createdAt: "2026-10-03T09:15:00",
        status: "SENT",
      },
    ],
  },
  {
    id: "conv-3",
    guestName: "Rohan Verma",
    initials: "RV",
    propertyName: "The Heritage House",
    bookingId: "VS-1057",
    lastMessage: "The place looks beautiful. Looking forward to the stay.",
    lastMessageAt: "2026-10-02T20:08:00",
    unreadCount: 0,
    status: "ACTIVE",
    online: false,
    messages: [
      {
        id: "m7",
        sender: "HOST",
        text: "Hi Rohan, your booking is confirmed. We look forward to hosting you.",
        createdAt: "2026-10-02T19:45:00",
        status: "READ",
      },
      {
        id: "m8",
        sender: "GUEST",
        text: "The place looks beautiful. Looking forward to the stay.",
        createdAt: "2026-10-02T20:08:00",
        status: "READ",
      },
    ],
  },
  {
    id: "conv-4",
    guestName: "Ananya Singh",
    initials: "AS",
    propertyName: "Green Valley Farm Stay",
    bookingId: "VS-1039",
    lastMessage: "Can we request a late checkout?",
    lastMessageAt: "2026-10-01T16:22:00",
    unreadCount: 0,
    status: "ACTIVE",
    online: false,
    messages: [
      {
        id: "m9",
        sender: "GUEST",
        text: "Can we request a late checkout?",
        createdAt: "2026-10-01T16:22:00",
        status: "READ",
      },
    ],
  },
];

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatConversationDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return formatTime(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function avatarTone(index: number) {
  const tones = [
    "bg-[#FFF8E8] text-[#8A651B]",
    "bg-[#F1F0EB] text-[#44403C]",
    "bg-[#F5EEE3] text-[#765817]",
    "bg-[#EEECE5] text-[#57534E]",
  ];

  return tones[index % tones.length];
}

export default function HostMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch("/api/host/messages", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        const raw = await response.text();

        let result: MessagesResponse = {};

        try {
          result = raw ? JSON.parse(raw) : {};
        } catch {
          throw new Error("Invalid messages response.");
        }

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Unable to load messages.");
        }

        const live = Array.isArray(result.data) ? result.data : [];

        if (live.length > 0) {
          setConversations(live);
          setSelectedId(live[0].id);
          setDemoMode(false);
        } else {
          setConversations(DEMO_CONVERSATIONS);
          setSelectedId(DEMO_CONVERSATIONS[0].id);
          setDemoMode(true);
        }
      } catch (error) {
        console.error("HOST_MESSAGES_ERROR:", error);
        setConversations(DEMO_CONVERSATIONS);
        setSelectedId(DEMO_CONVERSATIONS[0].id);
        setDemoMode(true);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return conversations;

    return conversations.filter((conversation) =>
      [
        conversation.guestName,
        conversation.propertyName,
        conversation.bookingId,
        conversation.lastMessage,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [conversations, search]);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  );

  function openConversation(id: string) {
    setSelectedId(id);
    setMobileChatOpen(true);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unreadCount: 0 }
          : conversation,
      ),
    );
  }

  function sendMessage() {
    const text = draft.trim();

    if (!text || !selectedConversation) return;

    const newMessage: Message = {
      id: `local-${Date.now()}`,
      sender: "HOST",
      text,
      createdAt: new Date().toISOString(),
      status: "SENT",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: text,
              lastMessageAt: newMessage.createdAt,
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setDraft("");
  }

  if (loading) {
    return <MessagesSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      <Navbar />

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/25 bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A651B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                Host inbox
              </div>

              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Messages
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#71717A] sm:text-base">
                Stay connected with guests before, during and after their
                stays.
              </p>
            </div>

            <Link
              href="/host/bookings"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold transition hover:border-[#D9A441]/40 hover:bg-[#FFF8E8]"
            >
              View bookings
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        {demoMode && (
          <div className="mb-5 rounded-2xl border border-[#D9A441]/25 bg-[#FFF8E8] px-4 py-3 text-sm text-[#765817]">
            Sample guest conversations are displayed for the demo because no
            live messages are available yet.
          </div>
        )}

        <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.06)]">
          <div className="grid min-h-[690px] lg:grid-cols-[340px_minmax(0,1fr)]">
            {/* Conversations */}
            <aside
              className={`border-r border-black/8 ${
                mobileChatOpen ? "hidden lg:block" : "block"
              }`}
            >
              <div className="border-b border-black/8 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xl font-semibold">
                      Conversations
                    </p>
                    <p className="mt-1 text-xs text-[#A8A29E]">
                      {conversations.length} active thread
                      {conversations.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
                    <MessageCircle size={18} />
                  </div>
                </div>

                <label className="relative mt-5 block">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search guests or properties"
                    className="h-11 w-full rounded-xl border border-black/8 bg-[#FAF8F3] pl-10 pr-3 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
                  />
                </label>
              </div>

              <div className="max-h-[590px] overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <Search
                      size={22}
                      className="mx-auto text-[#A8A29E]"
                    />
                    <p className="mt-4 font-semibold">No conversations found</p>
                    <p className="mt-1 text-xs text-[#A8A29E]">
                      Try another guest or property name.
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conversation, index) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      active={selectedId === conversation.id}
                      tone={avatarTone(index)}
                      onClick={() => openConversation(conversation.id)}
                    />
                  ))
                )}
              </div>
            </aside>

            {/* Chat */}
            <section
              className={`min-w-0 ${
                mobileChatOpen ? "block" : "hidden lg:block"
              }`}
            >
              {selectedConversation ? (
                <ChatPanel
                  conversation={selectedConversation}
                  draft={draft}
                  setDraft={setDraft}
                  onSend={sendMessage}
                  onBack={() => setMobileChatOpen(false)}
                />
              ) : (
                <NoConversation />
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function ConversationItem({
  conversation,
  active,
  tone,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  tone: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 border-b border-black/6 px-4 py-4 text-left transition sm:px-5 ${
        active
          ? "bg-[#FFF8E8]"
          : "bg-white hover:bg-[#FAF8F3]"
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ${tone}`}
        >
          {conversation.initials}
        </div>

        {conversation.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#6C8A54]" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate text-sm font-semibold text-[#292524]">
            {conversation.guestName}
          </p>

          <span className="shrink-0 text-[10px] text-[#A8A29E]">
            {formatConversationDate(conversation.lastMessageAt)}
          </span>
        </div>

        <p className="mt-1 truncate text-[11px] font-medium text-[#9A711E]">
          {conversation.propertyName}
        </p>

        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className="truncate text-xs text-[#78716C]">
            {conversation.lastMessage}
          </p>

          {conversation.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#D9A441] px-1.5 text-[10px] font-bold text-[#18181B]">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>

      <ChevronRight
        size={15}
        className={`mt-3 shrink-0 ${
          active ? "text-[#9A711E]" : "text-[#D4D0C8]"
        }`}
      />
    </button>
  );
}

function ChatPanel({
  conversation,
  draft,
  setDraft,
  onSend,
  onBack,
}: {
  conversation: Conversation;
  draft: string;
  setDraft: (value: string) => void;
  onSend: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-[690px] flex-col">
      {/* Chat header */}
      <header className="flex items-center gap-3 border-b border-black/8 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#57534E] hover:bg-[#FAF8F3] lg:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF8E8] text-xs font-bold text-[#8A651B]">
          {conversation.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold">
              {conversation.guestName}
            </h2>

            {conversation.online && (
              <span className="hidden items-center gap-1 text-[10px] font-medium text-[#6C8A54] sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C8A54]" />
                Online
              </span>
            )}
          </div>

          <p className="truncate text-xs text-[#9A711E]">
            {conversation.propertyName}
            {conversation.bookingId
              ? ` · Booking #${conversation.bookingId}`
              : ""}
          </p>
        </div>

        <Link
          href={
            conversation.bookingId
              ? `/host/bookings/${conversation.bookingId}`
              : "/host/bookings"
          }
          className="hidden items-center gap-1.5 rounded-xl border border-black/8 px-3 py-2 text-xs font-semibold text-[#57534E] transition hover:border-[#D9A441]/40 hover:bg-[#FFF8E8] sm:inline-flex"
        >
          Booking
          <ArrowRight size={13} />
        </Link>
      </header>

      {/* Trust banner */}
      <div className="border-b border-black/6 bg-[#FAF8F3] px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-2 text-[10px] font-medium text-[#78716C]">
          <ShieldCheck size={14} className="text-[#9A711E]" />
          Keep payments and sensitive personal information inside Vistara.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#FCFBF8] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="mb-6 flex items-center justify-center">
            <span className="rounded-full border border-black/6 bg-white px-3 py-1 text-[10px] font-medium text-[#A8A29E]">
              Conversation
            </span>
          </div>

          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-black/8 bg-white p-3 sm:p-4">
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <button
            type="button"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#78716C] transition hover:bg-[#FAF8F3] hover:text-[#9A711E] sm:flex"
            aria-label="Attach file"
          >
            <Paperclip size={18} />
          </button>

          <div className="relative flex-1">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  onSend();
                }
              }}
              rows={1}
              placeholder="Write a message..."
              className="min-h-11 w-full resize-none rounded-xl border border-black/10 bg-[#FAF8F3] px-4 py-3 pr-4 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
            />
          </div>

          <button
            type="button"
            onClick={onSend}
            disabled={!draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="mx-auto mt-2 hidden max-w-3xl text-[10px] text-[#A8A29E] sm:block">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isHost = message.sender === "HOST";

  return (
    <div className={`flex ${isHost ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] sm:max-w-[70%] ${
          isHost ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isHost
              ? "rounded-br-md bg-[#D9A441] text-[#18181B]"
              : "rounded-bl-md border border-black/7 bg-white text-[#292524]"
          }`}
        >
          {message.text}
        </div>

        <div
          className={`mt-1.5 flex items-center gap-1.5 px-1 text-[10px] text-[#A8A29E] ${
            isHost ? "justify-end" : "justify-start"
          }`}
        >
          <span>{formatTime(message.createdAt)}</span>

          {isHost && (
            <span
              className={
                message.status === "READ"
                  ? "text-[#9A711E]"
                  : "text-[#A8A29E]"
              }
            >
              <CheckCheck size={13} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function NoConversation() {
  return (
    <div className="flex min-h-[690px] items-center justify-center bg-[#FCFBF8] p-8 text-center">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
          <MessageCircle size={28} />
        </div>

        <h2 className="mt-5 font-serif text-2xl font-semibold">
          Select a conversation
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#78716C]">
          Choose a guest from your inbox to view the conversation and reply.
        </p>
      </div>
    </div>
  );
}

function MessagesSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <Navbar />

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="h-7 w-28 animate-pulse rounded-full bg-[#F1F0EB]" />
          <div className="mt-5 h-12 w-64 animate-pulse rounded-xl bg-[#F1F0EB]" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-[#F5F4EF]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="grid min-h-[690px] overflow-hidden rounded-[28px] border border-black/8 bg-white lg:grid-cols-[340px_1fr]">
          <div className="border-r border-black/8 p-5">
            <div className="h-6 w-32 animate-pulse rounded bg-[#F1F0EB]" />
            <div className="mt-5 h-11 animate-pulse rounded-xl bg-[#F5F4EF]" />

            <div className="mt-5 space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex gap-3 p-3">
                  <div className="h-11 w-11 animate-pulse rounded-full bg-[#F1F0EB]" />
                  <div className="flex-1">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#F1F0EB]" />
                    <div className="mt-2 h-3 w-36 animate-pulse rounded bg-[#F5F4EF]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="h-[72px] animate-pulse border-b border-black/8 bg-[#F5F4EF]" />
            <div className="h-[545px] animate-pulse bg-[#FCFBF8]" />
            <div className="h-[73px] animate-pulse border-t border-black/8 bg-white" />
          </div>
        </div>
      </section>
    </main>
  );
}
