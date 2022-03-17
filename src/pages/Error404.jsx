import Layout from "../layouts/Layout";

// Create a fancy ERROR 404 page
export default function Error404() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-secondary" style={{ fontSize: "Are you lost?" }}>
          ERROR 404
        </h1>
      </div>
    </Layout>
  );
}
