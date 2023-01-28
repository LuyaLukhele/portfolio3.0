
import '/home/luyanda/Documents/Personal/portfolio3.0/src/style/main.css'

const SplitScreenLayout = ({
    children
}) => {
    const [leftside, rightside] = children;
    return (
        <div className="main-container">
            <div>
                {leftside}
            </div>
            <div>
                {rightside}
            </div>
        </div>
    );
}

export default SplitScreenLayout