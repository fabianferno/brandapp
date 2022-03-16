import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { UserDataProvider } from '../components/UserDataContext';

import Layout from '../components/Layout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/scss/style.scss';

initFontAwesome();

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <UserDataProvider>
          <Component {...pageProps} />
        </UserDataProvider>
      </Layout>
    </UserProvider>
  );
}
