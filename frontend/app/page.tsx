import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.landing_root}>
      <div className={styles.landing_container}>
        <section className={styles.hero}>
          <div className={styles.hero_content}>
            <div className={styles.hero_badge}>
              Meddit · Who knows what might work for you?
            </div>
            <h1 className={styles.hero_title}>
              Share what worked.
              <br />
              <span className={styles.hero_highlight}>
                Discover natural remedies.
              </span>
            </h1>
            <p className={styles.hero_subtitle}>
              Meddit is a home for real stories about natural remedies that
              helped people heal, feel better, or avoid more invasive options.
            </p>
            <div className={styles.hero_ctas}>
              <a href="/feed" className={styles.primaryCta}>
                Share your own journey
              </a>
            </div>
          </div>

          <div className={styles.hero_side}>
            <aside className={styles.hero_image_wrap}>
              <Image
                src="https://images.unsplash.com/photo-1604768802835-899055f0e245?w=800&q=80"
                alt="Chia seeds in a jar"
                width={900}
                height={900}
                className={styles.hero_image}
                unoptimized
              />
            </aside>
          </div>
        </section>

        <section className={styles.images_section}>
          <h2 className={styles.section_heading}>What worked for people</h2>
          <p className={styles.section_text}>
            Herbs, teas, movement, and lifestyle changes that made a difference.
          </p>
          <div className={styles.images_grid}>
            <div className={styles.image_card}>
              <Image
                src="https://images.unsplash.com/photo-1642497393633-a19e9231fb92?w=600&q=80"
                alt="Chia and seeds – simple superfoods that people swear by"
                width={400}
                height={280}
                className={styles.card_image}
                unoptimized
              />
              <div className={styles.image_card_caption}>
                Chia, flax &amp; seeds
              </div>
            </div>
            <div className={styles.image_card}>
              <Image
                src="https://images.unsplash.com/photo-1682530017002-34e2cb7b1653?w=600&q=80"
                alt="Turmeric and ginger tea – daily tonic that helped many"
                width={400}
                height={280}
                className={styles.card_image}
                unoptimized
              />
              <div className={styles.image_card_caption}>
                Turmeric &amp; ginger tea
              </div>
            </div>
            <div className={styles.image_card}>
              <Image
                src="https://images.unsplash.com/photo-1608744940436-5fca4a3c8786?w=600&q=80"
                alt="Golden milk and herbal tonics"
                width={400}
                height={280}
                className={styles.card_image}
                unoptimized
              />
              <div className={styles.image_card_caption}>
                Golden milk &amp; tonics
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div>
            <h2 className={styles.section_heading}>What is Meddit?</h2>
            <p className={styles.section_text}>
              Meddit is a story-first space for natural remedies approaches to
              healing. Each post is a timeline: what someone tried, for how
              long, and what changed.
            </p>
          </div>

          <div className={styles.steps_list}>
            <div className={styles.step_card}>
              <div className={styles.step_title}>Tell your story</div>
              <p className={styles.step_body}>
                Start a post about your situation and what you&apos;re hoping to
                change.
              </p>
            </div>
            <div className={styles.step_card}>
              <div className={styles.step_title}>Document your protocol</div>
              <p className={styles.step_body}>
                List the foods, herbs, movement, and lifestyle changes you
                actually tried.
              </p>
            </div>
            <div className={styles.step_card}>
              <div className={styles.step_title}>Share outcomes, not hype</div>
              <p className={styles.step_body}>
                Share what improved, what didn&apos;t, and what you&apos;d try
                again.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.final_cta}>
          <p className={styles.final_cta_text}>
            Ready to see how others navigated similar diagnoses, scans, and
            scary recommendations?
          </p>
          <a href="/feed" className={styles.primaryCta}>
            Explore Meddit feed
          </a>
        </section>
      </div>
    </main>
  );
}
