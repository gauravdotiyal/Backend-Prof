// a wrapper func for reuse everywhere for promises
const asyncHandler=(requestHandler)=>{
   (req,res,next)=>{
      Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
   }
};

export {asyncHandler};

// const asyncHandler =(func)=>{()=>{}} 
// above line can also be written in some different WebAssembly
// const asyncHandler =(fn)=> asyc()=>{}

// a wrapper function to reuse everywhere for try catch
// const asyncHandler=(fun)=> async(req,res,next)=> {
//    try {
//      await fun(req,res,next);
//    } catch (error) {
//     res.status(error.code || 500).json
//     ({
//         success:true, 
//         message:error.message
//     })
//    }
// } 
