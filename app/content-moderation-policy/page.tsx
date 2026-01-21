import { Metadata } from "next";
import PolicyLayout from "../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Content Moderation Policy",
  description: "Learn about Rydora's content moderation standards, automated detection tools, enforcement procedures, and appeals process for user-generated content.",
  alternates: {
    canonical: "https://rydora.me/content-moderation-policy",
  },
};

export default function ContentModerationPolicyPage() {
  const content = `RYDORA CONTENT MODERATION POLICY

Applies Globally

Jurisdiction Base: Montenegro (ME)

RYDORA – CONTENT MODERATION POLICY (FORMAL LEGAL VERSION)

This Content Moderation Policy ("Policy") defines the standards, procedures, operational frameworks, technologies, and enforcement mechanisms used by Rydora DOO and Trid Tech DOO ("Rydora", "we", "us", "our") to monitor, analyze, classify, restrict, remove, or otherwise take action on content ("User Content") uploaded, posted, transmitted, or displayed on the Rydora Platform ("Platform").

This Policy forms part of the Terms & Conditions, Community Guidelines, Privacy Policy, and EULA.

Violation of this Policy may result in:

content removal

visibility reduction

temporary restrictions

account suspension

permanent termination

marketplace prohibitions

referral to law enforcement

1. PURPOSE AND SCOPE

1.1. The purpose of this Policy is to:

ensure the safety and integrity of the Platform;

prevent harmful, illegal, or abusive content;

comply with international regulations and industry standards;

establish transparent and fair enforcement mechanisms.

1.2. This Policy applies to ALL User Content including:

photos

videos

comments

messages

Marketplace listings

profile information

metadata

hashtags and captions

AI-generated content

1.3. This Policy applies to every user, regardless of region or local laws, except where stricter laws override.

2. CONTENT CLASSIFICATION FRAMEWORK

Rydora classifies content into enforcement tiers:

Tier 1 – Critical Violations (Immediate Removal + Permanent Ban)

Includes:

child sexual exploitation

human trafficking

terrorism and extremist content

severe violence or gore

distribution of illegal goods

criminal activity facilitation

revenge pornography

credible threats of physical harm

malware or hacking tools

Action:

Instant removal

Permanent account termination

Mandatory evidence retention

Reporting to relevant authorities

Tier 2 – High-Risk Violations (Fast Removal + Temporary or Permanent Restrictions)

Includes:

hate speech

harassment or bullying

sexual content involving adults

depictions of non-graphic violence

significant fraud or impersonation

dangerous acts that encourage harm

self-harm instructions

Action:

Removal within minutes/hours

Account suspension or probation

Mandatory human moderation review

Tier 3 – Medium-Risk Violations (Removal or Visibility Reduction)

Includes:

misinformation with potential harm

borderline explicit content

aggressive or offensive language

misleading Marketplace listings

content violating intellectual property laws

Action:

Content removal or shadow reduction

Warning issued

Repeat offenses escalate to Tier 2

Tier 4 – Low-Risk or Borderline Content (Non-removal Enforcement)

Includes content that is not prohibited but may be:

sensitive

misleading

contextually concerning

Action:

Visibility reduction

Age gating

Limited distribution

3. MODERATION METHODS

Rydora uses a hybrid moderation system consisting of:

3.1. Automated Detection Tools

Rydora uses automated systems such as:

Google Cloud Vision SafeSearch

Rydora internal AI classifiers

computer vision algorithms

text analysis (NLP)

audio analysis

metadata and EXIF analysis

behavioral anomaly detection

These tools detect:

nudity

violence

hate symbols

graphic content

illegal activities

scams and spam

danger patterns

3.2. Human Moderation Teams

Moderators:

review flagged content

make contextual decisions

escalate cases requiring legal intervention

audit automated system outputs

oversee Marketplace compliance

Moderators are trained in:

safety standards

trauma-informed review practices

regional cultural contexts

child safety protection

legal reporting obligations

3.3. User Reporting System

Users may report:

posts

comments

private messages

accounts

Marketplace listings

Reports are automatically logged and triaged.

3.4. Law Enforcement and External Cooperation

Rydora may cooperate with:

police authorities

cybercrime units

anti-trafficking agencies

child safety organizations

regulatory authorities

4. ENFORCEMENT PROCEDURES

4.1. Content Evaluation Process

Content is evaluated through:

automated scanning

contextual analysis

human moderator review

escalation (if necessary)

4.2. Enforcement Actions

Rydora may impose:

content removal

disabling of features

messaging restrictions

comment bans

posting limitations

temporary account suspensions

permanent account deletion

Marketplace bans

IP address blocks

device ID blocks

removal of fraudulent sales earnings

4.3. Emergency Actions

Rydora may immediately:

restrict an account

lock an account

prevent posting

preserve evidence

This applies to:

child exploitation

credible threats

self-harm emergencies

imminent real-world harm

5. MARKETPLACE-SPECIFIC MODERATION

Moderation includes:

verification of listings

detection of counterfeit goods

fraud and scam detection

review of payment anomalies

removal of illegal items

seller reputation tracking

purchase dispute monitoring

High-risk sellers may be suspended without notice.

6. AUTOMATED DECISION-MAKING & USER RIGHTS

6.1. Users acknowledge that decisions may be made using automated systems.

6.2. Users may request:

explanation of enforcement

appeal of removal

review by human moderators

6.3. Automated decisions may be overridden by human moderators when appropriate.

7. EVIDENCE RETENTION AND LOGGING

For safety, compliance, and legal requirements, Rydora may retain:

removed content

moderation logs

chat logs (limited, per legal safety exception)

Marketplace transaction details

device identifiers

Retention timeline:

Tier 1 violations: up to 10 years

Other violations: up to 5 years

Appeals-related data: until resolution

8. APPEALS PROCESS

Users may appeal actions taken against:

content

account

Marketplace listings

Appeals must include:

rationale

contextual explanation

evidence (if applicable)

Rydora will:

acknowledge appeal

review both automated and human decisions

issue final determination

Decisions may be:

upheld

reversed

modified

9. TRANSPARENCY & AUDITABILITY

Rydora maintains:

internal audit logs

decision traceability

regular AI bias testing

transparency summaries (if legally required)

10. MODERATOR CONDUCT STANDARDS

Moderators must:

follow confidentiality rules

maintain impartiality

avoid unauthorized data access

undergo bias and ethics training

adhere to internal safety protocols

11. AI AND MACHINE LEARNING OVERSIGHT

Rydora ensures:

continuous evaluation of AI systems

dataset quality reviews

human-in-the-loop verification

minimization of false positives/negatives

compliance with transparency requirements (EU AI standards)

12. POLICY UPDATES

Rydora may revise this Policy at any time to comply with:

regulatory changes

app store requirements

technological developments

internal operational improvements

Continued use of the Platform constitutes acceptance.

13. CONTACT

For moderation-related inquiries:

📧 support@rydora.me

For appeals:

📧 support@rydora.me

For legal matters:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="Content Moderation Policy"
    >
      {content}
    </PolicyLayout>
  );
}

