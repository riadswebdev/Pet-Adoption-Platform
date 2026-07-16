import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://pet-adoption-platform-drab.vercel.app"}/api/pets/${id}`,
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to proxy pet details API", error);
    return NextResponse.json(
      { error: "Failed to load pet details" },
      { status: 500 },
    );
  }
}
