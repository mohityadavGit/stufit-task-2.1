import { NextRequest, NextResponse } from 'next/server';
import { parentData } from '@/data/parentData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentName = searchParams.get('parentName');
    
    if (!parentName) {
      return NextResponse.json(
        { error: 'Parent name is required' },
        { status: 400 }
      );
    }
    
    // TODO: In production, this would query the database
    // const response = await fetch('http://localhost:5000/parent/children', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    
    // For now, filter mock data
    const children = parentData.filter((student) => student.fathers_name === parentName);
    
    return NextResponse.json(children);
  } catch (error) {
    console.error('Error fetching parent children:', error);
    return NextResponse.json(
      { error: 'Failed to fetch children data' },
      { status: 500 }
    );
  }
}
