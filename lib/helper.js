export function formatNumber(value, fieldName = '', fixed) {
    const num = Number(value);
    const isFixed = typeof fixed === 'number' && fixed >= 0;
    if (isNaN(num)) {
        throw new Error(`${fieldName} - неможливо конвертувати у число значення - ${value}`);
    }
    return isFixed ? num.toFixed(fixed) : num;
}

export function formatInstrName(name) {
    const idx = name.indexOf('-');
    return idx !== -1 ? name.slice(0, idx) : name;
}
