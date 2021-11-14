import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames/bind';
import styles from './NoRedirectForm.module.scss';

const NoRedirectForm = (props) => {
	const [state, setState] = useState({ isLoading: true, isErrored: false });
	const onSubmit = (e) => {
		e.preventDefault();
		setState({ isLoading: true, isErrored: true });

		Promise.all([axios.post(props.url, new FormData(e.target)), new Promise(resolve => setTimeout(() => resolve(), 125))])
			.then(() => { setState({ isLoading: false, isErrored: false }); })
			.catch((err) => {
				console.log(err);
				setState({ isLoading: false, isErrored: true });
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
			{!state.isLoading && (state.isErrored ? <span className={cx('errored')}>X</span> : <span className={cx('succeded')}>✔</span>)}
		</form>
	);
};

export default NoRedirectForm;