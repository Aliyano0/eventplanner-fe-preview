import type { LegalDocument } from "./types";

/**
 * Terms & Conditions — text from the client's "EventPlan Documentation.pdf" (the "By accessing or using EventPlan…"
 * paragraph and sections 1–12). The PDF has no heading for this document; the title is added here.
 */
export const terms: LegalDocument = {
  title: "Terms & Conditions",
  intro: [
    {
      type: "p",
      text: "By accessing or using EventPlan, you agree to these Terms. If you do not agree with them, please do not use the platform.",
    },
  ],
  sections: [
    {
      id: "about-eventplan",
      title: "1. About EventPlan",
      blocks: [
        {
          type: "p",
          text: "EventPlan is an online platform that helps users discover event-related vendors, venues and service providers and connect with them.",
        },
        {
          type: "p",
          text: "EventPlan may provide tools for event planning, vendor discovery, enquiries, reviews, profiles and other related features.",
        },
        {
          type: "p",
          text: "Unless specifically stated otherwise, EventPlan is **not the event vendor, venue, organiser, contractor or service provider**.",
        },
        { type: "p", text: "Vendors listed on EventPlan are independent businesses or individuals." },
      ],
    },
    {
      id: "using-eventplan",
      title: "2. Using EventPlan",
      blocks: [
        { type: "p", text: "You agree to use EventPlan only for lawful purposes and in accordance with these Terms." },
        { type: "p", text: "You must not:" },
        {
          type: "list",
          items: [
            "use EventPlan for fraudulent or misleading purposes;",
            "impersonate another person or business;",
            "provide false or misleading information;",
            "create accounts for purposes of abuse, spam or manipulation;",
            "attempt to gain unauthorised access to another account;",
            "interfere with the operation or security of the platform;",
            "scrape, copy or commercially exploit platform content without permission;",
            "upload malicious software or harmful content;",
            "use EventPlan to harass, threaten or deceive another person;",
            "use the platform to facilitate unlawful activities.",
          ],
        },
        { type: "p", text: "We reserve the right to suspend or terminate accounts that violate these Terms." },
      ],
    },
    {
      id: "accounts",
      title: "3. Accounts",
      blocks: [
        { type: "p", text: "Certain EventPlan features may require you to create an account." },
        {
          type: "p",
          text: "You are responsible for providing accurate information and maintaining the confidentiality of your login credentials.",
        },
        { type: "p", text: "You are responsible for activity carried out through your account." },
        {
          type: "p",
          text: "Please contact us promptly if you believe your account has been accessed without your permission.",
        },
      ],
    },
    {
      id: "vendors-and-customers",
      title: "4. Vendors and Customers",
      blocks: [
        { type: "p", text: "EventPlan operates as a marketplace and connection platform." },
        {
          type: "p",
          text: "When a customer contacts or engages a vendor through EventPlan, the customer and vendor may enter into a separate agreement.",
        },
        { type: "p", text: "The vendor is responsible for:" },
        {
          type: "list",
          items: [
            "providing accurate service information;",
            "confirming availability;",
            "providing accurate pricing and quotations;",
            "communicating terms and conditions;",
            "delivering the agreed services;",
            "obtaining any required licences or permissions;",
            "meeting applicable legal and safety requirements;",
            "handling cancellations, refunds or changes relating to their services.",
          ],
        },
        {
          type: "p",
          text: "Customers are responsible for reviewing a vendor's terms, quotation, availability and requirements before agreeing to purchase or engage their services.",
        },
      ],
    },
    {
      id: "enquiries-and-leads",
      title: "5. Enquiries and Leads",
      blocks: [
        {
          type: "p",
          text: "When you submit an enquiry, you authorise EventPlan to share the relevant information with the vendor or vendors selected for the enquiry so they can respond to your request.",
        },
        {
          type: "p",
          text: "EventPlan may contact you regarding your enquiry, account or use of the platform.",
        },
        {
          type: "p",
          text: "Submitting an enquiry does not guarantee that a vendor will be available, respond, accept your request or provide services.",
        },
      ],
    },
    {
      id: "vendor-content",
      title: "6. Vendor Content",
      blocks: [
        {
          type: "p",
          text: `Vendors may upload photographs, videos, descriptions, logos, pricing information and other materials ("Vendor Content").`,
        },
        {
          type: "p",
          text: "Vendors remain responsible for ensuring that they have the necessary rights and permissions to upload and display such content.",
        },
        {
          type: "p",
          text: "By uploading Vendor Content, the vendor grants EventPlan a non-exclusive, worldwide, royalty-free licence to use, reproduce, display and distribute that content for operating, marketing and promoting the EventPlan platform.",
        },
      ],
    },
    {
      id: "reviews",
      title: "7. Reviews",
      blocks: [
        { type: "p", text: "Customers may be permitted to review vendors after an interaction or service." },
        { type: "p", text: "Reviews must reflect genuine experiences and must not contain:" },
        {
          type: "list",
          items: [
            "false or misleading claims;",
            "threats or harassment;",
            "discriminatory or hateful content;",
            "personal or confidential information;",
            "spam;",
            "promotional content;",
            "content submitted in exchange for an undisclosed benefit;",
            "content intended to artificially manipulate ratings.",
          ],
        },
        { type: "p", text: "EventPlan may remove or restrict reviews that violate its Review Guidelines." },
      ],
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property",
      blocks: [
        {
          type: "p",
          text: "The EventPlan name, branding, website design, software, text, graphics and other platform materials are owned by or licensed to EventPlan unless otherwise stated.",
        },
        {
          type: "p",
          text: "You may not reproduce, modify, distribute, sell or commercially exploit EventPlan content without our prior written permission.",
        },
      ],
    },
    {
      id: "third-party-services",
      title: "9. Third-Party Services",
      blocks: [
        {
          type: "p",
          text: "EventPlan may contain links, integrations or information relating to third-party websites, vendors or services.",
        },
        {
          type: "p",
          text: "We are not responsible for the content, availability, policies or performance of third-party services.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "10. Disclaimer",
      blocks: [
        { type: "p", text: "Information provided by vendors is supplied by the vendors themselves." },
        { type: "p", text: "EventPlan does not guarantee:" },
        {
          type: "list",
          items: [
            "the quality of a vendor's services;",
            "vendor availability;",
            "the accuracy of vendor information;",
            "that a vendor will meet your expectations;",
            "that an event will be delivered without problems;",
            "that a vendor's services are suitable for your particular event.",
          ],
        },
        {
          type: "p",
          text: "Customers should independently verify important information before entering into an agreement with a vendor.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "11. Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "To the maximum extent permitted by applicable law, EventPlan will not be responsible for indirect, incidental, consequential or special losses arising from a customer's interaction or transaction with a vendor.",
        },
        {
          type: "p",
          text: "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
        },
      ],
    },
    {
      id: "suspension-and-termination",
      title: "12. Suspension and Termination",
      blocks: [
        {
          type: "p",
          text: "We may suspend or terminate access to EventPlan where we reasonably believe that a user has violated these Terms, engaged in fraudulent activity, abused the platform or created a risk to other users or EventPlan.",
        },
      ],
    },
  ],
};
