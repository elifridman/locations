import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteLocationItem } from '../../actions/locationsAction';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Logo from '../../images/loc.png';
import MapIcon from '../../images/maps-icon.png'
import InfoIcon from '../../images/info.png'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown } from 'reactstrap';

class ActionsBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  render(){
    const {title, showMap, showInfo, actions} = this.props.actionsBar;
    const isSelected = this.props.isSelected;
    const actionTextAdd = actions[0].text;
    const actionLinkAdd = actions[0].link;
    const actionTextEdit = actions[1].text;
    const eventType = actions[1].eventType;
    const actionTextDelete = actions[2].text;
    const eventTypeDelete = actions[2].eventType;


const { match, location, history } = this.props;
const selectedLocationId = Object.keys(this.props.selectedLocation)[0];
    const onEdit = () =>{

      if(eventType ==="locations-edit"){

          history.push('/locations/edit')
      }
    }
    const onDelete = ()=>{
      if(eventTypeDelete === 'locations-delete'){

        this.props.deleteLocationItem(selectedLocationId);
        history.push('/locations')
      }

    }

    const renderMapIcon = () =>{
      return(
        <NavItem>
          <NavLink href="/components/">
            <img src={MapIcon} width="30" height="30" className="d-inline-block align-top" alt=""/>
          </NavLink>
        </NavItem>
      )
    }

    const renderInfoIcon = () =>{
      return(
        <NavItem>
          <NavLink tag={Link} to={"/locations/"+selectedLocationId}>
              <img src={InfoIcon} width="30" height="30" className="d-inline-block align-top" alt=""/>
          </NavLink>
        </NavItem>
      )
    }
    return(

      <div className="actions-bar ">
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand href="/">
              {title}
            </NavbarBrand>
              <Nav className="ml-auto" >
                {title === "Locations"&&isSelected? renderMapIcon(): ''}
                {title === "Locations"&&isSelected? renderInfoIcon(): ''}

                <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret color="info">
                    Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem ><Link to={actionLinkAdd}>{actionTextAdd}</Link></DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onEdit} disabled ={!isSelected} >{actionTextEdit}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onDelete} disabled={!isSelected}>{actionTextDelete}</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Nav>


            </div>
        </Navbar>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return{
    selectedLocation: state.locations.selectedLocation,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    deleteLocationItem: (id) => dispatch(deleteLocationItem(id)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActionsBar));
