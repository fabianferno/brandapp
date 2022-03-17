import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="row p-2" style={{ marginTop: "-100px" }}>
        <div className="col-md-6 p-3">
          <h2
            className=" fw-normal"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            One Step Solution
          </h2>
          <h2
            className=" fw-bold py-4"
            color="light"
            style={{ letterSpacing: "0.7rem" }}
          >
            For BRANDING
          </h2>
          <div className="py-3">
            <button className="btn btn-primary me-2 p-2">
              Moralis Metamask Login
            </button>
          </div>
        </div>
        <div className="d-flex col-md-6 p-0" style={{ marginTop: "-100px" }}>
          <img
            src="images/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
      </div>
      <div className="row p-2" style={{ marginTop: "200px" }}>
        <div className="d-flex col-md-6 mt-4 p-5">
          <img
            src="https://media.giphy.com/media/lPCbGzTsXep2modOQA/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
        <div className=" col-md-6 mt-4 p-5">
          <h2
            className=" fw-bold"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            Join Us
          </h2>
          <h2
            className="fw-normal py-4"
            style={{ letterSpacing: "0.2rem", fontSize: "1rem" }}
          >
            A comprehensive built-in DAM that enables users to bulk upload,
            store, centralise, track, and customize all your brand assets and
            unlimited files in a single click. It let's you define your brand
            collateral based on your organisation’s guidelines making it
            flexible-to-use. Additionally, it paves the way for creative martech
            allowing you to view other brand's templates. It's unrivaled benefit
            is that each brand will be minted as NFTs.{" "}
          </h2>
        </div>
      </div>
      <div className="row p-2" style={{ marginTop: "200px" }}>
        <div className="col-md-6 p-3  mt-4 p-5">
          <h2
            className=" fw-normal"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            Wondering how to use?
          </h2>
          <ul>
            <li
              className=" fw-bold py-4"
              color="light"
              style={{ letterSpacing: "0.2rem", fontSize: "1.2rem" }}
            >
              Login to our site
            </li>
            <li
              className=" fw-bold py-4"
              color="light"
              style={{ letterSpacing: "0.2rem", fontSize: "1.2rem" }}
            >
              Create your brand
            </li>
            <li
              className=" fw-bold py-4"
              color="light"
              style={{ letterSpacing: "0.2rem", fontSize: "1.2rem" }}
            >
              Modify your brand anytime
            </li>
          </ul>
        </div>
        <div className="d-flex col-md-6 p-0" style={{ marginTop: "-100px" }}>
          <img
            src="https://media.giphy.com/media/OQWspmrXz7TnW/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
      </div>
      <div className="row p-2" style={{ marginTop: "200px" }}>
        <div className="d-flex col-md-6 mt-4 p-5">
          <img
            src="images/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
        <div className=" col-md-6 mt-4 p-5">
          <h2
            className=" fw-normal"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            Powered By
          </h2>
          <h2
            className=" fw-bold py-4"
            color="light"
            style={{ letterSpacing: "0.5rem" }}
          >
            Polygon.IPFS.Filecoin.
          </h2>
        </div>
      </div>
    </Layout>
  );
}
