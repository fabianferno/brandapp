import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <div className="row p-2" >
        <div className="col-md-7 p-3">
          <h1 className="text-dark  fw-normal" color="light">
            Create your own <br />
            <span className="fw-bold text-primary">
              Brand Resource Center
            </span>{" "}x``
            <br />
            on Web3.
          </h1>

          <div className="py-3">
            <Link
              to="/all"
              className="btn btn-primary btn-lg h1 fw-bold text-white"
            >
              View all Minted Brands
            </Link>
          </div>
        </div>

        <motion.div
          whileHover={{
            x: -120,
            scale: 1.2,
            transition: { duration: 0.6 },
          }}
          whileTap={{ rotate: -360, transition: { duration: 0.6 } }}
          className="d-flex col-md-3"
        >
          <img
            className="no-drag"
            src="images/chameleon.png"
            style={{ height: "300px" }}
            alt="branding"
          />
        </motion.div>
      </div>
      <div className="row" style={{ marginTop: "200px" }}>
        <div
          className="col-md-9 p-5 bg-primary text-white "
          style={{ height: "80%" }}
        >
          <h1
            className="text-white fw-normal"
            style={{ fontSize: "3rem" }}
            color="light"
          >
            Mint your <span className="fw-bold text-white">brand</span> as an{" "}
            <span className="fw-bold text-white">NFT</span>
          </h1>
          <p className="fw-normal h4 mt-4 w-75">
            A comprehensive built-in Digital Asset Management Software that
            enables users to bulk upload, store, centralise, track, and
            customize all your brand assets and unlimited files in a single
            click.
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
          <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
            Get Started Now
          </h1>
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
