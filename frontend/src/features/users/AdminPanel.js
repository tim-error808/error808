import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popup]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "users") {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } else {
        const res = await api.get("/admin/listings");
        setListings(res.data);
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveEdit = () => {
    if (activeTab === "users") {
      api
        .put(`/admin/users/${editingItem._id}`, {
          username: formData.username,
          email: formData.email,
          scope: formData.scope,
          isActive: formData.isActive,
        })
        .then((response) => {
          setMessage(response.data.message);
          console.log(response.data.message);
          setEditingItem(null);
          fetchData();
          setPopup(true);
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.log(error.response.data.message);
          setEditingItem(null);
          setPopup(true);
        });
    } else {
      api
        .put(`/admin/listings/${editingItem._id}`, {
          available: formData.available,
          condition: formData.condition,
          name: formData.name,
          genre: formData.genre,
          publisher: formData.publisher,
          releaseYear: formData.releaseYear,
          minPlayers: formData.minPlayers,
          maxPlayers: formData.maxPlayers,
          playTime: formData.playTime,
          difficulty: formData.difficulty,
          imageUrl: formData.imageUrl,
          description: formData.description,
        })
        .then((response) => {
          setMessage(response.data.message);
          console.log(response.data.message);
          setEditingItem(null);
          fetchData();
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.log(error.response.data.message);
          setEditingItem(null);
        });
    }
  };

  const deleteItem = (id) => {
    const endpoint =
      activeTab === "users" ? `/admin/users/${id}` : `/admin/listings/${id}`;

    api.delete(endpoint);
    fetchData();
  };

  return (
    <section className="admin-panel">
      {popup && (
        <div className="auth-done-popup">
          <h1 className="auth-done-text">{error ? error : message}</h1>
        </div>
      )}
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "listings" ? "active" : ""}
          onClick={() => setActiveTab("listings")}
        >
          Listings
        </button>
      </div>

      {loading ? (
        <PulseLoader className="loader" color="#0000" />
      ) : (
        <div className="admin-list">
          {(activeTab === "users" ? users : listings).map((item) => (
            <div key={item._id} className="admin-card">
              <div className="admin-card-info">
                <strong>
                  {activeTab === "users" ? item.username : item.name}{" "}
                </strong>
                <span>ID:{item._id}</span>
              </div>

              <div className="admin-actions">
                {activeTab === "listings" && (
                  <button
                    className="primary-button"
                    onClick={() => navigate(`/listings/details/${item._id}`)}
                  >
                    Details
                  </button>
                )}
                <button
                  className="primary-button"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="primary-button danger"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <div className="modal-overlay">
          <div className={`admin-modal ${activeTab}`}>
            <h3>Edit {activeTab === "users" ? "User" : "Listing"}</h3>

            {activeTab === "users" ? (
              <div className="form-grid">
                <div className="form-group full-width">
                  <input
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group full-width">
                  <input
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group full-width">
                  <input
                    name="scope"
                    value={formData.scope || ""}
                    onChange={handleChange}
                    placeholder="Scope"
                  />
                </div>
                <div className="form-group available">
                  <label htmlFor="isActive">Active</label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={!!formData.isActive}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div className="form-grid">
                <div className="form-group">
                  <label>Game name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Genre *</label>
                  <input
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Publisher *</label>
                  <input
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Release year *</label>
                  <input
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Condition *</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="new">New</option>
                    <option value="like-new">Like new</option>
                    <option value="used">Used</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Players *</label>
                  <div className="players-input">
                    <input
                      name="minPlayers"
                      placeholder="Min"
                      value={formData.minPlayers}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="maxPlayers"
                      placeholder="Max"
                      value={formData.maxPlayers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Play time (min) *</label>
                  <input
                    min="0"
                    name="playTime"
                    value={formData.playTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Difficulty (1–5) *</label>
                  <input
                    min="1"
                    max="5"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description (optional)</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group available">
                  <label htmlFor="available">Available</label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={!!formData.available}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button className="primary-button" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
