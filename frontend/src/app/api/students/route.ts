import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // This endpoint might not exist in the current backend
    // For now, return empty array with a note
    console.warn('Students list endpoint not implemented in backend');
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}
