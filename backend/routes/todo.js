var compression = require('compression')
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const verifyToken = require("../utils/verifyToken");
const cuser = require("../models/user");
const clist = require('../models/list');

router.use(compression())


router.get('/todo-stats-left', verifyToken, async (req, res) => {


    //Check If user Exists
    const id = req.userId;
    if (!id) {
        return res.json({
            status: 422,
            message: "Missing User ID"
        });
    }
    cuser.findById(id, async (err, user) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Server Error"
            });
        }
        if (!user) {
            return res.json({
                status: 401,
                message: "User Not found"
            });
        }

        const c1 = await clist.find({
            user: id,
            isCompleted: false,
            isDeleted: false
        });
        return res.json({
            status: 200,
            c1: c1
        });

    });
});

router.get('/todo-stats-compl', verifyToken, async (req, res) => {


    //Check If user Exists
    const id = req.userId;
    if (!id) {
        return res.json({
            status: 422,
            message: "Missing User ID"
        });
    }
    cuser.findById(id, async (err, user) => {
        if (err) {
            return res.json({
                status: 500,
                message: "Server Error"
            });
        }
        if (!user) {
            return res.json({
                status: 401,
                message: "User Not found"
            });
        }

        const c1 = await clist.find({
            user: id,
            isCompleted: true,
            isDeleted: false
        });
        return res.json({
            status: 200,
            c1: c1
        });

    });
});

//Route To add New List
router.post('/list-add', verifyToken, async (req, res) => {


    //Check if user exists
    const id = req.userId;
    if (!id) {
        return res.json({
            status: 422,
            message: "Missing User ID"
        });
    }
    const User = await cuser.findById(id);
    if (!User) {
        return res.json({
            status: 404,
            message: "User not found"
        });
    }


     console.log(req.body.message);
    const l = new clist({
        Message: req.body.message,
        user: id
    });

    await l.save(err => {
        if (err) {
            return res.json({
                status: 500,
                message: "Internal server error"
            });
        }
        return res.json({
            status: 200,
            message: "List added Sucessfully",


        });
    })
});

router.post('/list-completed', async (req, res) => {


    //Check and Assign Battery to Device
    await clist.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            isCompleted: true
        }
    }, {
        new: true
    }).then((result) => {
        if (result) {
            return res.json({
                status: 200,
                message: " successfully Changed"
            });
        }
        if (!result) {
            return res.json({
                status: 404,
                message: "Error in changing the todo"
            });
        }
    }).catch((err) => {
        res.status(400).send(err);
    });
});


router.post('/list-deleted', async (req, res) => {


    //Check and Assign Battery to Device
    await clist.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            isDeleted: true
        }
    }, {
        new: true
    }).then((result) => {
        if (result) {
            return res.json({
                status: 200,
                message: " successfully Deleted"
            });
        }
        if (!result) {
            return res.json({
                status: 404,
                message: "Error in changing the todo"
            });
        }
    }).catch((err) => {
        res.status(400).send(err);
    });
});
module.exports = router;