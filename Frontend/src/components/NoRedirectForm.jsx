import React from 'react';
import axios from 'axios';
import classnames from 'classnames/bind';
import styles from './NoRedirectForm.module.scss';

const NoRedirectForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();

    axios.post(props.url, new FormData(e.target))
    .catch((err) => {
      console.log(err);
    });
  };

  const cx = classnames.bind(styles);
  return (
    <form
      className={cx('no-redirect-form')}
      id={props.id}
      method={props.method}
      onSubmit={onSubmit}
    >
      {props.children}
      <input id="submit" type="submit" />
    </form>
  );
};

export default NoRedirectForm;