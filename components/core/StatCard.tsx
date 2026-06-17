import React from 'react';

/**
 * KPI / metric card for Isotek dashboards: label, large value, optional unit,
 * tinted icon chip and a trend delta.
 */
export interface StatCardProps {
    label: string;
    value: React.ReactNode;
    unit?: React.ReactNode;
    icon?: React.ReactNode;
    /** Icon chip tint. @default "teal" */
    iconTone?: 'teal' | 'blue' | 'green' | 'amber' | 'red' | 'terra';
    /** Trend indicator, e.g. { dir: 'up', value: '12%' } */
    trend?: { dir: 'up' | 'down'; value: string };
    /** Which direction counts as positive (green). @default "up" */
    trendGood?: 'up' | 'down';
    footnote?: React.ReactNode;
    style?: React.CSSProperties;
    [key: string]: unknown;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    unit = null,
    icon = null,
    iconTone = 'teal',
    trend = undefined,
    trendGood = 'up',
    footnote = null,
    style = {},
    ...rest
}) => {
    const tones: Record<string, { bg: string; fg: string }> = {
        teal:  { bg: 'var(--isotek-deep-50)', fg: 'var(--isotek-deep-700)' },
        blue:  { bg: 'var(--info-bg)', fg: 'var(--info)' },
        green: { bg: 'var(--success-bg)', fg: 'var(--success-text)' },
        amber: { bg: 'var(--warning-bg)', fg: 'var(--warning-text)' },
        red:   { bg: 'var(--danger-bg)', fg: 'var(--danger-text)' },
        terra: { bg: 'rgba(191,123,84,0.12)', fg: 'var(--isotek-terra)' },
    };
    const it = tones[iconTone] || tones.teal;
    const trendUp = trend && trend.dir === 'up';
    const trendColor = trend
        ? (trend.dir === trendGood ? 'var(--success-text)' : 'var(--danger-text)')
        : 'var(--gray-400)';

    return (
        <div
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                padding: 'var(--space-6)',
                ...style,
            }}
            {...rest}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'], color: 'var(--color-text-muted)' }}>
                    {label}
                </span>
                {icon && (
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 38, height: 38, borderRadius: 'var(--radius-md)',
                        background: it.bg, color: it.fg, flexShrink: 0,
                    }}>
                        {icon}
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem', marginTop: '0.625rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], lineHeight: 1, color: 'var(--color-text)', letterSpacing: 'var(--tracking-tight)' }}>
                    {value}
                </span>
                {unit && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-faint)', marginBottom: 3 }}>{unit}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.625rem' }}>
                {trend && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: trendColor }}>
                        {trendUp ? '▲' : '▼'} {trend.value}
                    </span>
                )}
                {footnote && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)' }}>{footnote}</span>}
            </div>
        </div>
    );
};
