import React from "react";
import { useState } from "react";
import Map from "../../components/Map";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import ModeConfig from "../../config/ModeConfig";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { apiUri } = ModeConfig();
  const { user, fetchUser } = useAuth();
  const [username, setUsername] = useState(user.username || "");
  const [description, setDescription] = useState(
    user.profile?.description || ""
  );
  const [interests, setInterests] = useState(user.profile?.interests || []);
  const [photoUrl, setPhotoUrl] = useState(user.profile?.photoUrl || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [location, setLocation] = useState(user.location || null);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState("");

  const handleMapData = (position) => {
    setLocation(position);
    setShowMap(false);
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

  const onSaveProfile = async (updatedProfile) => {
    try {
      const response = await api.put("/user", updatedProfile);
      console.log(response.data.message);

      await fetchUser();

      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

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
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotoUrl(previewUrl);
            setPhotoFile(file);
          }
        }}
      />
      {photoUrl && (
        <div className="profile-avatar">
          <img src={`${apiUri}${photoUrl}`} alt="Profile Preview" />
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
        value={interests.join(", ")}
        onChange={(e) =>
          setInterests(e.target.value.split(",").map((i) => i.trim()))
        }
      />

      <label>Location:</label>
      <div className="edit-profile-form-location-container">
        <div className="edit-profile-form-location">
          {!location ? "Not set" : location.city}
        </div>
        <button
          className="edit-profile-form-button"
          type="button"
          onClick={() => setShowMap(true)}
        >
          Pick Location
        </button>
      </div>

      <div className="edit-profile-form-buttons">
        <button
          className="edit-profile-form-button"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
        <button className="edit-profile-form-button" type="submit">
          Save Profile
        </button>
      </div>

      {showMap && (
        <Map onClose={() => setShowMap(false)} onSave={handleMapData} />
      )}
    </form>
  );
};

export default EditProfileForm;
