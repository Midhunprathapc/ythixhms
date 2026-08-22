'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/lib/api/auth';
import styles from './OTPLoginForm.module.css';

type Step = 'PHONE' | 'OTP';

export const OTPLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState<Step>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phone || phone.length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.requestOTP(phone);
      setStep('OTP');
      setCountdown(60); // 60 seconds cooldown
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.verifyOTP(phone, code);
      if (res.token) {
        // Set cookie for Next.js proxy/middleware to pick it up
        document.cookie = `hms-student-token=${res.token}; path=/; max-age=86400`;
        
        const callbackUrl = searchParams?.get('callbackUrl') || '/student';
        router.push(callbackUrl);
      } else {
        // If the backend returns success but uses HTTP-only cookies, we can just redirect
        if (res.success) {
            const callbackUrl = searchParams?.get('callbackUrl') || '/student';
            router.push(callbackUrl);
        } else {
            setError('Verification failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Invalid code.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setError(null);
    setIsLoading(true);
    try {
      await authApi.requestOTP(phone);
      setCountdown(60);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {step === 'PHONE' ? (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>Student Portal</h1>
              <p className={styles.subtitle}>Enter your registered phone number to sign in. We'll send you a secure code via SMS or WhatsApp.</p>
            </div>

            <form onSubmit={handlePhoneSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              
              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+44 20 7123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                required
              />
              
              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Login Code'}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>Verification</h1>
              <p className={styles.subtitle}>Enter the 6-digit code sent to <br/><strong>{phone}</strong> (Hint: use 123456)</p>
            </div>

            <form onSubmit={handleOtpSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              
              <div className={styles.otpInputGroup}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={styles.otpDigit}
                    disabled={isLoading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              
              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </Button>
            </form>

            <div className={styles.resendContainer}>
              Didn't receive the code?{' '}
              <button 
                type="button" 
                className={styles.resendButton} 
                onClick={handleResend}
                disabled={countdown > 0 || isLoading}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>

            <button 
              type="button" 
              className={styles.backButton}
              onClick={() => {
                setStep('PHONE');
                setError(null);
                setOtp(['', '', '', '', '', '']);
              }}
            >
              <ArrowLeft size={16} /> Back to Phone Input
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
