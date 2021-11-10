import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from './DataLoader.module.scss';

export default function DataLoader(props) {
  const [retries, setRetries] = useState(0);
  const { actions, setState } = props;
  useEffect(() => {
    setState({ isLoading: true, isErrored: false, data: null });
    const promises = actions.map(a => a.fn().then(data => ({ key: a.key, data })));
    Promise.all(promises).then((data) => {
      const out = {};
      data.forEach(d => {
        out[d.key] = d.data;
      });
      setState({ isLoading: false, isErrored: false, data: out });
    })
    .catch((e) => {
      console.error(e);
      setState({ isLoading: false, isErrored: true, data: null });
    });
      // Will cause infinite loading if actions is not memoized
  }, [retries, setState, actions]);

  if (props.state.isErrored) {
    return (
      <div>
        <div>The request failed.</div>
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
          <div className={cx('spin-eternally')}>•</div>
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
