import { useState }from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext }  from '../../hooks/useAuthContext';


export const ProjectComments = () => {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { photoURL, displayName} = user;  

    const handleSubmit = async e => {
        e.preventDefault();
        // Creamos una constante para representar el comentario que deseamos añadir
        const commentToAdd = {
            displayName,
            photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        console.log(commentToAdd); 
    }
  return (
    <div className='project-comments'>
        <h4>Comments</h4>

        <form className='add-comment' onSubmit={handleSubmit}>
            <label>
                <span>Add New Comment:</span>
                <textarea required onChange={e => setNewComment(e.target.value)} value={newComment}/>
            </label>
            <button className='btn'>Add Comment</button>
        </form>
    </div>
  )
}
