function calculatePercent(price: number, targetPrice: number) {
  return Number((((price - targetPrice) / targetPrice) * 100).toFixed(2));
}

export default calculatePercent;
