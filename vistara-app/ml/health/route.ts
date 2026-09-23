import {NextResponse} from 'next/server';
export async function GET() {
    try{
        const response = await fetch(`${process.env.ML_API_URL }/ml/health`, {
         
            cache: 'no-store',
         
    });
        const data = await response.json();
        return NextResponse.json({
            success: true,
            ml: data,
        });
    }catch(error) {
        console.error('Error in GET /ml/health:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}