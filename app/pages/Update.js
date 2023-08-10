import React from 'react'
import {useParams} from "react-router-dom";
import {UserContext} from "../UserContext";
import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";


import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Update() { 

  const { userInfo } = useContext(UserContext);

  if (JSON.stringify(userInfo) === '{}') {
    // User is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

    const {id} = useParams();
    const [name, setName] = useState("");
    const [complexity, setComplexity] = useState(0);
    const [ingredients, setIngredients] = useState("");
    const [files, SetFile] = useState('');
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/api/recipes/${id}`)
          .then(response => {
            response.json().then(recepieInfo => {
              setName(recepieInfo.name);
              setComplexity(recepieInfo.complexity);
              setIngredients(recepieInfo.ingredients);
              setContent(recepieInfo.content);
            });
          });
      }, []);

    

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


    async function handleUpdate(ev){
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
    if(!content.trim()) {
      alert("Please enter some content for the recipe");
      return;
    }
      
      const data = new FormData;
      data.set('name', name);
      data.set('complexity', complexity);
      data.set('ingredients', ingredients);
      if (files?.[0]) {
        data.set('file', files?.[0]);
      }
      data.set('content', content);
      data.set('id', id);
    
      const response = await fetch('http://localhost:4000/api/recipes', {
            method: 'PUT',
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
        <h1 className='pageTitle'>To update fill new information</h1>

        <div className='content-wrapper'>
         
        <form onSubmit={handleUpdate} className='leftSection'>
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
              <input type="file" onChange={ev => SetFile(ev.target.files) } />
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
         
        </div>
    </div>
  )
}

export default Update