"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

type FormFields = {
  name: string;
  email: string;
  message: string;
};
type FieldErrors = Partial<Record<keyof FormFields, string>>;
type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function ContactForm() {
  const [formFields, setFormFields] = useState<FormFields>({
    name: "",
    email: "",
    message: ""
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const updateFormField = (field: keyof FormFields, value: string) => {
    setFormFields((currentFields) => ({
      ...currentFields,
      [field]: value
    }));
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined
    }));
    setFormStatus(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const trimmedFields = {
      name: formFields.name.trim(),
      email: formFields.email.trim(),
      message: formFields.message.trim()
    };

    if (trimmedFields.name.length < 2) {
      nextErrors.name = "Please enter your name using at least 2 characters.";
    }

    if (!validateEmail(trimmedFields.email)) {
      nextErrors.email = "Please enter a valid email address, for example you@example.com.";
    }

    if (trimmedFields.message.length < 10) {
      nextErrors.message =
        "Please write a short message with at least 10 characters so I know how to respond.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again."
      });

      if (nextErrors.name) {
        nameInputRef.current?.focus();
      } else if (nextErrors.email) {
        emailInputRef.current?.focus();
      } else {
        messageInputRef.current?.focus();
      }

      return;
    }

    setFormStatus({
      type: "success",
      message:
        "Thanks for your message. Your form was completed correctly and is ready to be submitted."
    });
    setFormFields({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <form className="contact-form" aria-label="Contact form" noValidate onSubmit={handleSubmit}>
      <p className="form-intro">
        All fields are required. If something is missing or incorrect, an error message will appear
        below that field and a form message will explain the next step.
      </p>
      <div
        className={`form-status${formStatus ? ` is-visible is-${formStatus.type}` : ""}`}
        aria-live="polite"
        role="status"
      >
        {formStatus?.message}
      </div>
      <label htmlFor="name">
        Name
        <input
          id="name"
          ref={nameInputRef}
          type="text"
          name="name"
          required
          placeholder="Your name"
          aria-describedby="name-hint name-error"
          aria-invalid={Boolean(fieldErrors.name)}
          value={formFields.name}
          onChange={(event) => updateFormField("name", event.target.value)}
        />
      </label>
      <p className="field-hint" id="name-hint">
        Enter at least 2 characters.
      </p>
      <p className="field-error" id="name-error">
        {fieldErrors.name}
      </p>
      <label htmlFor="email">
        Email
        <input
          id="email"
          ref={emailInputRef}
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-describedby="email-hint email-error"
          aria-invalid={Boolean(fieldErrors.email)}
          value={formFields.email}
          onChange={(event) => updateFormField("email", event.target.value)}
        />
      </label>
      <p className="field-hint" id="email-hint">
        Use a valid format such as you@example.com.
      </p>
      <p className="field-error" id="email-error">
        {fieldErrors.email}
      </p>
      <label htmlFor="message">
        Message
        <textarea
          id="message"
          ref={messageInputRef}
          name="message"
          rows={5}
          required
          placeholder="Write your message..."
          aria-describedby="message-hint message-error"
          aria-invalid={Boolean(fieldErrors.message)}
          value={formFields.message}
          onChange={(event) => updateFormField("message", event.target.value)}
        />
      </label>
      <p className="field-hint" id="message-hint">
        Write at least 10 characters so the message is clear.
      </p>
      <p className="field-error" id="message-error">
        {fieldErrors.message}
      </p>
      <button className="btn primary" type="submit">
        Send Message
      </button>
    </form>
  );
}
