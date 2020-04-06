import React from "react";
import MapIcon from "../../assets/map.svg";
import PrimaryButton from "../common/buttons/PrimaryButton";

class HeatMap extends React.Component {
  state = {
    width: 0,
    height: 0,
    ratio: 190,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (window.innerWidth < 1024) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: Math.floor((window.innerHeight / window.innerWidth) * 100),
      });
    } else {
      this.setState({ ratio: 56.25 });
    }
  };

  render() {
    const ratio = `${this.state.ratio}%`;
    return (
      <div className="heatmap">
        <div className="heatmap__header">
          <div className="heatmap__title">
            <div className="title">View Virus Data</div>
            <MapIcon className="heatmap__map-icon"></MapIcon>
          </div>

          <div className="heatmap__description body">
            <p>
              Welcome to our interactive heat map! To view information about
              your region, click on your municipality or postal code region. To
              easily locate yourself, let Flatten access your location.
            </p>
          </div>

          <div className="heatmap__description body">
            <p>
              <b>Potential and Vulnerable Cases:</b> This tab displays all
              individuals that are especially vulnerable to COVID-19 in Canada
              that are also deemed potential cases, based on data inputted into
              Flatten's form.
            </p>

            <p>
              <b>Potential Cases:</b> This tab displays all of the potential
              cases of COVID-19 in Canada, based on data inputted into Flatten's
              form.
            </p>

            <p>
              <b>Vulnerable Individuals: </b> This tab displays all individuals
              that are especially vulnerable to COVID-19 in Canada, based on
              data inputted into Flatten's form.
            </p>
          </div>

          <div className="heatmap__description body">
            <p>
              <i>
                In order to ensure non-trolling we use cookies, recaptcha and
                track suspicious IP addresses.
              </i>
            </p>
          </div>
        </div>

        <div className="heatmap__container" style={{ paddingTop: ratio }}>
          <iframe src="https://flatten-271620.web.app/" allow="geolocation">
            Sorry, the heat-map did not load.
          </iframe>
        </div>
      </div>
    );
  }
}

export default HeatMap;
