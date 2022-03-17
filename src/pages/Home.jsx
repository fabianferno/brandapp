import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="row p-2" style={{ marginTop: "-100px" }}>
        <div className="col-md-6 p-3">
          <h1 className="text-dark w-75" color="light">
            Create your own{" "}
            <span className="fw-bold text-primary">Brand Resource Center</span>{" "}
            on Web3.
          </h1>
          <p>Mint your Brand</p>
          <div className="py-3">
            <Link
              to="/all"
              className="btn btn-primary px-2 h1 fw-bold text-white"
            >
              View all Minted Brands
            </Link>
          </div>
        </div>
        <div className="d-flex col-md-4">
          <img
            src="images/chameleon.png"
            style={{ height: "300px" }}
            alt="branding"
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: "200px" }}>
        <div
          className="col-md-9 p-5 bg-primary text-white "
          style={{ height: "80%" }}
        >
          <h1 className="text-white fw-normal" color="light">
            Mint your <span className="fw-bold text-white">brand</span> as an{" "}
            <span className="fw-bold text-white">NFT</span>
          </h1>
          <p className="fw-normal h4 mt-4 w-75">
            A comprehensive built-in DAM that enables users to bulk upload,
            store, centralise, track, and customize all your brand assets and
            unlimited files in a single click.
            <br />
            <br />
            It let's you define your brand collateral based on your
            organisation’s guidelines making it flexible-to-use. Additionally,
            it paves the way for creative martech allowing you to view other
            brand's templates. It's unrivaled benefit is that each brand will be
            minted as NFTs.{" "}
          </p>
        </div>
        <div className="d-flex col-md-4 mt-4" style={{ marginLeft: "-200px" }}>
          <img
            src="images/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
      </div>
      <div className="row p-2 mt-4">
        <div className="d-flex col-md-4">
          <img
            src="images/giphy1.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
        <div className="col-md-8 d-flex align-items-start flex-column justify-content-center">
          <h1 className="fw-bold">Get Started Now</h1>
          <ul className="h4 fw-normal">
            <li>Connect your wallet</li>
            <li>Mint your brand</li>
            <li>Create your Brand Asset Guidelines</li>
            <li>Share your brand Resources Page</li>
          </ul>
        </div>
      </div>
      <div className="row p-5 bg-primary ">
        <div className="text-end text-white">
          <p>Powered By</p>
          <div className="d-flex align-items-center justify-content-end">
            <div className="ms-4 h2  fw-bold">Polygon</div>
            <div className="ms-4 h2  fw-bold">IPFS</div>
            <div className="ms-4 h2  fw-bold">Filecoin</div>
            <div className="ms-4 h2  fw-bold">Filecoin</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
