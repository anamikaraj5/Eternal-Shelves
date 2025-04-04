import {Router} from 'express'
import {authenticate} from '../Middleware/authenticate.js'
import { admincheck } from '../Middleware/admincheck.js'
import { books } from '../schemas/schema2.js'
import { upload } from '../Middleware/upload1.js'

const adminauth=Router()

const convertToBase64=(buffer)=>{
    return buffer.toString("base64")
}


//addbook
adminauth.post('/addbook',authenticate,upload.single('BookImage'),async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                const result = await books.findOne({bookid:BookId})  
    
                if(result)
                    {
                    
                        res.status(400).json({message:"Book already added!!!"})
                    }
                else
                    {

                        let imageBase64 = null
                        if(req.file)
                        {
                            imageBase64=`data:image/png;base64,${convertToBase64(req.file.buffer)}`
                        }
                
                        const newbook = new books(
                            {
                                
                                bookname:BookName,
                                bookid:BookId,
                                genre:Genre,
                                author:Author,
                                dates:Date,
                                description:Description,
                                image:imageBase64
                        
                            }
                        )
            
                        await newbook.save()
                        res.status(201).json({message:"Successfully added a Book!!!"})
              
                    }
            }
    
            else
           {
                res.status(401).json({message:"Unauthorized access"})
           }
        }
    
        
        catch
        {
            res.status(500).json({message:"Internal Server error"})
        }
        
        
      
    })

//viewbook    

adminauth.get('/viewbook',async(req,res)=>
    {
        try{
                const book_id=req.query.bookid 
                const result = await books.findOne({bookid:book_id})

                if(result)
                {
                    res.json(result)
                    console.log(result)
                
                }
                else
                {
                    res.status(400).json({message:"Book not Available!!!!"})
                }
            }
        catch
        {
            res.status(500).json({message:"Internal server error"})
        }
})
    

adminauth.get('/viewallbook',async(req,res)=>
    {
        try{
                const result = await books.find()
                if(result && result.length > 0)
                {
                    console.log(result)
                    res.json(result)
                    
                
                }
                else
                {
                    res.status(400).json({message:"Books not Available!!!!"})
                }
            }
        catch
        {
            res.status(500).json({message:"Internal server error"})
        }
})

//update

adminauth.put('/updatebook',authenticate,async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                const result = await books.findOne({bookid:BookId})
                if(result)
                    {
                        result.bookname=BookName,
                        result.genre=Genre,
                        result.author=Author,
                        result.dates=Date,
                        result.description=Description

                        await result.save()
                        res.status(200).json({message:"Updated successfully..."})
                    }
                else
                    {
                        res.status(400).json({message:"Book not found!!!"})
                    }
            }
            else
            {
                res.status(401).json({message:"Unauthorized access"})
            }
        }

        catch
        {
            res.status(500).json({message:"Internal server error"})
        }

})
    

//delete 

adminauth.delete('/deletebook',authenticate,admincheck,async(req,res)=>
{
    const bookid = req.query.bid

    
    const result=await books.findOne({bookid:bookid})
    if(result)
    {
        await books.findOneAndDelete({bookid:bookid})
        res.status(200).send("Book deleted.......")
    }
    else
    {
        res.status(404).send("Book not found!!!")
    }

})

export {adminauth}