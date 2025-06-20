import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// GET single article
export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    console.log(`Proxying GET request to article ${id}`);
    
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const status = response.status;
      throw new Error(`HTTP error! Status: ${status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying GET request to article ${id}:`, error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 404 }
    );
  }
}

// PUT - update article
export async function PUT(request, { params }) {
  const { id } = params;
  
  try {
    const body = await request.json();
    console.log(`Proxying PUT request to article ${id}:`, body);
    
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying PUT request to article ${id}:`, error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}

// DELETE article
export async function DELETE(request, { params }) {
  const { id } = params;
  
  try {
    console.log(`Proxying DELETE request to article ${id}`);
    
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
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
    console.error(`Error proxying DELETE request to article ${id}:`, error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}
