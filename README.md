# DEV@Deakin — Task P5 Newsletter

React + Vite frontend, Express backend, and Resend email API. The newsletter sends the entered email to the backend; the backend validates it and asks Resend to send a welcome email.

## 1. Configure environment variables

The ZIP intentionally does **not** include `.env` files because they can contain private keys. Copy the examples:

**Windows PowerShell**
```powershell
cd frontend
Copy-Item .env.example .env
```
Fill in the Firebase values from **Firebase Console → Project settings → Your apps → SDK setup and configuration**. Do not guess or reuse an API key from another Firebase project.

In a second terminal:
```powershell
cd backend
Copy-Item .env.example .env
```
Set `RESEND_API_KEY` to your own Resend API key. Keep this key only in `backend/.env`, never in frontend code or Git.

## 2. Start the backend

```powershell
cd backend
npm install
npm run dev
```
Expected: `Backend running at http://localhost:5000`

## 3. Start the frontend

In another terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (normally `http://localhost:5173`).

## 4. Fix for the console error in your screenshot

`FirebaseError: auth/invalid-api-key` means Firebase Authentication is receiving an invalid API key. This is separate from the newsletter email API; changing the Resend key will not fix it.

1. Open Firebase Console and select the exact project used by this app.
2. Open **Project settings → General → Your apps** and copy the web app config.
3. Put the values in `frontend/.env` using the `VITE_FIREBASE_...` names from `.env.example`. The API key must be the actual `apiKey` value, not the project ID or a placeholder.
4. In Firebase Console → **Authentication → Sign-in method**, enable Email/Password and Google if the UI uses Google login.
5. If API key restrictions are enabled in Google Cloud Console, ensure the key permits the Firebase Authentication APIs needed by your project.
6. Stop and restart Vite after editing `.env` (Ctrl+C, then `npm run dev`), then hard-refresh the browser.

The source ZIP cannot contain a valid Firebase key for your project unless you provide the correct project configuration. A key that is invalid or restricted at the Firebase/Google Cloud side must be corrected in the console; code alone cannot repair it.

## 5. Verify newsletter email sending

1. In `backend/.env`, set `RESEND_API_KEY=re_...`.
2. Without a verified sending domain, use `EMAIL_FROM=DEV@Deakin <onboarding@resend.dev>`.
3. Resend's test sender generally only allows delivery to the email address registered with your Resend account until you verify a domain.
4. Subscribe using that allowed recipient and check the backend terminal for `Email sent successfully! Status: 200`.
5. If the UI reports an error, read the backend terminal: Resend's error is logged there.

## How the request works

1. `Newsletter.jsx` sends `POST /api/subscribe` with `{ "email": "..." }`.
2. Express validates the email with Zod; invalid input returns HTTP 400.
3. Express calls Resend.
4. Success returns HTTP 200 and logs the Resend email ID; failures return a non-success status and a message.
5. The React form displays success or failure feedback.

## Git hygiene

Do not commit `.env` or `node_modules`. The repository `.gitignore` excludes both. Commit `.env.example` files instead.
