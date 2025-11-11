import multer from "multer"


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      //temporary stores files in public folder
        cb(null,"./public")

    },
    filename:(req,file,cb)=>{

        //keeing the originalfilename

        cb(null,Date.now()+file.originalname)
    }
})

/*
multer({ storage });
✅ What it does — in plain English:
You're calling the multer() function, and you're giving it a configuration object.

This object has a key called storage, and you're assigning it a value (storage) which is your custom file saving logic defined earlier.



🔧 Breaking it down:
1. multer(...) — This is the main function
It creates a middleware that can handle file uploads in multipart/form-data.

You give it options like:
multer({
  storage: ...,       // where and how files are stored
  limits: ...,        // (optional) limit file size
  fileFilter: ...,    // (optional) accept/reject certain file types
})



2. { storage } — This is JavaScript object shorthand
If you do this:

const storage = multer.diskStorage({ ... });
multer({ storage });


This is the same as:
multer({ storage: storage });
It’s a clean, short way to say:

"Use this storage object as the value of the storage property in the options I’m passing to Multer."


🔁 Then what is upload?
It’s a fully configured middleware, exported like this:

export const upload = multer({ storage });


You can now use it in routes:
router.post("/add", upload.single("image"), controllerFunction);

Or:

upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 }
])

 */

export const upload=multer({storage})