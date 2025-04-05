export default function NavigationButton(props) {
    const { icon, id, onClick } = props;

    return (
        <div>
            <button onClick={onClick} className="btn" id={id}>
                {icon}
            </button>
        </div>
    );
}
