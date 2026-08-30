import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Message = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

// =========================
// GET - Get All Messages
// =========================

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("GET messages error:", error);

      return NextResponse.json(
        {
          message: "Failed to load messages.",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const messages: Message[] = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone || "",
      subject: item.subject || "",
      message: item.message,
      createdAt: item.created_at,
    }));

    return NextResponse.json(messages, {
      status: 200,
    });
  } catch (error) {
    console.error("GET messages error:", error);

    return NextResponse.json(
      {
        message: "Failed to load messages.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// POST - Create Message
// =========================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message:
            "Name, email and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          name: String(name).trim(),
          email: String(email).trim(),
          phone: phone ? String(phone).trim() : "",
          subject: subject
            ? String(subject).trim()
            : "",
          message: String(message).trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("POST message error:", error);

      return NextResponse.json(
        {
          message: "Failed to save message.",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const newMessage: Message = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject || "",
      message: data.message,
      createdAt: data.created_at,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
        data: newMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST message error:", error);

    return NextResponse.json(
      {
        message: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// DELETE - Delete Message
// =========================

export async function DELETE(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          message: "Message ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE message error:", error);

      return NextResponse.json(
        {
          message: "Failed to delete message.",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Message deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE message error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete message.",
      },
      {
        status: 500,
      }
    );
  }
}



