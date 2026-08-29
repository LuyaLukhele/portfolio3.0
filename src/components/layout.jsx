


const SplitScreenLayout = ({
    children
}) => {
    const [leftside, rightside] = children;
    return (
        <div className="w-full h-[80vh] p-2 flex flex-col-reverse lg:flex-row lg:p-10 lg:p-20">
            <div className="flex-1 min-h-0 flex flex-col overflow-y-auto lg:basis-2/3 lg:h-full pr-2 lg:pr-10">
                <div className="w-full lg:m-auto">{leftside}</div>
            </div>
            <div className="shrink-0 flex flex-col lg:basis-1/3 lg:h-full lg:overflow-y-auto">
                <div className="m-auto w-full">{rightside}</div>
            </div>
        </div>
    );
}

export default SplitScreenLayout