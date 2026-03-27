const getTransporter = async () => {
  const nodemailer = await import("nodemailer");
  return nodemailer.default.createTransport({
    host: process.env.GMAIL_HOST || "smtp-relay.gmail.com",
    port: parseInt(process.env.GMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM = `"Vihara — The Courtyard" <${process.env.GMAIL_USER}>`;

const base = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F1EA;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e8e3d9;max-width:560px;width:100%;">
        <tr><td style="background:#2D4A3E;padding:28px 36px;">
          <p style="margin:0;color:#D9B59D;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Vihara — The Courtyard</p>
        </td></tr>
        <tr><td style="padding:36px;">
          ${content}
        </td></tr>
        <tr><td style="background:#f9f7f4;padding:20px 36px;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#999;font-family:Arial,sans-serif;line-height:1.6;">
            Kothur, ORR Exit 15 or 16 &nbsp;·&nbsp; +91 9032169777 &nbsp;·&nbsp; @viharathecourtyard<br>
            <a href="https://vihara.homes" style="color:#2D4A3E;">vihara.homes</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:6px 0;font-size:12px;color:#888;font-family:Arial,sans-serif;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#1a1a1a;font-family:Arial,sans-serif;font-weight:600;">${value}</td>
  </tr>`;

export async function sendGuestBookingReceived(b: {
  name: string;
  email: string;
  booking_ref: string;
  plan_label: string;
  booking_type: string;
  day_type: string;
  check_in: string;
  check_out?: string;
  guests: number;
  total_amount: number;
  payment_method: string;
}) {
  const transporter = await getTransporter();
  const isManual = b.payment_method === "manual";
  const html = base(`
    <h1 style="margin:0 0 6px;font-size:26px;color:#1a1a1a;font-weight:normal;">
      ${isManual ? "Booking Request Received" : "Booking Confirmed!"}
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,sans-serif;">
      ${
        isManual
          ? "We've received your booking request and payment. Our team will verify and confirm within 2–4 hours."
          : "Your payment was successful. Your booking is confirmed!"
      }
    </p>
    <div style="background:#2D4A3E;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 2px;font-size:10px;color:#D9B59D;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Booking Reference</p>
      <p style="margin:0;font-size:24px;color:#fff;letter-spacing:4px;font-family:Courier,monospace;">${b.booking_ref}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Guest", b.name)}
      ${row("Package", b.plan_label)}
      ${row("Type", `${b.booking_type.charAt(0).toUpperCase() + b.booking_type.slice(1)} · ${b.day_type}`)}
      ${row("Check In", b.check_in)}
      ${b.check_out ? row("Check Out", b.check_out) : ""}
      ${row("Guests", String(b.guests))}
      ${row("Amount", `₹${b.total_amount.toLocaleString()}`)}
      ${row("Payment", b.payment_method === "razorpay" ? "Razorpay (Online)" : "Manual Transfer")}
    </table>
    ${
      isManual
        ? `
    <div style="background:#fff8f0;border:1px solid #f0e0c8;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:#B85C38;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">⏳ Pending Verification</p>
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
        Our team will verify your payment screenshot and send a confirmation email within 2–4 hours.
      </p>
    </div>`
        : `
    <div style="background:#f0f9f4;border:1px solid #c8e8d4;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:#2D7A4E;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✓ Payment Confirmed</p>
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
        Your booking is confirmed. We look forward to welcoming you to Vihara!
      </p>
    </div>`
    }
    <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
      Track your booking at <a href="https://vihara.homes/my-booking" style="color:#2D4A3E;font-weight:600;">vihara.homes/my-booking</a>
    </p>
    <p style="margin:16px 0 0;font-size:13px;color:#555;font-family:Arial,sans-serif;">
      Questions? Call us at <strong>+91 9032169777</strong> or reply to this email.
    </p>
  `);

  await transporter.sendMail({
    from: FROM,
    to: b.email,
    subject: isManual
      ? `Booking Request Received — ${b.booking_ref} | Vihara`
      : `Booking Confirmed — ${b.booking_ref} | Vihara`,
    html,
  });
}

export async function sendAdminNewBookingAlert(b: {
  name: string;
  email: string;
  phone: string;
  booking_ref: string;
  plan_label: string;
  booking_type: string;
  day_type: string;
  check_in: string;
  check_out?: string;
  guests: number;
  total_amount: number;
  payment_method: string;
  requests?: string;
}) {
  const transporter = await getTransporter();
  const html = base(`
    <h1 style="margin:0 0 6px;font-size:22px;color:#1a1a1a;font-weight:normal;">
      🔔 New Booking — ${b.booking_ref}
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:#888;font-family:Arial,sans-serif;">
      Manual payment — screenshot uploaded, awaiting your verification.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Ref", b.booking_ref)}
      ${row("Name", b.name)}
      ${row("Email", b.email)}
      ${row("Phone", b.phone)}
      ${row("Package", b.plan_label)}
      ${row("Type", `${b.booking_type} · ${b.day_type}`)}
      ${row("Check In", b.check_in)}
      ${b.check_out ? row("Check Out", b.check_out) : ""}
      ${row("Guests", String(b.guests))}
      ${row("Amount", `₹${b.total_amount.toLocaleString()}`)}
      ${row("Payment", "Manual — verify screenshot")}
      ${b.requests ? row("Requests", b.requests) : ""}
    </table>
    <a href="https://vihara.homes/admin" style="display:inline-block;background:#2D4A3E;color:#fff;text-decoration:none;padding:12px 28px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">
      Open Admin Dashboard →
    </a>
  `);

  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Vihara] New Booking ${b.booking_ref} — ${b.name} (Manual ⏳)`,
    html,
  });
}

export async function sendGuestBookingConfirmed(b: {
  name: string;
  email: string;
  booking_ref: string;
  plan_label: string;
  check_in: string;
  check_out?: string;
  guests: number;
  total_amount: number;
  admin_notes?: string;
}) {
  const transporter = await getTransporter();
  const html = base(`
    <h1 style="margin:0 0 6px;font-size:26px;color:#1a1a1a;font-weight:normal;">Your Booking is Confirmed! 🎉</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,sans-serif;">
      We've verified your payment and confirmed your booking at Vihara. We can't wait to welcome you!
    </p>
    <div style="background:#2D4A3E;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 2px;font-size:10px;color:#D9B59D;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Booking Reference</p>
      <p style="margin:0;font-size:24px;color:#fff;letter-spacing:4px;font-family:Courier,monospace;">${b.booking_ref}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Guest", b.name)}
      ${row("Package", b.plan_label)}
      ${row("Check In", b.check_in)}
      ${b.check_out ? row("Check Out", b.check_out) : ""}
      ${row("Guests", String(b.guests))}
      ${row("Amount Paid", `₹${b.total_amount.toLocaleString()}`)}
    </table>
    <div style="background:#f0f9f4;border:1px solid #c8e8d4;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:#2D7A4E;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✓ Confirmed</p>
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
        Check-in at <strong>2:00 PM</strong>. Check-out by <strong>11:00 AM</strong>.<br>
        Location: Kothur, ORR Exit 15 or 16, Hyderabad.
      </p>
    </div>
    ${
      b.admin_notes
        ? `
    <div style="background:#f9f7f4;border:1px solid #eee;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Note from our team</p>
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">${b.admin_notes}</p>
    </div>`
        : ""
    }
    <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
      For directions, call <strong>+91 9032169777</strong> or reply to this email.
    </p>
  `);

  await transporter.sendMail({
    from: FROM,
    to: b.email,
    subject: `Your Vihara Booking is Confirmed — ${b.booking_ref}`,
    html,
  });
}

export async function sendGuestBookingRejected(b: {
  name: string;
  email: string;
  booking_ref: string;
  admin_notes?: string;
}) {
  const transporter = await getTransporter();
  const html = base(`
    <h1 style="margin:0 0 6px;font-size:26px;color:#1a1a1a;font-weight:normal;">Booking Update</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,sans-serif;">
      Unfortunately we were unable to confirm your booking at this time.
    </p>
    <div style="background:#2D4A3E;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 2px;font-size:10px;color:#D9B59D;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Booking Reference</p>
      <p style="margin:0;font-size:24px;color:#fff;letter-spacing:4px;font-family:Courier,monospace;">${b.booking_ref}</p>
    </div>
    ${
      b.admin_notes
        ? `
    <div style="background:#fff8f0;border:1px solid #f0e0c8;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:#B85C38;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Reason</p>
      <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">${b.admin_notes}</p>
    </div>`
        : ""
    }
    <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.6;">
      Please contact us at <strong>+91 9032169777</strong> or reply to this email.
    </p>
  `);

  await transporter.sendMail({
    from: FROM,
    to: b.email,
    subject: `Regarding Your Vihara Booking — ${b.booking_ref}`,
    html,
  });
}
