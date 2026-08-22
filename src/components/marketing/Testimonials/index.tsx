'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

export interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

export interface TestimonialsProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export const Testimonials = ({ title, subtitle, testimonials }: TestimonialsProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Quote className={styles.quote} size={32} />
              <p className={styles.content}>"{testimonial.content}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.author.avatarUrl ? (
                    <Image
                      src={testimonial.author.avatarUrl}
                      alt={testimonial.author.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : null}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{testimonial.author.name}</span>
                  <span className={styles.role}>{testimonial.author.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
