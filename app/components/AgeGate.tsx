"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("wolfkatana-age-verified");
    if (!verified) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const verify = () => {
    localStorage.setItem("wolfkatana-age-verified", "1");
    setShow(false);
  };

  const leave = () => {
    window.location.href = "https://www.google.com";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-surface border border-dark-border p-8 text-center">
        <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">Age Verification</h2>
        <p className="text-text-secondary text-sm mb-6">
          This website sells collectible swords and bladed items. By entering, you confirm that you are at least 18 years of age and understand your local laws regarding the purchase and possession of such items.
        </p>
        <div className="flex items-start gap-2 bg-crimson/10 border border-crimson/30 p-3 mb-6 text-left">
          <AlertTriangle className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">
            Please verify your local regulations before ordering. We are not responsible for items seized by customs. You must be 18+ to purchase.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={verify}
            className="flex-1 py-3 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors"
          >
            I AM 18 OR OLDER
          </button>
          <button
            onClick={leave}
            className="flex-1 py-3 border border-dark-border text-text-muted text-sm hover:border-crimson hover:text-crimson transition-colors"
          >
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
}
