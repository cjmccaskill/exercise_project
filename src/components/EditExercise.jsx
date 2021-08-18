import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) => {
  const { exercise } = props;
  return (
    <div>
      <h3>Logged Exercises</h3>
      <div key={exercise._id} className="exercise-container">
        <h4>{exercise.username}</h4>
        <p>{exercise.description}</p>
        <p>{exercise.duration}</p>
        <p>{exercise.date}</p>
      </div>
    </div>
  );
};

export default EditExercise;
