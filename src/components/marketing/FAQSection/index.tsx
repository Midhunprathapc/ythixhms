'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export const FAQSection = ({ title, items }: FAQSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        <div className={styles.accordion}>
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className={`${styles.item} ${isOpen ? styles.active : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <ChevronDown
                    className={`${styles.icon} ${isOpen ? styles.rotated : ''}`}
                    size={20}
                  />
                </button>
                <div className={`${styles.answer} ${isOpen ? styles.open : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
