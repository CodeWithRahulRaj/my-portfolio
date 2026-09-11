'use client';

import React, { useState } from 'react';
import { ContactSection } from '@/types/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ContactFormProps {
  contact: ContactSection;
  email: string;
}

type Values = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldClasses =
  'w-full rounded-lg border border-white bg-white px-4 text-[15px] text-ink placeholder:text-muted/80 focus:border-brand focus:outline-none';

/**
 * Contact screen form. The site is a static export, so a valid submission
 * hands the message to the visitor's mail client.
 */
export const ContactForm: React.FC<ContactFormProps> = ({ contact, email }) => {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Values>({});
  const [sent, setSent] = useState(false);

  const update = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors: Values = {};

    contact.fields.forEach((field) => {
      const value = (values[field.name] ?? '').trim();

      if (field.required && !value) {
        nextErrors[field.name] = `${field.placeholder} is required`;
        return;
      }

      if (field.type === 'email' && value && !emailPattern.test(value)) {
        nextErrors[field.name] = 'Enter a valid email address';
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = values.subject?.trim() || `Portfolio enquiry from ${values.name?.trim() ?? ''}`;
    const body = `${values.message ?? ''}\n\n—\n${values.name ?? ''}\n${values.email ?? ''}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      <SectionHeading as="h1" size="lg">
        {contact.title}
      </SectionHeading>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
        {contact.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="sr-only">
              {field.placeholder}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={6}
                placeholder={field.placeholder}
                value={values[field.name] ?? ''}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={Boolean(errors[field.name])}
                className={`${fieldClasses} resize-y py-3 leading-6`}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name] ?? ''}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={Boolean(errors[field.name])}
                className={`${fieldClasses} h-12`}
              />
            )}

            {errors[field.name] && (
              <p className="mt-1.5 text-[13px] text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-brand font-display text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
        >
          {contact.submitLabel}
        </button>

        {sent && (
          <p role="status" className="text-[14px] text-ink">
            Thanks — your mail client is opening with the message ready to send.
          </p>
        )}
      </form>
    </div>
  );
};
