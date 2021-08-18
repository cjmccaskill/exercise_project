import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import ExerciseForm from "./components/ExerciseForm";
import CreateUser from "./components/CreateUser";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const url = "https://exercise-project-db.herokuapp.com";

  ////////////////////////
  // Exercise functions
  ////////////////////////
  const [exercises, setExercises] = useState([]);

  const newExercise = {
    username: "",
    description: "",
    duration: 0,
    date: new Date().toLocaleDateString(),
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
    await fetch(url + "/exercise", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExercise),
    });
    getExercises();
  };

  const updateExercise = async (exercise) => {
    await fetch(url + "/exercise/" + exercise._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });
    getExercises();
  };

  const deleteExercise = async (exercise) => {
    await fetch(url + "/exercise/" + exercise._id, {
      method: "delete",
    });
    getExercises();
  };

  const selectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  ////////////////////////
  // User functions
  ////////////////////////
  const [users, setUsers] = useState([]);

  const newUser = {
    username: "",
    users: [],
  };

  const getUsers = async () => {
    const response = await fetch(url + "/user");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async (newUser) => {
    await fetch(url + "/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    getUsers();
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
          path="/create"
          render={(rp) => (
            <ExerciseForm
              {...rp}
              label="Create New Exercise"
              exercise={newExercise}
              submitFunc={createExercise}
            />
          )}
        ></Route>
        <Route
          path="/edit"
          render={(rp) => (
            <ExerciseForm
              {...rp}
              label="Update Log"
              exercise={selectedExercise}
              submitFunc={updateExercise}
              deleteExercise={deleteExercise}
            />
          )}
        ></Route>

        <Route
          path="/user"
          render={(rp) => (
            <CreateUser {...rp} users={newUser} submitFunc={createUser} />
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
