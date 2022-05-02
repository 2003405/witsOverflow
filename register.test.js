/*const supertest = require('supertest'); 
const request = require('express');
const register = require('./register.js');

describe("POST /", () => {

    describe("given email, username, password", () => {
        //insert email, username and password into db
        test("return 200 status code to show success", () => {
            const response =  request(register).post("/").send({
                username: "username",
                email: "email",
                password: "password",
            })
            expect(response.statusCode).toBe(200)
        })
    })

    describe("missing email, username, password", () => {
        //return 400 status code to show failure
    })

})*/