# Wix CRM & Automation Integration Setup Guide

## Overview
This guide explains how to complete the Wix CRM and Automation setup for form submissions on your StratoCS website.

## Part 1: CMS Collections ✅ COMPLETED

Two collections have been created:

### 1. **contactsubmissions** (Contact Page - "Request a Strategy Call")
- **Fields:**
  - `fullName` (text, required)
  - `email` (text, required)
  - `phone` (text)
  - `company` (text)
  - `website` (url)
  - `service` (text)
  - `message` (text, required)
  - `createdAt` (datetime)

### 2. **freereviewsubmissions** (Home Page - "Get Free Website Review")
- **Fields:**
  - `email` (text, required)
  - `website` (url, required)
  - `concerns` (text)
  - `createdAt` (datetime)
  - `status` (text)

**Permissions:** Site visitors can CREATE. No one else can READ/UPDATE/DELETE (except Admin).

---

## Part 2: Form Integration ✅ COMPLETED

### Updated Files:
1. **HomePage.tsx** - "Get Free Website Review" form now:
   - Validates required fields (email, website)
   - Saves to `freereviewsubmissions` collection
   - Creates/updates Wix CRM contact with "Free Review Lead" label
   - Shows inline success state (no redirect)

2. **ContactPage.tsx** - "Request a Strategy Call" form now:
   - Validates required fields (name, email, message)
   - Saves to `contactsubmissions` collection
   - Creates/updates Wix CRM contact with "Strategy Call Lead" label
   - Shows inline success state (no redirect)

3. **New API Endpoint** - `/api/crm/contact.ts`:
   - Handles CRM contact creation/updates
   - Adds labels/tags to track lead source
   - Stores custom fields with submission data

---

## Part 3: Wix CRM Setup (MANUAL - Required)

### Step 1: Enable Wix CRM Backend
1. Go to your **Wix Dashboard** → **Settings** → **Integrations**
2. Search for **"Wix CRM Backend"** and enable it
3. This allows backend API access to create/update contacts

### Step 2: Verify CRM Contacts
After publishing:
1. Go to **Wix Dashboard** → **CRM** → **Contacts**
2. You should see new contacts appearing with:
   - Email address
   - Name (if provided)
   - Phone (if provided)
   - Company (if provided)
   - Custom fields with source label ("Strategy Call Lead" or "Free Review Lead")

---

## Part 4: Wix Automations Setup (MANUAL - Required)

### Automation 1: Contact Form Submissions

1. Go to **Wix Dashboard** → **Automations**
2. Click **"Create Automation"**
3. **Trigger:** Select "When a new item is created in contactsubmissions"
4. **Action:** Select "Send an email"
5. **Email Configuration:**
   - **To:** info@stratocs.com
   - **Subject:** New Strategy Call Request from {fullName}
   - **Body:** Include these fields:
     ```
     Full Name: {fullName}
     Email: {email}
     Phone: {phone}
     Company: {company}
     Website: {website}
     Service: {service}
     Message: {message}
     Submitted: {createdAt}
     ```
6. Click **"Save & Publish"**

### Automation 2: Free Review Submissions

1. Go to **Wix Dashboard** → **Automations**
2. Click **"Create Automation"**
3. **Trigger:** Select "When a new item is created in freereviewsubmissions"
4. **Action:** Select "Send an email"
5. **Email Configuration:**
   - **To:** info@stratocs.com
   - **Subject:** New Free Website Review Request from {email}
   - **Body:** Include these fields:
     ```
     Email: {email}
     Website: {website}
     Concerns: {concerns}
     Status: {status}
     Submitted: {createdAt}
     ```
6. Click **"Save & Publish"**

---

## Part 5: Testing

### Test the Forms:

1. **Home Page - Free Review Form:**
   - Navigate to home page
   - Scroll to "Ready to improve your website?" section
   - Fill in: Email, Website URL, Concerns (optional)
   - Click "Get Free Review"
   - Verify: Success message appears inline
   - Check: New item in `freereviewsubmissions` collection
   - Check: New/updated contact in CRM with "Free Review Lead" label
   - Check: Email received at info@stratocs.com

2. **Contact Page - Strategy Call Form:**
   - Navigate to /contact
   - Fill in: Name, Email, Message (required fields)
   - Fill in: Phone, Company, Website, Service (optional)
   - Click "Send Message"
   - Verify: Success message appears inline
   - Check: New item in `contactsubmissions` collection
   - Check: New/updated contact in CRM with "Strategy Call Lead" label
   - Check: Email received at info@stratocs.com

---

## Part 6: Verification Checklist

After completing all steps, verify:

- [ ] Both CMS collections created with correct fields
- [ ] Forms save data to correct collections
- [ ] CRM contacts are created/updated with labels
- [ ] Automations send emails to info@stratocs.com
- [ ] Success messages display inline (no redirects)
- [ ] All required fields are validated
- [ ] Optional fields are handled correctly
- [ ] Dashboard shows new submissions in collections
- [ ] CRM shows new contacts with proper labels

---

## Troubleshooting

### Forms not saving to CMS:
- Check browser console for errors
- Verify collection IDs match exactly: `contactsubmissions` and `freereviewsubmissions`
- Ensure collection permissions allow "ANYONE" to INSERT

### CRM contacts not created:
- Verify Wix CRM Backend is enabled in Settings → Integrations
- Check that `/api/crm/contact.ts` endpoint is accessible
- Look for errors in Wix backend logs

### Emails not received:
- Verify automations are published (not just saved)
- Check that trigger collection is correct
- Verify email address is correct: info@stratocs.com
- Check spam/junk folder

### Success message not showing:
- Verify form submission completes without errors
- Check browser console for JavaScript errors
- Ensure form validation passes

---

## API Endpoint Details

**Endpoint:** `POST /api/crm/contact`

**Request Body:**
```json
{
  "email": "user@example.com",
  "label": "Strategy Call Lead" or "Free Review Lead",
  "name": "John Doe",
  "phone": "+1234567890",
  "company": "Company Name",
  "website": "https://example.com",
  "service": "Service Name",
  "message": "Message text",
  "concerns": "Concerns text"
}
```

**Response:**
```json
{
  "success": true,
  "contactId": "contact-id-123",
  "message": "Contact created/updated successfully"
}
```

---

## Notes

- Forms use Wix-native tools only (no SendGrid, external APIs, or environment variables)
- Layout and design remain unchanged
- Submissions are saved immediately to CMS
- CRM updates happen asynchronously (won't block form submission)
- If CRM fails, submission is still saved to CMS
- Email notifications are sent via Wix Automations (not code)
- All data is stored securely in Wix collections

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Wix documentation: https://www.wix.com/en-US/crm
3. Contact Wix support for CRM/Automation issues
