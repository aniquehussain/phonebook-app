import axios from "axios";


//  axios.interceptors.request.use((config)=>{
//     const {origin} = new URL(config.url);
//     const allowedOrigins = ['http://localhost:5000'];
  
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization
//     }
//   },(error)=>{

//   })

const setAuthToken = (token)=>{
    token ? axios.defaults.headers.common['x-auth-token'] = token : delete axios.defaults.headers.common['x-auth-token']
}

export default setAuthToken;