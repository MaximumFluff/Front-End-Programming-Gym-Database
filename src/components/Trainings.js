import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import Skylight from "react-skylight";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Trainings extends Component {

  constructor(props) {
    super(props)
    this.state = { trainings: [], customers: [], date: "", duration: "", customer: "", activity: "" }
  }

  componentDidMount() {
    this.loadTrainings();
    this.loadCustomers();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((resJson) => {
        for (let i = 0; i < resJson.content.length; i++) {
          let newObject = {
            name: `${resJson.content[i].firstname} ${resJson.content[i].lastname}`,
            link: resJson.content[i].links[0].href
          }
          this.setState({
            customers: [...this.state.customers, newObject]
          })
        }
        // Set default option for select menu
        this.setState({
          customer: this.state.customers[0].link
        })
      })
      .catch((err) => {
        console.error("Some bullshit happened! " + err);
      });
  };

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          trainings: resJson
        })
        console.log("Data loaded!", this.state.trainings)
      })
      .catch(err => {
        console.warn("Computer machine broke: ", err)
      })
  }

  addTrainings = () => {
    const newTraining = {
      date: this.state.date,
      activity: this.state.activity,
      duration: this.state.duration,
      customer: this.state.customer
    }
    console.log(newTraining)
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
    .then(() => {
      this.loadTrainings();
      toast.success("Training added!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    })
    .catch(err => {
      console.error("Error!", err)
    })
  }

  deleteTrainings = value => {
    console.log(value)
    fetch(`https://customerrest.herokuapp.com/api/trainings/${value}`, { method: "DELETE" })
      .then(() => {
        this.loadTrainings();
        toast.success("Training deleted!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.addTrainings();
    this.simpleDialog.hide();
  }

  render() {
    return (
      <div>
        <h1 className="display-1">Trainings</h1>
        <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add training to customer</button>
        <Skylight
          ref={ref => (this.simpleDialog = ref)}
          hideOnOverlayClicked
          title="Add Customer">
          <input className="form-group"
            placeholder="Activity"
            type="text"
            className="form-control"
            name="activity"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Date"
            type="text"
            className="form-control"
            name="date"
            onChange={this.onChange}
          />
          <input className="form-group"
            placeholder="Duration"
            type="text"
            className="form-control"
            name="duration"
            onChange={this.onChange}
          />
          <select onChange={this.onChange} name="customer">
            {this.state.customers.map((item, key) => (
              <option value={item.link} key={key}>{item.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        </Skylight>
        <ToastContainer />
        <ReactTable
          data={this.state.trainings}
          columns={[
            {
              columns: [
                {
                  Header: "Activity",
                  accessor: "activity"
                },
                {
                  Header: "Duration",
                  accessor: "duration"
                },
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "First Name",
                  accessor: "customer.firstname"
                },
                {
                  Header: "Last name",
                  accessor: "customer.lastname"
                },
                {
                  Header: "Address",
                  accessor: "customer.streetaddress"
                },
                {
                  Header: "Postal Code",
                  accessor: "customer.postcode"
                },
                {
                  Header: "City",
                  accessor: "customer.city"
                },
                {
                  Header: "E-mail",
                  accessor: "customer.email"
                },
                {
                  Header: "Phone number",
                  accessor: "customer.phone"
                },
                {
                  Header: "Delete",
                  accessor: "id",
                  filterable: false,
                  sortable: false,
                  Cell: ({ value }) => (
                    <button className="btn btn-primary"
                      onClick={() => this.deleteTrainings(value)}>
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

export default Trainings;