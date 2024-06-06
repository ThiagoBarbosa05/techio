interface FormatCurrency {
  currency: number | undefined
}

export function formatCurrency({ currency }: FormatCurrency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency ?? 0)
}
