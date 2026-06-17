import React from 'react';

/**
 * Avatar — round user/company image with an initials fallback. Used in the
 * testimonial cards, user dropdown, and assignee chips. Optional status ring.
 */
export interface AvatarProps {
    /** Image URL. Falls back to initials derived from `name` when absent. */
    src?: string | null;
    /** Full name — used for the alt text and initials fallback */
    name?: string;
    /** Pixel diameter. @default 40 */
    size?: number;
    /** Show a teal status ring */
    ring?: boolean;
    /** Fallback chip color. @default "teal" */
    tone?: 'teal' | 'navy' | 'terra';
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const Avatar: React.FC<AvatarProps> = ({
    src = null,
    name = '',
    size = 40,
    ring = false,
    tone = 'teal',
    style = {},
    ...rest
}) => {
    const tones: Record<string, { bg: string; fg: string }> = {
        teal:  { bg: 'var(--isotek-deep-50)', fg: 'var(--isotek-deep-700)' },
        navy:  { bg: 'var(--isotek-navy)', fg: 'var(--white)' },
        terra: { bg: 'rgba(191,123,84,0.15)', fg: 'var(--isotek-terra)' },
    };
    const t = tones[tone] || tones.teal;
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: t.bg,
                color: t.fg,
                fontFamily: 'var(--font-sans)',
                fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
                fontSize: Math.max(11, Math.round(size * 0.4)),
                letterSpacing: '0.01em',
                boxShadow: ring ? '0 0 0 2px var(--white), 0 0 0 4px var(--isotek-deep-500)' : 'none',
                ...style,
            }}
            {...rest}
        >
            {src ? (
                <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                initials || '?'
            )}
        </div>
    );
};
