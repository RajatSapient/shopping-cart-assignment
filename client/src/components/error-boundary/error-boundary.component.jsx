import React from "react"
import somethingWrong from "../../assets/images/somethingWrong.gif"

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {hasError: false};
    }   

    static getDerivedStateFromError(error){
        // Update state so the next render will show the fallback UI.
        return {hasError: true}; 
    }

    componentDidCatch(error,errorInfo){
        // You can also log the error to an Error reporting service
        console.log(error,errorInfo)
    }

    render(){
        if(this.state.hasError){
            //You can  render any custom Fallback UI
            return (
                <div className="ecom-flex ecom-align-items-center ecom-justify-content-center" style={{marginTop:"150px",marginBottom:"50px"}}>
                    <img src={somethingWrong} alt="Something Went Wrong" />
                </div>
            );
        }

        return this.props.children;
        
    }
}

export default ErrorBoundary;