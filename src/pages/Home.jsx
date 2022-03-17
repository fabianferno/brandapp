import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="row p-2" style={{ marginTop: "200px" }}>
        <div className="d-flex col-md-6 mt-4 p-5">
          <h2
            className=" fw-bold"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            One Step Solution For Branding
          </h2>
        </div>
        <div className="d-flex col-md-6 mt-4 p-5">
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
            src="images/giphy.gif"
            className="img-fluid"
            height="auto"
            width="100%"
            alt="branding"
          />
        </div>
        <div className="d-flex col-md-6 mt-4 p-5">
          <h2
            className=" fw-bold"
            color="light"
            style={{ letterSpacing: "0.2rem" }}
          >
            Powered By Web3
          </h2>
        </div>
      </div>
    </Layout>
  );
}
