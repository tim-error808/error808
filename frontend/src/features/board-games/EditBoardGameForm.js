import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditBoardGameForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    /* game object vezan uz id */
  });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, image: file }));
    setImagePreview(previewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (form.playTime <= 0) {
      setError("Play time must be greater than 0 minutes.");
      return;
    }

    if (form.minPlayers <= 0 || form.maxPlayers <= 0) {
      setError("Number of players must be greater than 0.");
      return;
    }

    if (Number(form.minPlayers) > Number(form.maxPlayers)) {
      setError("Minimum players cannot be greater than maximum players.");
      return;
    }

    if (Number(form.difficulty) > 5 || Number(form.difficulty) < 1) {
      setError("Difficulty must be between 1 and 5.");
      return;
    }

    console.log(form);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h2>Edit Board Game</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Game name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre *</label>
          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Publisher *</label>
          <input
            name="publisher"
            value={form.publisher}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Release year *</label>
          <input
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Condition *</label>
          <select
            name="condition"
            value={form.condition}
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
              value={form.minPlayers}
              onChange={handleChange}
              required
            />
            <input
              name="maxPlayers"
              placeholder="Max"
              value={form.maxPlayers}
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
            value={form.playTime}
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
            value={form.difficulty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Game image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Game preview" />
            </div>
          )}
        </div>

        <div className="form-group full-width">
          <label>Description (optional)</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="legend">* means that the field is required</div>

      {error && <div className="form-error">{error}</div>}

      <button className="primary-button form-submit">Save Changes</button>
    </form>
  );
};

export default EditBoardGameForm;
