import React from 'react';
import '../css/mainContent.css';

class MainContent extends React.Component {
    componentDidMount() {
        let url = 'http://localhost:64195/api/books';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                debugger;
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    render(){
        return (
            <div className="MainContent">
                MainContent
            </div>
        );
    }
}

export default MainContent;