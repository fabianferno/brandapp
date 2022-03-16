import React from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';

import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css" />
      <title>The Racoon App</title>
    </Head>
    <main id="app" className="d-flex flex-column h-100 bg-white" data-testid="layout">
      <NavBar />
      <Container className="flex-grow-1 mt-5 " style={{ minHeight: '70vh' }}>
        {children}
      </Container>
      <Footer />
    </main>
  </>
);

export default Layout;
