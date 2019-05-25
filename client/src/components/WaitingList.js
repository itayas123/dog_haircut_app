import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, EditItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import { mongo } from "mongoose";
import axios from "axios";

class WaitingList extends Component {
  state = {
    modal: false,
    name: "",
    date_time: "",
    id: ""
  };
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  toggle = (id, name, date_time) => {
    this.setState({
      modal: !this.state.modal,
      name: name,
      date_time: date_time,
      id: id
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onEditClick = e => {
    e.preventDefault();

    const item = {
      name: this.state.name,
      date_time: this.state.date_time,
      _id: this.state.id
    };
    this.props.EditItem(this.state.id, item);
    this.setState({ modal: !this.state.modal });
  };
  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <Container>
          <ListGroup>
            <TransitionGroup className="waiting-list">
              {items.map(({ _id, name, date_time, hour_time, email }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {isAuthenticated && email === user.name ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                    {isAuthenticated && email === user.name ? (
                      <Button
                        className="edit-btn"
                        color="warning"
                        size="sm"
                        style={{ marginRight: "2rem" }}
                        onClick={this.toggle.bind(this, _id, name, date_time)}
                      >
                        &hellip;
                      </Button>
                    ) : null}
                    {"name: " +
                      name +
                      " date:" +
                      date_time +
                      " time:" +
                      hour_time}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onEditClick}>
              <FormGroup>
                <Label for="item">Dog</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder={this.state.name}
                  onChange={this.onChange}
                />
                <Input
                  type="datetime-local"
                  name="date_time"
                  id="item"
                  placeholder={this.state.date_time}
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add dog
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem, EditItem }
)(WaitingList);
