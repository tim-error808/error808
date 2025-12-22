import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import ModeConfig from "../../config/ModeConfig";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { apiUri } = ModeConfig();
  const { username, email, location, profile: userProfile, wishlist } = user;

  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <img
              src={
                `${apiUri}${userProfile.photoUrl}` ||
                "https://placehold.co/100x100/d8d8d8/00000?text=?"
              }
              alt="Profile"
            />
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
            <strong>Location:</strong>{" "}
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
          <div className="wishlist-games">
            {wishlist.map((game, index) => (
              <div key={index} className="game-card">
                <p>{game.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="profile-empty">No games in the wishlist.</p>
        )}
      </section>
      <button className="profile-edit-btn" onClick={() => navigate("edit")}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
