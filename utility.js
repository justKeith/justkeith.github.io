export function projectValue(current, mean, std) {
    const drift = mean - (std * std) / 2;
    const randomShock = std * normSinv(Math.random());
    return current * Math.exp(drift + randomShock);
}

// These monthly means and standard deviations for various indexes.
export const RATES = {
    // TODO This is still daily
    sp500_20: {
        desc: "SP500 over the last 20 years", 
        mean: 0.0003626870482,
        std: 0.0121599971
    },
    // TODO This is still annual
    inflation_senior: {
        desc: "Inflationin the last 20 years but skewed for an older population",
        mean: 0.03,
        std: 0.01
    }
};

export function normSinv(p) {
    const a1 = -3.969683028665376e1;
    const a2 = 2.209460984245205e2;
    const a3 = -2.759285104469687e2;
    const a4 = 1.38357751867269e2;
    const a5 = -3.066479806614716e1;
    const a6 = 2.506628277459239;

    const b1 = -5.447609879822406e1;
    const b2 = 1.615858368580409e2;
    const b3 = -1.556989798598866e2;
    const b4 = 6.680131188771972e1;
    const b5 = -1.328068155288572e1;

    const c1 = -7.784894002430293e-3;
    const c2 = -3.223964580411365e-1;
    const c3 = -2.400758277161838;
    const c4 = -2.549732539343734;
    const c5 = 4.374664141464968;
    const c6 = 2.938163982698783;

    const d1 = 7.784695709041462e-3;
    const d2 = 3.224671290700398e-1;
    const d3 = 2.445134137142996;
    const d4 = 3.754408661907416;

    const p_low = 0.02425;
    const p_high = 1 - p_low;

    let q;

    // Rational approximation for lower region
    if (0 < p && p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        return (
            (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
    }

    // Rational approximation for central region
    if (p_low <= p && p <= p_high) {
        q = p - 0.5;
        const r = q * q;
        return (
            ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
        );
    }

    // Rational approximation for upper region
    if (p_high < p && p < 1) {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return (
            -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
    }
}
