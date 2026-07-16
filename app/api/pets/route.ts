import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const gender = url.searchParams.get("gender");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://pet-adoption-platform-drab.vercel.app"}/api/pets?${url.searchParams.toString()}`,
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    let results = Array.isArray(data) ? data : [];

    if (category) {
      results = results.filter(
        (pet: any) => pet.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (gender) {
      results = results.filter(
        (pet: any) => pet.gender?.toLowerCase() === gender.toLowerCase(),
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to proxy pets API", error);
    return NextResponse.json({ error: "Failed to load pets" }, { status: 500 });
  }
}
