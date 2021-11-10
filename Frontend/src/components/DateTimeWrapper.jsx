import classNames from 'classnames';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import './DateTimeWrapper.scss';

export default function DateTimeWrapper(props) {
  const { className, ...otherProps } = props;
  return <DateTime className={classNames('datetime-wrapper', className)} {...otherProps} />;
}
