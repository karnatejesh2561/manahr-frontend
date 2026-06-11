'use client';

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronDown, Check, Eye, EyeOff } from 'lucide-react';

// ---------- ScLabel ----------
export const ScLabel = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label
    htmlFor={htmlFor}
    className="block text-[11px] font-medium tracking-wider uppercase mb-1.5"
    style={{ color: 'var(--sc-text-dim)' }}
  >
    {children}
  </label>
);

// ---------- ScFormError ----------
export const ScFormError = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <span className="sc-field-error-text" role="alert">
      <AlertCircle size={12} className="shrink-0" />
      {error}
    </span>
  );
};

// ---------- ScInput ----------
interface ScInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const ScInput = forwardRef<HTMLInputElement, ScInputProps>(
  ({ label, error, className = '', wrapperClassName = '', id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && <ScLabel htmlFor={inputId}>{label}</ScLabel>}
        <input
          id={inputId}
          ref={ref}
          className={`sc-input ${error ? 'sc-input-error' : ''} ${className}`}
          {...props}
        />
        <ScFormError error={error} />
      </div>
    );
  }
);
ScInput.displayName = 'ScInput';

// ---------- ScPasswordInput ----------
interface ScPasswordInputProps extends ScInputProps {}

export const ScPasswordInput = forwardRef<HTMLInputElement, ScPasswordInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = props.id || React.useId();
    return (
      <div className="w-full">
        {label && <ScLabel htmlFor={inputId}>{label}</ScLabel>}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={show ? 'text' : 'password'}
            className={`sc-input pr-12 ${error ? 'sc-input-error' : ''} ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-var(--sc-text-faint) hover:text-var(--sc-text) transition"
            style={{ color: 'var(--sc-text-faint)' }}
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <ScFormError error={error} />
      </div>
    );
  }
);
ScPasswordInput.displayName = 'ScPasswordInput';

// ---------- ScCheckbox ----------
interface ScCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

export const ScCheckbox = forwardRef<HTMLInputElement, ScCheckboxProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const checkboxId = id || React.useId();
    return (
      <div className="flex flex-col items-start">
        <label htmlFor={checkboxId} className="sc-checkbox-wrapper">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            className="sc-checkbox-input"
            {...props}
          />
          <span className="sc-checkbox-box">
            <Check size={12} className="sc-checkbox-icon scale-0 checked:scale-100 transition-transform" />
          </span>
          <span>{label}</span>
        </label>
        <ScFormError error={error} />
      </div>
    );
  }
);
ScCheckbox.displayName = 'ScCheckbox';

// ---------- ScSelect ----------
interface ScSelectOption {
  label: string;
  value: string;
}

interface ScSelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: ScSelectOption[];
  error?: string;
  placeholder?: string;
  wrapperClassName?: string;
  id?: string;
  ['data-testid']?: string;
}

export const ScSelect: React.FC<ScSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Select option...',
  wrapperClassName = '',
  id,
  'data-testid': testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div className={`sc-select-wrapper ${wrapperClassName}`} ref={containerRef} id={id}>
      {label && <ScLabel>{label}</ScLabel>}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`sc-select-trigger ${isOpen ? 'open' : ''} ${error ? 'sc-input-error' : ''}`}
        data-testid={testId}
      >
        <span className={selectedOption ? '' : 'text-neutral-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--sc-text-faint)' }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="sc-select-dropdown sc-scroll"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`sc-select-option ${isSelected ? 'selected' : ''}`}
                  data-testid={`option-${opt.value}`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} className="text-var(--sc-accent)" />}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <ScFormError error={error} />
    </div>
  );
};
