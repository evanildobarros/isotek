import React from 'react';

/**
 * Surface container. `light` is the app's white card (rounded-xl, hairline
 * border, soft shadow). `dark` is the marketing card on navy (#081424 with a
 * white/5 border that lights up teal on hover). `interactive` adds lift.
 */
export interface CardProps {
    children: React.ReactNode;
    /** @default "light" */
    variant?: 'light' | 'subtle' | 'dark';
    /** Hover lift + border accent */
    interactive?: boolean;
    /** CSS padding value. @default "var(--space-6)" */
    padding?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'light',
    interactive = false,
    padding = 'var(--space-6)',
    style = {},
    ...rest
}) => {
    const variants: Record<string, React.CSSProperties> = {
        light: {
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--color-text)',
        },
        subtle: {
            background: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'none',
            color: 'var(--color-text)',
        },
        dark: {
            background: 'var(--color-surface-card-dark)',
            border: '1px solid var(--color-border-on-dark)',
            boxShadow: 'none',
            color: 'var(--color-text-on-dark)',
        },
    };

    return (
        <div
            style={{
                borderRadius: 'var(--radius-lg)',
                padding,
                transition: 'var(--transition-industrial)',
                ...variants[variant],
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!interactive) return;
                e.currentTarget.style.transform = 'translateY(-4px)';
                if (variant === 'dark') e.currentTarget.style.borderColor = 'rgba(15,219,171,0.4)';
                else e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                if (!interactive) return;
                e.currentTarget.style.transform = 'translateY(0)';
                if (variant === 'dark') e.currentTarget.style.borderColor = 'var(--color-border-on-dark)';
                else e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            {...rest}
        >
            {children}
        </div>
    );
};
