## Story: Contact form sends enquiry to owner

As a visitor on the Visit page, I want to send my name, a phone or email,
and a message through the on-page form, so that the owner can answer me
without me having to call or message on Zalo.

## Scope

**In scope**

- The `ContactForm` component on `/visit`: name, reply_to (phone or email),
  message, hidden honeypot field, submit button.
- Client-side required-field validation via the HTML `required` attribute
  on name and reply_to.
- Submission through `src/site.ts`'s `sendEnquiry` to the pre-provisioned
  Agent Team endpoint (`site.json`'s `api`/`key`).
- All five visual states: idle, sending, sent, failed, offline.
- The page path (`window.location.pathname`) sent alongside the message.

**Out of scope**

- The call and Zalo buttons on the same page — `site` module (SITE-007).
- The address, map and opening hours shown on `/visit` — `site` module
  (SITE-006).
- Any backend built by this team — the endpoint, its base URL and its key
  are already provisioned in `site.json`; this story only wires the
  frontend to call it.
- Reading or triaging messages inside Agent Team — the owner's own tool.
- Server-side or format validation of `reply_to` (phone vs. email) — the
  design specifies one plain `<input>` with no format check beyond
  non-empty.
- A retry limit or rate limiting on repeated submissions — none specified.

## UI scope

Single screen: the "Or write to us" section of `/visit`. No new route —
this story's component mounts inside the existing Visit page alongside the
map/hours/call content delivered by the `site` module. States to build,
per the design system's `ContactForm` entry: idle, sending, sent, failed,
offline. No other screen is touched.

## Acceptance criteria

- SC-1 [CONTACT-001 AC-1]: Given name and reply_to are filled in (message
  optional), when the visitor submits the form, then the submit button
  reads "Sending…" and is disabled while the request is in flight.
- SC-2 [CONTACT-001 AC-2]: Given the send succeeds, when the request
  resolves, then the form fields are replaced by the one-line "sent"
  thank-you text (`contact.form.sent`).
- SC-3 [CONTACT-001 AC-3]: Given the visitor fills name, reply_to and
  message, when the visitor submits the form, then `sendEnquiry` is called
  with `{ name, reply_to, message, details: {}, website }` using the typed
  values.
- SC-4 [CONTACT-002 AC-1]: Given the name field is empty, when the visitor
  submits the form, then browser validation blocks submission and
  `sendEnquiry` is not called.
- SC-5 [CONTACT-002 AC-2]: Given the reply_to field is empty, when the
  visitor submits the form, then browser validation blocks submission and
  `sendEnquiry` is not called.
- SC-6 [CONTACT-002 AC-3]: Given the message field is empty but name and
  reply_to are filled, when the visitor submits the form, then submission
  proceeds (message is not required).
- SC-7 [CONTACT-003 AC-1]: Given the form is online (`canSend` true) and
  the request succeeds, when the visitor submits a complete form, then the
  owner's Agent Team inbox receives the enquiry including the page path.
- SC-8 [CONTACT-003 AC-2]: Given the endpoint returns a non-OK response
  with an error message, when the visitor submits the form, then the
  `role="alert"` area shows that error message and the fields remain for
  retry.
- SC-9 [CONTACT-003 AC-3]: Given the endpoint returns a non-OK response
  with no error message, when the visitor submits the form, then the alert
  area shows the generic fallback sentence ("The message could not be
  sent. Please try again, or call us.").
- SC-10 [CONTACT-003 AC-4]: Given `canSend` is false (no key/API base
  configured), when the visitor opens `/visit`, then the offline helper
  line (`contact.form.offline`) is shown under the button at all times.
- SC-11 [CONTACT-003 AC-5]: Given `canSend` is false, when the visitor
  submits the form anyway, then the failed state and its alert message are
  shown and no message is sent.

## Accessibility (from the design system's ContactForm entry)

- Every field has a `<label htmlFor>` with a matching `id`.
- The honeypot field (`name="website"`) is `aria-hidden`, off-screen, and
  `tabIndex={-1}`.
- The failed-state message uses `role="alert"`.

## Dependencies

- `site` module's Visit page — provides the page shell, heading and body
  copy this form sits inside (no new route created by this story).
- `src/site.json`'s pre-provisioned `api`/`key` and `src/site.ts`'s
  `sendEnquiry`/`canSend` — already configured; nothing to request.
- No story-level dependency on item 1 ("The site as designed") blocking
  start — both build the same Visit page but own disjoint files (this
  story owns `ContactForm.tsx`; the site story owns the page and its other
  sections), per the plan item's own note that forms needing a backend are
  carved out as separate stories.
