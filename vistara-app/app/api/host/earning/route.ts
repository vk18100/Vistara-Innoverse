import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = [
      {
        id: "earning-001",
        bookingId: "booking-001",

        property: {
          id: "property-001",
          name: "The Blue Villa",
          location: "Patna, Bihar",
        },

        guest: {
          id: "guest-001",
          name: "Aarav Sharma",
        },

        date: "2026-09-20",

        grossAmount: 15000,
        platformFee: 1500,
        tax: 0,
        netAmount: 13500,

        status: "PAID",
        paymentMethod: "RAZORPAY",

        payout: {
          status: "COMPLETED",
          date: "2026-09-21",
        },
      },

      {
        id: "earning-002",
        bookingId: "booking-002",

        property: {
          id: "property-002",
          name: "River View Retreat",
          location: "Ranchi, Jharkhand",
        },

        guest: {
          id: "guest-002",
          name: "Priya Singh",
        },

        date: "2026-09-22",

        grossAmount: 21000,
        platformFee: 2100,
        tax: 0,
        netAmount: 18900,

        status: "PENDING",
        paymentMethod: "RAZORPAY",

        payout: {
          status: "PENDING",
          date: null,
        },
      },

      {
        id: "earning-003",
        bookingId: "booking-003",

        property: {
          id: "property-003",
          name: "Forest Escape",
          location: "Darjeeling, West Bengal",
        },

        guest: {
          id: "guest-003",
          name: "Rahul Verma",
        },

        date: "2026-09-18",

        grossAmount: 18000,
        platformFee: 1800,
        tax: 0,
        netAmount: 16200,

        status: "PAID",
        paymentMethod: "RAZORPAY",

        payout: {
          status: "COMPLETED",
          date: "2026-09-19",
        },
      },
    ];

    const totalGross = transactions.reduce(
      (total, transaction) =>
        total + transaction.grossAmount,
      0
    );

    const totalFees = transactions.reduce(
      (total, transaction) =>
        total + transaction.platformFee,
      0
    );

    const totalEarnings = transactions.reduce(
      (total, transaction) =>
        total + transaction.netAmount,
      0
    );

    const paidAmount = transactions
      .filter(
        (transaction) =>
          transaction.payout.status === "COMPLETED"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.netAmount,
        0
      );

    const pendingAmount = transactions
      .filter(
        (transaction) =>
          transaction.payout.status === "PENDING"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.netAmount,
        0
      );

    const stats = {
      totalGross,
      totalFees,
      totalEarnings,
      paidAmount,
      pendingAmount,
      totalTransactions: transactions.length,
    };

    return NextResponse.json({
      success: true,

      data: {
        stats,
        transactions,
      },
    });
  } catch (error) {
    console.error(
      "Host earnings API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load host earnings.",
      },
      {
        status: 500,
      }
    );
  }
}