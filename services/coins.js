export const getAllCoins = async () => {
  try {
    const res = await fetch('https://min-api.cryptocompare.com/data/top/totaltoptiervol?ascending=true&assetClass=ALL&limit=20&tsym=USD', { cache: 'no-store' })
    const data = await res.json()
    return data.Data
  } catch (error) {
    throw (error)
  }
};
