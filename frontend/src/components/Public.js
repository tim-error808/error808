import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <h1>Public Page</h1>
      <p>This page is accessible to everyone.</p>
      <Link to="/users">Go to Users List</Link>
    </section>
  );
};

export default Public;
