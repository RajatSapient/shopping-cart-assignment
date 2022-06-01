import React,{useState,useEffect} from "react"
import visibility from "../assets/images/visibility.png"
import visibilityOpen from "../assets/images/visibilityopen.png"
import {useNavigate} from 'react-router-dom';
import { useStateValue } from "../contexts/StateProvider"
import "../assets/css/sign-in.css"
import useFullPageLoader from "../hooks/useFullPage-Loader";



const Register = () => {

    const initialValues = {firstName:"",lastName:"",email:"",password:"",confirmPassword:""}
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const [cPasswordType, setCPasswordType] = useState("password");
    const [disabled,setDisabled] = useState(true)
    const navigate = useNavigate();
    const [{isLogin},dispatch] = useStateValue()
    const {firstName,lastName,email,password,confirmPassword} = formValues
    const [loader,showLoader,hideLoader] = useFullPageLoader()



    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            dispatch({
                type: 'LOGIN_DATA',
                payload: {
                    userName:firstName,
                    isLoggedIn: true    
                }
            })
            showLoader()
            setTimeout(() => {
                hideLoader()
                navigate('/')                   
            }, 3000);
        }
    },[formErrors])


    useEffect(()=>{
    
    if(firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '' ){
        setDisabled(true)
        return
    }else{
        setDisabled(false)
    }
    },[formValues])

    const handleSubmitForm = (event) =>{
        event.preventDefault()
        let formValidation =  validate(formValues)
        setFormErrors(formValidation)
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

         if(!values.firstName){
             errors.firstName = "Firstname is required *"
         }
         if(!values.lastName){
            errors.lastName = "Lastname is required *"
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
        if(!values.confirmPassword){
            errors.confirmPassword = "Confirm Password is required *"
        }else if(!(values.password === values.confirmPassword)){
            errors.confirmPassword ="Password & Confirm Password should be same"
        }
        return errors
    }

    const handleVisibility = (event) =>{
        event.preventDefault()
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

      const handleCVisibility = (event) =>{
          event.preventDefault()
        if(cPasswordType==="password")
        {
         setCPasswordType("text")
         return;
        }
        setCPasswordType("password")
      }  

      

    return (<>
        <div className="ecomsignin">
    <div className="ecom-flex container ecom-align-items-center ecom-justify-content-between ecom-flexwrap-mob">
        <div className = "ecom-flex ecom-flex-direction-column ecomsignintext">
            <h2>Register</h2>
            <p className="ecomsignin-tagline">Get Access to Your Orders,Wishlist & Recommendations</p>
        </div>
        <div className="ecom-flex ecom-flex-direction-column ecom-flex-50 ecom-flex-100-mob">
            <form className="ecom-flex ecom-flex-direction-column">
            <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" id="firstName" placeholder="Name" name="firstName" value={firstName}  onChange = {handleChange}/>
                    <label htmlFor= "firstName">First Name</label>
                
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.firstName}</p>
            </div>
            <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" id="lastName" placeholder="Name" name="lastName" value={lastName}  onChange = {handleChange}/>
                    <label htmlFor="lastName">Last Name</label>
                
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.lastName}</p>
            </div>
                <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" id="email" placeholder="Email" name="email" value={email} onChange = {handleChange}/>
                    <label htmlFor= "email">Email</label>
                   
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.email}</p>
                </div>
            <div className="ecom-mb-20 ">
                <div className="field ecom-position-relative">
                <input type={passwordType} id="password" placeholder="Password" name="password" value={password} onChange = {handleChange}/>
                    <label htmlFor="password">Password</label> 
                    { passwordType==="password" ? 
                     <button className="ecom-position-absolute ecom-eye-positioning cursor-pointer" onClick={handleVisibility}> 
                        <img src={visibility} alt= "passwordEye" />
                     </button>: 
                     <button className="ecom-position-absolute ecom-eye-positioning cursor-pointer" onClick={handleVisibility}>
                         <img src={visibilityOpen} alt= "passwordEye" />
                    </button>
                 }  
                </div>

                <p className="ecom-primary-color ecom-errormsg">{formErrors.password}</p>
            </div>  
            <div className="ecom-mb-20 ">
                <div className="field ecom-position-relative">
                <input type={cPasswordType} id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange = {handleChange}/>
                    <label htmlFor ="confirmPassword">Confirm Password</label> 
                    { cPasswordType === "password" ? 
                     <button className="ecom-position-absolute ecom-eye-positioning cursor-pointer"  onClick={handleCVisibility}> 
                        <img src={visibility} alt= "passwordEye"/>
                     </button>: 
                     <button className="ecom-position-absolute ecom-eye-positioning cursor-pointer"  onClick={handleCVisibility}>
                         <img src={visibilityOpen} alt= "passwordEye"/>
                    </button>
                 }  
                </div>

                <p className="ecom-primary-color ecom-errormsg">{formErrors.confirmPassword}</p>
            </div>    
            <button type="submit" onClick={handleSubmitForm} className="ecom-category-btn cursor-pointer" disabled = {disabled}>
                    SignUp 
                </button>
            </form>
        </div>
    </div>
    {loader}
</div>
    </>)
}

export default Register