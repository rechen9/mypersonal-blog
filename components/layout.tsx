import styles from './layout.module.css'
import Link from 'next/link';
import utils from '../styles/utils.module.css'
import Head from 'next/head';
import React, { ReactNode } from 'react';

const name = 'ReChen'
export const siteTitle = 'ReChen blog'

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
}

export default function Layout({ children , home }:LayoutProps) {
    return (
      <div className={styles.container}>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
      {home ?(
        <>
            <img
                src='/image/author.jpg'
                className={`${styles.headerHomeImage} ${utils.borderCircle}`}
                alt={name}
            />
            <h1 className={utils.heading2Xl}>{name}</h1>
            <main>{children}</main>
        </>
      ) : (
        <>
        <Link href="/">
                <img
                  src='/image/author.jpg'
                  className={`${styles.headerImage} ${utils.borderCircle}`}
                  alt={name}
                />
        </Link>
        <h2 className={utils.headingLg}>{name}</h2>
        <main>{children}</main>
        <div className={styles.backToHome}>
          <Link href="/">
            ← Back to home
          </Link>
        </div>
        </>
      )}
      </header>
      </div>
    );
  }