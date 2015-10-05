// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")

var Promise = require('es6-promise').Promise

import $ from 'jquery'
import Backbone from 'backbone'
import React, {Component} from 'react'
import {Question, Questions} from './questions'
import _ from 'underscore'

var Parse = window.Parse
Parse.$ = $

console.log(Parse)


const UserPost = Parse.Object.extend({
	className: 'UserPost',
	defaults: {
		title: '(no title)',
		author: null,
		content: null
	}
})


const ForumCollection = Parse.Collection.extend({
	model: UserPost
})

const list = new ForumCollection()

list.query = new Parse.Query(UserPost)

/*var forumCollection = new ForumModel([
	{title: 'Test question 1'},
	{title: 'Test question 2', author: "toby", content: "is working!"},
	{title: 'Test question 3', author: "juan"}
])
*/



// var post= new ForumPost();

// post.set({
// 	title : "and another one",
// 	author : "biggie",
// 	content: "hey hey hey ehy",
// 	isNewThread: true
// })

// post.save().then(function(postmodel){
// 	console.log(postmodel)

// })




 console.log("Javascript is working!");






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


/*Menu*/
class NavBar extends React.Component{
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div>
			<header>
        <ul>
            <li className="menu"></li>  
            <li className="forum-title">Test Forum</li>
            <li className="user">{Parse.User.current().get("username")}</li>
            <a href="#UserView"><li className="profile"></li></a>
            <li className="notifications"></li>
        </ul>

        <form>
            <input type="search" placeholder="search"></input>
        </form>
    </header>
    </div>
		)
	}
}
 
class ForumPost extends React.Component{
	constructor(props){
		super(props)
		this.rerender = () => this.forceUpdate()
	}
	render() {
		var model = this.props.data;
		return (
			<div className="forum-column">
                <div className="user-picture"><img src="http://www.adtechnology.co.uk/images/UGM-default-user.png" /></div>
                <div className="forum-question">
                	<h3><a className="question-title">{model.get('title')}</a></h3> 	
                
                	<p>{model.get('content')}</p>
            	</div>
            	<ul className="forum-replies">
            		<li className="replies">Replies<a href="#">10</a></li>
            		<li className="views"><p>Views</p><a href="#">10</a></li>
            	</ul>
            	<ul className="last-post">
            		<li className="author">{model.get('user')}</li>
            		<li className="date"><p>{model.get("createdAt")}</p></li>
            	</ul>
            </div>
		)
	}
}


