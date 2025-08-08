# Wisenet Google Sheets Integration

This Google Apps Script project automates the retrieval, processing, and reporting of Wisenet course and unit enrolment data in Google Sheets.

## Features

- Fetches course and unit enrolment data from the Wisenet API.
- Handles pagination for large datasets.
- Updates and maintains masterlists, retention/completion statistics, grades, and EFTSL calculations.
- Triggers updates to graphs and summary sheets.

## Setup

1. **API Key:**  
   Replace all instances of `YOUR_WISENET_API_KEY` in the code with your actual Wisenet API key.  
   **Do not commit your real API key to version control.**

2. **Google Sheets:**  
   Ensure your spreadsheet contains the required sheets (e.g., "New Datasheet", "Course Enrollments", "Completed", etc.).

3. **Deployment:**  
   Deploy as a Google Apps Script project bound to your Google Sheet.

## Security

- **Never commit real API keys or sensitive credentials to version control.**
- Use placeholders in code and supply credentials securely at runtime or via environment variables if possible.

## License