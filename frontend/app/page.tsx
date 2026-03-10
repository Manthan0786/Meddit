import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.landing_root}>
      <div className={styles.landing_container}>
        <section className={styles.hero}>
          <div>
            <div className={styles.hero_badge}>
              Meddit · Stories that start in hospitals, not in ads
            </div>
            <h1 className={styles.hero_title}>
              Share what worked.
              <br />
              <span className={styles.hero_highlight}>
                Discover real natural remedies.
              </span>
            </h1>
            <p className={styles.hero_subtitle}>
              Meddit is a home for real stories about natural and organic
              protocols that helped people heal, feel better, or avoid more
              invasive options.
            </p>
            <div className={styles.hero_ctas}>
              <a href="/feed" className={styles.primaryCta}>
                Browse community stories
              </a>
              <a href="/feed" className={styles.secondaryCta}>
                Share your own journey
              </a>
            </div>
          </div>

          <aside className={styles.hero_image_wrap}>
            <Image
              src="https://images.unsplash.com/photo-1604768802835-899055f0e245?w=800&q=80"
              alt="Chia seeds in a jar"
              width={480}
              height={360}
              className={styles.hero_image}
              unoptimized
            />
          </aside>
        </section>

        <section className={styles.images_section}>
          <h2 className={styles.section_heading}>What worked for people</h2>
          <p className={styles.section_text}>
            Real protocols from the community: herbs, teas, movement, and
            lifestyle changes that made a difference.
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

        <section className={styles.hero_sidecard}>
          <div className={styles.hero_sidecard_title}>A peek inside</div>
          <div className={styles.hero_gallery}>
            <div className={styles.hero_card_with_img}>
              <Image
                src="https://images.unsplash.com/photo-1540420773520-1f1bbeafc518?w=400&q=80"
                alt="Leafy greens and whole foods for recovery"
                width={280}
                height={160}
                className={styles.hero_card_img}
                unoptimized
              />
              <div className={styles.hero_card_content}>
                <div className={styles.hero_card_tagline}>
                  Saved from surgery
                </div>
                <div className={styles.hero_card_title}>
                  &quot;Three months of liver support and my gallbladder scan
                  changed.&quot;
                </div>
              </div>
            </div>
            <div className={styles.hero_card_with_img}>
              <Image
                src="https://images.unsplash.com/photo-1604768802835-899055f0e245?w=400&q=80"
                alt="Chia seeds and water – a simple ritual that worked"
                width={280}
                height={160}
                className={styles.hero_card_img}
                unoptimized
              />
              <div className={styles.hero_card_content}>
                <div className={styles.hero_card_tagline}>Daily protocol</div>
                <div className={styles.hero_card_title}>
                  Chia seeds and water every morning – 4 months. One of many
                  stories.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div>
            <h2 className={styles.section_heading}>What is Meddit?</h2>
            <p className={styles.section_text}>
              Meddit is a story-first space for natural and organic approaches
              to healing. Each post is a timeline: what someone tried, for how
              long, and what changed.
            </p>
          </div>

          <div className={styles.steps_list}>
            <div className={styles.step_card}>
              <div className={styles.step_label}>Step 1</div>
              <div className={styles.step_title}>Tell the full story</div>
              <p className={styles.step_body}>
                Start a post about your situation and what you&apos;re hoping to
                change.
              </p>
            </div>
            <div className={styles.step_card}>
              <div className={styles.step_label}>Step 2</div>
              <div className={styles.step_title}>Document your protocol</div>
              <p className={styles.step_body}>
                List the foods, herbs, movement, and lifestyle changes you
                actually tried.
              </p>
            </div>
            <div className={styles.step_card}>
              <div className={styles.step_label}>Step 3</div>
              <div className={styles.step_title}>Share outcomes, not hype</div>
              <p className={styles.step_body}>
                Share what improved, what didn&apos;t, and what you&apos;d try
                again.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div>
            <h2 className={styles.section_heading}>Why Meddit exists</h2>
            <p className={styles.section_text}>
              Helpful remedies are often buried in random comments and old
              forums. Meddit brings those experiences into one calm, searchable
              feed.
            </p>
          </div>

          <div className={styles.reasons_grid}>
            <div className={styles.reason_card}>
              <div className={styles.reason_title}>Real people, not bots</div>
              <p className={styles.reason_body}>
                Stories are written by individuals with names, timelines, and
                context – not anonymous product reviews.
              </p>
            </div>
            <div className={styles.reason_card}>
              <div className={styles.reason_title}>
                Natural &amp; integrative focus
              </div>
              <p className={styles.reason_body}>
                Centered on food, herbs, movement, and complementary care –
                alongside, not instead of, conventional medicine.
              </p>
            </div>
            <div className={styles.reason_card}>
              <div className={styles.reason_title}>Honest outcomes</div>
              <p className={styles.reason_body}>
                Posts capture &quot;what actually happened&quot; – even when the
                story didn&apos;t end with a cure, so others can learn from the
                full picture.
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
