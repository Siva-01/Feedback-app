import React from "react";
import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

function About() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is react app to leave feedback for a product</p>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default About;
