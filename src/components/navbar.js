import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';

import facLogo from '../../public/fac-logo.png';
import { Title, Error } from './styledComponents';

const Nav = styled.header`
  width:100%;
  height:10%;
  background:whitesmoke;
  box-shadow:inset 0 -1px 1px grey;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 1rem;
`;

const Home = styled(Link)`
  width: 4rem;
  height: 4rem;
  box-shadow: 0 1px 1px grey;
  border-radius: 50%;
  display:flex;
  align-items:center;
  justify-content:center;
  background: skyBlue;
  text-decoration: none;
  color: black;
  &:hover{
    box-shadow: 0 2px 4px grey;
  }
`;

const Logo = styled.img`
  width:4rem;
  height:5rem;
`;

const Select = styled.select`
  width: 20%;
  height: 100%;
  border: none;
  box-shadow: 0 1px 1px grey;
`;

const facs = [
  'FAC10',
  'FAC9',
  'FAC8',
  'FAC7',
  'FAC6',
  'FAC5',
  'FAC4',
  'FAC3',
  'FAC2',
  'FAC1',
];

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const fac = event.target.value;
    const facsUrl = `https://api.github.com/orgs/${fac}/members`;
    fetch(facsUrl)
      .then(res => res.json())
      .then(parsedRes => {
        //TODO need to do oauth to get access to private members lists
        this.props.showFAC(parsedRes);
        this.setState({ value: fac });
        this.props.redirect();
      })
      .catch(err => (err ? <Error>Something Went Wrong...</Error> : ''));
  }

  render() {
    return (
      <Nav>
        <Logo src={facLogo} alt="fac logo" />
        <Title>All OF FAC</Title>
        <Home to="/"> Home </Home>
        <Select
          onClick={this.onClick}
          value={this.state.value}
          onChange={this.handleChange}
        >
          {facs.map(fac => <option key={uuid()}>{fac}</option>)}
        </Select>
      </Nav>
    );
  }
}

export default Navbar;
