
const formatCurrency = (amount) => {
  let suffix = '';
  const lang = 'en-US'
  const amountInMil = amount / 1000000;
  if(Math.floor(amountInMil)) {
    if(amountInMil >= 1000) {
      suffix = ' B'
      amount = amountInMil / 1000;
    } else {
      suffix = ' M'
      amount = amountInMil
    }
  }
  return amount.toLocaleString(lang, {
      style: 'currency',
      currency: 'USD'
  }) + suffix
}

export const getAllCoins = async () => {
  try {
    const res = await fetch('https://min-api.cryptocompare.com/data/top/totaltoptiervol?ascending=true&assetClass=ALL&limit=20&tsym=USD', { cache: 'no-store' })
    const data = await res.json()
    return data.Data.map(coin => {
      const rawArr = coin.ConversionInfo?.RAW[0]?.split('~')
      return {
        id: coin.CoinInfo.Id,
        fullName: coin.CoinInfo.FullName,
        symbol: coin.CoinInfo.Internal,
        imageUrl: coin.CoinInfo.ImageUrl,
        price: formatCurrency(+rawArr[5]),
        dailyVol: formatCurrency(rawArr[14]),
        marketCap: formatCurrency(rawArr[5] * coin.ConversionInfo.Supply),
        totalVol: formatCurrency(rawArr[5] * coin.ConversionInfo.TotalVolume24H),
        topTierVol: formatCurrency(rawArr[5] * coin.ConversionInfo.TotalTopTierVolume24H),
        last7Days: rawArr.splice(15, 7)
      }
      
      
    })
  } catch (error) {
    throw (error)
  }
};

