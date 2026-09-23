export const theme = {
    color: {
        background: '#eae5e5',
        primary: '#ffffff',
        secondary: '#edecec',
        button: '#96c8f7',
        buttonContent: '#1262ad',
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
        title: {
            fontSize: 25,
            fontWeight: 'bold' as const,
        },
        description: {
            fontSize: 14, 
        },
        text: {
            marginTop: 2,
            fontSize: 10,
            fontWeight: '300' as const,
        }
    },
};