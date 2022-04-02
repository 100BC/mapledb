import React from 'react';
import Link from 'next/link';

import styles from '@styles/about.module.scss';
import LaunchSVG from '@assets/svg/launch.svg';
import Layout from '@components/Layout';

const About = () => {
  return (
    <Layout
      title="About | Mooseical"
      description="Goals and details about Mooseical - Canadian Music Database."
      canonicalUrlPath="/about"
      className={styles.about}
    >
      <h1>About</h1>
      <hr />
      <section className={styles.section}>
        <h2>Mooseical&apos;s Goal</h2>
        <hr />
        <p>
          Mooseical is a passion project of mine that aims to promote Canadian
          underground music. I offer a database of underground musicians based
          in Canada.
        </p>
        <br />
        <p>
          This website is still in it&apos;s infancy, therefore it has a long
          way to go. Help me promote Canadian music by offering suggestions and
          recommendation in order to best do my goal.
        </p>
        <br />
        <p>I currently working on the following features to add to the site:</p>
        <ul>
          <li>Expand database filtering to include multiple sub categories</li>
          <li>Add a search feature</li>
        </ul>
        <p>
          I aim to add a new artist at least once every few days. I am open to
          any and all suggestions when it comes to improving this website.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Which Musicians are Featured?</h2>
        <hr />
        <p>
          Musicians featured on this website are musicians based in Canada (not
          necessarily Canadian) that I think more people should know about. Not
          every Canadian musician will be listed on this site. I aim to promote
          musicians that aren&apos;t a household name in Canada; you don&apos;t
          need my help to discover Drake. Secondly, I wish to promote musicians
          and new music that will appeal to other musicheads.
        </p>
        <br />
        <p>
          If there is a musician not featured on Mooseical that you think should
          be, please suggest it to me. If they fit the criteria and/or receive a
          lot of requests, they will be added.{' '}
          <Link href="/suggest-musician">
            <a>Click here to suggest an Musician.</a>
          </Link>
        </p>
        <br />
        <ul>
          <li>
            Priority is given to musicians who have released new music recently
          </li>
          <li>
            I don&apos;t personally need to enjoy the musician for them to be
            featured on the site
          </li>
          <li>
            I am not against adding Canadians based outside of Canada, but first
            let me add the ones that are still here
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Why only Musicians based in Canada?</h2>
        <hr />
        <p>
          I started this because my favourite musicians didn&apos;t tour in my
          city even though it is one of the larger cities here in Canada. I
          tried finding active Canadian musicians since they&apos;d be the ones
          most likely to tour here. But I found that the other music database
          websites either did a poor job of helping me find Canadian musicians,
          or if it did help me find Canadians, it did a poor job helping me find
          Canadians that I&apos;d like. So here I am trying to fix that, at
          least for myself.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Who am I?</h2>
        <hr />
        <p>Just a musichead from Canada.</p>
      </section>
      <section className={styles.section}>
        <h2>What is my taste in music?</h2>
        <hr />
        <p>Here are my top songs of 2019, 2020, and 2021 ordered:</p>
        <br />
        <ul>
          <li>
            Spotify Playlist:{' '}
            <a
              href="https://open.spotify.com/playlist/0odd1TGHo43Im14ZTpYW0O"
              className={styles.spotify}
              rel="external"
            >
              Favourite Songs of 2019
              <LaunchSVG />
            </a>
          </li>
          <li>
            Spotify Playlist:{' '}
            <a
              href="https://open.spotify.com/playlist/6RbASNwaN1VrjlVXhyEnDQ"
              className={styles.spotify}
              rel="external"
            >
              Favourite Songs of 2020
              <LaunchSVG />
            </a>
          </li>
          <li>
            Spotify Playlist:{' '}
            <a
              href="https://open.spotify.com/playlist/0DaEetMcQCFXO2HWPPMES4"
              className={styles.spotify}
              rel="external"
            >
              Favourite Songs of 2021
              <LaunchSVG />
            </a>
          </li>
        </ul>
        <br />
        <p>
          As my knowledge of Canadian music expands I&apos;ll make Canadian
          based playlists.
        </p>
      </section>
      <section className={styles.section}>
        <h2>pfft your taste sucks</h2>
        <hr />
        <p>:(</p>
      </section>
      <time className={styles.lastUpdated}>Last Updated: 2021-12-04</time>
    </Layout>
  );
};

export default About;
