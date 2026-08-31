import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const DEFAULT_SETTINGS = {
  siteName: "Real Estate",
  tagline: "Find your perfect property",
  email: "admin@example.com",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
  currency: "PKR",
  maintenanceMode: false,
  contactForm: true,
};

// ===============================
// GET SETTINGS
// ===============================

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase settings GET error:", error);

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
      settings: {
        siteName: data.site_name,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        address: data.address,
        currency: data.currency,
        maintenanceMode: data.maintenance_mode,
        contactForm: data.contact_form,
      },
    });
  } catch (error) {
    console.error("Settings GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while loading settings.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// UPDATE SETTINGS
// ===============================

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const settings = {
      site_name: String(
        body.siteName ?? DEFAULT_SETTINGS.siteName
      ).trim(),

      tagline: String(
        body.tagline ?? DEFAULT_SETTINGS.tagline
      ).trim(),

      email: String(
        body.email ?? DEFAULT_SETTINGS.email
      ).trim(),

      phone: String(
        body.phone ?? DEFAULT_SETTINGS.phone
      ).trim(),

      address: String(
        body.address ?? DEFAULT_SETTINGS.address
      ).trim(),

      currency: String(
        body.currency ?? DEFAULT_SETTINGS.currency
      ).trim(),

      maintenance_mode:
        body.maintenanceMode !== undefined
          ? Boolean(body.maintenanceMode)
          : DEFAULT_SETTINGS.maintenanceMode,

      contact_form:
        body.contactForm !== undefined
          ? Boolean(body.contactForm)
          : DEFAULT_SETTINGS.contactForm,

      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          id: 1,
          ...settings,
        },
        {
          onConflict: "id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase settings PUT error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully.",
      settings: {
        siteName: data.site_name,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        address: data.address,
        currency: data.currency,
        maintenanceMode: data.maintenance_mode,
        contactForm: data.contact_form,
      },
    });
  } catch (error) {
    console.error("Settings PUT error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while saving settings.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// RESET SETTINGS
// ===============================

export async function DELETE() {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          id: 1,
          site_name: DEFAULT_SETTINGS.siteName,
          tagline: DEFAULT_SETTINGS.tagline,
          email: DEFAULT_SETTINGS.email,
          phone: DEFAULT_SETTINGS.phone,
          address: DEFAULT_SETTINGS.address,
          currency: DEFAULT_SETTINGS.currency,
          maintenance_mode:
            DEFAULT_SETTINGS.maintenanceMode,
          contact_form:
            DEFAULT_SETTINGS.contactForm,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error(
        "Supabase settings DELETE error:",
        error
      );

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
      message: "Settings reset successfully.",
      settings: {
        siteName: data.site_name,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        address: data.address,
        currency: data.currency,
        maintenanceMode: data.maintenance_mode,
        contactForm: data.contact_form,
      },
    });
  } catch (error) {
    console.error("Settings DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while resetting settings.",
      },
      { status: 500 }
    );
  }
}