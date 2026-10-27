# SIT313 D1 additions (built on the supplied P5 project)

## What changed
- Added `/pricing` route and a Pricing link in the navbar.
- Added Free/Paid plan comparison.
- Added an upgrade modal with simple client-side validation.
- Reads the user's `plan` field from Firestore `users/{uid}`.
- New registrations are assigned `plan: "Free"`.
- Successful demo upgrade saves `plan: "Paid"` and a timestamp to Firestore.
- Card fields are not saved and no real payment is processed.

## Setup
1. Keep your existing Firebase project configuration in `frontend/.env` (copy `.env.example` and fill in your own values).
2. In a terminal, run `cd frontend`, then `npm install`, then `npm run dev`.
3. Register a test account or log in to an existing account and open `/pricing`.
4. Test with dummy payment details only. Example format: card number `1234567890123456`, expiry `12/29`, CVV `123`.

## Important Firestore note
The code expects a `users` collection with documents whose document ID is the Firebase Authentication UID. It reads/writes the `plan` field in that user's document. Configure Firestore Security Rules so a signed-in user can read/update only their own user document. Do not use open rules such as `allow read, write: if true`.

## Viva explanation
- `useState` holds form values, the current plan, loading flags, and modal visibility.
- `useEffect` loads the user's plan when the signed-in user changes.
- `getDoc` reads the user's Firestore document.
- `updateDoc` updates an existing user's plan; `setDoc` creates a profile if an older account has no document.
- The modal is shown only for a logged-in user on the Free plan.
- This is a demonstration subscription upgrade, not real payment processing. For a production application, payment must be handled by a payment provider and the server must verify the transaction before granting Paid access.
