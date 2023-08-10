import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import {Navigate} from "react-router-dom";

export default function OneRecepie() {
  const [recepieInfo,setRecepieInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/recipes/${id}`)
      .then(response => {
        response.json().then(recepieInfo => {
          setRecepieInfo(recepieInfo);
        });
      });
  }, []);

  async function handleDelete(ev){
    ev.preventDefault();
    const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        }
  }

  if(redirect) {
    return <Navigate to={'/allRecepies'} />
  }

  if (!recepieInfo) return '';

  return (
    <div className='mainBody'>
      <div className="post">
        
    <div className="post-content">
        <div className="post-content-header">
          <div className="post-controls">
          {userInfo.id === recepieInfo.author._id && (
                <Link className="btn" to={`/update/${recepieInfo._id}`}>
                    Edit this post
                </Link>
            )}
          {userInfo.id === recepieInfo.author._id && (
            <button className="btn" onClick={handleDelete}>
                Delete this post
            </button>
          )}
          </div>
       
        <h1 className='pageTitle'>{recepieInfo.name}</h1>
          
        </div>
    
    
          <div className='singleRecipie-info'>
            <p className="author">{recepieInfo.author.username}</p>
            <time>{formatISO9075(new Date (recepieInfo.createdAt))}</time>
            <span>Complexity: {recepieInfo.complexity} </span>
          </div>
          <div>
            <h2>Ingredients:</h2>
            <div>
            {recepieInfo.ingredients}
            </div>
          </div>
          
          <div>
          <h2>Recipie:</h2>
          <div className="content" dangerouslySetInnerHTML={{__html:recepieInfo.content}} />
          </div>
        </div>
        <div className="post-image">
            <img src={`http://localhost:4000/${recepieInfo.thumbnail}`} alt=""/>
        </div>
        
      </div>
    </div>

  );
}