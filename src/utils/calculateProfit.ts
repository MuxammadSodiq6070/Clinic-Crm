export function calculateProfit(disease: string): number {
  switch (disease) {
    case "Diabet": return 200000;
    case "Gipertoniya": return 300000;
    case "Allergiya": return 150000;
    default: return 100000;
  }
}
