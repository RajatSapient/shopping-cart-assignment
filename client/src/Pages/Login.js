import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom';
import loader from "../assets/images/loader.gif"
import visibility from "../assets/images/visibility.png"
import visibilityOpen from "../assets/images/visibilityopen.png"

const Login = () => {
    
    const initialValues = {userName:"",email:"",password:""}
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [loading,setLoading] = useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();


    useEffect(()=>{
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            navigate('/')
            console.log(formValues)
        }
    },[formErrors])


    const handleSubmitForm = (event) =>{
        event.preventDefault()
        console.log("I'm Clicked")
        setLoading(true)
        let formValidation =  validate(formValues)
        setTimeout(() =>{
            setLoading(false)
            setFormErrors(formValidation)
        },2000)
        setIsSubmit(true)
    }

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormValues({...formValues,[name]:value})
    }

    const validate = (values) =>{
         const errors ={}
         const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
         const regPswSpace = /\s/; // a string consisting only of non-whitespaces
         const regPswInt = /\d/;
         const regexPswAlphabets = /[a-zA-Z]/

         if(!values.userName){
             errors.userName = "Username is required *"
         }
         if(!values.email){
            errors.email = "Email is required *"
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid Email"

        }
        if(!values.password){
            errors.password = "Password is required *"
        }else if(values.password.length < 6){
            errors.password = "Password should be Greater than 6 characters"
        }else if(regPswSpace.test(values.password)){
            errors.password = "Password shouldn't contain spaces"
        } else if(!regPswInt.test(values.password)){
        errors.password = "Password should contain at least one integer"
         } else if(!regexPswAlphabets.test(values.password)){
            errors.password = "Password should contain at least one Alphabet"
             } 
        return errors
    }

    const handleVisibility = () =>{
        console.log("Clicked")
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
    

    return (<>
        <div className="ecomsignin">
    <div className="ecom-flex container ecom-align-items-center ecom-justify-content-between ecom-flexwrap-mob">
        <div className = "ecom-flex ecom-flex-direction-column ecomsignintext">
            <h2>Login</h2>
            <p className="ecomsignin-tagline">Get Access to Your Orders,Wishlist & Recommendations</p>
        </div>
        <div className="ecom-flex ecom-flex-direction-column ecom-flex-50 ecom-flex-100-mob">
            <form onSubmit={handleSubmitForm} className="ecom-flex ecom-flex-direction-column">
            <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" placeholder="Name" name="userName" value={formValues.userName}  onChange = {handleChange}/>
                    <label>Name</label>
                
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.userName}</p>
                </div>
                <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" placeholder="Email" name="email" value={formValues.email} onChange = {handleChange}/>
                    <label>Email</label>
                   
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.email}</p>
                </div>
            <div className="ecom-mb-20 ">
                <div className="field ecom-position-relative">
                <input type={passwordType} placeholder="Password" name="password" value={formValues.password} onChange = {handleChange}/>

                    <label>Password</label>   
                    { passwordType==="password" ? 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"> <img src={visibility} alt= "passwordEye" onClick={handleVisibility}/></div>: 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"><img src={visibilityOpen} alt= "passwordEye" onClick={handleVisibility}/></div>
                 }
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.password}</p>
 
              
            </div>    
                <button className="ecom-category-btn cursor-pointer" disabled = {loading}>
                    Login {loading && <img src ={loader} alt="loader" style={{width:"20px",marginLeft:"10px"}}/>}
                </button>
            </form>
        </div>
    </div>
</div>
    </>)
}

export default Login