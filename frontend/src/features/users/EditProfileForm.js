import React from "react";
import { useState, useEffect } from "react";
import Map from "../../components/Map";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useAuth();
  const [username, setUsername] = useState(user.username || "");
  const [description, setDescription] = useState(
    user.profile?.description || "",
  );
  const [interests, setInterests] = useState(user.profile?.interests || []);
  const [photoUrl, setPhotoUrl] = useState(user.profile?.photoUrl || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [location, setLocation] = useState(user.location || null);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMapData = (position) => {
    setLocation(position);
    setShowMap(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPhotoUrl(previewUrl);
    setPhotoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = new FormData();

    updatedProfile.append("username", username);
    updatedProfile.append("description", description);
    updatedProfile.append("interests", JSON.stringify(interests));
    updatedProfile.append("location", JSON.stringify(location));

    if (photoFile) {
      updatedProfile.append("photo", photoFile);
    }
    onSaveProfile(updatedProfile);
  };

  const onSaveProfile = (updatedProfile) => {
    setLoading(true);

    api
      .put("/user", updatedProfile)
      .then((response) => {
        console.log(response.data.message);
        setLoading(false);
        fetchUser();
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <label htmlFor="edit_username">Username:</label>
      <input
        type="text"
        id="edit_username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="edit_profile_photo">Profile Photo</label>
      <input
        type="file"
        accept="image/*"
        id="edit_profile_photo"
        onChange={handleFileChange}
      />
      {photoUrl && (
        <div className="profile-avatar">
          <img src={photoUrl} alt="Profile Preview" />
        </div>
      )}

      <label htmlFor="edit_description">Description:</label>
      <textarea
        id="edit_description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="edit_interests">Interests (comma separated):</label>
      <input
        type="text"
        id="edit_interests"
        value={interests.join(",")}
        onChange={(e) => setInterests(e.target.value.split(","))}
      />

      <label>Location:</label>
      <div className="edit-profile-form-location-container">
        <div className="edit-profile-form-location">
          {!location ? "Not set" : location.city}
        </div>
        <button
          className="edit-profile-form-button loaction"
          type="button"
          onClick={() => setShowMap(true)}
        >
          Pick Location
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="edit-profile-form-buttons">
        <button
          className="edit-profile-form-button"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="edit-profile-form-button"
          type="submit"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {showMap && (
        <Map onClose={() => setShowMap(false)} onSave={handleMapData} />
      )}
    </form>
  );
};

export default EditProfileForm;
