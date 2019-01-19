import React, { Component } from "react";

export default class Partners extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container sl--partners--container">
          <h2 class="product-heading">Partners<span class="text-muted"></span></h2>

          <div class="row">
              <div class="col-md-3">
                <img src="images/partner-gtomega.png" alt="Logo NOCTUA" />
              </div>
              <div class="col-md-9">
                <h3>GT Omega Racing</h3>
                <p>Established in 2009. GT Omega Racing is one of the leading brands , specialising in products for Simulation Racing, Gaming Chairs and Accessories for use in eSports and gaming.</p>
              </div>
          </div>
          <div class="row">
              <div class="col-md-3">
                <img src="images/partner-humblebundle.png" alt="Logo NOCTUA" />
              </div>
              <div class="col-md-9">
                <h3>Humble Bundle</h3>
                <p>Humble Bundle is a distribution platform selling games, ebooks, software, and other digital content. Since Humble's founding in 2010, our mission has been to support charity
                ("Humble") while providing awesome content to customers at great prices ("Bundle"). We started by offering only game bundles, but have branched out to include an online storefront,
                a monthly subscription service, a publishing initiative, and lots more.</p>
                <div> </div>
                <a target="_blank" href="https://www.humblebundle.com/monthly?partner=scotlan" title="Humble website">https://www.humblebundle.com/monthly?partner=scotlan</a>
              </div>
          </div>
          <div class="row">
              <div class="col-md-3">
                <img src="images/partner-ess.png" alt="Logo NOCTUA" />
              </div>
              <div class="col-md-9">
                <h3>Esports Scotland</h3>
                <p>Their goal is to support competitive gaming from the grassroots to the professional level. We aim to provide opportunities for esports talent in Scotland
                to be scouted by professional teams through hosting and sponsoring tournaments nationwide with the focus always on Scotland.</p>
                <a target="_blank" href="https://esportsscotland.co.uk/" title="Humble website">https://esportsscotland.co.uk/</a>
              </div>
          </div>
          <div class="row">
              <div class="col-md-3">
                <img src="images/partner-asrock.png" alt="Logo NOCTUA" />
              </div>
              <div class="col-md-9">
                <h3>ASrock</h3>
                <p>
                ASRock Inc. is established in 2002, specialized in the field of motherboards. ASRock strives to build up its own brand. With the 3C design concept, “Creativity,
                Consideration, Cost-effectiveness”, the company explores the limit of motherboards manufacturing while paying attention on the eco issue at the same time,
                developing products with the consideration of eco-friendly concept.</p>
                <a target="_blank" href="https://www.asrock.com/index.asp" title="Humble website">https://www.humblebundle.com/monthly?partner=scotlan</a>
              </div>
          </div>
      </div>
      </div>
    );
  }
}
