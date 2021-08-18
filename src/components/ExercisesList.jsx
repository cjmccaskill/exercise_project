import React from "react";
import ConvertDate from "./ConvertDate";

const ExercisesList = (props) => {
  const { exercises } = props;

  const loaded = () => (
    <div>
      <h2>Logged Exercises</h2>
      <div className="list-container">
        {exercises.map((exercise) => (
          <div key={exercise._id} className="exercise-container ">
            <h4>{exercise.username}</h4>
            <hr />
            <p>
              <strong>Activity: </strong>
              {exercise.description}
            </p>
            <p>
              <strong>Time: </strong>
              {exercise.duration}
            </p>
            <p>
              <ConvertDate>{exercise.date}</ConvertDate>
            </p>
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
    </div>
  );
  const loading = <h1>Loading...</h1>;

  return ExercisesList.length > 0 ? loaded() : loading;
};

export default ExercisesList;
