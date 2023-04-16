import { getAllCoins } from "services/coins";

const routeList = [
    {id: 'dashboard', name: 'dashboard', icon: 'ni ni-tv-2 text-center text-primary' },
    {id: 'eth', name: 'Ethereum', icon: `icon-coin eth`},
    {id: 'btc', name: 'Bitcoin', icon: `icon-coin btc`},
    {id: 'arb', name: 'Arbitrum', icon: `icon-coin arb`},
    {id: 'usdt', name: 'Tether', icon: `icon-coin usdt`},
    {id: 'xrp', name: 'XRP', icon: `icon-coin xrp`},
    {id: 'busd', name: 'Binance USD', icon: `icon-coin busd`},
    {id: 'doge', name: 'Doge', icon: `icon-coin doge`},
    {id: 'sol', name: 'Solana', icon: `icon-coin sol`},
    {id: 'ada', name: 'Cardano', icon: `icon-coin ada`},
    {id: 'bnb', name: 'Binance Coin', icon: `icon-coin bnb`}
]
const routes = routeList.map(route => ({
        id: route.id,
        path: `/${route.id}/`,
        name: route.name,
        icon: route.icon,
        layout: "/admin",
}))
export default routes;
