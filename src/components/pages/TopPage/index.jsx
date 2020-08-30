import React from "react";
import { Link } from "react-router-dom";
import Badge from "@bit/ryosuketter.components.badge";

const TopPage = () => (
  <>
    <h1>This is Top page!!</h1>
    <p>
      <Badge size="md" type="info">
        Info.
      </Badge>
      そうです
    </p>
    <Link to="/play">Player Page</Link>
  </>
);

export default TopPage;
