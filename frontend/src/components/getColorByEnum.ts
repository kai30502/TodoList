function getColorByEnum(color: string): string {
    const colorMap: Record<string, string> = {
        white: '#f8f9fa',
        orange: '#ffe8cc',
        pink: '#fcd5ce',
        green: '#d8f5e6',
        blue: '#d0ebff',
        yellow: '#fff3bf',
    };

    return colorMap[color] || '#f8f9fa';
}

export default getColorByEnum;