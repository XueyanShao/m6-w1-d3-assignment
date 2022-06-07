import React, { Component } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './Navbar';


class InventoryEdit extends Component {
  emptyInventory = {
    id: '',
    title: '',
    author: '',
    status: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyInventory
    }
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const booklist = 
        await (await fetch(`/api/booklist/${this.props.match.params.id}`)).json();
      this.setState({item: booklist})
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/booklist', {
      method: (item._id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/inventories');
  }

  render() {
    const {item} = this.state;
    const title =
      <h2 className="mt-3">
        {item._id ? 'Edit Book' : 'Add Book'}
      </h2>;
      return(
        <div>
          <AppNavbar />
          <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label
                  for="title"
                  className="h5 mt-2"
                >
                  Book Title
                </Label>
                <Input 
                  type="text"
                  name="title"
                  id="title"
                  value={item.title || ''}
                  onChange={this.handleChange}
                  autoComplete="title"
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="author"
                  className="h5 mt-2"
                >
                  Author
                </Label>
                <Input 
                  type="text"
                  name="author"
                  id="author"
                  value={item.author || ''}
                  onChange={this.handleChange}
                  autoComplete="author"
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="status"
                  className="h5 mt-2"
                >
                  Status
                </Label>
                <Input 
                  type="text"
                  name="status"
                  id="status"
                  value={item.status || ''}
                  onChange={this.handleChange}
                  autoComplete="status"
                />
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className="mt-3"
                >
                  Save
                </Button> {' '}
                <Button
                  color="secondary"
                  className="mt-3"
                  tag={Link} to="/inventories"
                >
                  Cancel
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
      )
  }
}

export default InventoryEdit;