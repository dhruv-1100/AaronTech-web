import { NextResponse } from "next/server";
import { db, isMock } from "@/lib/firebaseAdmin";
import { Resend } from "resend";
import { escapeHtml, validateEmail, MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      productCategory,
      productDetails,
      quantity,
      targetPrice,
      needBy,
      message,
      files,
    } = body;

    // Server-side validation
    if (!companyName || !contactName || !email || !phone || !productCategory || !productDetails || !quantity) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (
      companyName.length > MAX_NAME_LENGTH ||
      contactName.length > MAX_NAME_LENGTH ||
      productDetails.length > MAX_MESSAGE_LENGTH ||
      (message && message.length > MAX_MESSAGE_LENGTH)
    ) {
      return NextResponse.json(
        { success: false, error: "One or more fields exceed the maximum allowed length" },
        { status: 400 }
      );
    }

    const payload = {
      companyName,
      contactName,
      email,
      phone,
      productCategory,
      productDetails,
      quantity,
      targetPrice: targetPrice || "Not specified",
      needBy: needBy || "Not specified",
      message: message || "No additional message",
      files: files ? files.map((f: any) => ({ name: f.name, size: f.size, type: f.type })) : [],
      createdAt: new Date().toISOString(),
    };

    let docId = "mock-rfq-id";

    // 1. Write to Firestore
    if (!isMock && db) {
      const docRef = await db.collection("rfqs").add(payload);
      docId = docRef.id;
      console.log(`[Firestore] RFQ saved successfully with ID: ${docId}`);
    } else {
      console.log("[Firestore Mock] RFQ submission logged:", payload);
    }

    // 2. Send email notifications using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // A. Admin Alert Email
        await resend.emails.send({
          from: "Aaron Tech RFQ <rfq@aarontechno.com>",
          to: "kushal@aarontechno.com",
          subject: `New RFQ Received - ${companyName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0A1628; border-bottom: 2px solid #C75B2A; padding-bottom: 10px;">New RFQ Submission</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Company:</td><td>${escapeHtml(companyName)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Contact Name:</td><td>${escapeHtml(contactName)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${escapeHtml(email)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${escapeHtml(phone)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Category:</td><td>${escapeHtml(productCategory)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Specs & Details:</td><td>${escapeHtml(productDetails)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Quantity:</td><td>${escapeHtml(quantity)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Target Price:</td><td>${targetPrice ? escapeHtml(targetPrice) : "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Need By:</td><td>${needBy ? escapeHtml(needBy) : "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Additional Msg:</td><td>${message ? escapeHtml(message) : "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Attached Files:</td><td>${files && files.length > 0 ? files.map((f: any) => escapeHtml(f.name)).join(", ") : "None"}</td></tr>
              </table>
              <div style="margin-top: 30px; font-size: 11px; color: #64748B;">
                Lead generated automatically from website form submission. Firestore document ID: ${docId}
              </div>
            </div>
          `,
          attachments: files ? files.map((f: any) => ({
            filename: f.name,
            content: Buffer.from(f.base64.split(",")[1], "base64"),
          })) : [],
        });

        // B. Customer Confirmation Copy
        await resend.emails.send({
          from: "Aaron Technologies <sourcing@aarontechno.com>",
          to: email,
          subject: "We've received your Request for Quote (RFQ)",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0A1628; border-bottom: 2px solid #C75B2A; padding-bottom: 10px;">Quote Request Received</h2>
              <p>Hello ${escapeHtml(contactName)},</p>
              <p>Thank you for requesting a quote from Aaron Technologies Inc. Our engineering team is currently reviewing your specifications and drawings.</p>
              <p>We source directly from vetted, ISO-certified manufacturers to deliver competitive landed-cost quotes, typically in 24 to 48 hours.</p>
              
              <h4 style="color: #0A1628; margin-top: 25px; margin-bottom: 10px;">Sourcing Summary:</h4>
              <ul style="padding-left: 20px;">
                <li><strong>Product Category:</strong> ${escapeHtml(productCategory)}</li>
                <li><strong>Quantity:</strong> ${escapeHtml(quantity)}</li>
                <li><strong>Target Price:</strong> ${targetPrice ? escapeHtml(targetPrice) : "N/A"}</li>
                <li><strong>Need By:</strong> ${needBy ? escapeHtml(needBy) : "N/A"}</li>
                <li><strong>Attached Drawings:</strong> ${files && files.length > 0 ? files.map((f: any) => escapeHtml(f.name)).join(", ") : "None"}</li>
              </ul>
              
              <p>If we have any clarifying questions regarding your tolerances or standards, a sourcing manager will reach out directly.</p>
              <p>Best Regards,</p>
              <p><strong>Sourcing Support Team</strong><br/>Aaron Technologies Inc.</p>
              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748B;">
                Aaron Technologies Inc. · New Jersey, United States<br/>
                Phone: +1 640 272 1906 · Email: kushal@aarontechno.com
              </div>
            </div>
          `,
        });
        console.log(`[Resend] Emails sent successfully to sales@ and ${email}`);
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
        const names = contactName.split(" ");
        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ") || "";

        const hubspotPayload = {
          properties: {
            email: email,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            company: companyName,
            message: `RFQ: Category - ${productCategory}, Qty - ${quantity}, Target - ${targetPrice}, Message - ${message}`,
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
        } else if (response.status === 409) {
          // Handle existing contact conflict — update instead
          try {
            const conflictData = await response.json();
            const existingId = conflictData?.message?.match(/Existing ID: (\d+)/)?.[1];
            if (existingId) {
              const patchResponse = await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${hubspotToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(hubspotPayload),
                }
              );
              if (patchResponse.ok) {
                console.log(`[HubSpot] Existing contact ${existingId} updated successfully`);
              } else {
                const patchErr = await patchResponse.json();
                console.error(`[HubSpot] Failed to update existing contact ${existingId}:`, patchErr);
              }
            } else {
              console.error("[HubSpot] 409 conflict but could not extract existing contact ID:", conflictData);
            }
          } catch (conflictError: any) {
            console.error("[HubSpot] Error handling 409 conflict:", conflictError.message);
          }
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
    console.error("RFQ submission processing error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
