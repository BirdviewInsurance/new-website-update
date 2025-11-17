import { NextResponse } from "next/server";

export interface ConvertForm {
  amount: number;
  from: string;
  to: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let from = searchParams.get("from");
  let to = searchParams.get("to");
  let amount = searchParams.get("amount");

  if (!from || !to || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const API_KEY = process.env.EXCHANGE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from.toUpperCase()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== "success") {
      return NextResponse.json(
        { error: "Failed to fetch exchange rates" },
        { status: 500 }
      );
    }

    const rate = data.conversion_rates[to.toUpperCase()];

    if (!rate) {
      return NextResponse.json(
        { error: "Invalid currency code" },
        { status: 400 }
      );
    }

    const convertedAmount = (parseFloat(amount) * rate).toFixed(2);

    return NextResponse.json({
      from,
      to,
      amount,
      convertedAmount,
      rate,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

