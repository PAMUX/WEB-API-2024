import './App.css';
import { Component } from 'react';
import lankaImage from './lanka.jpg'; // Existing import
import CloudyImage from './Cloudy.png';
import SunnyImage from './Sunny.png';
import StormyImage from './Stormy.png';
import WindyImage from './Windy.png';
import RainyImage from './Rainy.png'
import WinterImage from './Winter.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };

    // Attach weatherImageMap to this (the instance of the class)
    this.weatherImageMap = {
      'Cloudy': CloudyImage,
      'Sunny': SunnyImage,
      'Stormy': StormyImage,
      'Windy' :WindyImage,
      'Rainy': RainyImage,
      'Winter' : WinterImage,
       // Ensure the key matches the 'Weather' property value exactly
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.refreshNotes();
    this.interval = setInterval(() => this.refreshNotes(), 300000); // 300000 ms = 5 minutes
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear the interval when the component is unmounted
  }

  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "api/todoappdb/GetNotes");
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
 
  render() {
    const { notes } = this.state;

    return (
      <div className="App">
        <h2>Weather console</h2>
        <div className="card-container">
          {notes.map((note, index) => {
            const WeatherImage = this.weatherImageMap[note.Weather] ; // Use the dynamically determined image

            return (
              <div key={index} className="card" style={{ display: 'flex', alignItems: 'center' }}>
                <img
  src={WeatherImage}
  alt={note.Weather}
  className="weather-image" // Assigning a class name
  style={{ marginRight: '40px', marginLeft: '20px', width: '90px', height: 'auto' }}
/>

                <div>
                  {Object.entries(note).map(([key, value], innerIndex) => (
                    <p key={innerIndex}>
                      {innerIndex !== 0 && (
                        <>
                          <b style={{ color: innerIndex === 1 ? 'blue' : 'inherit' }}>{key}:</b> {value.toString()}
                        </>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div><img
  src={lankaImage}
  alt="Sri Lanka"
  className="lanka-image"
  style={{ marginTop: '20px' }} // Apply top margin
/>

      </div>
    );
  }
}

export default App;
