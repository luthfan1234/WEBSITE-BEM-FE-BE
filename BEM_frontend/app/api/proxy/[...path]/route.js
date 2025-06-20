import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function GET(request, { params }) {
  const path = params.path.join('/');
  
  try {
    console.log(`Proxying GET request to: ${API_URL}/${path}`);
    
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying request to ${path}:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch data from backend' 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const path = params.path.join('/');
  
  try {
    const body = await request.json();
    
    console.log(`Proxying POST request to: ${API_URL}/${path}`);
    
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying request to ${path}:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to post data to backend' 
      }, 
      { status: 500 }
    );
  }
}
