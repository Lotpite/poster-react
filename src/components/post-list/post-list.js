import React from 'react';
import './post-list.css'
import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';


const PostList = ({posts, onDelete, onToggleImportant, OnToggleLike}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className="list-group-item">
                <PostListItem 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                OnToggleLike={() => OnToggleLike(id)}/>
            </li>
        )
    });
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;