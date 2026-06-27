import { NextResponse } from "next/server";
import { db, isMock } from "@/lib/firebaseAdmin";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    let docId = "mock-contact-id";

    // 1. Write to Firestore
    if (!isMock && db) {
      const docRef = await db.collection("contacts").add(payload);
      docId = docRef.id;
      console.log(`[Firestore] Contact message saved with ID: ${docId}`);
    } else {
      console.log("[Firestore Mock] Contact message logged:", payload);
    }

    // 2. Email Notification Alert via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Aaron Tech Contact <contact@aarontechno.com>",
          to: "kushal@aarontechno.com",
          subject: `Contact Inquiry - ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0A1628; border-bottom: 2px solid #C75B2A; padding-bottom: 10px;">Contact Inquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">From:</td><td>${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td>${subject}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td>${message}</td></tr>
              </table>
              <div style="margin-top: 30px; font-size: 11px; color: #64748B;">
                Lead generated automatically from website contact form. Firestore document ID: ${docId}
              </div>
            </div>
          `,
        });
        console.log(`[Resend] Contact email sent successfully to sales@`);
      } catch (emailError: any) {
        console.error("[Resend] Email delivery failed:", emailError.message);
      }
    } else {
      console.log("[Resend Mock] Email alert trigger skipped (RESEND_API_KEY missing)");
    }

    // 3. Sync to HubSpot CRM
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (hubspotToken) {
      try {
        const names = name.split(" ");
        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ") || "";

        const hubspotPayload = {
          properties: {
            email: email,
            firstname: firstName,
            lastname: lastName,
            message: `Contact Inquiry: Subject - ${subject}, Message - ${message}`,
          },
        };

        const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hubspotPayload),
        });

        if (response.ok) {
          console.log("[HubSpot] Contact created/synced successfully");
        } else {
          const errData = await response.json();
          console.error("[HubSpot] Lead sync failed:", errData);
        }
      } catch (hsError: any) {
        console.error("[HubSpot] Lead sync API error:", hsError.message);
      }
    } else {
      console.log("[HubSpot Mock] CRM sync skipped (HUBSPOT_ACCESS_TOKEN missing)");
    }

    return NextResponse.json({ success: true, id: docId });
  } catch (error: any) {
    console.error("Contact form processing error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
