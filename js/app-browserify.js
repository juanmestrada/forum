// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")

var Promise = require('es6-promise').Promise
import Backbone from 'backbone'
import $ from 'jquery'
import React, {Component} from 'react'

function test(){
	return console.log("Javascript is working!");
}
test()

/*jQuery Events*/
$(window).resize(function(){
var width = $(window).width();
if(width >= 801){
/* Code for big screen */
$('document').ready(function() {
	
});
}
else if(width >= 800){
/* Code for medium screen */
}
else if (width<= 480){
/* Code for small screen */
$('document').ready(function() {

});
}
});




/* React */

var NavBar = React.createClass({
	render: function() {
		return (
			<div>
			<header>
        <ul>
            <li className="menu"></li>
            <li className="profile"></li>
            <li className="forum-title">Title</li>
            <li className="notifications"></li>
        </ul>

        <form>
            <input type="search" placeholder="search"></input>
        </form>
    </header>
    </div>
		)
	}
})
 
var ForumColumn = React.createClass({
	render: function() {
		return (
			<div className="forum-column">
                <div className="user-picture"><img src="http://www.adtechnology.co.uk/images/UGM-default-user.png" /></div>
                <div className="forum-question">
                	<h3><a href="#" className="question-title">Forum Question</a></h3> 	
                
                	<p>Forum question info Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            	</div>
            	<ul className="forum-replies">
            		<li>Replies:<a href="#">10</a></li>
            		<li>Views:<a href="#">10</a></li>
            	</ul>
            	<ul className="last-post">
            		<li>author</li>
            		<li>date</li>
            	</ul>
            </div>
		)
	}
});


var ForumContainer = React.createClass({
	render: function() {
		return (
			<div>
			<NavBar></NavBar>
			 <div className="container">	 
    	<div className="page-location"><span>Home > Page location</span></div>
    	<div className="new-thread"> + New Thread</div>
    	<div className="forum-container">
    		<div className="colum-header"><h6>Title/ Question</h6><span>Replies</span><span>Last Post by</span> </div>
            <ForumColumn></ForumColumn>
            <ForumColumn></ForumColumn>
            <ForumColumn></ForumColumn>
            <ForumColumn></ForumColumn>
        </div>


        <div className="user-earnings-wrapper">
            <h6>Seller Earnings</h6>
            <div className="seller-earnings">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOpzej-tNCbt4HpDtscG03tj12DAIEflcW6r40p8es2gqGviT4LS1-Xa3" />
                <p className="user">Userfjdfnfddcd@yahoo.com</p><span>Earned:</span><p className="user-amount">$<span>100</span></p>

            </div>
        </div>
    </div>
    </div>
		)
	}
})


var Login = React.createClass({
	render: function(){
		return (
			
			<div className="login-wrapper">
			<h5>Log In</h5>
	    		<form>	
	    			<input type="email" placeholder="email"></input>
	    			<input type="password" placeholder="password"></input>
	    			<input type="submit" value="Log In"></input>
	    		</form>
    		</div>
    		
		)
	}
})

/*React.render(<Login></Login>, document.body);*/



/* Router */
var ForumRouter = Backbone.Router.extend ({
	routes: {
		
		'home' : 'ForumContainer',
		'*default': 'Login'
	}, 
	ForumContainer: function() {
		React.render(<ForumContainer></ForumContainer>, document.body);
	},
	Login: function() {
		React.render(<Login></Login>, document.body);
	},

	initialize: function() {
		Backbone.history.start();
	}

});


var router = new ForumRouter();
