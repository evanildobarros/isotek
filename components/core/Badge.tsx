import React from 'react';

/**
 * Soft status pill — document states, plan status, ISO clause tags, NPS bands.
 * Soft tinted background + saturated text.
 */
export interface BadgeProps {
    children: React.ReactNode;
    /** Color intent. @default "neutral" */
    tone?: 'neutral' | 'teal' | 'success' | 'warning' | 'danger' | 'info' | 'auditor';
    /** @default "md" */
    size?: 'sm' | 'md';
    /** Show a leading status dot */
    dot?: boolean;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const Badge: React.FC<BadgeProps> = ({ children, tone = 'neutral', size = 'md', dot = false, style = {}, ...rest }) => {
    const tones: Record<string, { bg: string; fg: string; dotc: string }> = {
        neutral: { bg: 'var(--gray-100)', fg: 'var(--gray-600)', dotc: 'var(--gray-400)' },
        teal:    { bg: 'var(--isotek-deep-50)', fg: 'var(--isotek-deep-700)', dotc: 'var(--isotek-deep-500)' },
        success: { bg: 'var(--success-bg)', fg: 'var(--success-text)', dotc: 'var(--success)' },
        warning: { bg: 'var(--warning-bg)', fg: 'var(--warning-text)', dotc: 'var(--warning)' },
        danger:  { bg: 'var(--danger-bg)', fg: 'var(--danger-text)', dotc: 'var(--danger)' },
        info:    { bg: 'var(--info-bg)', fg: 'var(--info-text)', dotc: 'var(--info)' },
        auditor: { bg: 'rgba(191,123,84,0.12)', fg: 'var(--isotek-terra)', dotc: 'var(--isotek-terra)' },
    };
    const sizes: Record<string, React.CSSProperties> = {
        sm: { padding: '0.125rem 0.5rem', fontSize: '0.6875rem' },
        md: { padding: '0.25rem 0.625rem', fontSize: 'var(--text-xs)' },
    };
    const t = tones[tone] || tones.neutral;

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: t.bg,
                color: t.fg,
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'],
                lineHeight: 1.4,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
                ...sizes[size],
                ...style,
            }}
            {...rest}
        >
            {dot && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dotc, flexShrink: 0 }} />
            )}
            {children}
        </span>
    );
};
