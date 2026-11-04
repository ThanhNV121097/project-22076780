# Test cases — Contact form sends enquiry to owner

Module: `contact` · Story: `docs/contact/stories/contact-form-sends-enquiry-to-owner.md`

Risk: moderate. No payment or auth, but it is the only non-phone contact
path and has five distinct visual states plus a silent-failure mode
(offline), so failure-path coverage gets the same weight as the happy path.

---

**Scenario**: Submit button shows sending state while request is in flight
**Given**: Visitor is on `/visit` with `canSend` true; name and reply_to are filled in; the enquiry endpoint is arranged to delay its response
**When**: The visitor submits the form
**Then**: The submit button's text reads "Sending…" and the button is disabled for the duration of the request
**Traces**: SC-1 (CONTACT-001 AC-1)
**Check**: interact_page

---

**Scenario**: Successful send replaces the form with the thank-you text
**Given**: Visitor is on `/visit` with `canSend` true, name and reply_to filled in; the endpoint is arranged to resolve OK
**When**: The visitor submits the form and the request resolves
**Then**: The name, reply_to, message fields and the submit button are no longer shown; in their place is the one-line `contact.form.sent` thank-you text
**Traces**: SC-2 (CONTACT-001 AC-2)
**Check**: interact_page

---

**Scenario**: Submitting a complete form sends the typed values through sendEnquiry
**Given**: Visitor is on `/visit` with `canSend` true; name, reply_to and message are all typed in
**When**: The visitor submits the form
**Then**: `sendEnquiry` is called once with `{ name, reply_to, message, details: {}, website }` carrying exactly the typed name, reply_to and message (website empty, since the honeypot was not touched)
**Traces**: SC-3 (CONTACT-001 AC-3)
**Check**: interact_page

---

**Scenario**: Empty name blocks submission before any request is sent
**Given**: Visitor is on `/visit`; the name field is left empty, reply_to is filled in
**When**: The visitor submits the form
**Then**: Browser `required`-field validation blocks submission (focus moves to the name field); `sendEnquiry` is not called and no sending/sent/failed state appears
**Traces**: SC-4 (CONTACT-002 AC-1)
**Check**: interact_page

---

**Scenario**: Empty reply_to blocks submission before any request is sent
**Given**: Visitor is on `/visit`; name is filled in, reply_to is left empty
**When**: The visitor submits the form
**Then**: Browser `required`-field validation blocks submission; `sendEnquiry` is not called and no sending/sent/failed state appears
**Traces**: SC-5 (CONTACT-002 AC-2)
**Check**: interact_page

---

**Scenario**: Empty message does not block submission
**Given**: Visitor is on `/visit` with `canSend` true; name and reply_to are filled in, message is left empty
**When**: The visitor submits the form
**Then**: Submission proceeds (no browser validation block on message); `sendEnquiry` is called with `message: ""`
**Traces**: SC-6 (CONTACT-002 AC-3)
**Check**: interact_page

---

**Scenario**: A successful submission's request carries the page path
**Given**: Visitor is on `/visit` with `canSend` true; name and reply_to filled in; the endpoint is arranged to resolve OK
**When**: The visitor submits the form
**Then**: The request `sendEnquiry` makes to the endpoint includes `page` equal to `window.location.pathname` (`/visit`) alongside name, reply_to and message — the data the owner's Agent Team inbox receives
**Traces**: SC-7 (CONTACT-003 AC-1)
**Check**: interact_page

---

**Scenario**: Endpoint failure with an error message shows that message and keeps the fields
**Given**: Visitor is on `/visit` with `canSend` true, name and reply_to filled in; the endpoint is arranged to return a non-OK response whose body carries an error message
**When**: The visitor submits the form
**Then**: A `role="alert"` element shows that exact error message; the name, reply_to and message fields remain populated and visible for retry (not cleared)
**Traces**: SC-8 (CONTACT-003 AC-2)
**Check**: interact_page

---

**Scenario**: Endpoint failure with no error message shows the generic fallback
**Given**: Visitor is on `/visit` with `canSend` true, name and reply_to filled in; the endpoint is arranged to return a non-OK response with no error message in its body
**When**: The visitor submits the form
**Then**: The `role="alert"` element shows exactly "The message could not be sent. Please try again, or call us."
**Traces**: SC-9 (CONTACT-003 AC-3)
**Check**: interact_page

---

**Scenario**: Offline helper line is shown whenever the form has no endpoint configured
**Given**: `site.json` has no `api`/`key` configured, so `canSend` is false
**When**: The visitor opens `/visit`
**Then**: The `contact.form.offline` helper line is visible under the submit button, without the visitor doing anything
**Traces**: SC-10 (CONTACT-003 AC-4)
**Check**: render_url

---

**Scenario**: Submitting while offline raises the failed state without sending anything
**Given**: `site.json` has no `api`/`key` configured (`canSend` false); name and reply_to are filled in
**When**: The visitor submits the form anyway
**Then**: The failed state appears — the `role="alert"` message is shown — and no network request is made (no call reaches the endpoint)
**Traces**: SC-11 (CONTACT-003 AC-5)
**Check**: interact_page

---

**Scenario**: Honeypot value is sent through unchanged, not filtered by the form
**Given**: Visitor is on `/visit` with `canSend` true; name and reply_to are filled in; the hidden `website` field is given a value programmatically (as a bot would do), bypassing the visible UI
**When**: The visitor submits the form
**Then**: `sendEnquiry` is called with `website` carrying that same value unchanged — the form makes no visitor-facing decision about it, it is passed straight through
**Traces**: CONTACT-001 / CONTACT-002 (honeypot pass-through row)
**Check**: interact_page

---

**Scenario**: Retrying after a failed send behaves the same as the first attempt, without retyping
**Given**: A previous submission failed and the alert message is showing, with name/reply_to/message still populated from before; the endpoint is now arranged to resolve OK
**When**: The visitor submits the form again without retyping anything
**Then**: The button shows "Sending…" then the form is replaced by the "sent" thank-you text, using the values that survived the earlier failure
**Traces**: CONTACT-003 (retry row)
**Check**: interact_page

---

## Accessibility checks carried by the states above

**Scenario**: Every field is labelled and the honeypot is hidden from assistive tech
**Given**: Visitor is on `/visit`
**When**: The page is rendered
**Then**: The name, reply_to and message fields each have a `<label htmlFor>` matching the field's `id`; the `website` field is `aria-hidden="true"`, positioned off-screen, and has `tabIndex={-1}` so it is never reached by Tab
**Traces**: Non-functional (Accessibility) — SRS §6
**Check**: interact_page
