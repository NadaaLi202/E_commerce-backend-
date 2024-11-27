
export  const validation = (schema) => {

    return (req,res,next) => {
        let inputs = {...req.body,...req.params,...req.query}
        let {error} = schema.validate(inputs,{abortEarly : false})
        console.log(error);
        if(!error){
            next()
        }else{
            res.status(400).json({message : error.details.map((err) => err.message)})
        }
    }
}