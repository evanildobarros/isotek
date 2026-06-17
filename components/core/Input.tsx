import React from 'react';

/**
 * Isotek text field. `light` is the app form input (white, hairline border,
 * deep-teal focus ring). `dark` is the marketing form input on navy
 * (white/5 fill, teal focus ring). Supports a leading icon and label.
 */
export interface InputProps {
    /** Field label rendered above the control */
    label?: React.ReactNode;
    id?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    /** Icon element rendered inside the field, leading edge */
    iconLeft?: React.ReactNode;
    /** Surface context. @default "light" */
    variant?: 'light' | 'dark';
    /** Helper text below the field */
    hint?: React.ReactNode;
    disabled?: boolean;
    /** Stretch to fill container width. @default true */
    full?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const Input: React.FC<InputProps> = ({
    label = null,
    id,
    type = 'text',
    placeholder = '',
    value,
    defaultValue,
    iconLeft = null,
    variant = 'light',
    hint = null,
    disabled = false,
    full = true,
    onChange,
    style = {},
    ...rest
}) => {
    const isDark = variant === 'dark';
    const ring = isDark ? 'var(--isotek-teal)' : 'var(--isotek-deep-700)';

    const field: React.CSSProperties = {
        width: full ? '100%' : 'auto',
        boxSizing: 'border-box',
        padding: iconLeft ? '0.625rem 0.875rem 0.625rem 2.6rem' : '0.625rem 0.875rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'],
        lineHeight: 1.4,
        color: isDark ? 'var(--white)' : 'var(--color-text)',
        background: isDark ? 'rgba(255,255,255,0.05)' : 'var(--white)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'var(--transition-industrial)',
        opacity: disabled ? 0.55 : 1,
        ...style,
    };

    return (
        <div style={{ width: full ? '100%' : 'auto' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{
                        display: 'block',
                        marginBottom: '0.375rem',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'],
                        color: isDark ? 'var(--color-text-on-dark-dim)' : 'var(--gray-700)',
                    }}
                >
                    {label}
                </label>
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {iconLeft && (
                    <span
                        style={{
                            position: 'absolute',
                            left: '0.875rem',
                            display: 'inline-flex',
                            color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--gray-400)',
                            pointerEvents: 'none',
                        }}
                    >
                        {iconLeft}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onChange={onChange}
                    style={field}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = ring;
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(15,219,171,0.25)' : 'rgba(2,81,89,0.15)'}`;
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'var(--color-border)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    {...rest}
                />
            </div>
            {hint && (
                <p style={{ margin: '0.375rem 0 0', fontSize: 'var(--text-xs)', color: isDark ? 'var(--color-text-on-dark-dim)' : 'var(--color-text-muted)' }}>
                    {hint}
                </p>
            )}
        </div>
    );
};
