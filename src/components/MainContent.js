import React from 'react';
import '../css/mainContent.css';
import BooksList from './BooksList';

class MainContent extends React.Component {
    render(){
        return (
            <div className="MainContent">
                <BooksList />
            </div>
        );
    }
}

export default MainContent;