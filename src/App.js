import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ButtonToolbar,
  Card,
  Container,
  Col,
  Row,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
// import Container from 'react-bootstrap/Container';

const pets = [
  {
    name: "Boa",
    type: "snake",
    price: 4.99,
    image:
      "https://cbs6albany.com/resources/media/9ca35d2c-5b7a-4e20-94f7-2468e43d45a5-large16x9_MGN_1280x720_70728P00FGOCY.jpg?1563547573398"
  },
  {
    name: "Teo",
    type: "dog",
    price: 98,
    image: "https://images.dog.ceo/breeds/pug/n02110958_1975.jpg"
  },
  {
    name: "Joey",
    type: "dog",
    price: 120,
    image: "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_6129.jpg"
  }
];

function Pet({ image, price, name }) {
  return (
    <Col xs={4}>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Filters({ currentFilter, onChange }) {
  return (
    <ButtonToolbar className="mr-4">
      <ToggleButtonGroup
        type="radio"
        name="filters"
        value={currentFilter}
        onChange={onChange}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="dog">Dogs</ToggleButton>
        <ToggleButton value="cat">Cats</ToggleButton>
        <ToggleButton value="snake">Snakes</ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
  );
}

function SortingOptions({ currentSortBy, onChange }) {
  return (
    <ButtonToolbar>
      <ToggleButtonGroup
        type="radio"
        name="sorting-keys"
        value={currentSortBy}
        onChange={onChange}
      >
        <ToggleButton value="name">Name</ToggleButton>
        <ToggleButton value="price">Price</ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
  );
}

class App extends React.Component {
  state = {
    pets: pets,
    // Should be: pets: [] for an API

    filter: "all",
    sortBy: "name",

    // Only when using an API
    isLoading: false
  };

  componentDidMount() {
    // fetch("")
    //   .then(response => response.json())
    //   .then(response => {
    //     this.setState({
    //       pets: response.data.map((pet) => {
    //         return {
    //           name: pet.pet_name,
    //           price: pet.pet_price,
    //         };
    //       }),
    //       isLoading: false
    //     });
    //   });
  }

  filterPets = (pets, filter) => {
    if (filter === "all") {
      return pets;
    } else {
      return pets.filter(pet => pet.type === filter);
    }
  };

  sortPets = (pets, sortBy) => {
    return pets.sort(function compare(a, b) {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }

      if (a[sortBy] > b[sortBy]) {
        return 1;
      }

      return 0;
    });
  };

  onChangeFilter = filter => {
    this.setState({ filter: filter });
  };

  onChangeSortBy = sortBy => {
    this.setState({ sortBy: sortBy });
  };

  render() {
    const pets = this.sortPets(
      this.filterPets(this.state.pets, this.state.filter),
      this.state.sortBy
    );

    return (
      <div className="App m-4">
        <h1 className="mb-4">Dogs and Cats and SNAKES</h1>

        <Container>
          <Row className="mb-4">
            <Filters
              currentFilter={this.state.filter}
              onChange={this.onChangeFilter}
            />

            <SortingOptions
              currentSortBy={this.state.sortBy}
              onChange={this.onChangeSortBy}
            />
          </Row>

          <Row>
            {this.state.isLoading
              ? "Loading"
              : pets.map(pet => (
                  <Pet
                    key={pet.name}
                    name={pet.name}
                    image={pet.image}
                    price={pet.price}
                  />
                ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
