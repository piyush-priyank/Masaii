import React, { useState, useEffect } from 'react';
import axios from 'axios';  // If using axios, remove this line if using fetch

function JokeCard() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the joke when the component mounts
  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke'); // or use fetch
        setJoke(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the joke:', error);
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);  // Empty array to run only once on mount

  // Function to fetch another joke
  const getAnotherJoke = () => {
    setLoading(true);
    // Fetch new joke
    const fetchJoke = async () => {
      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        setJoke(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the joke:', error);
        setLoading(false);
      }
    };
    fetchJoke();
  };

  return (
    <div className="joke-card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
          <button onClick={getAnotherJoke}>Get Another Joke</button>
        </div>
      )}
    </div>
  );
}

export default JokeCard;
