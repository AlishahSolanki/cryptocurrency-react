import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import PageChange from "../components/PageChange/PageChange.js";
import "../public/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../public/assets/scss/nextjs-argon-dashboard.scss";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import constant from "../constants";
import HttpServiceManager from "services/HttpServiceManager";
import { parseCookies } from "nookies";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "redux/store";
import { createWrapper } from "next-redux-wrapper";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const TopProgressBar = dynamic(
    () => {
        return import("components/Headers/TopProgressBar");
    },
    { ssr: false }
);
class MyApp extends App {
    state = { isReduxLoaded: false };

    componentDidMount() {
        this.callAPI();
        let comment = document.createComment(`
        `);
        document.insertBefore(comment, document.documentElement);
    }

    static async getInitialProps({ Component, router, ctx }) {
        // const { token } = parseCookies(ctx);
        // console.log("INIT", token);
        let pageProps = {};

        // if (Component.getInitialProps) {
        //     pageProps = await Component.getInitialProps(ctx);
        // }

        return { pageProps };
    }

    callAPI = () => {
        // console.log("INITcallAPI", getCookies("token"));
        HttpServiceManager.initialize(process.env.BASE_URL_CRYPTO_COMPARE, {
            // token: process.env.API_TOKEN,
        });
    };
    onBeforeLift = () => {
        //singleton.storeRef = store;

        this.setState({ isReduxLoaded: true }, () => {
            //   setTimeout(() => {
            //     SplashScreen.hide();
            //   }, 2000);
        });
    };
    render() {
        const { Component, pageProps } = this.props;

        const Layout = Component.layout || (({ children }) => <>{children}</>);

        return (
            <Provider store={store}>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <title>Crypto Currency Visualization and Prediction</title>
                </Head>
                <PersistGate
                    onBeforeLift={this.onBeforeLift}
                    persistor={persistor}
                    loading={null}
                >
                    <Layout>
                        <TopProgressBar />
                        <Component {...pageProps} />
                    </Layout>
                </PersistGate>
            </Provider>
        );
    }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
