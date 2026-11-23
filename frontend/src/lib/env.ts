import { site } from '@aloft/content';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl);

/**
 * Hosted form endpoint that receives enquiries as JSON (e.g. a Formspree form
 * URL). When unset, the enquiry form hands the message to the visitor's email app.
 */
/**
 * Hosted form endpoint that receives enquiries as JSON and emails them to ALOFT.
 * Defaults to FormSubmit delivering to the site contact email. Set NEXT_PUBLIC_FORM_ENDPOINT
 * to override with another service (e.g. Web3Forms, Formspree).
 *
 * IMPORTANT: FormSubmit requires a one-time email activation. On first submission,
 * FormSubmit will send a verification email to aloftac@gmail.com — click the link to activate.
 */
export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.contact.email}`;

export const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';
