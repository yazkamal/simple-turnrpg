import React from 'react'
import { useNavigate } from 'react-router-dom';
import { chapters } from '../data/chapters';

export default function Chapters() {
    const navigate = useNavigate();

    const selectChapter = (id) => {
      navigate(`/battle/${id}`);
    };
  
    return (
      <div>
        <h2>Select Chapter</h2>
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <button onClick={() => selectChapter(chapter.id)}>Start</button>
          </div>
        ))}
      </div>
    );
}
