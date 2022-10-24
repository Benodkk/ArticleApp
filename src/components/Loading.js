import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

function Loading() {
    return(
        <div className="loading">
            <div>Waiting for the data </div>
            <Spinner /> 
        </div>  
    )
}

export default Loading