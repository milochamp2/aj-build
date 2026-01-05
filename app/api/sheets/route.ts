import { NextResponse } from 'next/server';
import { getWorkItems } from '@/lib/googleSheets';

export async function GET() {
  try {
    const workItems = await getWorkItems();
    return NextResponse.json({ success: true, data: workItems });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch data from Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Enable caching for better performance
// Revalidate every 60 seconds
export const revalidate = 60;
