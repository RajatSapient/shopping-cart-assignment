import axios from "axios";

const api = "http://localhost:3000";


export const getBanner = async() => {
  try {
    const resp = await axios.get(`${api}/banners`);
    if (resp.status === 200) {
      return resp.data;
    } 
    console.log('something went wrong');
  } catch (error) {
    console.log("Unable to fetch product's list", error);
  }
};


export const getProductList = async() => {
  try {
    const resp = await axios.get(`${api}/products`);
    if (resp.status === 200) {
      return resp.data;
    } 
    console.log('something went wrong');
  } catch (error) {
    console.log("Unable to fetch product's list", error);
  }
};

export const getCategoryData = async() => {
    try {
      const resp = await axios.get(`${api}/categories`);
      if (resp.status === 200) {
        return resp.data;
      } 
      console.log('something went wrong');
    } catch (error) {
      console.log("Unable to fetch product's category", error);
    }
  };

  export const proceedToCheckout = async() => {
    try {
      const resp = await axios.post(`${api}/addToCart`);
      if (resp.status === 200) {
        return resp.data;
      } 
      console.log('something went wrong');
    } catch (error) {
      console.log("Unable to fetch product's category", error);
    }

  };



