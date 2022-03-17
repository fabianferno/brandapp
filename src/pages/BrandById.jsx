import Layout from "../layouts/Layout";
import { useHistory, useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const mockupImages = [
  { img: "https://picsum.photos/500/500" },
  { img: "https://picsum.photos/500/500" },
  { img: "https://picsum.photos/500/500" },
  { img: "https://picsum.photos/500/500" },
];

export default function BrandById() {
  const { id } = useParams();

  return (
    <Layout>
      <div>
        <h1>BrandById</h1>
        <div className="d-flex justify-content-center flex-column flex-md-row px-0">
          <div className="col-12 col-md-6 col-lg-7 p-2 p-md-3 p-lg-5 my-2">
            <div
              className="rounded-2 img-fluid"
              style={{
                height: "500px",
                maxWidth: "500px",
                maxHeight: "500px",
                backgroundImage: `url("https://picsum.photos/500/500")`,
              }}
            ></div>
            <hr />
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
            >
              <Masonry gutter="10px">
                {mockupImages &&
                  mockupImages.map((list, index) => {
                    return (
                      <div key={`${list}-${index}`} className="hover-cursor">
                        <img src={list.img} style={{ width: "100%" }} alt="" />
                        <p className="fw-bold">Image</p>
                      </div>
                    );
                  })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="col-12 col-md-6 col-lg-5 p-2 p-md-3 p-lg-5 d-flex flex-column">
            <div className="d-flex justify-content-between my-2 my-md-0">
              <h1 className="fw-bold">Licet Pattarai</h1>
            </div>
            <p>
              <span className="mt-2 fs-5 fw-bold">Organisation Details</span>
              <br />
              Licet Pattarai is a non-profit organization that provides
              education and healthcare services to the people of the country. It
              is a non-governmental organization (NGO) and is registered under
              the Societies Registration Act, 1860.
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Brand Overview</span>
              <br />
              Licet Pattarai is a non-profit organization that provides
              education and healthcare services to the people of the country. It
              is a non-governmental organization (NGO) and is registered under
              the Societies Registration Act, 1860.
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">General Guidelines</span>
              <br />
              Licet Pattarai is a non-profit organization that provides
              education and healthcare services to the people of the country. It
              is a non-governmental organization (NGO) and is registered under
              the Societies Registration Act, 1860.
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Pronunciation</span>
              <br />
              <span className="fst-italic">li-cet patt-ar-ee</span>
            </p>
            <p style={{ listStyleType: "none" }}>
              <span className="mt-2 fs-5 fw-bold">Do's And Dont's</span>
              <br />
              <li>
                ✔ The logo should be a square with a minimum height of 100px and
                a maximum height of 200px.
              </li>
              <li>
                ✔ The logo should be a square with a minimum height of 100px and
                a maximum height of 200px.
              </li>
              <li>❌ Don't use a logo that is too big or too small</li>
              <li>❌ Don't use a logo that is too big or too small</li>
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Colors</span>
              <br />
              <span className="d-flex align-items-center mt-1 justify-content-between">
                <span
                  className="d-inline-block"
                  tabindex="0"
                  data-bs-toggle="tooltip"
                  title="Primary"
                >
                  <button
                    className="btn btn-primary p-0"
                    onClick={() => navigator.clipboard.writeText("#a1104d")}
                    type="button"
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                    }}
                  >
                    #a1104d
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
                    onClick={() => navigator.clipboard.writeText("#a1104d")}
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                    }}
                  >
                    #a1104d
                  </button>
                </span>
                <hr width="1" size="75" />
                <span
                  className="d-inline-block"
                  tabindex="0"
                  data-bs-toggle="tooltip"
                  title="Primary"
                >
                  <button
                    className="btn btn-primary p-0"
                    type="button"
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                    }}
                  >
                    #a1104d
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
                    onClick={() => navigator.clipboard.writeText("#a1104d")}
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                    }}
                  >
                    #a1104d
                  </button>
                </span>
              </span>
            </p>
            <p>
              <span className="mt-2 fs-5 fw-bold">Fonts</span>
              <p>
                Primary <br /> <span className="fs-5">Raleway</span>
              </p>
              <p>
                Secondary <br /> <span className="fs-5">Raleway</span>
              </p>
            </p>
          </div>
        </div>
        {id && <p>{id}</p>}
      </div>
    </Layout>
  );
}
