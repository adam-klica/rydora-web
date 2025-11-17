import PolicyLayout from "../components/PolicyLayout";

export default function TermsAndConditionsPage() {
  const content = `RYDORA – TERMS & CONDITIONS

Last Updated: 11.17.25

Effective Date: 11.17.25

Jurisdiction: Montenegro (ME)

1. INTRODUCTION

1.1. These Terms & Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", "your") and Trid Tech DOO and Rydora DOO, companies duly registered in Montenegro, including their affiliates, officers, employees, contractors, licensors, and service providers (collectively: "Rydora", "we", "us", "our").

1.2. By accessing, registering for, or using Rydora, including but not limited to the website rydora.me, the mobile applications, APIs, features, marketplace, or content-sharing services ("Platform"), you hereby expressly acknowledge that you have read, understood, and agreed to be bound by these Terms.

1.3. If you do not agree to these Terms, you must not access or use the Platform. Continued use constitutes full acceptance.

1.4. These Terms incorporate by reference the following additional documents, which form an integral part of this Agreement:

Privacy Policy

Community Guidelines

Marketplace Policy

End-User License Agreement (EULA)

App Store Compliance Policies

Content Moderation Policy

2. ELIGIBILITY

2.1. You must be at least 13 years old to use the Platform.

2.2. If required by applicable law in your jurisdiction, a higher minimum age may apply.

2.3. By using the Platform, you represent and warrant that you satisfy the age and eligibility requirements and have legal capacity to enter into this Agreement.

2.4. Users under 18 must have parental consent where required by law.

3. ACCOUNT REGISTRATION AND SECURITY

3.1. To access certain Platform features, you may be required to create a Rydora account.

3.2. You agree to provide truthful, complete, and up-to-date information during registration.

3.3. You are responsible for maintaining confidentiality of your account credentials.

3.4. You agree that:

you will not impersonate another person;

you will not create an account for someone without authorization;

you will not share your login credentials with others;

you will notify Rydora immediately of unauthorized access.

3.5. Rydora may suspend, restrict, or terminate any account for violations of these Terms, legal obligations, or safety concerns.

4. RIGHTS AND RESPONSIBILITIES OF THE USER

4.1. Users are solely responsible for all content they upload, publish, transmit, stream, display, or otherwise make available via Rydora ("User Content").

4.2. You represent that you:

own or have lawful rights to distribute User Content;

do not infringe any intellectual property rights of others;

comply with all applicable laws and these Terms.

4.3. You may not use the Platform to:

engage in unlawful activities,

exploit, harm, or threaten others,

distribute harmful software,

interfere with Platform functionality or security.

5. PROHIBITED CONTENT AND ACTIVITIES

Rydora maintains a strict zero-tolerance policy for objectionable, harmful, or illegal content.

5.1. Prohibited content includes, but is not limited to:

sexually explicit materials

nudity intended for sexual arousal

child sexual content (strictly prohibited and reported to authorities)

violence, abuse, assault, or threats

hate speech, harassment, bullying

extremist ideologies or terrorist content

cruelty, gore, or graphic depictions

self-harm promotion

illegal drug promotion

scams, fraud, impersonation

intellectual property violations

unauthorized commercial advertisements

animal cruelty

dangerous activities encouraging physical harm

5.2. Rydora reserves the right to remove content or suspend accounts without notice for violations.

6. AUTOMATED CONTENT ANALYSIS

6.1. Rydora uses automated systems including, but not limited to:

Google Cloud Vision SafeSearch

internal machine learning classifiers

visual and metadata analysis tools

6.2. These tools assist in identifying prohibited content, scanning uploads, detecting safety risks, and enforcing policy compliance.

6.3. By using the Platform, you expressly consent to automated scanning and moderation of your content.

7. USER CONTENT RIGHTS AND LICENSE GRANT

7.1. You retain full ownership of User Content posted on Rydora.

7.2. By uploading content, you grant Rydora a worldwide, non-exclusive, royalty-free, transferable, sublicensable, irrevocable license to:

host, reproduce, modify, adapt, distribute, publicly display, publicly perform, index, analyze, create derivative works, and otherwise use User Content solely for the purpose of operating, improving, and promoting the Platform.

7.3. This license survives account termination only for:

backup copies,

legal compliance,

moderation and safety logs.

7.4. You waive all moral rights to the extent permissible by law.

8. RYDORA PLATFORM RIGHTS

8.1. Rydora may:

alter or remove any content at its discretion;

deny access to any user;

modify or discontinue services;

enforce security measures;

perform audits for compliance.

8.2. Rydora does not guarantee:

uninterrupted service,

error-free performance,

preservation of User Content,

compatibility with devices or networks.

9. MARKETPLACE PARTICIPATION

9.1. The Rydora Marketplace is subject to the separate Marketplace Policy, which governs:

buying and selling,

prohibited goods,

payment processing,

shipping, refunds, disputes,

seller obligations and buyer rights.

9.2. Use of the Marketplace constitutes acceptance of all stated Marketplace rules.

10. THIRD-PARTY SERVICES

10.1. Rydora integrates with third-party systems such as hosting providers, cloud services, analytics, AI moderation tools, and payment processors.

10.2. Use of third-party services is governed by those providers' own terms.

11. INTELLECTUAL PROPERTY OWNERSHIP

11.1. All Rydora trademarks, service marks, logos, software, design elements, databases, APIs, and proprietary technology are exclusively owned by Rydora DOO and Trid Tech DOO.

11.2. Users may not copy, modify, distribute, or reverse-engineer any part of the Platform.

12. ACCOUNT TERMINATION

12.1. Rydora may terminate or suspend your account immediately for violations of:

these Terms,

Community Guidelines,

Marketplace Policy,

applicable laws,

safety risks.

12.2. Termination may include:

loss of access to content,

deletion of User Content,

forfeiture of marketplace funds (in cases of fraud).

13. DISCLAIMERS

13.1. Rydora is provided "AS IS" and "AS AVAILABLE," without warranties of any kind.

13.2. Rydora disclaims all implied warranties, including merchantability, fitness for purpose, and non-infringement.

13.3. Rydora does not guarantee accuracy or reliability of user-generated content.

14. LIMITATION OF LIABILITY

14.1. To the maximum extent permitted by law, Rydora is not liable for:

indirect, incidental, punitive, or consequential damages;

loss of data, profits, revenue, or goodwill;

unauthorized access to your account;

disputes between users.

14.2. Liability is limited to the maximum amount permitted under Montenegrin law.

15. GOVERNING LAW AND DISPUTES

15.1. These Terms are governed by the laws of Montenegro.

15.2. Parties shall first attempt amicable resolution.

15.3. If unresolved, disputes shall be submitted to the competent courts of Montenegro.

15.4. Cross-border users may be subject to additional mandatory consumer protections.

16. CHANGES TO TERMS

16.1. Rydora reserves the right to modify these Terms at any time.

16.2. Changes take effect upon posting.

16.3. Continued use constitutes acceptance of updated Terms.

17. CONTACT INFORMATION

For legal matters:

📧 support@rydora.me

For support:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="Terms & Conditions"
      lastUpdated="11.17.25"
      effectiveDate="11.17.25"
    >
      {content}
    </PolicyLayout>
  );
}

