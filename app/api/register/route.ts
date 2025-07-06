import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

export async function POST(req: Request) {
  const body = await req.json();
  const { name, department, year, email, collegeId, wallet } = body;

//    const { error } = await supabase.from('registrations').insert([
//     {
//       name,
//       department,
//       year,
//       email,
//       college_id: collegeId,
//       wallet,
//     },
//   ]);

//   if (error) {
//     return NextResponse.json({ message: 'Error saving data', error }, { status: 500 });
//   }
console.log({ name, department, year, email, collegeId, wallet })

  return NextResponse.json({ message: { name, department, year, email, collegeId, wallet } }, { status: 200 });
}