import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavigationButton(props) {
    const { icon, onClick, className, id, buttonColor } = props;

    return (
        <div className="indicator ">
            <span className="indicator-item indicator-start badge py-3 bg-orange-primary text-white rounded-lg">
                {id}
            </span>
            <button
                onClick={onClick}
                className={` btn rounded-xl px-3 py-6 bg-${buttonColor}`}
            >
                <FontAwesomeIcon icon={icon} className={className} />
            </button>
        </div>
    );
}
