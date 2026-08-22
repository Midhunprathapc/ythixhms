import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HeroSection } from '@/components/marketing/HeroSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { HostelCard } from '@/components/marketing/HostelCard';
import { Testimonials } from '@/components/marketing/Testimonials';
import { FAQSection } from '@/components/marketing/FAQSection';

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection
        title="Experience Premium Student Living"
        subtitle="Discover luxury accommodation designed for the modern international student. Your home away from home."
        imageUrl="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2000"
        primaryAction={{ label: 'Find Your Room', href: '/hostels' }}
        secondaryAction={{ label: 'View Facilities', href: '/facilities' }}
      />

      {/* Featured Properties Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>Featured Residences</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Select from our most popular premium student properties.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <HostelCard
              id="1"
              slug="grand-plaza"
              name="The Grand Plaza Residence"
              location="Central Downtown District"
              imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
              startingPrice={850}
              availableBeds={12}
            />
            <HostelCard
              id="2"
              slug="university-heights"
              name="University Heights Premium"
              location="North Campus Area"
              imageUrl="https://images.unsplash.com/photo-1502672260266-1c1529392981?auto=format&fit=crop&q=80&w=1000"
              startingPrice={650}
              availableBeds={4}
            />
            <HostelCard
              id="3"
              slug="oasis-studios"
              name="Oasis Studio Apartments"
              location="Riverside Cultural Quarter"
              imageUrl="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000"
              startingPrice={1100}
              availableBeds={0}
            />
          </div>
        </div>
      </section>

      <FeatureGrid
        title="World-Class Amenities"
        subtitle="Everything you need to excel in your studies and enjoy your university life."
        features={[
          { icon: 'wifi', title: 'Enterprise Wi-Fi', description: 'Gigabit fiber internet available in all rooms and common areas.' },
          { icon: 'shield', title: '24/7 Security', description: 'Biometric access control, CCTV, and on-site security personnel.' },
          { icon: 'gym', title: 'Fitness Center', description: 'Fully equipped modern gym available to all residents.' },
          { icon: 'study', title: 'Quiet Study Zones', description: 'Dedicated soundproofed study rooms and collaboration spaces.' },
          { icon: 'cafe', title: 'In-house Cafe', description: 'Premium coffee and healthy meals available daily.' },
          { icon: 'community', title: 'Social Events', description: 'Weekly curated events to help you build your international network.' },
        ]}
      />

      <Testimonials
        title="What Our Residents Say"
        testimonials={[
          {
            content: "Living here has completely transformed my university experience. The facilities are incredible and the community is so welcoming.",
            author: { name: "Sarah Jenkins", role: "Medical Student, Year 3", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" }
          },
          {
            content: "The best accommodation I've ever stayed in. The study rooms are perfectly quiet, and the gym saves me so much time.",
            author: { name: "David Chen", role: "Postgraduate Researcher", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
          },
          {
            content: "As an international student, I felt at home immediately. The staff are incredibly supportive and friendly.",
            author: { name: "Elena Rodriguez", role: "Business Analytics", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" }
          }
        ]}
      />

      <FAQSection
        title="Frequently Asked Questions"
        items={[
          { question: "Are bills included in the rent?", answer: "Yes, all our luxury student properties include electricity, water, heating, and enterprise-grade internet in the monthly rent." },
          { question: "What is the security deposit?", answer: "The standard security deposit is equivalent to one month's rent, which is held in a secure government-approved deposit scheme." },
          { question: "Can I choose my specific room?", answer: "During the booking process, you can select your exact building, floor, room, and bed based on real-time availability." },
          { question: "Do I need a guarantor?", answer: "If you wish to pay rent in installments, a UK-based guarantor is usually required. Otherwise, you can pay the full year upfront." }
        ]}
      />
    </PublicLayout>
  );
}
