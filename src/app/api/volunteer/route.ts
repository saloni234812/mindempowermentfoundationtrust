import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, availability, skills, statement, resumeUrl } = body;

    // Build Email Body HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0; font-size: 22px;">New Volunteer Application Received</h2>
        </div>
        
        <p style="font-size: 14px; color: #333333; leading-height: 1.5;">
          A new volunteer has submitted an application through the Mind Empowerment Foundation Trust website portal. Below are the details:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 35%; color: #555555; border-bottom: 1px solid #eeeeee;">Full Name:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Email Address:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Phone Number:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Location / Address:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Availability:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee; text-transform: capitalize; font-weight: 500;">${availability}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Skills Offered:</td>
            <td style="padding: 10px; color: #111111; border-bottom: 1px solid #eeeeee; font-weight: 500;">${Array.isArray(skills) ? skills.join(", ") : skills}</td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; padding: 15px; background-color: #fffaf0; border-left: 4px solid #ea580c; border-radius: 6px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #c2410c; font-size: 14px;">Statement of Interest & Purpose:</h4>
          <p style="margin: 0; color: #4b5563; line-height: 1.6; font-style: italic; font-size: 13px;">"${statement || "No statement provided."}"</p>
        </div>
        
        ${resumeUrl ? `
          <div style="margin-top: 25px; text-align: center;">
            <a href="${resumeUrl}" style="background-color: #ea580c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 2px 4px rgba(234, 88, 12, 0.2);">View Uploaded Resume</a>
          </div>
        ` : ""}
        
        <div style="margin-top: 35px; border-top: 1px solid #eeeeee; padding-top: 15px; text-align: center;">
          <p style="font-size: 11px; color: #888888; margin: 0;">
            This notification was generated automatically from the Mind Empowerment Foundation Trust website.
          </p>
        </div>
      </div>
    `;

    // Configure SMTP Transport
    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = Number(process.env.EMAIL_PORT) || 465;
    const secure = process.env.EMAIL_SECURE !== "false";
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.warn("SMTP credentials (EMAIL_USER, EMAIL_PASS) not configured in env. Volunteer application saved, but notification email was skipped.");
      return NextResponse.json({ 
        success: true, 
        message: "Application registered. (Warning: SMTP environment variables are not configured on host)" 
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"MEFT Website Portal" <${user}>`,
      to: "mindempowermentfoundationtrust@gmail.com",
      subject: `New Volunteer Application: ${name}`,
      text: `New Volunteer Application\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nAvailability: ${availability}\nSkills: ${skills}\nStatement: ${statement}\nResume: ${resumeUrl || "None"}`,
      html: htmlContent,
    });

    console.log("Volunteer application notification email sent successfully to mindempowermentfoundationtrust@gmail.com");
    return NextResponse.json({ success: true, message: "Application received and notification email sent successfully." });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error processing volunteer application email:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
