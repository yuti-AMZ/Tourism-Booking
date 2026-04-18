// Email simulation — logs to console in dev, ready for Resend in production
// To use Resend: npm install resend, then replace the console.log with Resend API calls

interface BookingEmailProps {
  to: string;
  name: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}

export async function sendBookingConfirmation(props: BookingEmailProps) {
  const { to, name, destination, checkIn, checkOut, guests, totalPrice } = props;

  // Simulate email
  console.log("\n📧 ===== EMAIL SIMULATION =====");
  console.log(`To: ${to}`);
  console.log(`Subject: Booking Confirmed – ${destination}`);
  console.log(`
  Dear ${name},

  Your booking has been confirmed! 🎉

  📍 Destination: ${destination}
  📅 Check-in:    ${checkIn}
  📅 Check-out:   ${checkOut}
  👥 Guests:      ${guests}
  💰 Total:       $${totalPrice}

  Thank you for choosing EthioTour.
  We look forward to welcoming you to Ethiopia!

  — The EthioTour Team
  `);
  console.log("==============================\n");

  // Uncomment below to use Resend in production:
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "EthioTour <noreply@ethiotour.com>",
  //   to,
  //   subject: `Booking Confirmed – ${destination}`,
  //   html: `<h1>Booking Confirmed!</h1><p>...</p>`,
  // });
}

export async function sendWelcomeEmail(to: string, name: string) {
  console.log("\n📧 ===== WELCOME EMAIL =====");
  console.log(`To: ${to}`);
  console.log(`Subject: Welcome to EthioTour, ${name}!`);
  console.log(`
  Dear ${name},

  Welcome to EthioTour! 🇪🇹

  You're now part of a community of travelers
  discovering the wonders of Ethiopia.

  Start exploring: https://ethiotour.com/destinations

  — The EthioTour Team
  `);
  console.log("===========================\n");
}
