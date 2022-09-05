import React from 'react';

import styles from '@styles/about.module.scss';
import LaunchSVG from '@assets/svg/launch.svg';
import MainLayout from '@layouts/Main';

const About = () => {
  return (
    <MainLayout
      title="MapleDB | About"
      description="Goals and details about MapleDB - Canadian Music Database."
      canonicalUrlPath="/about"
      className={styles.about}
    >
      <h1>About</h1>
      <hr />
      <section className={styles.section}>
        <h2>MapleDB&apos;s Goal</h2>
        <hr />
        <p>
          MapleDB is a passion project of mine that aims to promote Canadian
          underground music. I offer a database of underground musicians based
          in Canada.
        </p>
        <br />
        <p>I update this website from time to time whenever I feel like it.</p>
        <br />
        <p>I currently working on the following features to add to the site:</p>
        <ul>
          <li>Expand database filtering to include multiple sub categories</li>
          <li>Add a search feature</li>
        </ul>
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
          I started this because my favourite musicians didn&apos;t tour in
          Canada outside of Toronto and maybe Montreal. I tried finding active
          Canadian musicians since they&apos;d be the ones most likely to tour
          Canada-wide. But I found that the other music database websites either
          did a poor job of helping me find Canadian musicians, or if it did
          help me find Canadians, it did a poor job helping me find Canadians
          that I&apos;d like. So here I am trying to fix that, at least for
          myself.
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
    </MainLayout>
  );
};

export default About;
