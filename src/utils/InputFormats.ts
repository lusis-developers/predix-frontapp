export function formatPriceToDisplay(price: string): string {
  let numericValue = 0;

  if (price !== '') {
    const decimalCount = price.split('.')[1]?.length || 0;
    numericValue = parseFloat(price);
    
    numericValue *= Math.pow(10, decimalCount);

    numericValue = Math.round(numericValue) / 100;
  }

  return numericValue.toFixed(2);
}

export function formatPriceToSave(price: string): number {
  const formattedPrice = price.replace('.', '').replace(/^0+/, '');
  
  return parseInt(formattedPrice, 10);
}