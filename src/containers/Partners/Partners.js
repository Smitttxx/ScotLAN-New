import React, { Component } from "react";

export default class Partners extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container sl--partners--container">
          <div className="container">
          <div className="sl--partners--header">
          <h2 class="product-heading">Partners<span class="text-muted"></span></h2>
          </div>
          <p> The below partners are vital to the sucess of our events amd we cant thank them enough for their support!The below partners are vital to the sucess of our events amd we cant thank them enough for their support!
          The below partners are vital to the sucess of our events amd we cant thank them enough for their support! </p>
          <div class="row">
              <div class="col-md-7">
                <div className="partner-header">
                  <a target="_blank" href="https://www.gtomegaracing.com/" title="GTOmega website"><h3>GT Omega Racing</h3></a>
                </div>
                  <p>Established in 2009. GT Omega Racing is one of the leading brands , specialising in products for Simulation Racing, Gaming Chairs and Accessories for use in eSports and gaming.</p>
                <div className="partner-logo">
                  <a target="_blank" href="https://www.gtomegaracing.com/" title="GTOmega website"><img src="images/partner-gtomega.png" alt="Logo NOCTUA" /></a>
                </div>
              </div>
              <div class="col-md-5">
                <iframe width="340" height="260" src="https://www.youtube.com/embed/OoHqQembfCQ"></iframe>
              </div>
          </div>
          <div className="gradient-line"></div>
          <div class="row">
            <div class="col-md-7">
              <div className="partner-header">
                <a target="_blank" href="https://www.humblebundle.com/monthly?partner=scotlan" title="Humble website"><h3>Humble Bundle</h3></a>
              </div>
                <p>Humble Bundle is a distribution platform selling games, ebooks, software, and other digital content. Since Humble's founding in 2010, our mission has been to support charity
                ("Humble") while providing awesome content to customers at great prices ("Bundle"). We started by offering only game bundles, but have branched out to include an online storefront,
                a monthly subscription service, a publishing initiative, and lots more.</p>
                <div className="partner-logo">
                <a target="_blank" href="https://www.humblebundle.com/monthly?partner=scotlan" title="Humble website"><img src="images/partner-humblebundle.png" alt="Logo NOCTUA" /></a>
                </div>
                <div>
                </div>
              </div>
              <div class="col-md-5">
                <iframe width="340" height="260" src="https://www.youtube.com/embed/rkOfIpq5YRM"></iframe>
              </div>
          </div>
          <div className="gradient-line"></div>
          <div class="row">
              <div class="col-md-7">
                <div className="partner-header">
                  <a target="_blank" href="https://esportsscotland.co.uk/" title="Humble website"><h3>Esports Scotland</h3></a>
                </div>
                <p>Their goal is to support competitive gaming from the grassroots to the professional level. We aim to provide opportunities for esports talent in Scotland
                to be scouted by professional teams through hosting and sponsoring tournaments nationwide with the focus always on Scotland.</p>
                <div className="partner-logo">
                  <a target="_blank" href="https://esportsscotland.co.uk/" title="Humble website"><img src="images/partner-ess.png" alt="Logo NOCTUA" /></a>
                </div>
              </div>
              <div class="col-md-5">
                <iframe width="340" height="260" src="https://www.youtube.com/embed/Xt54_L3NeW4"></iframe>
              </div>
          </div>
            <div className="gradient-line"></div>
          <div class="row">
              <div class="col-md-7">
              <div className="partner-header">
                <a target="_blank" href="https://www.asrock.com/index.asp" title="ASrockwebsite"><h3>ASrock</h3></a>
              </div>
                <p>
                ASRock Inc. is established in 2002, specialized in the field of motherboards. ASRock strives to build up its own brand. With the 3C design concept, “Creativity,
                Consideration, Cost-effectiveness”, the company explores the limit of motherboards manufacturing while paying attention on the eco issue at the same time,
                developing products with the consideration of eco-friendly concept.</p>
                <div className="partner-logo">
                  <a target="_blank" href="https://www.asrock.com/index.asp" title="ASrock website"><img src="images/partner-asrock.png" alt="Logo ASROCK" /></a>
                </div>
              </div>
              <div class="col-md-5">
                <iframe width="340" height="260" src="https://www.youtube.com/embed/WxgVCI9MvD8"></iframe>
              </div>
          </div>
          </div>
      </div>
    </div>
    );
  }
}
