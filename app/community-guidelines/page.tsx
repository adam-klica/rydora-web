import PolicyLayout from "../components/PolicyLayout";

export default function CommunityGuidelinesPage() {
  const content = `RYDORA COMMUNITY GUIDELINES 

Last Updated: [DATE]

Effective Date: [DATE]

Jurisdiction: Montenegro

RYDORA – COMMUNITY GUIDELINES (LEGAL VERSION)

These Community Guidelines ("Guidelines") constitute a legally binding and enforceable policy governing user behavior, content standards, and platform integrity on the Rydora Platform. These Guidelines form an integral part of the Rydora Terms & Conditions and apply to all users ("Users").

Failure to comply may result in content removal, feature restrictions, account suspension, permanent termination, Marketplace bans, or referral to law enforcement.

1. PURPOSE AND SCOPE

1.1. Rydora is a global platform enabling users to create, upload, distribute, and engage with visual and textual content, as well as participate in the Rydora Marketplace.

1.2. These Guidelines establish safety standards necessary to maintain:

integrity of the Platform,

protection of users,

compliance with legal and regulatory obligations,

prevention of harmful, illegal, or abusive behaviors.

1.3. These Guidelines apply to all content, including:

photos, videos, text, comments, messages, captions, hashtags, profile information, Marketplace listings, live content, and metadata.

2. FUNDAMENTAL PRINCIPLES

All Users must adhere to the following principles:

Safety: No content or behavior that harms, threatens, exploits, or endangers individuals.

Integrity: No manipulation, deception, fraud, impersonation, or copyright infringement.

Respect: No harassment, hate, discrimination, or abuse.

Legality: No illegal goods, activities, services, or conduct.

Authenticity: No fabricated engagement, spam, automation, or artificial amplification.

Accountability: Users are responsible for their own actions and content.

3. PROHIBITED CONTENT

The following categories of content are strictly prohibited. This section is interpreted expansively.

3.1. Sexual Content and Adult Material

Absolutely prohibited:

pornography

explicit sexual acts

sexualized nudity

fetish content

solicitation of sexual services

explicit sex chats, sexting, sexual role-play

any content whose dominant purpose is sexual arousal

Zero Tolerance: Minors

nudity of minors

sexual content involving minors

grooming, enticement, or predatory behavior

sexualized comments about minors

Rydora will report violations involving minors to law enforcement.

3.2. Violence, Physical Harm, and Graphic Content

Prohibited:

threats or acts of violence

physical assault, abuse, or cruelty

graphic injuries, blood, gore

depictions of bodily harm

violent extremist acts

Allowed with restrictions:

non-graphic depictions of conflict (news, education)

historical context when not glorifying violence

3.3. Hate Speech and Discrimination

Prohibited content targeting protected categories, including:

race, ethnicity, national origin

religion

gender, gender identity

sexual orientation

disability or medical conditions

immigration status

age

This includes slurs, dehumanization, segregation, exclusion, or violence against protected groups.

3.4. Harassment, Bullying, and Abuse

Prohibited:

targeted harassment

coordinated attacks

insults, degrading remarks

dissemination of private information (doxxing)

threats, blackmail, extortion

malicious manipulation of images (deepfakes)

3.5. Self-Harm, Suicide, and Dangerous Acts

Prohibited:

promotion of self-harm or suicide

instructions for self-harm

encouragement of harmful behavior

depictions of self-inflicted injury

Allowed:

non-graphic mental-health supportive content

crisis resources

3.6. Illegal Activities and Criminal Behavior

Prohibited:

sale, purchase, or facilitation of illegal goods

drug use, production, or distribution

trafficking, exploitation, prostitution

terrorism, extremist content

hacking tools, malware, or exploits

instructions for committing illegal acts

3.7. Fraud, Scams, and Deception

Prohibited:

phishing, financial scams

impersonation of people or brands

false claims, misleading promotions

fake investment schemes

fraudulent Marketplace listings

3.8. Intellectual Property Violations

Prohibited:

unauthorized copyrighted content

plagiarized works

counterfeit goods

unlicensed use of trademarks

unauthorized AI-generated replicas of real people

3.9. Spam, Manipulation, and Automation

Prohibited:

bots, automation, mass messaging

fake engagement (buying likes, followers, comments)

repetitive, irrelevant, or misleading posts

link baiting

artificial promotion of Marketplace listings

3.10. Dangerous Organizations and Individuals

Prohibited:

terrorist groups

hate groups

organized criminal enterprises

violent extremist individuals

Content supportive or glorifying such entities is removed.

4. PROHIBITED MARKETPLACE BEHAVIOR

Marketplace violations include:

sale of illegal or restricted items

counterfeit or unsafe goods

fraudulent transactions

non-delivery of goods

misleading listings

false claims about product condition

Marketplace rules are fully detailed in the Marketplace Policy.

5. AUTOMATED DETECTION AND MODERATION

5.1. Rydora uses automated tools including Google Cloud Vision SafeSearch, metadata classifiers, and behavioral monitoring.

5.2. Automated systems scan:

images

videos

text

listings

messages (under safety conditions)

5.3. Users expressly consent to:

automated review

content flagging

enforcement actions based on automated output

6. ENFORCEMENT ACTIONS

Rydora may take one or more of the following actions:

content removal

temporary feature limitations

shadow restrictions (reduced visibility)

warning notices

account suspension

permanent account termination

Marketplace bans

removal of earnings (if applicable)

referral to law enforcement

7. REPORTING SYSTEM

7.1. Users may report violations via:

in-app reporting tools

email to support@rydora.me

7.2. Reports are reviewed by automated systems and human moderators.

7.3. Abuse of reporting tools (false mass-reporting) may result in sanctions.

8. APPEALS PROCESS

Users may appeal content removal or sanctions via email or in-app appeal systems.

Rydora reserves sole discretion over all final decisions.

9. ACCOUNTABILITY

9.1. Users are solely responsible for:

content they upload

interactions with other users

adherence to all Rydora policies

9.2. Violations of law are the sole responsibility of the User.

10. POLICY UPDATES

Rydora may modify these Guidelines at any time.

Continued use constitutes acceptance of updated rules.

11. CONTACT INFORMATION

For general support:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="Community Guidelines"
      lastUpdated="[DATE]"
      effectiveDate="[DATE]"
    >
      {content}
    </PolicyLayout>
  );
}

