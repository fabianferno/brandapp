import Layout from "../layouts/Layout";
import { useHistory, useParams } from "react-router-dom";

export default function BrandById() {
  const { id } = useParams();

  return (
    <Layout>
      <div>
        {" "}
        <h1>BrandById</h1>
        {id && <p>{id}</p>}
      </div>
    </Layout>
  );
}
