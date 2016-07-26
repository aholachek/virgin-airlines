import React from 'react'
import {Link} from 'react-router'

class LandingPageComponent extends React.Component {
  render() {
    return (
      <div className="landingpage-component">
        <div className="ui two column grid centered stackable">
          <div className="column">
            <h2 className="ui icon header">
              <i className="diamond icon"></i>
              <div className="content">
                Account Settings
                <div className="sub header">
                  <div>
                    App description
                  </div>
                  <Link to="/onboard/1" className="ui button">
                    Let's get started!</Link>
                </div>
              </div>
            </h2>
          </div>
          <div className="ui vertical divider">
            or
          </div>
          <div className="column">
            <h2 className="ui icon header">
              <i className="hourglass half icon"></i>
              <div className="content">
                Something Else
                <div className="sub header">
                  <div>
                    App description
                  </div>
                  <Link to="/onboard/1" className="ui button">
                    Let's get started!</Link>
                </div>
              </div>
            </h2>
          </div>
        </div>

      </div>
    );
  }
}

LandingPageComponent.displayName = 'LandingPageComponent';

// Uncomment properties you need
// LandingPageComponent.propTypes = {};
// LandingPageComponent.defaultProps = {};

export default LandingPageComponent;
