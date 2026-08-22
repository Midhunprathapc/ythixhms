'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export const HeroSection = ({
  title,
  subtitle,
  imageUrl,
  primaryAction,
  secondaryAction,
}: HeroSectionProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.actions}>
          {primaryAction && (
            <Link href={primaryAction.href}>
              <Button variant="secondary" size="lg">{primaryAction.label}</Button>
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">{secondaryAction.label}</Button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
};
