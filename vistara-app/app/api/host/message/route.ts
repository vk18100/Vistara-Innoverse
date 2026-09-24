import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conversations = [
      {
        id: "conversation-001",

        guest: {
          id: "guest-001",
          name: "Aarav Sharma",
          image: null,
        },

        property: {
          id: "property-001",
          name: "The Blue Villa",
        },

        lastMessage: {
          id: "message-001",
          text: "Hi, is early check-in possible?",
          sender: "GUEST",
          createdAt: "2026-09-24T09:30:00.000Z",
        },

        unreadCount: 2,

        status: "ACTIVE",
      },

      {
        id: "conversation-002",

        guest: {
          id: "guest-002",
          name: "Priya Singh",
          image: null,
        },

        property: {
          id: "property-002",
          name: "River View Retreat",
        },

        lastMessage: {
          id: "message-002",
          text: "Thank you! Looking forward to the stay.",
          sender: "GUEST",
          createdAt: "2026-09-23T18:45:00.000Z",
        },

        unreadCount: 0,

        status: "ACTIVE",
      },

      {
        id: "conversation-003",

        guest: {
          id: "guest-003",
          name: "Rahul Verma",
          image: null,
        },

        property: {
          id: "property-003",
          name: "Forest Escape",
        },

        lastMessage: {
          id: "message-003",
          text: "Can you share the exact location?",
          sender: "GUEST",
          createdAt: "2026-09-22T14:20:00.000Z",
        },

        unreadCount: 1,

        status: "ACTIVE",
      },
    ];

    const stats = {
      totalConversations: conversations.length,

      unreadConversations: conversations.filter(
        (conversation) => conversation.unreadCount > 0
      ).length,

      unreadMessages: conversations.reduce(
        (total, conversation) =>
          total + conversation.unreadCount,
        0
      ),
    };

    return NextResponse.json({
      success: true,

      data: {
        conversations,
        stats,
      },
    });
  } catch (error) {
    console.error(
      "Host messages API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load host messages.",
      },
      {
        status: 500,
      }
    );
  }
}