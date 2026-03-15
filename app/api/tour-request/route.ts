import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, campus } = body;
    if (!name || !email || !campus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('Tour request submission:', body);

    return NextResponse.json(
      { success: true, message: 'Tour request received! We will contact you to confirm your visit.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
