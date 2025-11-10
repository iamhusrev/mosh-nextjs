import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface UrlParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: UrlParams) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId <= 0) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: UrlParams) {
  const body = await request.json();
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId <= 0) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.issues },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: UrlParams) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId <= 0) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
