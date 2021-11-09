import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from './DataLoader.module.scss';

export default function DataLoader(props) {
  const [retries, setRetries] = useState(0);
  const { action, setState } = props;
  useEffect(() => {
    action().then((data) => setState({ isLoading: false, isErrored: false, data }))
      .catch((e) => {
        console.error(e);
        setState({ isLoading: false, isErrored: true, data: null });
      });
      // Will cause infinite loading if action is not memoized
  }, [retries, setState, action]);

  if (props.state.isErrored) {
    return (
      <div>
        The request failed.
        <button onClick={() => setRetries(retries + 1)}>Try Again</button>
      </div>
    );
  }

  const cx = classNames.bind(styles);
  let overlay = null;
  if (props.state.isLoading) {
    overlay = (
      <div className={cx('loading')}>
        <div>
          Loading
          <div className={cx('spin-eternally')}>h</div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {overlay}
      {props.children}
    </React.Fragment>
  );
};
