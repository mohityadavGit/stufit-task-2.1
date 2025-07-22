import { NextRequest, NextResponse } from 'next/server';
import { mockSummaryData, mockDetailedData } from '@/lib/mockData';

// Set to true to use mock data when backend is not available
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && !process.env.BACKEND_AVAILABLE;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isDetailed = searchParams.get('detailed') === 'true';
    
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      console.log('Using mock data for medical records');
      return NextResponse.json(isDetailed ? mockDetailedData : mockSummaryData);
    }
    
    // Forward all query parameters to the backend
    const backendUrl = `http://localhost:5000/hod-filter-medical-records?${searchParams.toString()}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if present
        ...(request.headers.get('authorization') && {
          'authorization': request.headers.get('authorization')!
        })
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    
    // Fallback to mock data if backend is unavailable
    if (!USE_MOCK_DATA) {
      console.log('Backend unavailable, falling back to mock data');
      const { searchParams } = new URL(request.url);
      const isDetailed = searchParams.get('detailed') === 'true';
      return NextResponse.json(isDetailed ? mockDetailedData : mockSummaryData);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch medical records' },
      { status: 500 }
    );
  }
}
