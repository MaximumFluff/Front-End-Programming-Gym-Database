import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Trainings extends Component {

  constructor(props) {
    super(props)
    this.state = { trainings: [] }
  }

  componentDidMount() {
    this.loadTrainings();
  }

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

  render() {
    return (
      <div>
        <h1 className="display-1">Trainings</h1>
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
                  accessor: "date"
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
                } 
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