'use client';

import Link from 'next/link';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  buildingTypeOptions,
  contactPage,
  enquiryLimits,
  enquiryServiceOptions,
  projectStageOptions,
  site,
  type EnquiryService,
  type Option,
} from '@aloft/content';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import {
  toWhatsApp,
  validateEnquiry,
  type EnquiryFormValues,
  type FieldErrors,
} from '@/lib/enquiry-validation';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'handoff' }
  | { kind: 'error'; message: string };

/** Submissions completed faster than this are treated as automated. */
const MIN_FILL_MS = 3000;

const empty: EnquiryFormValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  projectLocation: '',
  service: '',
  buildingType: '',
  approxArea: '',
  projectStage: '',
  message: '',
};

interface EnquiryFormProps {
  defaultService?: EnquiryService;
  submitLabel?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function EnquiryForm({ defaultService, submitLabel = contactPage.submit }: EnquiryFormProps) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryFormValues>({ ...empty, service: defaultService ?? '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [showDetails, setShowDetails] = useState(false);
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const fromUrl = new URLSearchParams(window.location.search).get('service');
    if (fromUrl && enquiryServiceOptions.some((o) => o.value === fromUrl)) {
      setValues((v) => ({ ...v, service: fromUrl }));
    }
  }, []);

  useEffect(() => {
    if (status.kind !== 'idle' && status.kind !== 'submitting') statusRef.current?.focus();
  }, [status.kind]);

