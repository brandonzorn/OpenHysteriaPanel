tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gray: {
                    900: '#111827', // Глубокий черный фон
                    850: '#1f2937', // Чуть светлее для карточек
                    800: '#374151', // Границы и разделители
                },
                indigo: {
                    500: '#6366f1',
                    600: '#4f46e5',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}