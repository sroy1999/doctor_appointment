const Doctor = require('../model/doctorModel.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { uploadImage } = require('../config/imageStorage.js');
const jwt = require('jsonwebtoken');

 // Add doctors
 const addDoctors = async(req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success:false, message:"Please fill out the fields"});
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email id"});
        }
        if(password.length < 10) {
            return res.status(400).json({ success: false, message: "Password must be atleat 10 characters long"});
        }
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const isPresent = await Doctor.findOne({email});
        if(isPresent) {
            return res.status(400).json({ success: false, message: "Doctor already present"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
        const imageUrl = await uploadImage(imageFile);
        console.log(imageUrl);
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        }
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();
        res.status(200).json({ success:true, message: "Doctor added successfully"});
    } catch (err) {
        res.status(400).json({ success: false, message: "Doctor could not be added"});
    }
 }

 // admin login
 const adminLogin = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ success:false, message:"Please fill out the fields"});
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
            res.status(200).json({ success: true, token});
        } else {
            return res.status(400).json({ success: false, message: "Email or password is incorrect"});
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message});
    }
 }

 module.exports = { addDoctors, adminLogin };