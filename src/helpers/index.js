let getFecha=(time)=>{
    let fecha =new Date(time);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString("es-ES",options);
}

export {getFecha};