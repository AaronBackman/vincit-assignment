import React from "react";

class DateRangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateFromStr: "", dateToStr: "" };

    this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDateFrom(e) {
    this.setState({ dateFromStr: e.target.value });
  }

  handleChangeDateTo(e) {
    this.setState({ dateToStr: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.setDateRange(
      new Date(this.state.dateFromStr),
      new Date(this.state.dateToStr)
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.dateFromStr}
            onChange={this.handleChangeDateFrom}
          />
          <input
            type="text"
            value={this.state.dateToStr}
            onChange={this.handleChangeDateTo}
          />
          <input type="submit" value="Ok" />
        </form>
      </div>
    );
  }
}

export default DateRangeInput;
