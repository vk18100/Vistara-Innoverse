import { NextResponse } from "next/server";

const orders: any[] = [];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = orders.find((item) => String(item.id) === String(id));

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      activityId,
      activity,
      customer,
      date,
      time,
      guests,
      price,
      total,
      notes,
    } = body;

    if (!activityId || !activity || !customer || !date || !guests) {
      return NextResponse.json(
        {
          success: false,
          message: "Required booking details are missing",
        },
        { status: 400 }
      );
    }

    const order = {
      id,
      activityId,
      activity,
      customer,
      date,
      time: time || "",
      guests,
      price: price || 0,
      total: total || price || 0,
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return NextResponse.json(
      {
        success: true,
        message: "Experience booking created successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 }
    );
  }
}