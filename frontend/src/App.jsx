import React from "react";
import "./App.css";
import { Button } from "./components/ui/button";
const App = () => {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
};

export default App;
