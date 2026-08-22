'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Shield, Dumbbell, Coffee, BookOpen, Users } from 'lucide-react';
import styles from './FeatureGrid.module.css';

export interface Feature {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
}

const ICONS = {
  wifi: Wifi,
  shield: Shield,
  gym: Dumbbell,
  cafe: Coffee,
  study: BookOpen,
  community: Users,
};

export interface FeatureGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export const FeatureGrid = ({ title, subtitle, features }: FeatureGridProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => {
            const IconComponent = ICONS[feature.icon];
            return (
              <motion.div
                key={index}
                className={styles.feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.iconWrapper}>
                  {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
