import React from 'react';
import '../css/booksList.css';

class BooksList extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          books: []
        };
     
        this.getBooks = this.getBooks.bind(this);
        this.getBookByIdClick = this.getBookByIdClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    componentDidMount() {        
        if(localStorage.getItem("booksUserToken") != null){
            localStorage.removeItem("booksUserToken");
        }

        this.getBooks();
    }

    getBooks() {
        let url = 'http://localhost:64195/api/books';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                debugger;
                this.setState({
                    books: res
                });
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    getBookByIdClick(item) {
        debugger
        let url = `http://localhost:64195/api/books/${item.id}`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                debugger;
                let x = 1;
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    handleDeleteClick(item) {
        debugger

        let booksUserToken = localStorage.getItem("booksUserToken");

        if(booksUserToken == null){
            alert('Click login');
            return;
        }

        let url = `http://localhost:64195/api/books/${item.id}`;
        fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${booksUserToken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                debugger;
                //this.getBooks();
                let newBooks = this.state.books.filter(item => item.id !== res.id)
                this.setState({
                    books: newBooks
                });
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    handleLoginClick() {
        debugger
        let url = `http://localhost:64195/api/Account/Login`;
        let user = {};
        user.Username = 'aaa';
        user.Password = '123';

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                  },
             })
            .then(res => res.json())
            .then(res => {
                debugger;
                localStorage.setItem("booksUserToken", res.token);
            }            
            ).catch(function(error) {
                alert('error ' + error);
            });
    }

    render(){
        const booksList = this.state.books.map(item => 
            <tr key={item.id}>
                <td>
                    <a href='javascript:void(0);' onClick={() => this.getBookByIdClick(item)}>{item.id}</a>
                </td>
                <td>{item.name}</td>
                <td>Edit</td>
                <td>
                    <button onClick={() => this.handleDeleteClick(item)}>
                        Delete
                    </button>
                </td>
            </tr>)

        return (
            <div className="BooksList">
                <div className="Login">
                    <button onClick={this.handleLoginClick}>
                        Login
                    </button>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    { booksList }
                </table>
            </div>
        );
    }
}

export default BooksList;