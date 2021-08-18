import React from "react";

const ExercisesList = (props) => {
  const { exercises } = props;

  const loaded = () => (
    <div>
      <h3>Logged Exercises</h3>
      {exercises.map((exercise) => (
        <div key={exercise._id} className="exercise-container">
          <h4>{exercise.username}</h4>
          <p>{exercise.description}</p>
          <p>{exercise.duration}</p>
          <p>{exercise.date}</p>
          <input
            type="submit"
            value="Edit Exercise"
            className="btn btn-primary"
            onClick={() => {
              props.selectExercise(exercise);
              props.history.push("/edit");
            }}
          />
        </div>
      ))}
    </div>
  );
  const loading = <h1>Loading...</h1>;

  return ExercisesList.length > 0 ? loaded() : loading;
};

export default ExercisesList;
