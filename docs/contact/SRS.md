# SRS — Contact

Module: `contact`
Design: [View the approved design](http://localhost:9401)
Design system: `design/design-system.md`

## 1. Purpose

The `contact` module is the one way a visitor reaches the owner without
picking up the phone: the message form on the Visit page. It sends a name,
a phone or email, and a message to the owner's Agent Team inbox through the
pre-provisioned endpoint in `site.json`. Without it, a visitor who prefers to
write rather than call has no way to ask whether a blend is in stock or to
have a tin put aside outside a phone call — the shop otherwise relies
entirely on the phone and Zalo buttons specified in the `site` module.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Visitor | Anyone on the Visit page; not signed in | Fill in and submit the message form |
| Owner | The shop's operator | Reads submitted messages in Agent Team (outside this site; not a screen this module builds) |

## 3. Scope

**In scope** — the function specified below, by its plan title:

- Contact form sends enquiry to owner — the `ContactForm` component on
  `/visit`: its fields, client-side validation, the idle/sending/sent/failed/
  offline states, and submission through `src/site.ts`'s `sendEnquiry` to the
  pre-provisioned Agent Team endpoint.

**Out of scope**

- The call and Zalo buttons — specified in `docs/site/SRS.md` (SITE-007).
- The address, hours and map shown on the same Visit page — specified in
  `docs/site/SRS.md` (SITE-006).
- Any backend the team builds — there is none to build. The endpoint, its
  API base and its key are pre-provisioned in `site.json`; this module
  covers the frontend's use of that endpoint only (shape is `static`).
- Reading or managing messages inside Agent Team — that is the owner's tool,
  not a screen on this site.

## 4. Functional requirements

### 4.1 Contact form

**Requirement CONTACT-001 — Submitting a complete form sends the enquiry**

*As a* visitor, *I want to* send my name, a phone or email, and a message,
*so that* the owner can answer me outside shop hours or when I would rather
not call.

Behaviour:

1. The form shows three fields in order — name, phone-or-email ("reply_to"),
   message — each labelled, plus a visually hidden honeypot field
   (`name="website"`) and a submit button.
2. When the visitor submits with name and reply_to filled in, the button
   reads "Sending…" and is disabled, then the system calls `sendEnquiry`
   with `{ name, reply_to, message, details: {}, website }`.
3. On success, the form is replaced by the one-line thank-you message
   (`contact.form.sent`).

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Name and reply_to are filled in (message optional) | The visitor submits the form | The button shows "Sending…" and is disabled while the request is in flight |
| AC-2 | The send succeeds | The request resolves | The form is replaced by the "sent" thank-you text; the fields are no longer shown |
| AC-3 | The visitor fills every field including the message | The visitor submits the form | `sendEnquiry` is called with the typed name, reply_to and message |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| name | text | yes | Non-empty after trimming; sent as `name` |
| reply_to | text | yes | Non-empty after trimming; sent as `reply_to` (a phone or an email, either accepted — no format check beyond non-empty, per the design's one plain `<input>`) |
| message | text | no | Sent as `message`; empty string if left blank |
| website | text, hidden | no | Honeypot; never shown to a person, sent through unchanged |

### 4.2 Required-field validation

**Requirement CONTACT-002 — A required field left empty is rejected before sending**

*As a* visitor, *I want to* be told if I left my name or contact detail out,
*so that* I do not submit a message the owner cannot reply to.

Behaviour:

1. The name and reply_to fields carry the HTML `required` attribute.
2. Submitting with either empty is blocked by the browser's own validation
   before the form's submit handler runs; no request is sent.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | The name field is empty | The visitor submits the form | Submission is blocked by browser validation; `sendEnquiry` is not called |
| AC-2 | The reply_to field is empty | The visitor submits the form | Submission is blocked by browser validation; `sendEnquiry` is not called |
| AC-3 | The message field is empty but name and reply_to are filled | The visitor submits the form | Submission proceeds; the message field is not required |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Missing name | `name` field empty | Browser blocks submission; focus moves to the field (native behaviour); no request sent |
| Missing reply_to | `reply_to` field empty | Browser blocks submission; no request sent |
| Honeypot filled | The hidden `website` field holds a value (a bot filled it) | Value is still sent through to the endpoint unchanged; this module makes no visitor-facing decision about it — filtering, if any, happens at the endpoint, which is outside this module |

**Data touched** — see 4.1; no additional fields.

### 4.3 Delivery and its failure states

**Requirement CONTACT-003 — The owner receives the message; a failed or disconnected send tells the visitor what to do instead**

*As a* visitor, *I want to* know if my message could not be sent, *so that*
I call or message on Zalo instead of assuming the owner got it.

Behaviour:

1. On success, the owner receives the enquiry in Agent Team, with the page
   path it was sent from included.
2. If the send fails (the endpoint returns an error, or the request cannot
   complete), the button returns to its normal state and an alert message is
   shown above the button, naming the problem or a generic fallback
   ("The message could not be sent. Please try again, or call us.").
3. If the form has no endpoint configured (`canSend` is false — no key or
   API base in `site.json`), the helper line (`contact.form.offline`) is
   shown under the button at all times, telling the visitor to call or
   message on Zalo instead; submitting in this state raises the same failed
   state.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | The form is online (`canSend` true) and the request succeeds | The visitor submits a complete form | The owner's Agent Team inbox receives the enquiry, including the page path |
| AC-2 | The endpoint returns a non-OK response with an error message | The visitor submits the form | The alert area shows that error message; the form fields remain for retry |
| AC-3 | The endpoint returns a non-OK response with no error message | The visitor submits the form | The alert area shows the generic fallback sentence |
| AC-4 | `canSend` is false (no key/API base configured) | The visitor opens `/visit` | The offline helper line is shown under the button at all times |
| AC-5 | `canSend` is false | The visitor submits the form anyway | The failed state and its alert message are shown; no message is sent |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Network/endpoint failure | `fetch` rejects or resolves non-OK | Failed state (AC-2/AC-3); fields are not cleared, so the visitor can retry without retyping |
| Not configured | `site.json` has no key or API base | Offline state (AC-4/AC-5); this is a deployment/configuration state, not a visitor error |
| Retry | Visitor submits again after a failure | Same behaviour as the first attempt; no retry limit specified |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| page | text | yes (system-supplied) | `window.location.pathname` at submit time, appended to the request by `sendEnquiry`, not a form field |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Visit (`/visit`) — message form section | "Or write to us" section of the Visit page | CONTACT-001, CONTACT-002, CONTACT-003 | idle, sending, sent, failed, offline |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Accessibility | Every field has a `<label htmlFor>` with a matching `id`; the honeypot is `aria-hidden`, off-screen and `tabIndex={-1}`; the failed-state message uses `role="alert"` |
| Privacy | Only what the visitor types (name, reply_to, message) plus the page path is sent; no other personal data is collected or stored by this module |

## 7. Dependencies and assumptions

- **Depends on:** the pre-provisioned Agent Team endpoint (`site.json`'s
  `api` and `key`) — already configured; no credential request or backend
  build belongs to this module.
- **Depends on:** `site` module's Visit page for the surrounding layout
  (label, heading, body copy around the form).
- **Assumption:** the honeypot's value is interpreted, if at all, by the
  Agent Team endpoint itself; this module's only obligation is to keep the
  field hidden and to send it through unchanged.

No open questions: the design draws exactly five states for this form (idle,
sending, sent, failed, offline) and the brief's acceptance criteria are
fully covered by them.

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Contact form sends enquiry to owner | CONTACT-001, CONTACT-002, CONTACT-003 | `test-cases/contact-form-sends-enquiry-to-owner.md` |
