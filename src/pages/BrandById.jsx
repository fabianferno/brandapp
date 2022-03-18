import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import data from "../assets/files/data.json";
import { MdDownload } from "react-icons/md";

const mockupImages = [
  {
    img: "https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png",
  },
  {
    img: "https://www.uipixels.com/wp-content/uploads/2018/06/Netflix-Redesign-Website-PSD.jpg",
  },
  {
    img: "data:image/jpeg;base64,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",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgSB7sQnsjxlw60LUJ7HSChMZ8HtvuWQ8fg&usqp=CAU",
  },
];

export default function BrandById() {
  const { id } = useParams();
  const brandName = Object.keys(data);
  console.log(brandName[0]);

  return (
    <Layout>
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
                        src={list.img}
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
            <h1 className="fw-bold">{data.brandName}</h1>
          </div>
          <p>
            <span className="mt-2 fs-5 fw-bold">Brand Description</span>
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
              <b>Primary - </b>
              {data.primaryFont}
              <br />
              <b>Secondary - </b>
              {data.secondaryFont}
            </p>
          </p>
        </div>
      </div>
      <div className="text-center">
        <div className="py-2 btn btn-primary btn-lg h1 fw-bold text-white">
          Download Assets <MdDownload />
        </div>
      </div>
    </Layout>
  );
}
