import { NextRequest, NextResponse } from 'next/server';

let fraudRules = {
    high_amount_threshold: 5000,
    risky_transaction_types: ["wire_transfer", "crypto"],
    blocked_users: ["user_99"]
};

// Get current rules
export async function GET() {
    return NextResponse.json(fraudRules);
}

// Update rules
export async function POST(req: NextRequest) {
    try {
        const updatedRules = await req.json();
        fraudRules = { ...fraudRules, ...updatedRules };
        return NextResponse.json({ success: true, rules: fraudRules });
    } catch (error) {
        return NextResponse.json({ error: "Error updating rules" }, { status: 500 });
    }
}
