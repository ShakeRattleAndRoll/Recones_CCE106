export const theme = {
    color: {
        background: '#303030',
        primary: '#89e472',
        secondary: '#4c96399a',
        metric: '#293929',
        perMetric: '#5e8a5f',
        disabled: '#34C759',
    },
    spacing: {
        trueCenter: {
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        standard: '94%' as const,
        full: '100%' as const,
    },
    typography: {
        header: {
            fontSize: 12,
            fontWeight: 'bold' as const,
            lineHeight: 24,
        },
        metric: {
            fontSize: 10,
        },
        result: {
            fontSize: 20,
            fontWeight: 'bold' as const,
        },
        action: {
            fontSize: 16,
            fontWeight: 'bold' as const,
        },
    },
};