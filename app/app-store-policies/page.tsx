import PolicyLayout from "../components/PolicyLayout";

export default function AppStorePoliciesPage() {
  const content = `RYDORA APP STORE COMPLIANCE POLICIES

Last Updated: 11.17.25

Effective Date: 11.17.25

Applies to: Google Play & Apple App Store Distribution

RYDORA – MOBILE APP STORE COMPLIANCE POLICIES

This document governs how the Rydora mobile application ("Application") complies with requirements imposed by:

Apple App Store Review Guidelines

Apple Developer Program License Agreement

Google Play Developer Program Policies

Google Play Data Safety Guidelines

Google Play User Data Policy

Global privacy and content safety regulations

These policies form part of the Rydora Terms & Conditions, Privacy Policy, and EULA.

Failure to adhere may result in account restrictions, removal of access to certain features, or regulatory reporting.

1. ELIGIBILITY, AGE REQUIREMENTS & COPPA COMPLIANCE

1.1. Rydora requires that users be at least 13 years old to create an account.

1.2. Rydora does not knowingly collect personal data from children under 13.

1.3. Identification mechanisms or parental-gate features may be used to prevent underage access.

1.4. Any detected underage accounts will be deleted in compliance with COPPA and Apple/Google requirements.

2. USER DATA COLLECTION & PRIVACY COMPLIANCE

Rydora strictly adheres to:

GDPR

CCPA/CPRA

Google Play User Data Policy

Apple App Store Privacy Requirements

OECD Privacy Framework

The Rydora Privacy Policy governs:

types of data collected

data retention

deletion rights

data transfer

consent and transparency

The App Store "Privacy Nutrition Labels" and Google Play "Data Safety Forms" must:

accurately describe data use

reflect real internal processes

be updated when features change

Rydora prohibits:

selling user data

collecting unnecessary background data

using sensitive permissions without justification

3. PERMISSIONS AND DEVICE ACCESS

The Application may request the following permissions:

3.1. Required Permissions (Core Functionality)

Camera (content creation)

Photo Library Access (uploading)

Microphone (if audio/video content is used)

Network Access (syncing)

3.2. Optional Permissions

Push Notifications

Location Access (if Marketplace deliveries require regional availability)

Permissions must:

be clearly disclosed

be requested only at the moment needed

never be misused or repurposed

4. CONTENT POLICIES (APPLE & GOOGLE COMPLIANCE)

Rydora enforces strict content restrictions to comply with:

Apple Guideline 1.1 – Objectionable Content

Google Play – Inappropriate Content Policy

Apple Guideline 1.2 – User-Generated Content Safety Requirements

Prohibited content includes:

sexually explicit material

child sexual content

violence, gore, abuse

hate speech & extremist content

self-harm instructions

bullying & harassment

illegal activities

fraud, scams

dangerous challenges

copyright violations

Rydora satisfies UGC safety standards by providing:

robust reporting tools

in-app blocking features

account moderation controls

automated detection (including Google Cloud Vision SafeSearch)

immediate removal of harmful content

human review mechanisms

5. USER-GENERATED CONTENT SAFETY REQUIREMENTS

To comply with App Store and Google Store policies, Rydora implements:

5.1. Mandatory Safety Features

reporting tools for content and users

blocking and muting mechanisms

moderation queues

human review escalation

automated detection of harmful content

ability for moderators to immediately remove violating content

5.2. Proactive Measures

Rydora uses AI tools (including Google Cloud Vision SafeSearch) to:

detect nudity

identify violent imagery

flag hate symbols

scan for illegal activities

These systems act as safety layers to prevent content violations.

6. FRAUD, SPAM, AND MALICIOUS BEHAVIOR CONTROL

Rydora enforces anti-abuse measures including:

rate limiting

spam detection algorithms

bot-blocking systems

device fingerprinting

moderation of Marketplace transactions

fraud detection for paid features (if applicable)

Users engaging in fraud, spam, or abuse may face permanent account termination.

7. MARKETPLACE COMPLIANCE

Marketplace features must comply with:

Apple Guideline 3.1 – Payments

Google Play Payment Policy

Consumer protection regulations

Rydora ensures:

refunds and dispute processes

transparency in pricing

clear shipping and tax information

listing integrity

ban on illegal goods

removal of harmful or fraudulent sellers

8. IN-APP PURCHASES (IAP) — IF APPLICABLE

If Rydora implements IAP features:

Apple requires mandatory use of In-App Purchases for digital goods

Google Play requires use of Google Play Billing

No links may direct users outside of IAP for digital purchases (Apple rule 3.1.1)

Users must be clearly informed of recurring subscriptions

9. SECURITY REQUIREMENTS

Rydora implements:

encrypted data transmission

secure authentication

secure credential storage

anti-tampering protections

detection of rooted devices (if enabled)

strict API access controls

10. APP STABILITY & PERFORMANCE REQUIREMENTS

Rydora complies with:

Apple guideline 2.1 (App Functionality)

Google Play App Stability Requirements

The Application must:

run without frequent crashes

load content reliably

function as described in store listings

not mislead users with screenshots or description

11. STORE LISTING COMPLIANCE

Rydora guarantees:

accurate app descriptions

non-misleading screenshots

disclosure of Marketplace features

correct technical requirements

proper age ratings (Apple & Google classifiers)

12. LAW ENFORCEMENT & REGULATORY COMPLIANCE

Rydora may cooperate with:

courts

police agencies

regulatory authorities

fraud prevention networks

Applicable when required by law or user safety.

13. POLICY UPDATES

Rydora may update this document to reflect:

regulatory changes

store policy updates

functionality changes

new safety measures

Users will be notified of material updates.

14. CONTACT INFORMATION

For App Store compliance inquiries:

📧 support@rydora.me

For legal matters:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="App Store Compliance Policies"
    >
      {content}
    </PolicyLayout>
  );
}

