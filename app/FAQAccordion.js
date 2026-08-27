"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Who can use Major?",
    a: "Major only allows students to create accounts using a valid .edu email address, keeping the platform limited to verified students.",
  },
  {
    q: "What can I buy or sell?",
    a: "Students can list a wide range of permitted items, including college merch, lab equipment, art supplies, dorm essentials, textbooks, philosophy printouts, furniture, school supplies, and other campus-related items.",
  },
  {
    q: "Can I rent items instead of buying them?",
    a: "Yes. Students can list items for rent, giving other students access to things they may only need temporarily.",
  },
  {
    q: "Can I offer services on Major?",
    a: "Yes. Students can offer services to other students in their campus community, subject to Major's rules and prohibited-item and service policies. Students can also showcase their business through Major, like hair braiding, tutoring, or nails, as long as the service doesn't require certification. Major is not liable for student services.",
  },
  {
    q: "How do I find someone to buy from or sell to?",
    a: "You can browse listings, search for products or services, and connect with other users on Major. In our next update, students will be able to post short, interactive updates to ask around more directly, and to communicate with Major through iMessage.",
  },
  {
    q: "How do buyers and sellers communicate?",
    a: "Students can communicate through Major's live chat to discuss the transaction, ask questions, and coordinate details. In our next update, you'll be able to text Major in iMessage to find something, schedule, and pay within minutes.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are processed through Stripe, giving buyers and sellers a dedicated payment infrastructure instead of requiring them to exchange cash or payment information directly. This protects everyone involved: a buyer's funds aren't taken until the transaction is complete, and a seller's payout doesn't happen until it's complete either. Stripe holds the funds in between to make sure both sides fulfill their part.",
  },
  {
    q: "Does Major store my credit card information?",
    a: "Payment information is handled entirely through Stripe's encrypted infrastructure. Stripe is clear about what it does and doesn't store, making it one of the safest ways to handle payment information.",
  },
  {
    q: "Can I pay someone directly outside Major?",
    a: "We strongly recommend keeping all transactions and payments within Major. It's the safest way to protect both buyers and sellers.",
  },
  {
    q: "How does Major help keep transactions safe?",
    a: "Safety was one of the reasons Major was created. Features like verified accounts, in-app communication, Major payments through Stripe, transaction records, reporting tools, and campus meetup guidance all help keep students safe.",
  },
  {
    q: "What if a buyer or seller doesn't show up?",
    a: "Document the situation through Major and report repeated or serious issues so we can review the account or transaction.",
  },
  {
    q: "What happens if I'm transferring schools?",
    a: "Major is with you throughout your educational journey. When you transfer universities or begin a new institution for further education, please contact us and we'll verify your new university status and shift your account into your new university's ecosystem.",
  },
  {
    q: "How can I protect myself during an in-person meetup?",
    a: "Meet in an appropriate public campus location, tell someone where you're going, keep communication in Major's live chat, and don't feel pressured to complete a transaction if something feels unsafe.",
  },
  {
    q: "Can I report another user?",
    a: "Yes. Please report suspicious behavior, prohibited listings, harassment, fraud, or other violations using our Report feature.",
  },
  {
    q: "Do you sell my data?",
    a: "Major was built for and by students, so we don't collect any unnecessary data. We also do not, and will never, sell data to third-party data companies — we believe that's predatory to students. For more on how we handle data, please contact us.",
  },
  {
    q: "Do you need the app to use Major?",
    a: "No, you don't need the iOS or Android app to use Major. The website supports every function, so all students have access regardless of device. For accessibility enhancements, please contact us.",
  },
  {
    q: "What if I want to donate?",
    a: "Major connects you to your campus's donation centers and campus organizations. You can list items for free in-app, or reach out to your campus donation center directly.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ maxWidth: 720 }}>
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "18px 0",
                textAlign: "left",
                fontFamily: "var(--font)",
                fontSize: 12,
                letterSpacing: "0.01em",
              }}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span style={{ flexShrink: 0 }}>{isOpen ? "\u2212" : "+"}</span>
            </button>
            {isOpen && (
              <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--grey-hover)", paddingBottom: 20, maxWidth: 640, margin: 0 }}>
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
