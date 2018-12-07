import * as moment from 'moment';

const getFecha=(time)=>{
    let fecha =new Date(time);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString("es-ES",options);
}
const getFechaMoment=(time)=>{
    let localI18N=window.navigator.language||navigator.browserLanguage;
    return moment(time).locale(localI18N).format("LLL");
}

const userFind=(user,userId)=>{
    return (user.find(value=>value.userId===userId))
}

const usersOnline=JSON.parse(localStorage.getItem('userOnline'));

export {getFecha,getFechaMoment,userFind,usersOnline};