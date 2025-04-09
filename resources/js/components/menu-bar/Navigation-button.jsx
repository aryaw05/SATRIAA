export default function NavigationButton(props) {
    const { icon, id, onClick } = props;

    return (
        <div className="indicator">
            <span className="indicator-item indicator-start badge badge-secondary rounded-lg">
                {id}
            </span>
            <button onClick={onClick} className="btn px-2 py-3" id={id}>
                <img src={icon} alt="" className="w-2/4" />
            </button>
        </div>
    );
}
