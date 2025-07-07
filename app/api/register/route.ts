import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';



export async function POST(req: Request) {
  const body = await req.json();
  const { name, department, year, email, collegeId, wallet } = body;

  const { data: existingUser, error: fetchError } = await supabase
    .from('std_users')
    .select('collegeId')
    .eq('wallet', wallet)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return NextResponse.json({ message: 'Error checking wallet', error: fetchError }, { status: 500 });
  }

  if (existingUser) {
    return NextResponse.json({ message: 'Wallet already exists' }, { status: 409 });
  }

  const { error: insertError } = await supabase.from('std_users').insert([
    {
      name,
      department,
      year,
      email,
      college_id: collegeId, // use correct DB column name
      wallet,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ message: 'Error saving data', error: insertError }, { status: 500 });
  }

  console.log({ name, department, year, email, collegeId, wallet })

  return NextResponse.json({ message: { name, department, year, email, collegeId, wallet } }, { status: 200 });
}