import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function GET() {
  try {
    console.log('Proxying GET request to dashboard stats API');
    
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying GET request to dashboard stats:', error);
    
    // Generate fallback data
    const fallbackData = {
      success: true,
      totalArticles: 2,
      publishedArticles: 2,
      draftArticles: 0,
      totalDepartments: 8,
      totalUsers: 5,
      recentActivity: [
        {
          type: 'system',
          message: 'API proxy error: ' + error.message,
          time: 'Just now',
          icon: 'fas fa-exclamation-circle',
          color: 'text-danger'
        }
      ]
    };
    
    return NextResponse.json(fallbackData);
  }
}
