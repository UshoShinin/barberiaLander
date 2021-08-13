export const formatDate = (date)=>{
    const normalDate = date.slice(0,10);
    const year =normalDate.slice(0,4);
    const mes = normalDate.slice(5,7);
    const dia = normalDate.slice(8,10);
    const nuevaFecha = new Date(`${mes}-${dia}-${year}`)
    /* console.log(year);
    console.log(mes);
    console.log(dia); */
    return nuevaFecha;
}
export const deFormatDate = (date) =>{

}