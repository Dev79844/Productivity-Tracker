const Activity = require('../models/activity.models')

const getActivities = async (req,res) =>{
    try{
        const activities = await Activity.find({});
        res.status(200).json(activities)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const addActivity = async (req, res) => {
    const {name, time} = req.body
    try{
        const newActivity = await Activity.create({name, time});
        res.status(201).json(newActivity);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getActivities,
    addActivity,
}