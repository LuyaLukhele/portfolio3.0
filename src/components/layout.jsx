


const SplitScreenLayout = ({
    children
}) => {
    const [leftside, rightside] = children;
    return (
        <div className="m-2 flex flex-col-reverse sm:flex sm:flex-row sm:m-20">
            <div className="basis-2/3 pr-2 sm:pr-10">
                {leftside}
            </div>
            <div className="basis-1/3">
                {rightside}
            </div>
        </div>
    );
}

export default SplitScreenLayout