import { motion } from 'framer-motion';
import { Send, Key, Copy, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import DOMPurify from 'dompurify';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pgpContainerRef = useRef<HTMLDivElement>(null);
  
  // CAPTCHA state
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captcha, setCaptcha] = useState(() => generateCaptcha());

  // Generate a simple math CAPTCHA
  function generateCaptcha() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number;

    // Secure random number generation
    const getSecureRandom = (min: number, max: number) => {
      const range = max - min + 1;
      const bytesNeeded = Math.ceil(Math.log2(range) / 8);
      const maxNum = Math.pow(256, bytesNeeded);
      const ar = new Uint8Array(bytesNeeded);

      while (true) {
        crypto.getRandomValues(ar);
        let val = 0;
        for (let i = 0; i < bytesNeeded; i++) {
          val = (val << 8) + ar[i];
        }
        if (val < maxNum - (maxNum % range)) {
          return min + (val % range);
        }
      }
    };

    switch (operation) {
      case '+':
        num1 = getSecureRandom(1, 20);
        num2 = getSecureRandom(1, 20);
        break;
      case '-':
        num1 = getSecureRandom(1, 20);
        num2 = getSecureRandom(1, num1);
        break;
      case '*':
        num1 = getSecureRandom(1, 10);
        num2 = getSecureRandom(1, 5);
        break;
      default:
        num1 = getSecureRandom(1, 20);
        num2 = getSecureRandom(1, 20);
    }

    // Safely calculate answer without eval()
    const calculateAnswer = (n1: number, n2: number, op: string): number => {
      switch (op) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
        default: return 0;
      }
    };

    return {
      question: `${num1} ${operation} ${num2}`,
      answer: calculateAnswer(num1, num2, operation).toString()
    };
  }

  const handleCopyPGP = async () => {
    const pgpKey = document.querySelector('.pgp-container code')?.textContent;
    if (pgpKey) {
      try {
        await navigator.clipboard.writeText(pgpKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        if (pgpContainerRef.current) {
          pgpContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#22c55e', '#10b981', '#059669'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: [], // No HTML allowed
      ALLOWED_ATTR: [] // No attributes allowed
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!formRef.current) {
      return;
    }

    // Validate CAPTCHA
    if (captchaAnswer !== captcha.answer) {
      setSubmitError('Incorrect CAPTCHA answer. Please try again.');
      setCaptchaAnswer('');
      setCaptcha(generateCaptcha());
      return;
    }

    // Get and sanitize form data
    const formData = new FormData(formRef.current);
    const name = sanitizeInput(formData.get('name') as string);
    const email = sanitizeInput(formData.get('email') as string);
    const message = sanitizeInput(formData.get('message') as string);

    // Enhanced validation
    if (!name || !email || !message) {
      setSubmitError('Please fill in all fields before submitting.');
      return;
    }

    if (name.length > 100) {
      setSubmitError('Name is too long (maximum 100 characters).');
      return;
    }

    if (!validateEmail(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    if (message.length > 5000) {
      setSubmitError('Message is too long (maximum 5000 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const jsonData = {
        name,
        email,
        message,
      };

      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(jsonData),
        credentials: 'omit' // Don't send cookies
      });

      if (response.ok) {
        setSubmitSuccess(true);
        triggerConfetti();
        formRef.current.reset();
        setCaptchaAnswer('');
        setCaptcha(generateCaptcha());
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4"
      >
        <h2 className="section-header text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Send className="w-8 h-8 text-green-500" aria-hidden="true" />
          <span>contact</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={isSubmitting}
                  className="form-input w-full bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 rounded-lg px-4 py-2 text-[rgb(var(--text-rgb))] focus:outline-none focus:border-green-500/50 disabled:opacity-50"
                  placeholder="John Doe"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email (Will be used for contact)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  className="form-input w-full bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 rounded-lg px-4 py-2 text-[rgb(var(--text-rgb))] focus:outline-none focus:border-green-500/50 disabled:opacity-50"
                  placeholder="john@example.com"
                  maxLength={254}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  className="form-textarea w-full bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 rounded-lg px-4 py-2 text-[rgb(var(--text-rgb))] focus:outline-none focus:border-green-500/50 h-32 resize-none disabled:opacity-50"
                  placeholder="Your message here..."
                  maxLength={5000}
                />
              </div>

              {/* CAPTCHA Section */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Verify you're human
                </label>
                <div className="flex items-center gap-4">
                  <div className="bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 rounded-lg px-4 py-2 text-green-400">
                    {captcha.question} = ?
                  </div>
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Answer"
                    className="form-input w-24 bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 rounded-lg px-4 py-2 text-[rgb(var(--text-rgb))] focus:outline-none focus:border-green-500/50"
                    required
                    maxLength={5}
                    pattern="-?[0-9]*"
                  />
                </div>
              </div>

              {submitSuccess && (
                <div className="text-green-500 text-sm">
                  Message sent successfully! Thank you for reaching out.
                </div>
              )}

              {submitError && (
                <div className="text-red-500 text-sm">{submitError}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="cyber-button w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  '[$ sending...]'
                ) : (
                  '[$ send_message]'
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-green-500">
                <Key className="w-4 h-4" aria-hidden="true" />
                <span>PGP Public Key</span>
              </div>
              <button 
                onClick={handleCopyPGP}
                className={`cyber-button !px-4 !py-2 flex items-center gap-2 text-sm ${copied ? 'text-green-400' : ''}`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>
            
            <div 
              ref={pgpContainerRef} 
              className="pgp-container relative rounded-lg bg-[rgba(var(--bg-rgb),0.3)] border border-green-500/20 overflow-hidden isolate"
            >
              <div className="max-h-[300px] overflow-y-auto overflow-x-auto custom-scrollbar">
                <pre className="p-4 text-gray-400 relative">
                  <code className="block whitespace-pre font-mono text-xs leading-relaxed">
                    {`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xm8EZ+O/yRMFK4EEACIDAwSZzHVo55XImzYyAJx7i4kHNXGwouQHpbSuWID9m5Qo
1Wu794lsdVOjPkw97TQR6myjJybHkvI/FifXDWVLtR+y9P9xEZbBcTLENu6HC10A
mWpfqgWpelN8HOAbzG5wY0DNTERhcnlsIEdhdHQgKFBvcnRmb2xpbyBDb21tdW5p
Y2F0aW9uIFBHUCBLZXkpIDxwaGFudG9tLnRlY2hzZWNAZGFyeWxnYXR0LmRldj7C
jwQTEwoAFwUCZ+O/yQIbLwMLCQcDFQoIAh4BAheAAAoJEBTOIqkqa6XjJlgBfjwX
C7Y818OJABf0F8JmgNX3A7FpbFkiZGNsvwG0pyrqdw0Bbo8h2l2Sj8FfbDA9GQGA
06HIDizhL2IUzl0f3cWNo9Mw5Rj4IThXP1DR6PGnsiQ8E1pUh2fG25SnoGCpVyO+
zlIEZ+O/yRMIKoZIzj0DAQcCAwTsZHnjZAg/M+o6NfSb9yPaKBAxtUbbC71EOYzj
dgyQsI+ZCW+90NJSXUX67CyysOIRoGUHi9FUyirOitqODiVGwsAnBBgTCgAPBQJn
47/JBQkPCZwAAhsuAGoJEBTOIqkqa6XjXyAEGRMKAAYFAmfjv8kACgkQepvM3biF
SaUHHwEAvbp9OUK6OQNPHUlH/U1vJHQ1/h/NhxICATvyh7JuN5IA/0WoBZBtkGbS
sLFibCyKjKNDUk4I5Va0KLi6C9hTre3RX4wBfi7CopW9JJi8yxmLL0yTWtY4efFm
prSsm0em2t5V6/b4MlNZyXe8XtABgSKATp4TSAGAxaXOtzEuXKZFFmwvYZhBUP+A
1b5UOSYQU6+MeePqbUrPWKggWPtkJLmsVTvbQmMHzlIEZ+O/yRMIKoZIzj0DAQcC
AwSc30NSiqGtYVRje8VU4ex+LMvGFnKML4IPvooO7rlP+jcznUvlAvdtQwiBxfgq
a2Pp+zLkCzKQA1t1hW7lkwZPwsAnB
=ihCx
-----END PGP PUBLIC KEY BLOCK-----`}
                  </code>
                </pre>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-green-500/5 to-transparent animate-scan" />
              </div>
            </div>
            <p className="text-gray-400 mt-4">
              For secure communication, please encrypt your message using the above PGP key.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}