import PolicyLayout from "../components/PolicyLayout";

export default function MarketplacePolicyPage() {
  const content = `RYDORA MARKETPLACE POLICY (FULL LEGAL VERSION)

Last Updated: 11.17.25

Effective Date: 11.17.25

Jurisdiction: Montenegro, global applicability

RYDORA – MARKETPLACE POLICY

This Marketplace Policy ("Policy") governs all activities relating to the buying, selling, listing, shipping, promotion, distribution, or advertisement of products or services ("Items") via the Rydora Marketplace ("Marketplace"), operated by Trid Tech DOO and Rydora DOO ("Rydora", "we", "us", "our").

By participating in the Marketplace, you ("User", "Buyer", "Seller") agree to comply with this Policy, the Terms & Conditions, Privacy Policy, Community Guidelines, Content Moderation Policy, and all applicable laws.

1. PURPOSE AND SCOPE

1.1. The purpose of this Policy is to ensure:

trust

consumer protection

legal compliance

transparency

safety and integrity of transactions

protection against fraud and abuse

1.2. This Policy applies to:

Marketplace buyers

Marketplace sellers

Marketplace listings

any transaction conducted within Rydora

1.3. Rydora acts as an intermediary platform and is not a seller or party to transactions between Users.

2. ELIGIBILITY REQUIREMENTS

2.1. Buyers

Buyers must:

have a valid Rydora account

be at least 18 years old

provide accurate delivery and payment information

2.2. Sellers

Sellers must:

be at least 18 years old

provide accurate identity information (KYC if required)

comply with all applicable commerce laws

possess the legal right to sell listed Items

maintain accurate and updated listings

Rydora may require business verification for high-volume sellers.

3. ROLE OF RYDORA

3.1. Rydora provides a technical platform enabling the exchange of goods.

3.2. Rydora is not a marketplace participant and does not:

own items listed by sellers

verify item authenticity (unless otherwise stated)

guarantee quality, safety, legality, or condition of items

manage shipping, delivery, or returns

provide warranties on products

3.3. Rydora may mediate disputes but is not obligated to provide resolution.

4. PROHIBITED ITEMS

The following items are strictly prohibited:

4.1. Illegal or Regulated Items

illegal drugs

drug paraphernalia

stolen goods

explosive materials

weapons or ammunition

prescription medication

medical devices requiring certification

alcohol/tobacco (unless legally allowed & approved)

hazardous materials

endangered species, ivory, restricted wildlife

4.2. Adult or Explicit Material

pornography

sexual services

adult toys

fetish or erotic content

4.3. Financial and Digital Assets

cryptocurrencies not allowed by local laws

unlicensed financial services

hacked accounts or access credentials

software cracks, pirated digital goods

4.4. Counterfeit, Unauthorized, or Unsafe Items

fake brand-name products

recalled goods

unsafe electronics

cosmetics without certification

expired goods

4.5. Items Encouraging Harm or Illegal Acts

explosives

self-harm tools

hate symbols

propaganda for extremist groups

Violation of this section may lead to:

immediate listing removal

permanent seller ban

referral to law enforcement

5. SELLER OBLIGATIONS

Sellers agree to:

5.1. Accuracy of Listings

Listings must include:

truthful descriptions

correct pricing

real product photos

disclosure of defects

delivery times

return policy

Misleading or fraudulent listings are prohibited.

5.2. Order Fulfillment

Sellers must:

ship items promptly

provide reliable tracking information

package goods safely

comply with customs, taxes, and legal requirements

5.3. Customer Communication

Sellers must:

respond within a reasonable timeframe

resolve legitimate customer issues

5.4. Compliance Obligations

Sellers must comply with:

intellectual property laws

consumer protection regulations

product safety standards

Marketplace Policy

5.5. Prohibition on Circumventing Fees

Sellers may not:

redirect buyers off-platform

avoid Marketplace fees

manipulate transactions

6. BUYER OBLIGATIONS

Buyers must:

provide accurate shipping information

honor payment commitments

refrain from fraudulent claims

review product descriptions carefully

engage in good-faith dispute resolution

Chargeback fraud may result in account termination.

7. FEES, PAYMENTS, AND PAYOUTS

7.1. Rydora may charge:

listing fees

transaction fees

commission fees

promotional fees

All fees will be disclosed before use of Marketplace services.

7.2. Payments are processed exclusively via third-party payment processors:

Stripe

PayPal

Apple Pay / Google Pay

Rydora does not store payment card data.

7.3. Payouts may be delayed due to:

fraud checks

dispute review

suspicious activity

regulatory compliance

8. SHIPPING, DELIVERY & RISK

8.1. Sellers bear all responsibility for:

shipping

packaging

delivery

customs (where applicable)

lost or damaged items (unless buyer fault is proven)

8.2. Buyers assume responsibility once:

the item is successfully delivered to the provided address

9. RETURNS, REFUNDS, AND DISPUTES

9.1. Seller Policies

Sellers must provide a clear return/refund policy.

If a seller does not specify a policy, the following default applies:

returns allowed within 14 days

full refund required for counterfeit or inaccurate items

9.2. Rydora Involvement

Rydora may intervene in disputes involving:

fraud

misrepresentation

missing items

unsafe goods

However, Rydora is not obligated to force refunds unless a violation of this Policy is established.

9.3. Evidence Requirements

Buyers may need to submit:

photos

videos

shipment tracking

communication logs

10. FRAUD PREVENTION & SECURITY

Prohibited:

listing fake items

false non-delivery claims

stolen credit cards

creating multiple accounts for fraud

price manipulation

Marketplace interference

refund abuse

Rydora uses:

automated fraud detection

device fingerprinting

behavioral monitoring

manual review

Violators may face:

account removal

forfeiture of earnings

legal action

11. MODERATION AND ENFORCEMENT

11.1. Listings may be reviewed by:

automated scanning systems

Google Cloud Vision SafeSearch

internal AI classifiers

human moderators

11.2. Enforcement actions include:

listing removal

seller restrictions

temporary suspension

permanent ban

Marketplace exclusion

financial holds

law enforcement reporting

12. DATA PRIVACY AND USE OF INFORMATION

Buyers and sellers may exchange information such as:

name

phone number

email

shipping address

This information may only be used to complete the transaction.

Misuse (spam, harassment, marketing) is prohibited and will result in sanctions.

All data is processed in accordance with the Rydora Privacy Policy.

13. LIABILITY AND DISCLAIMER

Rydora is not liable for:

product quality

delivery delays

failures by sellers

fraudulent buyers

injuries or damages caused by products

warranty issues

Users participate in the Marketplace at their own risk.

14. TERMINATION OF MARKETPLACE ACCESS

Rydora may suspend or terminate Marketplace privileges for:

repeated violations

fraud

sale of prohibited items

unsafe behavior

legal compliance reasons

Termination may occur without prior notice.

15. POLICY UPDATES

Rydora may update this Policy at any time.

Updated versions are effective upon posting.

16. CONTACT INFORMATION

Marketplace Support:

📧 support@rydora.me

Legal Inquiries:

📧 support@rydora.me`;

  return (
    <PolicyLayout
      title="Marketplace Policy"
      lastUpdated="11.17.25"
      effectiveDate="11.17.25"
    >
      {content}
    </PolicyLayout>
  );
}

