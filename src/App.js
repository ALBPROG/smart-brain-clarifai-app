import React, { Component } from "react";
import Navigation from "./component/Navigation/Navigation";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import Signin from "./component/Signin/Signin";
import Register from "./component/Register/Register";
import Particles from "react-particles-js";
import "./App.css";
import "tachyons";

// Particle background Component
const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_are: 1000,
      },
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "bubble",
      },
    },
  },
};

const initialState = {
    // state that remembers and change the input that users enter.
    input: '', 
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id:'',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
};
class App extends Component {
  constructor() {
    super();
// different states
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map( face => {
      const clarifyFace = face.region_info.bounding_box;

      const image = document.getElementById("inputImage");
    const width = Number(image.width); //get the width value
    const height = Number(image.height); // get the height value
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - clarifyFace.right_col * width,
      bottomRow: height - clarifyFace.bottom_row * height,
    }
    });
    
  }
  //we set the state for box
  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  // event listener for input change
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPhotoSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://rocky-headland-52914.herokuapp.com/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'},
        //'Accept': 'application/json'
      body: JSON.stringify({
        input: this.state.input
  })
    })
    .then(response => response.json())
      .then(response => {
        if(response)
        {
          fetch('https://rocky-headland-52914.herokuapp.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              //'Accept': 'application/json'
        },
            body: JSON.stringify({
            id: this.state.user.id
        })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch((err) => console.log(err));;
        }
      //we display the face box and we get the face location calculation
        this.displayFaceBoxes(this.calculateFaceLocations(response))
      })
      .catch((err) => console.log(err)); // catch error
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    //destructuring the states
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" 
        params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries}
            />
            
            <ImageLinkForm
            // passed to ImageLinkForm as prop
              onInputChange={this.onInputChange}
              onPhotoSubmit={this.onPhotoSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        };
      </div>
    );
  }
}

export default App;