/*Page View*/
class ForumView extends React.Component {
	constructor(props){
		super(props)
		this.rerender = () => this.forceUpdate()
	}
	componentDidMount(){
		this.props.data.on('update sync', this.rerender)
	}
	_add(e){
		e.preventDefault()
		var input = React.findDomNode(this.refs.title)
		PostContent.props.data.add({title: input.value})
	}
	render() {
		return (
			<div>
			<NavBar></NavBar>
			 <div className="container">	 
    	<div className="page-location"><span>Hom</span></div>
    	<div className="new-thread"><a href={`#post`} > + New Thread</a></div>
    	<div className="forum-container">
    		<div className="colum-header"><h6>Title/ Threads</h6><span>Replies</span><span>Last Post by</span></div>
            	{this.props.data.map((model) => <ForumPost data={model} />)}
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
}


/*New Question*/
class PostContent extends React.Component{
	constructor(props){
		super(props)
		
	}
	
	 _add(e){
        e.preventDefault()
        var input = React.findDOMNode(this.refs.title)
        var body = React.findDOMNode(this.refs.content)
        var user= Parse.User.current();
        var model = new UserPost({ title: input.value, content: body.value, user: user })
        var acl = new Parse.ACL()
        acl.setWriteAccess(Parse.User.current(), true)
        acl.setPublicReadAccess(true)
        model.setACL(acl)
        this.props.data.create(model)
        input.value = ''
        window.location.hash = '#home'
    }
     _saveTitle(){
        var text = React.findDOMNode(this.refs.title).innerText
        var content = React.findDOMNode(this.refs.content).innerText
        this.props.data.set('title', text)
        this.props.data.set('content', content)
    }
	render() {
		return (
			<div>
				<NavBar></NavBar>
				<div className='container'>
					<div className="page-location"><span>Home > New Thread</span></div>

					<div className="post-container">
					<div className="colum-header"><h6>Post New Thread</h6></div>
						<form onSubmit={(e) => this._add(e)}>
							<div className="post-title">
								<h5>Title:</h5>
								<input ref="title" type="text" ></input>
							</div>
							<div className="post-content">
								
								
									<textarea id="post-question" ref="content" cols="90" rows="12"></textarea>
									
								<input className="post_content_button" type="submit" value="Post"></input>
								
							</div>
						</form>
					</div>
				</div>
				<div className="user-earnings-wrapper">
            		<h6>Seller Earnings</h6>
           			 <div className="seller-earnings">
                		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOpzej-tNCbt4HpDtscG03tj12DAIEflcW6r40p8es2gqGviT4LS1-Xa3" />
                <p className="user">Userfjdfnfddcd@yahoo.com</p><span>Earned:</span><p className="user-amount">$<span>100</span></p>

            </div>
        </div>
			</div>
		)
	}

}

//Question view

class PostView extends React.Component{
	render() {
		return(
		<div>
			<NavBar></NavBar>
			<div className="container">
				<div className="pv-container">
					<div className="pv-da"><p>october 5, 2015</p></div>
					<div className="pv-user-info"></div>
					<div className="pv-user-post"></div>
				</div>
			
			

			</div>
		</div>
		)
	}
}



//User View

class UserView extends React.Component{
	constructor(props){
		super(props)
	}
	
	_postimage(e){
		e.preventDefault();
		var user = Parse.User.current();
		var fileElement = $('#post-file')[0];
		var filePath = $('#post-file').val();
		var fileName = filePath.split('\\').pop();

		if(fileElement.files.length > 0) {
			var file = fileElement.files[0];
			var newFile = new Parse.File(fileName, file);

			newFile.save({ 
				success: function() {
					alert("Image has been uploaded")
				}, error: function (file, error) {
					alert("File Save error: " + error.message)
				}
			}).then(function(theFile) {
			 var model = new UserPost();

			 model.set("file", theFile)
			 model.save();

		});	
		}

	}	

	render() {
		return (
			<div>
			<NavBar></NavBar>
			<div className="container">
			<div className="page-location"><a href="#home">Home </a> > Profile</div>
				<div className="user-container">
					<div className="user-left">
						<p>Test User Name</p>
						<img src="#"/>

						<p>test user join date</p>
						<p>test user last activity</p>
					</div>
					<div className="user-right">
						<div className="page-location">Add An Avatar</div>
						<form id="post-form" onSubmit={(e) => this._postimage(e)}>
							<input id="post-file" type="file"></input>
							<input id="file-submit" type="submit"></input>
						</form>
					</div>
				</div>
			</div>
		</div>
		)
	}	

}














/*Login View*/ 
class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = { error: 0 }
	}

	 _signupOrLogin(e){
        e.preventDefault()

        var u = new Parse.User(),
            email = React.findDOMNode(this.refs.email).value,
            password = React.findDOMNode(this.refs.password).value

        u.set({
            email: email,
            password: password,
            username: email
        })

        var signup = u.signUp()
        signup.then(() => window.location.hash = '#home')
        signup.fail(() => {
            var login = u.logIn()
            login.then((e) =>  window.location.hash = '#home')
            login.fail((...args) => {
                this.setState({error: this.state.error + 1 })
            })
        })
      
    }
    _logout(e){
    	Parse.User.logOut();
    }
	render(){
		var error = this.state.error ? (<p className="error-message">{this.state.error} try - password invalid</p>) : ''
		return (
			
			<div className="login-wrapper">
	    		<form onSubmit={(e) => this._signupOrLogin(e)}>	
	    			<input type="email" placeholder="email" ref="email"></input>
	    			<input type="password" placeholder="password" ref="password"></input>
	    			<input type="submit" value="Sign-In"></input>
	    			{error}
	    			<h5>New Here? Sign Up</h5>


	    			

	    		</form>
    		</div>
		)
	}
}



React.render(<UserView/>, document.body);

/* Router */
/*var ForumRouter = Parse.Router.extend ({
	routes: {
		
		'home' : 'list',
		'post' : 'PostContent',
		'*default': 'login'
	}, 
	list: function() {
		 if(!Parse.User.current()){
            window.location.hash = '#login'
            return
        }

        list.fetch()
		React.render(<ForumView data={list}/>, document.body);
	},
	login: () => {
         if(Parse.User.current()){
            window.location.hash = '#home'
            return
        }

		React.render(<Login></Login>, document.body);
	},
	PostContent: function(){
		React.render(<PostContent data={list}></PostContent>, document.body);
	},
	initialize: function() {
		Parse.history.start();
	}

});

var router = new ForumRouter();
*/



