import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import motion from "framer-motion";
import { useMoralis } from "react-moralis";

import Home from "./pages/Home";
import CreateBrand from "./pages/CreateBrand";
import AllBrands from "./pages/AllBrands";
import BrandById from "./pages/BrandById";
import MyBrands from "./pages/MyBrands";

import Error404 from "./pages/Error404";

import "./assets/scss/index.scss";

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <Router>
      <div>
        <section id="header" className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand fw-bold text-primary" to="/">
                @brandapp
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create">
                      Create Brand
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/all">
                      All Brands
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/my-brands" className="nav-link disabled">
                      My Brands
                    </Link>
                  </li>
                </ul>
                <div className="d-flex">
                  {isAuthenticated ? (
                    <button className="btn btn-black" onClick={logOut}>
                      Logout
                    </button>
                  ) : (
                    <button className="btn btn-primary me-2" onClick={login}>
                      Moralis Metamask Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </section>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBrand />} />
          <Route path="/all" element={<AllBrands />} />
          <Route path="/brands/:id" element={<BrandById />} />
          <Route path="/my-brands" element={<MyBrands />} />

          {/* 404 Page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
