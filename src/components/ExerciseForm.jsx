import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExerciseForm = (props) => {
  const { exercise, submitFunc = () => {}, history } = props;

  const [formData, setFormData] = useState(exercise);
  const [logDate, setLogDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunc(formData, logDate);
    history.push("/");
  };

  return (
    <div>
      <h3>{props.label}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          {/* <select
            required
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          >
            {formData.users.map(function (user) {
              return (
                <option key={user} value={user} name="user">
                  {user}
                </option>
              );
            })}
          </select> */}
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
            <DatePicker
              name="date"
              dateFormat="MM-dd-yyyy"
              closeOnScroll={true}
              selected={logDate}
              onChange={(date) => setLogDate(date)}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value={props.label}
            className="btn btn-primary btn-submit"
          />
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => {
              props.deleteExercise(exercise);
              props.history.push("/edit");
            }}
          >
            Delete Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
