import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Speech Transcriber",
  description: "How Speech Transcriber handles audio, transcripts, and related data.",
};

const effectiveDate = "June 18, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      {/* <div className={styles.backLinkWrap}>
        <Link className={styles.backLink} href="/">
          Back to home
        </Link>
      </div> */}

      <article className={styles.card}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Privacy Policy</p>
          <h1>How we handle audio, transcripts, and support data.</h1>
          <p className={styles.intro}>
            This policy explains what we collect, why we collect it, and the
            choices you have when using Speech Transcriber.
          </p>
          <p className={styles.meta}>Effective date: {effectiveDate}</p>
        </header>

        <section className={styles.section}>
          <h2>Information we collect</h2>
          <p>
            We collect the information you provide directly, including audio or
            video files you upload, microphone recordings you start in the app,
            transcripts generated from those files, and messages you send to us
            for support or account help.
          </p>
          <p>
            We may also collect basic device and usage data, such as browser
            type, timestamps, error logs, and page interactions, to keep the
            service reliable and secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How we use your information</h2>
          <p>
            We use audio and transcript data to provide transcription features,
            display your results, improve error handling, and maintain the
            service. We may also use this information to respond to requests,
            troubleshoot issues, and prevent abuse.
          </p>
          <p>
            To generate transcripts, we may send your audio and related metadata
            to third-party service providers that process the content on our
            behalf, including AI and cloud infrastructure vendors.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How we share information</h2>
          <p>
            We do not sell personal information. We only share information with
            trusted service providers that help us run the app, when required by
            law, or when needed to protect our users, our service, or our rights.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Retention</h2>
          <p>
            We keep audio, transcripts, and related logs only as long as needed
            to provide the service, meet legal or operational requirements, or
            resolve disputes. When data is no longer needed, we delete it or
            anonymize it where practical.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your choices</h2>
          <p>
            Depending on your location, you may have rights to access, correct,
            export, or delete your personal information. You can also limit
            certain processing by contacting us using the details below.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Children&apos;s privacy</h2>
          <p>
            Speech Transcriber is not intended for children under 13, and we do
            not knowingly collect personal information from children under 13.
            If you believe a child has provided us information, contact us so we
            can take appropriate action.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational
            safeguards to protect data. No method of transmission or storage is
            completely secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            If you have questions about this policy or want to exercise your
            privacy rights, contact us at <a href="mailto:krasnoff.kobi@gmail.com">krasnoff.kobi@gmail.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}