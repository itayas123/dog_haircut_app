import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    email: "",
    name: "",
    date_time: "",
    hour_time: ""
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const nItem = {
      email: this.state.email,
      name: this.state.name,
      date_time: this.state.date_time,
      hour_time: this.state.hour_time
    };

    this.props.addItem(nItem);
    this.toggle();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      this.state.email = user.name;
    }
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add dog
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Waiting List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Dog</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="dog's name"
                  onChange={this.onChange}
                />
                <Input
                  type="date"
                  name="date_time"
                  id="item"
                  onChange={this.onChange}
                />
                <Input
                  type="time"
                  name="hour_time"
                  id="item"
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
  { addItem }
)(ItemModal);
