import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Netflix",

    image_url:
      "https://bafybeifdkpwuory4ive6d4pjfkz7ufruce63az6vbttderhhgpj6wsxk4m.ipfs.dweb.link/7dc497e2-4975-11ec-a9ce-066b49664af6_cm_1440w.jpg",
  },
  {
    id: 2,
    name: "Facebook",

    image_url:
      "https://pnggrid.com/wp-content/uploads/2021/07/Facebook-Logo-Square-768x768.png",
  },
  {
    id: 3,
    name: "Starbucks",

    image_url:
      "https://www.southcentremall.com/wp-content/uploads/2021/11/ee90a3b4b8e155ee8685e6a84de8e1e94781324e.png",
  },
  {
    id: 4,
    name: "Uber",
    image_url: "https://cdn.mos.cms.futurecdn.net/tQxVwcJSowYD7xwWDYidd9.jpg",
  },
  {
    id: 5,
    name: "Youtube",
    image_url:
      "https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg",
  },
  {
    id: 6,
    name: "Dropbox",
    image_url:
      "data:image/png;base64,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",
  },
  {
    id: 7,
    name: "Zendesk",
    image_url:
      "https://yt3.ggpht.com/iT6RG12TUfFc5Fg7u0GpM9nMF1WRzWd0cRYX777rgwhFjiFtH6lZq5p8ANqyTC26S_nVkN4tfw=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 8,
    name: "Spotify",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png",
  },
];
export default function AllBrands() {
  return (
    <Layout>
      <section className="row" style={{ marginTop: "-100px" }}>
        <h1 className="mx-2">All Brands</h1>

        <div className="form-group mx-2 my-4">
          <input
            type="text"
            style={{ width: "100%" }}
            className="p-3 d-flex bg-light border-primary col-md-6 text-black rounded focus-none"
            id="inputName"
            placeholder="Search - Eg. Netflix"
          />
        </div>
        <div className="container mx-2 py-5">
          <div className="row">
            {data &&
              data.map((list, index) => {
                return (
                  <div
                    key={`${list}-${index}`}
                    className="col-6 col-md-3 p-1 p-md-2"
                  >
                    <Link
                      to={`/brands/${index + 1}`}
                      className="text-decoration-none"
                    >
                      <div className="card shadow rounded-2">
                        <img
                          src={list.image_url}
                          className="img-fluid rounded-2 mx-md-3 mx-2 mt-md-3 mt-2"
                          alt={list.name}
                          style={{ height: "220px" }}
                        />
                        <div className="card-body">
                          <h6
                            className="card-text p2-bold text-primary"
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {list.name}
                          </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
