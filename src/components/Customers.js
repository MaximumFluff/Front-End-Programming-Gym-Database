import React, { Component } from "react";
import ReactTable from "react-table";
import Skylight from "react-skylight";
import "react-table/react-table.css";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: "" };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          customers: resJson.content
        });
        console.log("Data loaded succesfully!");
      })
      .catch((err) => {
        console.error("Some bullshit happened! " + err);
      });
  };

  addCustomer = () => {
    const newCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    }
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(() => {
        this.loadCustomers();
        toast.success("Customer added!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      })
  }

  deleteCustomer = value => {
    console.log(value)
    fetch(value, { method: "DELETE" })
      .then(() => {
        this.loadCustomers();
        toast.success("Customer deleted!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      })
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.addCustomer();
    this.simpleDialog.hide();
  }

  render() {
    return (
      <div>
        <h1 className="display-1">Customers</h1>
        <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add customer</button>
        <Skylight
          ref={ref => (this.simpleDialog = ref)}
          hideOnOverlayClicked
          title="Add Customer">
          <input className="form-group"
            placeholder="First name"
            type="text"
            className="form-control"
            name="firstname"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Last name"
            type="text"
            className="form-control"
            name="lastname"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Address"
            type="text"
            className="form-control"
            name="streetaddress"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Postcode"
            type="text"
            className="form-control"
            name="postcode"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="City"
            type="text"
            className="form-control"
            name="city"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="E-mail"
            type="text"
            className="form-control"
            name="email"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Phone"
            type="text"
            className="form-control"
            name="phone"
            onChange={this.onChange}
          />
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        </Skylight>
        <ToastContainer />
        <ReactTable
          data={this.state.customers}
          columns={[
            {
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstname"
                },
                {
                  Header: "Last Name",
                  accessor: "lastname"
                },
                {
                  Header: "Street Address",
                  accessor: "streetaddress"
                },
                {
                  Header: "Postcode",
                  accessor: "postcode"
                },
                {
                  Header: "City",
                  accessor: "city"
                },
                {
                  Header: "E-Mail",
                  accessor: "email"
                },
                {
                  Header: "Phone number",
                  accessor: "phone"
                },
                {
                  Header: "Delete",
                  accessor: "links[0].href",
                  filterable: false,
                  sortable: false,
                  Cell: ({ value }) => (
                    <button className="btn btn-primary"
                      onClick={() => this.deleteCustomer(value)}>
                      Delete
                    </button>
                  )
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable
        />
      </div>
    );
  }
}

export default Customers;
