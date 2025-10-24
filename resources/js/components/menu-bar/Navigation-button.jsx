import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavigationButton(props) {
    const { icon, onClick, className, id } = props;

    return (
        <div className="indicator ">
            <span className="indicator-item indicator-start badge py-3 bg-red-tertiary   rounded-lg">
                {id}
            </span>
            <button
                onClick={onClick}
                className={`btn rounded-xl px-3 py-6 bg-linear-65 from-red-500 from-10% to-red-secondary to-90%`}
            >
                <FontAwesomeIcon icon={icon} className={className} />
            </button>
        </div>
    );
}
