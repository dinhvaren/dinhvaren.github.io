import { motion } from "framer-motion";
import { Send, Key, Copy, Check } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import DOMPurify from "dompurify";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pgpContainerRef = useRef<HTMLDivElement>(null);

  // CAPTCHA state
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captcha, setCaptcha] = useState(() => generateCaptcha());

  // Generate a simple math CAPTCHA
  function generateCaptcha() {
    const operations = ["+", "-", "*"];
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
      case "+":
        num1 = getSecureRandom(1, 20);
        num2 = getSecureRandom(1, 20);
        break;
      case "-":
        num1 = getSecureRandom(1, 20);
        num2 = getSecureRandom(1, num1);
        break;
      case "*":
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
        case "+":
          return n1 + n2;
        case "-":
          return n1 - n2;
        case "*":
          return n1 * n2;
        default:
          return 0;
      }
    };

    return {
      question: `${num1} ${operation} ${num2}`,
      answer: calculateAnswer(num1, num2, operation).toString(),
    };
  }

  const handleCopyPGP = async () => {
    const pgpKey = document.querySelector(".pgp-container code")?.textContent;
    if (pgpKey) {
      try {
        await navigator.clipboard.writeText(pgpKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        if (pgpContainerRef.current) {
          pgpContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ["#22c55e", "#10b981", "#059669"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
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
      ALLOWED_ATTR: [], // No attributes allowed
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
      setSubmitError("Incorrect CAPTCHA answer. Please try again.");
      setCaptchaAnswer("");
      setCaptcha(generateCaptcha());
      return;
    }

    // Get and sanitize form data
    const formData = new FormData(formRef.current);
    const name = sanitizeInput(formData.get("name") as string);
    const email = sanitizeInput(formData.get("email") as string);
    const message = sanitizeInput(formData.get("message") as string);

    // Enhanced validation
    if (!name || !email || !message) {
      setSubmitError("Please fill in all fields before submitting.");
      return;
    }

    if (name.length > 100) {
      setSubmitError("Name is too long (maximum 100 characters).");
      return;
    }

    if (!validateEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    if (message.length > 5000) {
      setSubmitError("Message is too long (maximum 5000 characters).");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(jsonData),
        credentials: "omit", // Don't send cookies
      });

      if (response.ok) {
        setSubmitSuccess(true);
        triggerConfetti();
        formRef.current.reset();
        setCaptchaAnswer("");
        setCaptcha(generateCaptcha());
      } else {
        const errorData = await response.json();
        setSubmitError(
          errorData.error || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
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
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
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
                {isSubmitting ? "[$ sending...]" : "[$ send_message]"}
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
                className={`cyber-button !px-4 !py-2 flex items-center gap-2 text-sm ${
                  copied ? "text-green-400" : ""
                }`}
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
Version: Keybase OpenPGP v2.1.17
Comment: https://keybase.io/crypto

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
u1Is9ipL
=EcU4
-----END PGP PUBLIC KEY BLOCK-----`}
                  </code>
                </pre>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-green-500/5 to-transparent animate-scan" />
              </div>
            </div>
            <p className="text-gray-400 mt-4">
              For secure communication, please encrypt your message using the
              above PGP key.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
