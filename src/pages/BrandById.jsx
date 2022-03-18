import Layout from "../layouts/Layout";
import { useHistory, useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import data from "../assets/files/data.json";

const mockupImages = [
  { img: "https://picsum.photos/500/500" },
  { img: "https://picsum.photos/500/500" },
  { img: "https://picsum.photos/500/500" },
];

export default function BrandById() {
  const { id } = useParams();
  const brandName = Object.keys(data);
  console.log(brandName[0]);

  return (
    <Layout>
      <div>
        <h1>BrandById</h1>
        <div className="d-flex justify-content-center flex-column flex-md-row px-0">
          <div className="col-12 col-md-6 col-lg-7 p-2 p-md-3 p-lg-5 my-2">
            <img
              src={data.logoUrl}
              style={{ width: "100%" }}
              alt={data.brandName}
            />
            <hr />
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
            >
              <Masonry gutter="10px">
                {mockupImages &&
                  mockupImages.map((list, index) => {
                    return (
                      <div key={`${list}-${index}`} className="hover-cursor">
                        <img
                          src={data.mockupUrl}
                          style={{ width: "100%" }}
                          alt={data.brandName}
                        />
                        <p className="fw-bold">{data.logoName}</p>
                      </div>
                    );
                  })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="col-12 col-md-6 col-lg-5 p-2 p-md-3 p-lg-5 d-flex flex-column">
            <div className="d-flex justify-content-between my-2 my-md-0">
              <h1 className="fw-bold">{data.slugName}</h1>
            </div>
            <p>
              <span className="mt-2 fs-5 fw-bold">Organisation Details</span>
              <br />
              {data.brandDescription}
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Brand Overview</span>
              <br />
              {data.brandOverview}
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">General Guidelines</span>
              <br />
              {data.guidelinesValue}
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Pronunciation</span>
              <br />
              <span className="fst-italic">{data.pronunciation}</span>
            </p>
            <p style={{ listStyleType: "none" }}>
              <span className="mt-2 fs-5 fw-bold">Do's And Dont's</span>
              <br />
              <li>✅ {data.dos}</li>
              <li>❌ {data.donts}</li>
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Colors</span>
              <br />
              <span className="d-flex align-items-center mt-1 justify-content-start">
                <span
                  className="d-inline-block"
                  tabindex="0"
                  data-bs-toggle="tooltip"
                  title="Primary"
                >
                  <button
                    className="btn p-0 me-2"
                    onClick={() => navigator.clipboard.writeText("#ff0000")}
                    type="button"
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                      backgroundColor: "#ff0000",
                    }}
                  >
                    #ff0000
                  </button>
                </span>
                <span
                  className="d-inline-block"
                  tabindex="0"
                  data-bs-toggle="tooltip"
                  title="Secondary"
                >
                  <button
                    className="btn btn-primary p-0"
                    type="button"
                    onClick={() => navigator.clipboard.writeText("#000000")}
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                      backgroundColor: "#000000",
                    }}
                  >
                    #000000
                  </button>
                </span>
              </span>
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Fonts</span>
              <p>
                Primary <br /> <span className="fs-5">{data.primaryFont}</span>
              </p>
              <p>
                Secondary <br />
                <span className="fs-5">{data.secondaryFont}</span>
              </p>
            </p>
          </div>
        </div>
        {id && <p>{id}</p>}
      </div>
    </Layout>
  );
}
