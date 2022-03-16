import React, { useState, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

import PageLink from './PageLink';
import AnchorLink from './AnchorLink';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user) {
      axios
        .put('/api/users', {
          user: user
        })
        .then(function (response) {
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // console.log('no user');
    }
  }, [user]);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="black" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <h1 className="bg-primary rounded mt-2 card text-white font-weight-bold  px-3"> racoon </h1>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              {user && (
                <>
                  <NavItem>
                    <PageLink href="/dashboard" className="nav-menu" testId="navbar-external">
                      Dashboard
                    </PageLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isLoading && !user && (
                <NavItem id="qsLoginBtn">
                  <AnchorLink
                    href="/api/auth/login"
                    className="btn btn-primary btn-margin"
                    tabIndex={0}
                    testId="navbar-login-desktop">
                    Log in
                  </AnchorLink>
                </NavItem>
              )}
              {user && (
                <div className="d-flex align-items-center justify-content-center">
                  <h6 className="mr-3">{`${
                    new Date().getHours() < 12
                      ? 'Top of the morning!'
                      : new Date().getHours() < 18
                      ? 'Good Afternoon 🌞,'
                      : 'Catch a Break,'
                  } ${user.given_name}`}</h6>
                  <PageLink href="/profile" testId="navbar-profile-desktop">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle mx-3"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-desktop"
                    />
                  </PageLink>
                  <AnchorLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-desktop"></AnchorLink>
                </div>
              )}
            </Nav>
            {!isLoading && !user && (
              <Nav className="d-md-none" navbar>
                <AnchorLink
                  href="/api/auth/login"
                  className="btn btn-primary btn-block"
                  tabIndex={0}
                  testId="navbar-login-mobile">
                  Log in
                </AnchorLink>
              </Nav>
            )}
            {user && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile">
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-mobile"
                    />
                    <h6 className="d-inline-block" data-testid="navbar-user-mobile">
                      {user.name}
                    </h6>
                  </span>
                </NavItem>
                <NavItem>
                  <PageLink href="/profile" icon="user" testId="navbar-profile-mobile">
                    Profile
                  </PageLink>
                </NavItem>
                <NavItem id="qsLogoutBtn">
                  <AnchorLink
                    href="/api/auth/logout"
                    className="btn btn-link p-0"
                    icon="power-off"
                    testId="navbar-logout-mobile">
                    Log out
                  </AnchorLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