  const set =
    (field: keyof EnquiryFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const field = (name: keyof EnquiryFormValues) => ({
    id: `${formId}-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    'aria-invalid': errors[name] ? (true as const) : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    if (honeypot.current?.value || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus({ kind: 'success' });
      return;
    }

    window.open(toWhatsApp('919544927508', values), '_blank');
    setStatus({ kind: 'handoff' });
    window.gtag?.('event', 'generate_lead', { form: 'enquiry', method: 'whatsapp', service: values.service });
  }

  /* ── Handoff screen ──────────────────────────────────────────────── */
  if (status.kind === 'handoff') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 py-6 outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-ice text-supply">
          <Icon name="phone" size={28} />
        </span>
        <h3 className="type-title">One more step — send on WhatsApp</h3>
        <p className="type-body">
          WhatsApp should now be open with your enquiry pre-filled. Just press <strong>Send</strong> there to reach our
          team directly. If nothing opened,{' '}
          <a className="underline" href="https://wa.me/919544927508" target="_blank" rel="noreferrer">
            tap here to open WhatsApp
          </a>{' '}
          or call{' '}
          <a className="underline" href={`tel:${site.contact.phoneE164}`}>
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="text-[0.9375rem] font-medium text-supply underline"
        >
          Back to the form
        </button>
      </div>
    );
  }

  /* ── Success screen ──────────────────────────────────────────────── */
  if (status.kind === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 py-6 outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-ice text-supply">
          <Icon name="check-circle" size={30} />
        </span>
        <h3 className="type-title">Enquiry received</h3>
        <p className="type-body">{contactPage.confirmation}</p>
      </div>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${formId}-note`}
      className="relative space-y-4"
    >
      {/* ── Row 1: Name + Phone ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          htmlFor={`${formId}-fullName`}
          error={errors.fullName}
          errorId={`${formId}-fullName-error`}
          required
        >
          <input
            {...field('fullName')}
            type="text"
            autoComplete="name"
            maxLength={enquiryLimits.fullName.max}
            placeholder="e.g. Mohammed Rashid"
            className={inputClass(errors.fullName)}
          />
        </Field>

        <Field
          label="Phone number"
          htmlFor={`${formId}-phone`}
          error={errors.phone}
          errorId={`${formId}-phone-error`}
          required
        >
          <input
            {...field('phone')}
            type="tel"
            autoComplete="tel"
            placeholder="+91 or 10-digit number"
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      {/* ── Row 2: Service ──────────────────────────────── */}
      <Field
        label="Service required"
        htmlFor={`${formId}-service`}
        error={errors.service}
        errorId={`${formId}-service-error`}
        required
      >
        <Select {...field('service')} options={enquiryServiceOptions} error={errors.service} />
      </Field>

      {/* ── Row 3: Message ──────────────────────────────── */}
      <Field
        label="Tell us about your project"
        htmlFor={`${formId}-message`}
        error={errors.message}
        errorId={`${formId}-message-error`}
        required
      >
        <textarea
          {...field('message')}
          rows={4}
          maxLength={enquiryLimits.message.max}
          placeholder="Building type, size, location, timeline or anything helpful…"
          className={cn(inputClass(errors.message), 'h-auto min-h-[7rem] resize-none py-3')}
        />
      </Field>

      {/* ── Optional details toggle ─────────────────────── */}
      <div>
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="flex items-center gap-1.5 text-[0.875rem] font-medium text-supply hover:underline focus-visible:outline-none focus-visible:underline"
          aria-expanded={showDetails}
        >
          <Icon
            name="chevron"
            size={15}
            className={cn('transition-transform duration-200', showDetails ? 'rotate-180' : 'rotate-0')}
          />
          {showDetails ? 'Hide additional details' : 'Add more details (optional)'}
        </button>

        {showDetails && (
          <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-ice bg-paper p-4 sm:grid-cols-2">
            <Field
              label="Email"
              htmlFor={`${formId}-email`}
              error={errors.email}
              errorId={`${formId}-email-error`}
            >
              <input
                {...field('email')}
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                maxLength={enquiryLimits.email.max}
                className={inputClass(errors.email)}
              />
            </Field>

            <Field
              label="Company name"
              htmlFor={`${formId}-companyName`}
              error={errors.companyName}
              errorId={`${formId}-companyName-error`}
            >
              <input
                {...field('companyName')}
                type="text"
                autoComplete="organization"
                placeholder="Optional"
                maxLength={enquiryLimits.companyName.max}
                className={inputClass(errors.companyName)}
              />
            </Field>

            <Field
              label="Project location"
              htmlFor={`${formId}-projectLocation`}
              error={errors.projectLocation}
              errorId={`${formId}-projectLocation-error`}
            >
              <input
                {...field('projectLocation')}
                type="text"
                placeholder="City or district"
                maxLength={enquiryLimits.projectLocation.max}
                className={inputClass(errors.projectLocation)}
              />
            </Field>

            <Field
              label="Approx. area"
              htmlFor={`${formId}-approxArea`}
              error={errors.approxArea}
              errorId={`${formId}-approxArea-error`}
              hint="e.g. 10,000 sq ft"
            >
              <input
                {...field('approxArea')}
                type="text"
                placeholder="Optional"
                maxLength={enquiryLimits.approxArea.max}
                className={inputClass(errors.approxArea)}
              />
            </Field>

            <Field
              label="Building type"
              htmlFor={`${formId}-buildingType`}
              error={errors.buildingType}
              errorId={`${formId}-buildingType-error`}
            >
              <Select {...field('buildingType')} options={buildingTypeOptions} error={errors.buildingType} />
            </Field>

            <Field
              label="Project stage"
              htmlFor={`${formId}-projectStage`}
              error={errors.projectStage}
              errorId={`${formId}-projectStage-error`}
            >
              <Select {...field('projectStage')} options={projectStageOptions} error={errors.projectStage} />
            </Field>
          </div>
        )}
      </div>

      {/* ── Honeypot ────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input ref={honeypot} id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ── Submit ──────────────────────────────────────── */}
      <div className="pt-1">
        {status.kind === 'error' && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="mb-4 flex gap-3 rounded-xl border border-error/30 bg-error/5 p-4 text-[0.9375rem] text-error outline-none"
          >
            <Icon name="alert" size={20} className="mt-0.5 shrink-0" />
            <p>
              {status.message} You can also call{' '}
              <a className="underline" href={`tel:${site.contact.phoneE164}`}>
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={status.kind === 'submitting'}
          aria-busy={status.kind === 'submitting'}
        >
          {status.kind === 'submitting' ? 'Opening WhatsApp…' : submitLabel}
        </Button>
        <p id={`${formId}-note`} className="mt-3 text-[0.8125rem] text-muted">
          Fields marked * are required. We use your details only to respond to this enquiry —{' '}
          <Link href="/privacy-policy" className="underline hover:text-petrol">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

function inputClass(error?: string) {
  return cn(
    'h-11 w-full rounded-lg border bg-white px-3 text-[0.9375rem] text-petrol transition-colors placeholder:text-muted/60',
    'focus:border-supply focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-supply/25',
    error ? 'border-error' : 'border-ice',
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, error, errorId, required, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.875rem] font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-supply">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-muted text-[0.8125rem]">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-error">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[0.8125rem] text-muted">{hint}</p>
      )}
    </div>
  );
}

function Select({
  options,
  error,
  ...props
}: { options: readonly Option[]; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={cn(inputClass(error), 'appearance-none pr-10', !props.value && 'text-muted/60')}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-petrol">
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevron" size={18} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted" />
    </div>
  );
}
