const {token}=JSON.parse(localStorage.getItem('token'));
const url=`http://68.183.27.173:8080`;
// let {userOnline}=JSON.parse(localStorage.getItem('userOnline'));

let params = new URLSearchParams(location.search);
const headers={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`,
} 



export {token,params,headers,url};