import uploadOnClodinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct=async(req,res)=>{
    try{

    const { title, brand, model, year, mileage, fuelType, transmission, engineSize,
      bodyType, color, price, location, condition, description, stockNumber, status } = req.body

    // Validate required fields
    if (!title || !brand || !model || !price) {
        return res.status(400).json({message: 'Missing required fields: title, brand, model, and price are required'})
    }

    const images = []
    
    // Debug: Check if files were received
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: 'No files received. Please upload at least one image.'})
    }

    // Process each uploaded file
    for (const key in req.files) {
        const file = req.files[key]?.[0]
        if (file?.path) {
          try {
            const uploaded = await uploadOnClodinary(file.path)
            if (uploaded) {
                images.push(uploaded)
            } else {
                // Upload returned null - Cloudinary upload failed
                throw new Error(`Failed to upload ${key} to Cloudinary`)
            }
          } catch (uploadError) {
            // If Cloudinary config is missing, throw immediately
            if (uploadError.message?.includes('Cloudinary configuration is missing')) {
                return res.status(500).json({
                    message: uploadError.message
                })
            }
            // For other errors, continue with other images but track the error
            // Don't fail entire request if one image fails
          }
        }
    }

    // Validate at least one image was uploaded successfully
    if (images.length === 0) {
        return res.status(400).json({
            message: 'Failed to upload images. Please check Cloudinary configuration (CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) and try again.'
        })
    }

    const productData = {
      title,
      brand,
      model,
      year: Number(year),
      mileage: Number(mileage),
      fuelType,
      transmission,
      engineSize,
      bodyType,
      color,
      price: Number(price),
      location,
      condition,
      description,
      images,
      stockNumber,
      status
    }

    const product = await Product.create(productData)

    return res.status(201).json(product)


    }catch(error){
         return res.status(500).json({
             message: `Product adding error: ${error.message || error}`,
             error: process.env.NODE_ENVIRONMENT === 'development' ? error.stack : undefined
         })
    }

}

//Since we are getting all the products in List.jsx in frontend. So we need to find all those product using Product.find(). This will return all the products which were being added 
export const listProduct= async (req,res)=> {
  try{
    const {
      brand,
      model,
      status,
      fuelType,
      transmission,
      bodyType,
      condition,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      search,
      page = 1,
      limit = 12,
      sort = 'createdAt',
      order = 'desc'
    } = req.query

    const filter = {}
    if (brand) filter.brand = new RegExp(`^${brand}$`, 'i')
    if (model) filter.model = new RegExp(model, 'i')
    if (status) filter.status = status
    if (fuelType) filter.fuelType = fuelType
    if (transmission) filter.transmission = transmission
    if (bodyType) filter.bodyType = bodyType
    if (condition) filter.condition = condition
    if (minYear || maxYear) filter.year = {}
    if (minYear) filter.year.$gte = Number(minYear)
    if (maxYear) filter.year.$lte = Number(maxYear)
    if (minPrice || maxPrice) filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
    if (minMileage || maxMileage) filter.mileage = {}
    if (minMileage) filter.mileage.$gte = Number(minMileage)
    if (maxMileage) filter.mileage.$lte = Number(maxMileage)
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') }
      ]
    }

    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
    const skip = (pageNum - 1) * limitNum

    const sortField = ['price','year','mileage','createdAt'].includes(String(sort)) ? String(sort) : 'createdAt'
    const sortOrder = String(order).toLowerCase() === 'asc' ? 1 : -1

    const [items, total] = await Promise.all([
      Product.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limitNum),
      Product.countDocuments(filter)
    ])

    return res.status(200).json({
      data: items,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    })

  }catch(error){

    return res.status(500).json({message:`ListProduct error ${error}`})

  }
}

export const removeProduct=async(req,res)=>{
  try{

    let {id}=req.params

    let product=await Product.findByIdAndDelete(id)

    return res.status(200).json("You have successfully  deleted the list ")

  }catch(error){

    return res.status(500).json( `Deleting Product error ${error}`)

  }
}

export const updateProduct=async(req,res)=>{
  try{

    let {id}=req.params

    const { title, brand, model, year, mileage, fuelType, transmission, engineSize,
      bodyType, color, price, location, condition, description, stockNumber, status } = req.body

      {/*Here we are adding logic. that image should be updated only if user provides Otherwise previous image  will be shown*/}

      let image1;
      let image2;
      let image3;
      let image4;

      if(req.files.image1)
      {
        image1=await uploadOnClodinary(req.files.image1[0].path)
      }

      if(req.files.image2)
      {
        image2=await uploadOnClodinary(req.files.image2[0].path)
      }
      
      if(req.files.image3)
      {
        image3=await uploadOnClodinary(req.files.image3[0].path)
      }
      
      if(req.files.image4)
      {
        image4=await uploadOnClodinary(req.files.image4[0].path)
      }
      
      const update = {
        title,
        brand,
        model,
        year: year !== undefined ? Number(year) : undefined,
        mileage: mileage !== undefined ? Number(mileage) : undefined,
        fuelType,
        transmission,
        engineSize,
        bodyType,
        color,
        price: price !== undefined ? Number(price) : undefined,
        location,
        condition,
        description,
        stockNumber,
        status
      }

      const images = []
      if(image1) images.push(image1)
      if(image2) images.push(image2)
      if(image3) images.push(image3)
      if(image4) images.push(image4)
      if(images.length) update.images = images

      let product = await Product.findByIdAndUpdate(id, update, {new:true})

      return res.status(201).json(product)

  }catch(error){

    return res.status(500).json( `Updatong Product error ${error}`)
  }
}