import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';



export async function POST(req: Request) {
  const body = await req.json();
  const { name, department, year, email, collegeId, wallet } = body;

   const { error } = await supabase.from('std_users').insert([
    {
      wallet,
      name,
      department,
      year,
      email,
      collegeId,
      
    },
  ]);

  if (error) {
    return NextResponse.json({ message: 'Error saving data', error }, { status: 500 });
  }
console.log({ name, department, year, email, collegeId, wallet })

  return NextResponse.json({ message: { name, department, year, email, collegeId, wallet } }, { status: 200 });
}