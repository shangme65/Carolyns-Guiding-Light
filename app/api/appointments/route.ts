import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin - return all appointments
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    const appointments = await prisma.appointment.findMany({
      where:
        user?.role?.toLowerCase() === "admin"
          ? {}
          : { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { date, time, type, notes } = body;

    if (!date || !time || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        date: new Date(date),
        time,
        type,
        notes: notes || "",
        status: "pending",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the appointment to check ownership
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      select: { userId: true, status: true },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    const isAdmin = user?.role?.toLowerCase() === "admin";
    const isOwner = appointment.userId === session.user.id;

    // Allow if:
    // 1. User is admin (can do anything)
    // 2. User owns the appointment AND is trying to cancel AND appointment is pending
    if (!isAdmin) {
      if (!isOwner) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (
        status.toUpperCase() !== "CANCELLED" ||
        appointment.status.toLowerCase() !== "pending"
      ) {
        return NextResponse.json(
          { error: "You can only cancel pending appointments" },
          { status: 403 }
        );
      }
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: status.toLowerCase() },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
