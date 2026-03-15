import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { firstName, lastName, email, message } = body;
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Mock: In production, send email via Resend or similar
    console.log('Contact form submission:', body);

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will be in touch soon!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
