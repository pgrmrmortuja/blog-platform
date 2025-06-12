import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/app/lib/dbConnect";

export const GET = async (req, { params }) => {
  const { id } = params;
  const blogConnection = await dbConnect('blogs');
  const blog = await blogConnection.findOne({ _id: new ObjectId(id) });

  return NextResponse.json(blog);
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  const newData = await req.json();
  const blogConnection = await dbConnect("blogs");

  const result = await blogConnection.replaceOne(
    { _id: new ObjectId(id) },
    newData
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Blog updated successfully",
    modifiedCount: result.modifiedCount,
  });
};


export const PATCH = async (req, { params }) => {
  const { id } = params;
  const updates = await req.json();
  const blogConnection = await dbConnect("blogs");

  const result = await blogConnection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  return NextResponse.json({ message: "Blog updated successfully" });
};


export const DELETE = async (req, { params }) => {
  const { id } = params;
  const blogConnection = await dbConnect('blogs');
  const result = await blogConnection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "Blog deleted successfully" });
};