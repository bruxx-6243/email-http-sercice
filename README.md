## Email SMTP Service 📧

This guide explains how to use an email SMTP service to send emails programmatically via an API. The service allows you to send emails using any SMTP-compatible email provider (e.g., Gmail, Outlook, Yahoo, or others) by making a POST request with your credentials and email details.

### Concept
The email SMTP service enables you to send emails by providing:
- **Headers:** Your email account username (user, typically your email address) and an SMTP password or app-specific password (password) from your email provider.

- **Body:** The recipient's email address (to), email subject (subject), and email content (template).

You send this data in a JSON payload to the service’s API endpoint using a POST request. The service validates the data and sends the email via the specified SMTP server.

### API Request Structure
To send an email, make a POST request to the service’s API endpoint (e.g., [https://email-http-sercice.onrender.com/send](https://email-http-sercice.onrender.com/send)). The request must include:
**Headers:**
- user: Your email address (e.g., fariol@mail.ru or yourname@mail.ru).
- password: The SMTP password or app-specific password from your email provider.

**Body (JSON):**
- to: Recipient’s email address (must be valid).
- subject: Email subject.
- template: Email content (plain text or HTML).

### Example: Sending an Email with curl
Here’s an example of how to send an email using curl:

```bash
curl -X POST https://email-http-sercice.onrender.com/send \
  -H "user: yourname@gmail.com" \
  -H "password: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "blondeau.nbif@gmail.com",
    "subject": "Announcement",
    "template": "Hello Fariol Blondeau the API is working perfeclty"
  }'
```

Happy emailing! 🚀