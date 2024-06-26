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



const userPost =async (req, res, next)=>{
    res.send("OK")
    try {
        const custid = req.body.custid;
        const title = req.body.title;
        const post = req.body.post;
        const filename = req.file.filename;
        console.log(req.file)
        //const { custid, title, post} = req.body;
        console.log(custid)
        const data = postData.create({custid:custid, title:title, file:filename, post:post});
        console.log(data)
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

        console.log(req.userID);
        const userId = req.userID;
        const data = await postData.find({custid: userId});
        res.status(200).json(data)
    } catch (error) {
        console.log({"Error from the view post": error})
        res.status(404).json({message:error})
    }
}



const deleteById = async (req, res)=>{
    try {
        const id = req.params.id;
        const idExists = await postData.findOne({_id: id});
        if(!idExists){
            res.status(404).json({message: "Post is not available!"})
        }
        await postData.deleteOne({_id:id})
        res.status(200).json({message:"Post deleted successfilly"});
    } catch (error) {
        next(error);
    }
}


const getPostById = async (req, res)=>{
    try {
        const id = req.params.id;
        const idExists = await postData.findOne({_id: id});
        if(!idExists){
            res.status(404).json({message: "Post is not available!"})
        }
        const data = await postData.findOne({_id:id})
        res.status(200).json(data);
    } catch (error) {
        //next(error)
        console.log({"Error from user post": error})
    }
}

const editPostById = async (req, res)=>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updateData = await postData.updateOne({_id:id},{
            $set: updatedData,
        })
        res.status(200).json(updateData);
    } catch (error) {
        console.log({"Error from user post": error})
    }
}


module.exports = {register, login, user, userPost, viewuserPost, deleteById, getPostById, editPostById};