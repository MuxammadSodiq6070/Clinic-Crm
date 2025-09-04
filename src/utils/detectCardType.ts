export function detectCardType(cardNumber: string): string {
  if (cardNumber.startsWith("8600")) return "UZCARD";
  if (cardNumber.startsWith("9860")) return "HUMO";
  if (cardNumber.startsWith("5300")) return "MASTERCARD";
  if (cardNumber.startsWith("4")) return "VISA";
  return "UNKNOWN";
}
