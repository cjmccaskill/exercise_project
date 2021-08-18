import React, { useState } from "react";

const EditExercise = (props) => {
  const { exercise, submitFunc = () => {}, history } = props;

  const [formData, setFormData] = useState(exercise);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunc(formData);
    history.push("/");
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Log" className="btn btn-primary" />
          <input
            type="submit"
            value="Delete Log"
            className="btn btn-warning"
            onClick={() => {
              props.deleteExercise(exercise);
              props.history.push("/edit");
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
