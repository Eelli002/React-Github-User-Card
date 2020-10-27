import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    users:[],
    username:''
  }

  componentDidMount() {
    this.fetchUsers('eelli002')
  }

  fetchUsers = (username) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        this.setState({
          dogs:response.data.message
        })
      })
      .catch(error => console.log(error))
  };

  handleChange = (event) => {
    this.setState({ username:event.target.value })
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.fetchUsers(this.state.username);
    this.setState({ username:'' });
  }

  render() {
    return (
      <div className='App'>
        <h1>Search GitHub Users</h1>
        <form onSubmit={this.handleSearch}>
          <input value={this.state.username} onChange={this.handleChange} type='text' placeholder='Search by Github Username'/>
          <button>Fetch User</button>
        </form>
        <div className='userContainer'>
          {
            this.state.users.map(item => (<img width="200" key={item} src={item} alt={item}/>))
          }
        </div>
      </div>
    )
  }
}

export default App;
