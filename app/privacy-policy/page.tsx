import PolicyLayout from "../components/PolicyLayout";

export default function PrivacyPolicyPage() {
  const content = `RYDORA – PRIVACY POLICY

Last Updated: 11.17.25

Effective Date: 11.17.25

Jurisdiction: Montenegro (ME), with global applicability

1. INTRODUCTION

1.1. This Privacy Policy ("Policy") describes how Trid Tech DOO and Rydora DOO, registered in Montenegro (collectively "Rydora", "we", "us", "our"), collect, use, store, disclose, and protect personal data of individuals ("Users", "you", "your") who access or use the Rydora platform, website rydora.me, mobile applications, marketplace, and any related features ("Platform").

1.2. This Policy is designed to comply with global data protection standards including:

GDPR (EU Regulation 2016/679)

CCPA/CPRA (California)

OECD Privacy Guidelines

ISO/IEC 29100 Privacy Framework

relevant Montenegrin data protection laws

1.3. By accessing or using Rydora, you acknowledge that you have read and understood this Policy.

2. PERSONAL DATA WE COLLECT

Rydora collects personal data in the following categories:

2.1. Data You Provide Directly

This includes, but is not limited to:

Account registration details (name, username, email, password, phone number)

Profile information (bio, photos, preferences)

User-generated content (photos, videos, comments, messages, posts)

Marketplace information (billing address, shipping address, order details)

Communications with customer support

Reports, dispute information, appeals, or inquiries

2.2. Data Automatically Collected

We automatically collect:

Device and hardware identifiers

IP address and approximate geolocation

Cookies, pixel tags, session tokens

App usage data, interactions, features accessed

Log files, timestamps, in-app behavior

Language, operating system, mobile network information

2.3. Content Scanning and Safety Signals

We analyze uploaded content using automated tools including Google Cloud Vision SafeSearch, internal classifiers, and metadata processing to:

detect harmful or illegal material

identify nudity, violence, hate symbols

assist human moderators

enforce Terms & Conditions

This includes visual content, captions, hashtags, and metadata.

2.4. Marketplace Data

If you participate in the Rydora Marketplace, we may collect:

purchase history

seller listings

payment processing metadata

order tracking information

buyer/seller interactions

Payment card details are processed exclusively by third-party processors (e.g., Stripe, PayPal, Apple Pay) and never stored by Rydora.

2.5. Third-Party Data

We may receive information from:

authentication providers (Google, Apple, Meta)

advertising partners

cloud services

analytics platforms

identity verification services

3. HOW WE USE YOUR PERSONAL DATA

We use your data to:

3.1. Provide and Maintain the Platform

account management

enable posting, viewing, messaging, and sharing

ensure proper functioning of app features

provide Marketplace services

process transactions via third-party payment processors

3.2. Safety, Security & Moderation

We process data to:

detect harmful, illegal, or inappropriate content

prevent fraud, spam, impersonation, and abuse

enforce Terms, Community Guidelines, and Marketplace Policy

investigate violations and disputes

This includes automated scanning and human review.

3.3. Improve and Personalize Experiences

content recommendations

feed ranking

marketplace suggestions

analytics and improvements

bug detection and performance optimization

3.4. Legal Compliance

We may use personal data to:

comply with legal obligations

respond to lawful requests by authorities

enforce agreements

retain moderation evidence

4. LEGAL BASES FOR DATA PROCESSING (GDPR)

We process personal data based on:

Consent (account creation, cookies, optional features)

Contractual necessity (providing the Platform)

Legitimate interests (security, app improvement, fraud prevention)

Legal obligations (safety reporting, financial compliance)

5. SHARING YOUR PERSONAL DATA

We may share your data with:

5.1. Service Providers

Including but not limited to:

cloud hosting providers

content moderation systems

analytics partners

customer support tools

marketplace payment processors

These providers operate under confidentiality and data-processing agreements.

5.2. Other Users

Certain information (username, profile image, posts) is publicly visible.

Marketplace transactions may require sharing shipping information.

5.3. Legal and Regulatory Authorities

We may disclose data when required by law or if necessary to:

prevent harm

report child safety risks

comply with court orders or investigations

5.4. Business Transfers

In case of merger, acquisition, restructuring, or asset transfer, personal data may be transferred according to applicable laws.

6. INTERNATIONAL DATA TRANSFERS

Your data may be processed in or transferred to other countries.

We ensure adequate protection through:

Standard Contractual Clauses (SCCs)

GDPR-compliant mechanisms

contractual and organizational safeguards

7. DATA RETENTION

We retain data only as necessary for:

providing services

legal compliance

fraud protection

moderation evidence

account history

Retention periods include:

Account data: as long as the account is active

Content removal logs: up to 5 years (safety reasons)

Marketplace transactions: 5–10 years (financial regulations)

Users may request deletion at any time.

8. YOUR RIGHTS

Depending on jurisdiction, you may have:

right to access personal data

right to correct inaccurate data

right to delete personal data

right to restrict processing

right to object

right to data portability

right to withdraw consent

right to lodge a complaint with a supervisory authority

Requests: privacy@rydora.me

9. CHILDREN'S PRIVACY

Rydora is not intended for children under 13.

We do not knowingly collect data from children under this age.

If such information is discovered, it will be deleted immediately.

Illegal content involving minors will be reported to authorities.

10. COOKIES & TRACKING TECHNOLOGIES

We use:

essential cookies

analytics cookies

authentication cookies

security mechanisms

device identifiers

You can manage cookie preferences through browser settings.

11. SECURITY MEASURES

We implement various security practices including:

encryption in transit and at rest

secure hosting infrastructure

access controls and authentication

automated threat detection

regular audits and penetration testing

No system is entirely secure, but we continuously enhance our protections.

12. THIRD-PARTY LINKS

Rydora may contain links to third-party websites.

We are not responsible for third-party privacy practices.

13. CHANGES TO THIS POLICY

We may revise this Policy at any time.

Updated versions are posted on the Platform.

Continued use constitutes acceptance of changes.

14. CONTACT INFORMATION

For privacy inquiries or GDPR requests:

📧 support@rydora.me

For legal matters:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="11.17.25"
      effectiveDate="11.17.25"
    >
      {content}
    </PolicyLayout>
  );
}

