import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import ModeConfig from "../../config/ModeConfig";
import { PulseLoader } from "react-spinners";
import api from "../../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user, fetchUser, loading } = useAuth();
  const { apiUri } = ModeConfig();
  const {
    username,
    email,
    location,
    profile: userProfile,
    googleId,
    wishlist,
  } = user;

  let imgUrl;

  if (googleId && userProfile.photoUrl.startsWith("https://")) {
    imgUrl = userProfile.photoUrl;
  } else if (userProfile.photoUrl) {
    imgUrl = `${apiUri}${userProfile.photoUrl}`;
  } else {
    imgUrl = "/default-avatar.png";
  }

  const removeFromWishlist = (gameName) => {
    api
      .delete(`wishlist/${gameName}`)
      .then((response) => {
        console.log(response.data.message);
        fetchUser();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  if (!user) {
    return (
      <div className="loader">
        <PulseLoader color="#0000" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <img src={imgUrl} alt="Profile" />
          </div>
        </div>

        <div className="profile-info">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Location: </strong>
            {location?.latitude && location?.longitude
              ? location.city
              : "Not set"}
          </p>
        </div>
      </section>

      <section className="profile-description">
        <h3>About Me</h3>
        <p>{userProfile?.description || "No profile description added yet."}</p>
      </section>

      <section className="profile-interests">
        <h3>Interests</h3>
        {userProfile?.interests && userProfile.interests.length > 0 ? (
          <div className="interest-list">
            {userProfile.interests.map((interest, index) => (
              <span key={index} className="interest-chip">
                {interest}
              </span>
            ))}
          </div>
        ) : (
          <p className="profile-empty">No game categories selected.</p>
        )}
      </section>

      <section className="profile-wishlist">
        <h3>My Wishlist</h3>
        {wishlist && wishlist.length > 0 ? (
          <div className="wishlist-list">
            {wishlist.map((game, index) =>
              loading ? (
                <div>
                  <PulseLoader color="#0000" />
                </div>
              ) : (
                <div key={index} className="wishlist-item">
                  <span>{game}</span>

                  <button
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(game)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ),
            )}
          </div>
        ) : (
          <p className="profile-empty">Your wishlist is empty.</p>
        )}
      </section>
      <div className="profile-btns">
        <button className="profile-edit-btn" onClick={() => navigate("edit")}>
          Edit Profile
        </button>
        <button
          className="profile-edit-btn"
          onClick={() => navigate("history")}
        >
          Trade History
        </button>
      </div>
    </div>
  );
};

export default Profile;
