# Aaron Technologies — Production Deployment & Integration Guide

This guide details the complete steps required to deploy the **Aaron Technologies B2B Sourcing Platform** to production and connect its backend integrations (Cloud Firestore, Resend Email, and HubSpot CRM).

---

## 🛠️ Step 1: Synchronize Git Repository

Ensure all local UI modernization changes and layout polish are pushed to your remote repository before starting the deployment:

```bash
# Verify your local status is clean
git status

# Push all committed changes to your main branch
git push origin main
```

---

## 🔌 Step 2: HubSpot CRM Lead Sync Integration

To sync form inquiries (Contact Form) and RFQ specifications (Landed Cost/Quote Form) directly into your HubSpot CRM, follow these steps:

### 1. Create a Private App (Access Token)
1. In your HubSpot portal, go to **Settings** (Gear Icon in the top-right).
2. On the left navigation pane, go to **Integrations** -> **Private Apps**.
3. Click **Create private app**.
4. In the **Basic Info** tab, name it `Aaron Technologies Sourcing Webapp`.
5. In the **Scopes** tab, select **CRM** and check **Write** permission for **`crm.objects.contacts`** (i.e. `crm.objects.contacts.write`).
6. Click **Create app** in the top-right.
7. Confirm the security warning, copy the generated **Access Token** (starts with `pat-na2-...`), and keep it safe. This will be used as `HUBSPOT_ACCESS_TOKEN`.

### 2. Verify or Create the Custom `message` Property
Because HubSpot Contacts do not have a default `message` field, a custom property named `message` must exist to store the contact inquiries and RFQ details sent by the website. 

**If the `message` property already exists in your HubSpot portal, you can skip this step.** Otherwise, create it using these steps:
1. In HubSpot Settings, go to **Data Management** -> **Properties**.
2. Ensure the "Select an object" dropdown is set to **Contact properties**.
3. Click **Create property** (top-right).
4. Set the following details:
   - **Object type:** Contact
   - **Group:** Contact Information
   - **Label:** `Message`
   - *Note:* The internal name will automatically generate as `message` (all lowercase), which matches the website's API request payload.
5. Click **Next**, select the field type as **Multi-line text**, and click **Create**.

---

## ✉️ Step 3: Resend Email Integration

The system uses Resend to send automated B2B RFQ summaries to both your sales team (`kushal@aarontechno.com`) and the submitting customer:

1. Sign up for a free account at [Resend](https://resend.com).
2. Go to the dashboard and navigate to **API Keys** -> **Create API Key**.
3. Name the key `Aaron Sourcing Webapp`, set permissions to **Full Access**, and click **Add**.
4. Copy the generated API key (starts with `re_...`). This will be used as `RESEND_API_KEY`.
5. *(Optional for production)* To send emails from a custom domain (e.g. `@aarontechno.com` instead of Resend's default onboarding address), go to **Domains**, add your domain, and configure the DNS MX/TXT records at your registrar.

---

## 🗄️ Step 4: Cloud Firestore Database Setup

Firestore stores persistent copies of all incoming contacts and RFQ requests for auditing and retrieval.

### 1. Create the Database
1. Go to the [Firebase Console](https://console.firebase.google.com).
2. Click **Add project**, name it `aarontech-web`, and create it.
3. On the left sidebar, navigate to **Build** -> **Firestore Database**, and click **Create database**.
4. Choose your database location and select **Start in production mode** (or test mode, as we will deploy secure rules next).

### 2. Configure Database Security Rules
The website writes data securely via server-side Admin APIs, meaning client-side public reads and writes should be completely blocked.
1. In your Firestore Database console, select the **Rules** tab.
2. Replace the default rules with the following configurations from your repository's `firestore.rules`:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Completely deny all public read and write operations from the web clients
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
3. Click **Publish**.

### 3. Generate Admin Service Account Credentials
Our serverless Next.js API routes write to Firestore using private service credentials:
1. In the Firebase Console, click the **Gear Icon** (Project Settings) -> **Service Accounts**.
2. Select **Firebase Admin SDK** and click **Generate new private key**.
3. Save the downloaded JSON file. Open it in a text editor to map the environment variables:
   - `FIREBASE_PROJECT_ID` (maps to `project_id`)
   - `FIREBASE_CLIENT_EMAIL` (maps to `client_email`)
   - `FIREBASE_PRIVATE_KEY` (maps to `private_key`)

---

## 🚀 Step 5: Vercel Hosting Deployment

Vercel is the recommended hosting provider for Next.js 15+ applications.

1. Go to [Vercel](https://vercel.com) and sign in.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository `AaronTech-web`.
4. In the **Configure Project** pane, set the following parameters:
   - **Framework Preset:** Next.js
   - **Root Directory:** Edit and select `website` (since the webapp resides inside the `/website` folder of the repo).
5. Open the **Environment Variables** section and add the following keys from your `.env.local` configuration:

| Environment Variable | Value | Description |
| :--- | :--- | :--- |
| `FIREBASE_PROJECT_ID` | `your-firebase-project-id` | From Service Account JSON (`project_id`) |
| `FIREBASE_CLIENT_EMAIL` | `your-firebase-client-email` | From Service Account JSON (`client_email`) |
| `FIREBASE_PRIVATE_KEY` | `"-----BEGIN PRIVATE KEY-----\n..."` | From Service Account JSON. **Note:** Paste the value exactly as is, including the double quotes and raw `\n` characters. |
| `RESEND_API_KEY` | `re_...` | Your Resend API Key |
| `HUBSPOT_ACCESS_TOKEN` | `pat-na2-...` | Your HubSpot Private App Access Token |

6. Click **Deploy**. Vercel will pull your branch, execute `next build`, statically render all pages, and make the website live on a secure HTTPS URL.

---

## 🔍 Verification

Once the deployment completes:
1. Navigate to the contact page (`/contact`) on your live site, fill out the form, and submit.
2. Navigate to the landed cost estimator on the homepage (`/#calculator`), pick a part and a volume, click **Get this quoted properly**, fill out the RFQ details, and submit.
3. Verify that:
   - A success toast/message is displayed on the screen.
   - The submission details are saved in your Firebase console under `/contacts` or `/quotes` collections.
   - The contact details are synced to HubSpot, and you can see them under **Contacts** (verify that the custom `message` property contains the details).
   - Email alerts are received via Resend.
