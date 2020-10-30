var compression = require('compression')
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    check,
    validationResult
} = require("express-validator");
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const cuser = require("../models/user");
const verifyToken = require("../utils/verifyToken");
router.use(compression())

router.post('/register',
    (req, res, next) => {


        cuser.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: "Error on the server"
                });
            } else if (user) {
                return res.json({
                    status: 415,
                    message: "User already exits"
                });
            }
            next();
        });
    },
    (req, res) => {
        //continue registration
        let username = req.body.username.toString().trim();
        if (username && req.body.password) {

            bcrypt.hash(req.body.password, 8, (err, hashedPassword) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Internal server error"
                    });
                }

                cuser.create({
                        username: username,
                        password: hashedPassword,
                    },
                    (err, user) => {
                        if (err) {
                            return res.json({
                                status: 500,
                                message: "Something went wrong while registering the user, please try again"
                            });
                        }

                        let token = jwt.sign({
                            id: user._id
                        }, "todo", {
                            expiresIn: 86400
                        });
                        res.json({
                            status: 200,
                            isVerified: false,
                            message: "Sucessfully registered",
                            token: token
                        });

                    }
                );
            });
        } else {
            res.json({
                status: 400,
                message: "Missing required value"
            });
        }
    }


);


router.post(
    "/login",
    (req, res) => {
        let username = req.body.username.toString().trim();
        if (username && req.body.password) {
            cuser.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    return res.json({
                        status: 500,
                        message: "Internal server error"
                    });
                } else if (!user) {
                    return res.json({
                        status: 404,
                        message: "No such user exists"
                    });
                } else {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            return res.json({
                                status: 500,
                                message: "Internal server error"
                            });
                        }
                        if (result) {
                            let token = jwt.sign({
                                id: user._id
                            }, "todo", {
                                expiresIn: 86400
                            });
                            // isVerified
                            if (user.isVerified) {
                                return res.json({
                                    status: 200,
                                    isVerified: true,
                                    token: token,
                                    message: "Login Sucessfull",
                                    isAdmin: user.isAdmin
                                });
                            }
                        } else {
                            return res.json({
                                status: 401,
                                message: "Incorrect Email or Password"
                            });
                        }
                    });
                }
            });
        } else {
            return res.json({
                status: 404,
                message: "Missing required details"
            });
        }
    }
);

router.post("/logout", (req, res) => {
    return res.json({
        status: 200,
        token: ""
    });
});
module.exports = router;