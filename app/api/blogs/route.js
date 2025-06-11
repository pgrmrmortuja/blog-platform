import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";


export const POST = async(req) =>{
    const body = await req.json();
    const blogConnection = await dbConnect('blogs');
    const result = await blogConnection.insertOne(body);

    return NextResponse.json(result);
}