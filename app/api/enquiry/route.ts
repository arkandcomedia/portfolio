import nodemailer from "nodemailer";

// Every form on the site (contact, career, newsletter, coming-soon) posts here.
// Mail is sent through Gmail SMTP to ENQUIRY_TO (arkandco.media@gmail.com).

type Kind = "contact" | "career" | "newsletter" | "notify";

const SUBJECTS: Record<Kind, string> = {
  contact: "New enquiry",
  career: "New job application",
  newsletter: "New newsletter subscriber",
  notify: "Coming-soon sign-up",
};

const LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  name: "Name",
  email: "Email",
  phone: "Phone",
  venue: "Venue",
  service: "Service",
  message: "Message",
  page: "Sent from",
};

const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot: real people never fill this hidden field
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const kind = (["contact", "career", "newsletter", "notify"] as Kind[]).includes(body.kind as Kind)
    ? (body.kind as Kind)
    : "contact";

  const fields: Record<string, string> = {};
  for (const key of Object.keys(LABELS)) {
    const v = body[key];
    if (typeof v === "string" && v.trim()) fields[key] = v.trim().slice(0, key === "message" ? 5000 : 300);
  }

  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if ((kind === "contact" || kind === "career") && !fields.message) {
    return Response.json({ ok: false, error: "Please add a short message." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.ENQUIRY_TO || user;
  if (!user || !pass || !to) {
    console.error("[enquiry] GMAIL_USER / GMAIL_APP_PASSWORD are not set in .env.local");
    return Response.json(
      { ok: false, error: `Email isn't configured yet. Please write to us directly at arkandco.media@gmail.com.` },
      { status: 500 }
    );
  }

  const who = fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ") || fields.email;
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;color:#7A6E62;font:600 13px Arial;vertical-align:top;white-space:nowrap">${LABELS[k]}</td>` +
        `<td style="padding:8px 14px;color:#16110D;font:14px Arial;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="background:#FAF5EC;padding:28px">
      <div style="max-width:620px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eadfcf">
        <div style="background:#16110D;color:#FAF5EC;padding:20px 24px;font:700 18px Arial">
          ARK Hospitality · ${SUBJECTS[kind]}
        </div>
        <table style="width:100%;border-collapse:collapse;margin:10px 0">${rows}</table>
        <div style="padding:14px 24px;color:#7A6E62;font:12px Arial;border-top:1px solid #f0e8da">
          Reply to this email to answer ${esc(who)} directly.
        </div>
      </div>
    </div>`;

  const text = Object.entries(fields)
    .map(([k, v]) => `${LABELS[k]}: ${v}`)
    .join("\n");

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transport.sendMail({
      from: `"ARK Hospitality Website" <${user}>`,
      to,
      replyTo: fields.email,
      subject: `${SUBJECTS[kind]} — ${who}${fields.service ? ` · ${fields.service}` : ""}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return Response.json(
      { ok: false, error: "We couldn't send that just now. Please email arkandco.media@gmail.com directly." },
      { status: 502 }
    );
  }
}
