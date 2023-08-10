import React from 'react';
import { useEffect, useState } from 'react';
import Recipie from "../components/Recipie";


function AllRecepies() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/recipes")
      .then(response => response.json())
      .then(data => setAllRecipes(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <div className='mainBody'>
    <h1 className='pageTitle'>List of all recipies</h1>
      {allRecipes.length > 0 && allRecipes.map(recipie => (
        <Recipie key={recipie._id} {...recipie} />
      ))}
    </div>
   
    </>
  );
}

export default AllRecepies;
