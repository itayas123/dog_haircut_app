import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { deleteItem, EditItem, getItems } from "../actions/itemActions";

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
      email: this.props.auth.user.email,
      name: this.state.name,
      date_time: this.state.date_time.slice(0, 10),
      hour_time: this.state.date_time.slice(11),
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
                    {isAuthenticated && email === user.email ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                    {isAuthenticated && email === user.email ? (
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
                      "    date:" +
                      date_time.slice(0, 10) +
                      "    time:" +
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
export default connect(mapStateToProps, { getItems, deleteItem, EditItem })(
  WaitingList
);
