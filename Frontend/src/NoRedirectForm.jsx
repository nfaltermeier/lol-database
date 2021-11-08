import React from 'react';
import axios from 'axios';

class NoRedirectForm extends React.Component
{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.formRef = React.createRef();
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post(this.props.url, new FormData(e.target))
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <form ref={this.formRef} id={this.props.id} method={this.props.method} onSubmit={this.onSubmit}>
        {this.props.children}
        <input id="submit" type="submit" />
      </form>
    );
  }
}

export default NoRedirectForm;