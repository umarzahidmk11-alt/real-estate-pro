import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ========================================
// GET ALL PROPERTIES
// ========================================

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET properties Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("GET properties error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load properties.",
      },
      { status: 500 }
    );
  }
}

// ========================================
// ADD NEW PROPERTY
// ========================================

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const title = String(data.title || "").trim();
    const purpose = String(data.purpose || "").trim();
    const type = String(data.type || "").trim();
    const location = String(data.location || "").trim();
    const price = String(data.price || "").trim();
    const area = String(data.area || "").trim();
    const description = String(data.description || "").trim();

    const bedrooms = Number(data.bedrooms);
    const bathrooms = Number(data.bathrooms);

    // Required fields
    if (
      !title ||
      !purpose ||
      !type ||
      !location ||
      !price ||
      !area ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required property fields.",
        },
        { status: 400 }
      );
    }

    // Number validation
    if (
      !Number.isFinite(bedrooms) ||
      !Number.isFinite(bathrooms) ||
      bedrooms < 0 ||
      bathrooms < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Bedrooms and bathrooms must be valid numbers.",
        },
        { status: 400 }
      );
    }

    // Purpose validation
    if (!["Buy", "Rent"].includes(purpose)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property purpose.",
        },
        { status: 400 }
      );
    }

    // Type validation
    const allowedTypes = [
      "House",
      "Villa",
      "Apartment",
      "Plot",
      "Commercial",
    ];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property type.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // INSERT INTO SUPABASE
    // ========================================

    const { data: newProperty, error } = await supabase
      .from("properties")
      .insert({
        title,
        purpose,
        type,
        location,
        price,
        area,
        bedrooms,
        bathrooms,
        image: data.image
          ? String(data.image).trim()
          : null,
        description,
      })
      .select()
      .single();

    if (error) {
      console.error("POST properties Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Property added successfully.",
        property: newProperty,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST property error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid property data.",
      },
      { status: 400 }
    );
  }
}

// ========================================
// DELETE PROPERTY
// ========================================

export async function DELETE(request: Request) {
  try {
    const data = await request.json();

    const id = Number(data.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid property ID is required.",
        },
        { status: 400 }
      );
    }

    const { data: deletedProperty, error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("DELETE property Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully.",
      property: deletedProperty,
    });
  } catch (error) {
    console.error("DELETE property error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while deleting the property.",
      },
      { status: 500 }
    );
  }
}