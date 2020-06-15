import React from 'react';
import '../css/booksList.css';

class BooksList extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          books: []
        };
     
        this.getBooks = this.getBooks.bind(this);
    }

    componentDidMount() {        
        this.getBooks();
    }

    getBooks() {
        let url = 'http://localhost:64195/api/books';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                //debugger;
                this.setState({
                    books: res
                });
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    render(){
        const booksList = this.state.books.map(item => <div key={item.id}>{item.name}</div>)

        return (
            <div className="BooksList">
                { booksList }
            </div>
        );
    }
}

export default BooksList;