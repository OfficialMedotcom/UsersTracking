import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { collection, doc, setDoc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db, auth, user } from './firebase/firebase.config';
import axios from 'axios';

function App() {
  let currentDate = new Date().toISOString().slice(0, 10);
  const [visits, setVisit] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [userIP, setUserIP] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user's IP address and add to state
  const fetchIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setUserIP(res.data.IPv4);
  };

  const fetchLocation = async () => {
    try {
      const res = await axios.get(`https://ipapi.co/${userIP}/json/`);
      setUserLocation(`${res.data.city}, ${res.data.region}, ${res.data.country_name}`);
    } catch (error) {
      console.log(error);
      setUserLocation('Unknown');
    }
  };


  useEffect(() => {
    fetchIP().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && userIP) {
      checkUserIP();
    }
  }, [loaded, userIP]);

  const checkUserIP = async () => {
    const visitorIPRef = collection(db, 'visitors');
    const q = query(visitorIPRef, where('ip', '==', userIP));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } else {
      const newVisitorIPRef = doc(db, 'visitors', userIP);
      await setDoc(newVisitorIPRef, {
        ip: userIP,
        firstVisit: currentDate,
        lastVisit: currentDate,
        visits: 1,
        location: userLocation
      });
      setUserData({
        ip: userIP,
        firstVisit: currentDate,
        lastVisit: currentDate,
        visits: 1,
        // location: userLocation
      });
    }

    fetchLocation();
  };

  const updateVisitor = async () => {
    const oldVisitorIPRef = doc(db, 'visitors', userIP);
    await setDoc(oldVisitorIPRef, {
      ip: userData.ip,
      firstVisit: userData.firstVisit,
      lastVisit: currentDate,
      visits: userData.visits + 1,
      location: userLocation
    });
  };

  useEffect(() => {
    if (userData !== null) {
      updateVisitor();
    }
  }, [userData]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
