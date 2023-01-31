



const MiniScreenLayout = ({
    children
}) => {
    const [top, botttom] = children;
    return (
        <div className="bg-gray-50 border-solid border-2 rounded-sm border-stone-300">
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