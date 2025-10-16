import axios from "axios";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const UsersList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      axios
        .get("http://localhost:3500/users")
        .then((res) => {
          if (isMounted) {
            setUsers(res.data);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }, 2000);
  }, []);

  if (isLoading) return <PulseLoader className="loader" color={"#000"} />;
  if (error) return <p className="error">Error: {error}</p>;

  const content = (
    <section className="users">
      <h2>Users List</h2>
      {users?.map((user) => (
        <article key={user.username}>
          <h3>{user.username}</h3>
        </article>
      ))}
    </section>
  );

  return content;
};

export default UsersList;
