import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
      body: JSON.stringify(newExercise),
    });
    getExercises();
  };

  const updateExercise = async (updateExercise) => {
    await fetch(url + `/${updateExercise._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateExercise),
    });
    getExercises();
  };

  const deleteExercise = async (deleteExercise) => {
    await fetch(url + `/${deleteExercise._id}`, {
      method: "delete",
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
              exercise={selectedExercise}
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
