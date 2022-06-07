import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklists: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/booklists')
      .then(response => response.json())
      .then(data => this.setState({booklists: data, isLoading: false}));
  }

  removeInv = async (id) => {
    await fetch(`/api/booklists/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log("Remove Done!");
    //update inventory state minus removed item
    let updatedBooklists =
      [...this.state.booklists].filter(i => i._id !== id);
      this.setState({booklists: updatedBooklists});
  }

  render() {
    const {booklists, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>
    }

    const inventoryList = booklists.map(booklist => {
      return <tr key={booklist._id}>
        <td style={{whiteSpace: 'nowrap'}}>{booklist.title}</td>
        <td>{booklist.author}</td>
        <td>{booklist.status}</td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="info"
              tag={Link}
              to={"/inventories/" + booklist._id}  
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="warning"
              onClick={() => this.removeInv(booklist._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return(
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button
              color="success"
              className="my-4"
              tag={Link}
              to="/inventories/new"
            >
              Add Book
            </Button>
          </div>
          <h3>Book List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Book Title</th>
                <th width="15%">Author</th>
                <th width="15%">Status</th>
                <th width="15%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default InventoryList;