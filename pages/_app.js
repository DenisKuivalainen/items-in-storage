import React from 'react';
import "../styles/style.css";
import Layout from "../src/client/Layout";

const App = ({ Component, pageProps }) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
)

export default App
