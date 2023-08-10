import React from 'react';
import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom';


export default function Recipie({_id, name, complexity, thumbnail, createdAt, author}){
    return(
        <article className="singleRecipie">
           
            <div className="singleRecipie-image">
                <Link to={`/recipie/${_id}`}>
                <img src={'http://localhost:4000/'+thumbnail} alt="" />
                </Link>
            </div>
            <div className="singleRecipie-content">

                <h2><Link to={`/recipie/${_id}`}>{name} </Link></h2>
               
                <div className='singleRecipie-info'>
                <p className="author">{author.username}</p>
                    <time>{formatISO9075(new Date (createdAt))}</time>
                    <span>Complexity: {complexity} </span>
                </div>
                <Link to={`/recipie/${_id}`} className='btn'>See recipie</Link>
            </div>
        </article>
    )
}
