import './LabelImage.scss';
import defaultImage from '../resources/default.png';

export default function LabelImage(props) {
    const { message, imgUrl } = props;

    return (
        <div className="labelImageContainer">
            <img src={imgUrl || defaultImage} onError={(e)=>{e.target.onError = null; e.target.src = defaultImage; }} alt={message}/>

            <label>{message}</label>
        </div>
    );
}

export { defaultImage };