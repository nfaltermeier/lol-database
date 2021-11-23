import classNames from "classnames/bind";
import styles from './TeamRanking.module.scss';

export default function TeamRanking(props) {
	const cx = classNames.bind(styles);
	return (
		<div className={cx('wrapper')}>
			<p>{props.rank}. {props.name}</p>
			<p>Wins: {props.wins}</p>
			<p>Losses: {props.losses}</p>
			<p>Ratio: {props.winLossRatio.toFixed(2)}%</p>
		</div>
	);
};
