import React,{useState} from 'react'
import FullPageLoader from '../components/full-page-loading-spinner/full-page-loading-spinner.component'

const useFullPageLoader = () => {
  const [loading,setLoading] = useState(false)
    return [
        loading ? <FullPageLoader/> : null,
        () => setLoading(true), //Show Loader
        () => setLoading(false) //Hide Loader
    ];
};

export default useFullPageLoader