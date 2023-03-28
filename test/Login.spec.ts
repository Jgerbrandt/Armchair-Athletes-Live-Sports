/* test/sum.js */
import 'mocha';
import { LoginService } from '../client/src/app/login-service';
//import { apiController } from '../client/src/app/apiController/apiController';
import { User } from '../client/src/app/user';

//const { before } = require('node:test'); 


//var sum = require('../login-service.ts');
var expect = require('chai').expect;
var expect = require('mocha').expect;


describe('#favoriteTeams()', function() {
  let login: LoginService;
  let myUser: User;
  this.beforeEach(function() {
      //Login
      login = new LoginService();
      myUser =
      {username: "user",
        password: "pass",
        email: "email@email.com",
        _id: "2"}
      login.login(myUser)
  });

  
  context('without arguments', function() {
    it('should return 0', function() {
      expect(login.getUser()).to.equal(myUser);
    })
  })
})