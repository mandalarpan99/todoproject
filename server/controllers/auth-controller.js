const express = require('express');
const registerData = require('../model/user-model');
const postData = require('../model/userpost-model');
const { model } = require('mongoose');



const register = async (req, res)=>{
    try {
        //console.log(req.body)
        const {name, email, phone, password} = req.body;
        const userExists = await registerData.findOne({email:email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const data = await registerData.create({name,email,phone,password});
        res.status(200).json({
            message:"Registration successful",
            token: await data.generateToken(),
            userId: data._id.toString()
    });

    } catch (error) {
        res.status(400).json({message:"Server error"})
    }
}

const login = async (req, res)=>{
    try {
        //console.log(req.body)
        const { email, password} = req.body;
        const userExists = await registerData.findOne({email});
        if(!userExists){
            console.log("User are not exists")
            return res.status(400).json({message:"User are not exists"});
        }
        const data = await userExists.comparePassword(password);
        //console.log(data)
        if(data){
            res.status(200).json({
                message:"Login successful", 
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            });
        }else{
            res.status(400).json({message:"Invalid credentials"})
        }
        

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Server error"})
    }
}

const user = async (req, res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        //res.status(200).json({msg:"Hi user"})
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user route ${error}`);
    }
}



const userPost =async (req, res)=>{
    try {
        //console.log(req.body)
        const { custid, title, post} = req.body;
        const data = postData.create({custid, title, post});
        //console.log(data)
        if(data){
            res.status(200).json({
                message:"Data insert successful", 
                
            });
        }else{
            res.status(400).json({message:"Data insert unsuccessful"})
        }
    } catch (error) {
        console.log({"Error from user post": error})
    }
}

const viewuserPost = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}


module.exports = {register, login, user, userPost, viewuserPost};