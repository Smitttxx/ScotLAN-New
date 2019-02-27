import { Link, withRouter } from "react-router-dom";
import React from "react";
import "./NotFound.css";

export default () =>


<div className="keyboard-background">
  <div className="section-container">
    <div className="section-container-keyboard">
      <div className="container container--404">
        <div class="row">
          <div class="col-md-8 container--404--leftcol">
            <h3>Ooops... This is awkward.</h3>
            <p>The page you are looking for doesnt exist.</p>
            <p>Would you like to go to the <Link to="/">Homepage</Link> or the <Link to="/Product/Event/ScotLAN%20Event%205" >Events Page</Link>?</p>
          </div>
          <div class="col-md-4">
              <img class="HaroldFace" src="/Images/Harold.jpg" alt="Logo Corsai" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
