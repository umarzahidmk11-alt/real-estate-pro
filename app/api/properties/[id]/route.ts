import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ========================================
// GET SINGLE PROPERTY
// ========================================

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (!Number.isInteger(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property ID.",
        },
        { status: 400 }
      );
    }

    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();

    if (error) {
      console.error("GET single property Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("GET single property error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load property.",
      },
      { status: 500 }
    );
  }
}

// ========================================
// UPDATE PROPERTY
// ========================================

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (!Number.isInteger(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property ID.",
        },
        { status: 400 }
      );
    }

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

    // ========================================
    // REQUIRED FIELD VALIDATION
    // ========================================

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

    // ========================================
    // NUMBER VALIDATION
    // ========================================

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

    // ========================================
    // PURPOSE VALIDATION
    // ========================================

    if (!["Buy", "Rent"].includes(purpose)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property purpose.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // PROPERTY TYPE VALIDATION
    // ========================================

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
    // UPDATE SUPABASE
    // ========================================

    const { data: updatedProperty, error } = await supabase
      .from("properties")
      .update({
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
      .eq("id", propertyId)
      .select()
      .single();

    if (error) {
      console.error("PUT property Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to update property.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property updated successfully.",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("PUT property error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update property.",
      },
      { status: 500 }
    );
  }
}

// ========================================
// DELETE SINGLE PROPERTY
// ========================================

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (!Number.isInteger(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property ID.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // DELETE FROM SUPABASE
    // ========================================

    const { data: deletedProperty, error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyId)
      .select()
      .single();

    if (error) {
      console.error("DELETE property Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete property.",
        },
        { status: 500 }
      );
    }

    if (!deletedProperty) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully.",
      property: deletedProperty,
    });
  } catch (error) {
    console.error("DELETE single property error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete property.",
      },
      { status: 500 }
    );
  }
}