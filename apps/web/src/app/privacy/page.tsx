import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Transcriber",
  description: "Privacy policy for AI Transcriber.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.card}>
        <header className={styles.hero}>
          <h2>Privacy Policy</h2>
          <p className={styles.meta}>Last updated: June 2026</p>
        </header>

        <p className={styles.lead}>
          AI Transcriber (&ldquo;the App&rdquo;) respects your privacy.
        </p>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <p>The App may collect:</p>
          <ul>
            <li>Audio recordings provided by the user</li>
            <li>Speech-to-text transcriptions</li>
            <li>Device information required for app functionality</li>
            <li>Usage analytics (if enabled)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Convert speech to text</li>
            <li>Improve transcription accuracy</li>
            <li>Provide app features and support</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Data Storage</h2>
          <p>
            Audio recordings and transcriptions may be stored locally on your
            device and/or on secure cloud servers, depending on the features you
            use.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Services</h2>
          <p>The App may use third-party services such as:</p>
          <ul>
            <li>OpenAI</li>
            <li>Google Play Services</li>
            <li>Google Analytics</li>
          </ul>
          <p>
            These services may process data according to their own privacy
            policies.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Data Sharing</h2>
          <p>We do not sell personal information.</p>
          <p>
            We may share information only when necessary to provide app
            functionality or comply with legal obligations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security</h2>
          <p>
            We take reasonable measures to protect your information from
            unauthorized access.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Children&apos;s Privacy</h2>
          <p>
            The App is not intended for children under 13 years of age.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>For questions regarding this Privacy Policy:</p>
          <p>
            Email:{" "}
            <a href="mailto:krasnoff.kobi@gmail.com">
              krasnoff.kobi@gmail.com
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use
            of the App constitutes acceptance of any changes.
          </p>
        </section>
      </article>
    </main>
  );
}