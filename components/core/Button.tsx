import React from 'react';

/**
 * Isotek Button — the brand's primary action element.
 * `primary` is the app's deep-teal fill; `cta` is the marketing teal-on-navy
 * conversion button; `secondary`/`ghost` recede; `danger` for destructive acts.
 */
export interface ButtonProps {
    children: React.ReactNode;
    /** Visual weight / role. @default "primary" */
    variant?: 'primary' | 'cta' | 'secondary' | 'ghost' | 'danger';
    /** @default "md" */
    size?: 'sm' | 'md' | 'lg';
    /** Icon element rendered before the label */
    iconLeft?: React.ReactNode;
    /** Icon element rendered after the label */
    iconRight?: React.ReactNode;
    disabled?: boolean;
    /** Stretch to fill container width */
    full?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    iconLeft = null,
    iconRight = null,
    disabled = false,
    full = false,
    type = 'button',
    onClick,
    style = {},
    ...rest
}) => {
    const sizes: Record<string, React.CSSProperties> = {
        sm: { padding: '0.5rem 0.875rem', fontSize: 'var(--text-sm)', gap: '0.375rem' },
        md: { padding: '0.625rem 1.125rem', fontSize: 'var(--text-sm)', gap: '0.5rem' },
        lg: { padding: '0.875rem 1.5rem', fontSize: 'var(--text-base)', gap: '0.5rem' },
    };

    const variants: Record<string, React.CSSProperties> = {
        primary: {
            background: 'var(--color-primary)',
            color: 'var(--white)',
            border: '1px solid transparent',
            boxShadow: 'var(--shadow-sm)',
        },
        cta: {
            background: 'var(--color-cta)',
            color: 'var(--color-cta-text)',
            border: '1px solid transparent',
            boxShadow: 'var(--shadow-teal)',
        },
        secondary: {
            background: 'var(--white)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border-strong)',
            boxShadow: 'var(--shadow-xs)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            border: '1px solid transparent',
            boxShadow: 'none',
        },
        danger: {
            background: 'var(--danger)',
            color: 'var(--white)',
            border: '1px solid transparent',
            boxShadow: 'var(--shadow-sm)',
        },
    };

    const base: React.CSSProperties = {
        display: full ? 'flex' : 'inline-flex',
        width: full ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes[size].gap,
        padding: sizes[size].padding,
        fontFamily: 'var(--font-sans)',
        fontSize: sizes[size].fontSize,
        fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'],
        lineHeight: 1,
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'var(--transition-industrial)',
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
    };

    const hoverFor = (e: React.MouseEvent<HTMLButtonElement>, entering: boolean) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (variant === 'primary') el.style.background = entering ? 'var(--color-primary-hover)' : 'var(--color-primary)';
        else if (variant === 'cta') el.style.filter = entering ? 'brightness(1.06)' : 'none';
        else if (variant === 'secondary') el.style.borderColor = entering ? 'var(--color-primary)' : 'var(--color-border-strong)';
        else if (variant === 'ghost') el.style.background = entering ? 'var(--gray-100)' : 'transparent';
        else if (variant === 'danger') el.style.filter = entering ? 'brightness(0.94)' : 'none';
        el.style.transform = entering ? 'translateY(-1px)' : 'translateY(0)';
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={base}
            onMouseEnter={(e) => hoverFor(e, true)}
            onMouseLeave={(e) => hoverFor(e, false)}
            {...rest}
        >
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
};
