import React,{useState,useEffect} from "react"
import visibility from "../assets/images/visibility.png"
import visibilityOpen from "../assets/images/visibilityopen.png"


const Register = () => {

    const initialValues = {firstName:"",lastName:"",email:"",password:"",confirmPassword:""}
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [passwordType, setPasswordType] = useState("password");
    const [cPasswordType, setCPasswordType] = useState("password");


    const handleSubmitForm = (event) =>{
        event.preventDefault()
        console.log("I'm Clicked")
        let formValidation =  validate(formValues)
        setFormErrors(formValidation)
        // if(formValidation.hasOwnProperty("userName") || formValidation.hasOwnProperty("email") || formValidation.hasOwnProperty("password")){
        //     return
        // }
        // setTimeout(() =>{
        //     navigate('/')
        // },2000)
        setIsSubmit(true)
    }

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    },[formErrors])

    const handleChange = (e) =>{
        console.log(e.target)
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

    const handleVisibility = () =>{
        console.log("Clicked")
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

      const handleCVisibility = () =>{
        console.log("Clicked")
        if(cPasswordType==="password")
        {
         setCPasswordType("text")
         return;
        }
        setCPasswordType("password")
      }  

      

    return (<>
        <div className="ecomsignin">
    <div className="ecom-flex container ecom-align-items-center ecom-justify-content-between">
        <div className = "ecom-flex ecom-flex-direction-column ecomsignintext">
            <h2>Register</h2>
            <p className="ecomsignin-tagline">Get Access to Your Orders,Wishlist & Recommendations</p>
        </div>
        <div className="ecom-flex ecom-flex-direction-column ecom-flex-50">
            <form onSubmit={handleSubmitForm} className="ecom-flex ecom-flex-direction-column">
            <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" placeholder="Name" name="firstName" value={formValues.firstName}  onChange = {handleChange}/>
                    <label>First Name</label>
                
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.firstName}</p>
            </div>
            <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" placeholder="Name" name="lastName" value={formValues.lastName}  onChange = {handleChange}/>
                    <label>Last Name</label>
                
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.lastName}</p>
            </div>
                <div className="ecom-mb-20">
                <div className="field">
                    <input type="text" placeholder="Email" name="email" value={formValues.email} onChange = {handleChange}/>
                    <label>Email</label>
                   
                </div>
                <p className="ecom-primary-color ecom-errormsg">{formErrors.email}</p>
                </div>
            <div className="ecom-mb-20 ecom-position-relative">
                <div className="field">
                <input type={passwordType} placeholder="Password" name="password" value={formValues.password} onChange = {handleChange}/>
                    <label>Password</label>   
                </div>
                { passwordType==="password" ? 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"> <img src={visibility} alt= "passwordEye" onClick={handleVisibility}/></div>: 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"><img src={visibilityOpen} alt= "passwordEye" onClick={handleVisibility}/></div>
                 }
                <p className="ecom-primary-color ecom-errormsg">{formErrors.password}</p>
            </div>  
            <div className="ecom-mb-20 ecom-position-relative">
                <div className="field">
                <input type={cPasswordType}  placeholder="Confirm Password" name="confirmPassword" value={formValues.confirmPassword} onChange = {handleChange}/>
                    <label>Confirm Password</label>   
                </div>
                { cPasswordType === "password" ? 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"> <img src={visibility} alt= "passwordEye" onClick={handleCVisibility}/></div>: 
                     <div className="ecom-position-absolute ecom-eye-positioning cursor-pointer"><img src={visibilityOpen} alt= "passwordEye" onClick={handleCVisibility}/></div>
                 }
                <p className="ecom-primary-color ecom-errormsg">{formErrors.confirmPassword}</p>
            </div>    
                <button className="ecom-category-btn cursor-pointer">SignUp</button>
            </form>
        </div>
    </div>
</div>
    </>)
}

export default Register