export const formatCurrency = (amount: any, locale = 'en-IN', currency = 'INR') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
// Default will be INR.
// USD - 'en-US', 'USD'
//EURO - 'de-DE', 'EUR'
// JAPANESE - 'ja-JP', 'JPY' 