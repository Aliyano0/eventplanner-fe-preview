import type { LegalDocument } from "./types";

/**
 * Cookie Policy & Consent — text from the client's "EventPlan Documentation.pdf".
 *
 * Two notes on fidelity:
 * - The PDF's "Cookie Settings [link/button]" is a design placeholder; the text is kept ("Cookie Settings") without
 *   the bracketed note, and it is not a link because no cookie-settings tool exists yet.
 * - The last sentence of the PDF has no full stop; one is added.
 */
export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy & Consent",
  intro: [
    {
      type: "p",
      text: "EventPlan uses cookies and similar technologies to operate our website, understand how visitors use the platform and improve your experience.",
    },
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      blocks: [
        { type: "p", text: "Cookies are small text files stored on your device when you visit a website." },
        {
          type: "p",
          text: "They allow websites to remember information about your visit and perform certain functions.",
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      title: "2. How We Use Cookies",
      blocks: [{ type: "p", text: "EventPlan may use cookies for the following purposes:" }],
      subsections: [
        {
          title: "Essential Cookies",
          blocks: [
            { type: "p", text: "These cookies are necessary for the website to function." },
            { type: "p", text: "They may support:" },
            {
              type: "list",
              items: [
                "account login;",
                "security;",
                "session management;",
                "basic website functionality;",
                "fraud prevention.",
              ],
            },
            {
              type: "p",
              text: "These cookies cannot generally be disabled through our cookie preference tool because the website may not function properly without them.",
            },
          ],
        },
        {
          title: "Preference Cookies",
          blocks: [
            {
              type: "p",
              text: "These cookies allow EventPlan to remember choices such as preferences, language, currency or other settings.",
            },
          ],
        },
        {
          title: "Analytics Cookies",
          blocks: [
            { type: "p", text: "Analytics cookies help us understand how people use EventPlan." },
            { type: "p", text: "They may provide information such as:" },
            {
              type: "list",
              items: [
                "pages visited;",
                "time spent on pages;",
                "traffic sources;",
                "device type;",
                "general website interactions.",
              ],
            },
            { type: "p", text: "This information helps us improve the platform." },
          ],
        },
        {
          title: "Marketing Cookies",
          blocks: [
            {
              type: "p",
              text: "Where used, marketing cookies may help us understand advertising performance and deliver more relevant advertising.",
            },
            {
              type: "p",
              text: "These may include technologies provided by advertising or social-media platforms.",
            },
          ],
        },
      ],
    },
    {
      id: "your-cookie-choices",
      title: "3. Your Cookie Choices",
      blocks: [
        {
          type: "p",
          text: "When applicable, you can choose whether to allow non-essential cookies through the EventPlan cookie consent banner.",
        },
        { type: "p", text: "You can:" },
        {
          type: "list",
          items: ["**Accept all cookies**", "**Reject non-essential cookies**", "**Manage preferences**"],
        },
        { type: "p", text: "Your choices may be stored so that we can remember your preferences." },
      ],
    },
    {
      id: "changing-your-preferences",
      title: "4. Changing Your Preferences",
      blocks: [
        { type: "p", text: "You may change your cookie preferences at any time through:" },
        { type: "list", items: ["**Cookie Settings**"] },
        { type: "p", text: "You can also control cookies through your browser settings." },
        { type: "p", text: "Disabling certain cookies may affect the functionality of EventPlan." },
      ],
    },
    {
      id: "third-party-cookies",
      title: "5. Third-Party Cookies",
      blocks: [
        { type: "p", text: "Some cookies may be placed by third-party services used on EventPlan." },
        {
          type: "p",
          text: "These providers may include analytics, advertising, communication, maps or other technology providers.",
        },
        { type: "p", text: "Their use of information may be governed by their own privacy policies." },
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "6. Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Cookie Policy when our technology, services or legal requirements change.",
        },
        { type: "p", text: "The latest version will always be posted on this page." },
      ],
    },
  ],
};
