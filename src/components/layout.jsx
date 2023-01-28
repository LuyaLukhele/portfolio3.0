


const SplitScreenLayout = ({
    children
}) => {
    const [leftside, rightside] = children;
    return (
        <div className="display: flex m-20">
            <div className="basis-2/3 pr-10">
                {leftside}
            </div>
            <div className="basis-1/3">
                {rightside}
            </div>
        </div>
    );
}

export default SplitScreenLayout