import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  const url = "http://exercise-project-db.herokuapp.com";
  const [exercises, setExercises] = useState([]);

  const newExercise = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  };

  const [selectedExercise, setSelectedExercise] = useState(newExercise);

  const getExercises = async () => {
    const response = await fetch(url + "/exercise");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    getExercises();
  }, []);

  const createExercise = async (newExercise) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getExercises();
  };

  const selectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="container">
      <Navbar />
      <br />
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => (
            <ExercisesList
              {...rp}
              exercises={exercises}
              selectExercise={selectExercise}
            />
          )}
        ></Route>
        <Route
          path="/edit/:id"
          render={(rp) => (
            <EditExercise
              {...rp}
              label="Update"
              exercise={selectExercise}
              submitFunc={updateExercise}
              deleteExercise={deleteExercise}
            />
          )}
        ></Route>
        <Route
          path="/create"
          render={(rp) => (
            <CreateExercise
              {...rp}
              label="Create"
              exercise={newExercise}
              submitFunc={createExercise}
            />
          )}
        ></Route>
        <Route path="/user" render={(rp) => <CreateUser />}></Route>
      </Switch>
    </div>
  );
}

export default App;
