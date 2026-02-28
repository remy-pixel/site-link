# Contact Form CRM Integration Setup

## Overview
The contact form has been successfully connected to Wix CRM with email notifications enabled. Form submissions are automatically saved to the CRM and appear in Dashboard → Inbox and Contacts.

## What Was Implemented

### 1. CMS Collection: Contact Submissions
- **Collection ID**: `contactsubmissions`
- **Purpose**: Stores all contact form submissions
- **Fields**:
  - `fullName` - Full name of the submitter
  - `email` - Email address
  - `phoneNumber` - Phone number (optional)
  - `companyName` - Company name (optional)
  - `website` - Website URL (optional)
  - `message` - Detailed message/inquiry
  - `interestedService` - Service interested in (optional)
  - `submittedAt` - Submission timestamp

### 2. Form Submission Flow
When a user submits the contact form:
1. Form data is validated
2. Submission is saved to the `contactsubmissions` CMS collection
3. Email notification is sent to the site owner
4. Success confirmation is displayed to the user

### 3. Email Notifications
- **Endpoint**: `/api/send-contact-email`
- **Service**: SendGrid (requires API key)
- **Recipient**: Site owner email (configurable via environment variable)
- **Content**: Formatted HTML email with all form details

## Configuration Required

### Environment Variables
Add these to your `.env` file or Wix dashboard environment settings:

```
OWNER_EMAIL=info@stratocs.com
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### SendGrid Setup
1. Create a SendGrid account (https://sendgrid.com)
2. Generate an API key
3. Add the API key to your environment variables
4. Verify the sender email domain (noreply@stratocs.com)

## Files Modified/Created

### Modified
- `/src/components/pages/ContactPage.tsx` - Added form submission logic with CRM integration

### Created
- `/src/pages/api/send-contact-email.ts` - Email notification endpoint

## How It Works

### Step 1: Form Submission
User fills out the contact form and clicks "Send Message"

### Step 2: Data Validation
Form validates required fields (name, email, message)

### Step 3: CRM Storage
Submission is saved to the `contactsubmissions` collection with:
- Unique ID (UUID)
- All form data mapped to collection fields
- Submission timestamp

### Step 4: Email Notification
An email is sent to the site owner containing:
- Submitter name, email, phone
- Company and website information
- Service interested in
- Full message content
- Reply-to address set to submitter's email

### Step 5: Success Confirmation
User sees the success state with:
- Checkmark icon
- Thank you message
- 24-hour response time expectation
- Direct email link for urgent matters

## Viewing Submissions

### In Wix Dashboard
1. Go to Dashboard → Inbox
2. Contact submissions appear as new messages
3. Go to Dashboard → Contacts
4. All submitters are added as contacts with their information

### In CMS
1. Go to Content Management → Collections
2. Select "Contact Submissions"
3. View all submissions with timestamps
4. Filter and sort by any field

## Styling & Layout
- **No changes** to existing layout or styling
- Success state remains exactly as designed
- Form maintains all original animations and responsive design
- Error messages display inline without disrupting layout

## Testing

### Local Testing
1. Fill out the contact form with test data
2. Submit the form
3. Check that:
   - Success state displays
   - Submission appears in CMS collection
   - Email is received (if SendGrid is configured)

### Production Deployment
1. Set environment variables in Wix dashboard
2. Deploy the updated code
3. Test with a real submission
4. Verify email delivery and CRM entry

## Troubleshooting

### Submissions not appearing in CRM
- Check that `contactsubmissions` collection exists
- Verify `BaseCrudService.create()` is being called
- Check browser console for errors

### Emails not being sent
- Verify `SENDGRID_API_KEY` is set correctly
- Check SendGrid account has sufficient credits
- Verify sender domain is verified in SendGrid
- Check email logs in SendGrid dashboard

### Form shows error
- Check browser console for specific error message
- Verify all required fields are filled
- Check network tab for API response details

## Future Enhancements

Possible additions:
- Automated follow-up emails to submitters
- Form submission webhooks
- Custom field mapping
- Multi-language support
- File attachments
- Conditional fields based on service selection
