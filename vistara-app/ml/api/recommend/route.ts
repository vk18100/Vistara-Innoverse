import {NextResponse} from 'next/server';

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5000';

export async function POST(request: Request) {
    try{
    const requestBody = await request.json();

    const response = await fetch(`${ML_API_URL}/recommend/route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}catch(error) {
    console.error('Error in POST /recommend/route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}