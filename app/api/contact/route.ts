import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: string | null;
  property_title?: string | null;
  created_at: string;
  read: boolean;
};

// ===============================
// CREATE MESSAGE
// ===============================

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const newMessage = {
      name,
      email,
      phone,
      message,
      property_id: data.propertyId
        ? String(data.propertyId)
        : null,
      property_title: data.propertyTitle
        ? String(data.propertyTitle)
        : null,
      read: false,
    };

    const { data: savedMessage, error } = await supabaseAdmin
      .from("contact_messages")
      .insert(newMessage)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to save inquiry.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been sent successfully!",
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending your inquiry.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// GET ALL MESSAGES
// ===============================

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("SUPABASE FETCH ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to load inquiries.",
        },
        { status: 500 }
      );
    }

    const inquiries = (data || []).map(
      (item: ContactMessage) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
        propertyId: item.property_id,
        propertyTitle: item.property_title,
        createdAt: item.created_at,
        read: item.read,
      })
    );

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Contact API GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load inquiries.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// MARK MESSAGE AS READ
// ===============================

export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const messageId = Number(data.id);

    if (Number.isNaN(messageId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid message ID.",
        },
        { status: 400 }
      );
    }

    const {
      data: updatedMessage,
      error,
    } = await supabaseAdmin
      .from("contact_messages")
      .update({
        read: true,
      })
      .eq("id", messageId)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE UPDATE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to mark message as read.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message marked as read.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Contact API PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to mark message as read.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// DELETE MESSAGE
// ===============================

export async function DELETE(request: Request) {
  try {
    const data = await request.json();

    const messageId = Number(data.id);

    if (Number.isNaN(messageId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid message ID.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error("SUPABASE DELETE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete message.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Contact API DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete message.",
      },
      { status: 500 }
    );
  }
}