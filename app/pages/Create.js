
import React from 'react'

import {UserContext} from "../UserContext";
import {useContext, useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom"; 
import Image1 from "../assets/image1.jpg";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Create() { 
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  if (JSON.stringify(userInfo) === '{}') {
    // User is not authenticated, redirect them to the login page
    navigate("/login");
    return <Navigate to="/login" />;
  }
  

    const [name, setName] = useState("");
    const [complexity, setComplexity] = useState(0);
    const [ingredients, setIngredients] = useState("");
    const [files, SetFile] = useState('');
    const [content, setContent] = useState("");
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    };
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ];
  
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(ev){
      ev.preventDefault();
    
        // Validation checks
    if(!name.trim()) {
      alert("Please enter a recipe name");
      return;
    }
    if(!complexity || complexity < 1 || complexity > 5) {
      alert("Please enter a complexity rating between 1 and 5");
      return;
    }
    if(!ingredients.trim()) {
      alert("Please enter some ingredients for the recipe");
      return;
    }
    if(!files || !files[0]) {
      alert("Please select a thumbnail image for the recipe");
      return;
    }
    if(!content.trim()) {
      alert("Please enter some content for the recipe");
      return;
    }
      
      const data = new FormData;
      data.set('name', name);
      data.set('complexity', complexity);
      data.set('ingredients', ingredients);
      data.set('file', files[0]);
      data.set('content', content);
    
      const response = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      }
    }

    if(redirect) {
      return <Navigate to={'/allRecepies'} />
    }

  return (
    <div className='mainBody'>
        <h1 className='pageTitle'>Fill the form</h1>

        <div className='content-wrapper'>
         
        <form onSubmit={handleSubmit} className='leftSection'>
            <label>Enter name:
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>Enter complexity:
                <input 
                    type="number" 
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                />
            </label>
            <br />
            <label>Enter ingredients:
                <textarea 
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </label>
            <br />
           <label>Thumbnail:
              <input type="file" accept="image/*" capture="camera" onChange={ev => SetFile(ev.target.files) } />
            </label>
            <br />
            <label>Enter recipe:
              <ReactQuill 
              value={content} 
              modules={modules} 
              formats={formats} 
              onChange={newValue => setContent(newValue)} />
            </label>
            <input type="submit" className='btn' />
        </form>
        
        <div className='decorativeImage'>
        <img src={Image1} alt="Book with recipes" />
        </div>
         
        </div>
    </div>
  )
}

export default Create