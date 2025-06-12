import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const body = await req.json();
  const blogConnection = await dbConnect('blogs');
  const result = await blogConnection.insertOne(body);

  return NextResponse.json(result);
}

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const blogConnection = await dbConnect("blogs");

  let blogs;

  if (email) {
    blogs = await blogConnection.find({ author_email: email }).toArray();
  } else {
    blogs = await blogConnection.find({}).toArray();
  }

  return NextResponse.json(blogs);
};