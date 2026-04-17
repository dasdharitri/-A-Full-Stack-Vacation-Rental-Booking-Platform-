const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MAPTOKEN=process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAPTOKEN });



// module.exports.index=async(req,res)=>{
//     const allListings=await Listing.find({});
//     res.render("listings/index",{allListings});
//     };

module.exports.index = async (req, res) => {
    let { search, category } = req.query;

    let filter = {};

    // 🔍 Search logic
    if (search) {
        filter.$or = [
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
        ];
    }

    // 📂 Category filter
    if (category) {
    filter.$or = [
        ...(filter.$or || []),
        { title: { $regex: category, $options: "i" } },
        { location: { $regex: category, $options: "i" } }
    ];
}


    const allListings = await Listing.find(filter);

    res.render("listings/index", { allListings, search, category });
};

    module.exports.renderNewFrom=(req,res)=>{
        res.render("listings/new.ejs");
    };

    module.exports.showListing=async(req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"author",
            },
    
        })
        .populate("owner");
        if(!listing){
            req.flash("error","Listing you request for does not exist!");
            res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show.ejs",{listing});
       
    };

    module.exports.createListing = async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        // ✅ STEP 1: Check file FIRST
        if (!req.file) {
            req.flash("error", "Image upload failed!");
            return res.redirect("/listings/new");
        }

        // ✅ STEP 2: Mapbox (keep after check)
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();

        let url = req.file.path;
        let filename = req.file.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        if (response.body.features.length > 0) {
            newListing.geometry = response.body.features[0].geometry;
        } else {
            newListing.geometry = {
                type: "Point",
                coordinates: [77.1025, 28.7041]
            };
        }

        let savedListing = await newListing.save();
        console.log("✅ SAVED:", savedListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");

    } catch (err) {
        console.log("🔥 ERROR:", err);
        res.send("Error: " + err.message);
    }
};

 module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
     req.flash("error","Listing you request for does not exist!");
     res.redirect("/listings");
 }
    let originalImageurl=listing.image.url;
    originalImageurl=originalImageurl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageurl});
 };

 module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !=="undefined"){
    // let url=req.file.path;
    // let filename=req.file.filename;

    // ✅ Step 1: Check if image exists
if (!req.file) {
    req.flash("error", "Image upload failed!");
    return res.redirect("/listings/new");
}

// ✅ Step 2: Then use file safely
let url = req.file.path;
let filename = req.file.filename;

    listing.image={url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated!");
     res.redirect(`/listings/${id}`);
 };

 module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
 };


