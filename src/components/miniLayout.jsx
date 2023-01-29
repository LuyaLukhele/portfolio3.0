



const MiniScreenLayout = ({
    children
}) => {
    const [top, botttom] = children;
    return (
        <div>
            <div>
                {top}
            </div>
            <div>
                {botttom}
            </div>
        </div>
    );
}

export default MiniScreenLayout