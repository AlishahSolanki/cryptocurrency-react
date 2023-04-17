const routeList = [
    {id: 'dashboard', name: 'dashboard', icon: 'ni ni-tv-2 text-center text-primary' },
    {id: 'btc', name: 'Bitcoin', icon: `icon-coin btc`},
    {id: 'eth', name: 'Ethereum', icon: `icon-coin eth`},
    {id: 'arb', name: 'Arbitrum', icon: `icon-coin arb`},
    {id: 'busd', name: 'Binance USD', icon: `icon-coin busd`},
    {id: 'bnb', name: 'Binance Coin', icon: `icon-coin bnb`},
    {id: 'ltc', name: 'Litecoin', icon: `icon-coin ltc`},
    {id: 'usdt', name: 'Tether', icon: `icon-coin usdt`},
    {id: 'doge', name: 'Doge', icon: `icon-coin doge`},
    {id: 'ctsi', name: 'Cartesi', icon: `icon-coin ctsi`},
    {id: 'sol', name: 'Solana', icon: `icon-coin sol`}
]
const routes = routeList.map(route => ({
        id: route.id,
        path: `/${route.id}/`,
        name: route.name,
        icon: route.icon,
        layout: "/admin",
}))
export default routes;
