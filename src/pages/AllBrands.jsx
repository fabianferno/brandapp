import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Abstact Smoke Red Blue",

    image_url:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    name: "Mountain Landscape",

    image_url:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 3,
    name: "Paint Color on Wall",

    image_url:
      "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80",
  },
  {
    id: 4,
    name: "Raksha",
    image_url:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
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
                          style={{ height: "200px" }}
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
