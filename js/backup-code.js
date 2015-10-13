// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")

var Promise = require('es6-promise').Promise

import $ from 'jquery'
import Backbone from 'backbone'
import React, {Component} from 'react'
import _ from 'underscore'

var Parse = window.Parse
Parse.$ = $



const UserPost = Parse.Object.extend({
	className: 'UserPost',
	defaults: {
		title: '(no title)',
		content: null
	}
})


const ForumCollection = Parse.Collection.extend({
	model: UserPost
})



const list = new ForumCollection()

list.query = new Parse.Query(UserPost)


list.query.include('user')

list.query.descending("createdAt")

list.query.find({
	success: function(results) {
		for(var i in results) {
			var title = results[i].get('title'),
				content = results[i].get('content'),
				user = results[i].get('user'),
				username = results[i].get('username')

			console.log(results[i])
		}
	}, error: function(error) {
		alert("Error: "+ error.message)
	}
})

/*var id = list.id;
list.query.equalTo('objectId', id)
list.query.find()

 console.log(list);

*/




/*jQuery Events*/
/*$(window).resize(function(){
var width = $(window).width();
if(width >= 801){
// Code for big screen 
$('document').ready(function() {
	
});
}
else if(width >= 800){
// Code for medium screen 
}
else if (width<= 480){
// Code for small screen 
$('document').ready(function() {

});
}
});
*/
//


var user = Parse.User.current(),
			profilePhoto = user.get('image'),
			parsePic = profilePhoto.url(),
			webPic = "../images/profile-photo.jpg"

			
function image() {

	if(profilePhoto.url()){
		return parsePic
	}else{
		return webPic
	}

}


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
            <a href="#profile"><li className="profile"></li></a>
            <li className="forum-title">Test Forum</li>
            <li className="user">{Parse.User.current().get("username")}</li>
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
 

 //single thread model
class ForumPost extends React.Component{
	constructor(props){
		super(props)
		this.rerender = () => this.forceUpdate()
	}
	_test(e){
		var link = $( ".forum-question a").attr('href')

		list.query = new Parse.Query(UserPost);
		list.query.equalTo('objectId', link);
		list.query.find({
			success: function(results){
				alert(results[0].get('title'))
				Thread ()
		}, error: function(){

		}
		});
			
	}
	render() {
		var model = this.props.data;
		var id = model.id;

		var ash = "#threads/"+id;
		return (
			<div className="forum-column">
                <div className="user-picture"><img src={image()} /></div>
                <div className="forum-question">
                	<a href={id} onClick={(e) => this._test(e)}><h3>{model.get('title')}</h3> </a>	
                	<p>{model.get('content')}</p>
            	</div>
            	<ul className="forum-replies">
            		<li className="replies">Replies:<a href="#">10</a></li>
            		<li className="views"><p>Views:</p><a href="#">10</a></li>
            	</ul>
            	<ul className="last-post">
            		<li className="author">{model.get('user')}</li>
            		<li className="date"><p></p></li>
            	</ul>
            </div>
		)
	}
}


//Home Page
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
    	<div className="page-location"><span>Home</span></div>
    	<div className="new-thread"><a href={`#post`} > + New Thread</a></div>
    	<div className="forum-container">
    		<div className="colum-header"><h6>Title/ Threads</h6><span>Replies</span><span>Last Post by</span></div>
            	{this.state.data.map((model) => <ForumPost data={model} />)}
        </div>


        <div className="user-earnings-wrapper">
            <h6>Seller Earnings</h6>
            <div className="seller-earnings">
                <img src={image()} />
                <p className="user">Userfjdfnfddcd@yahoo.com</p><span>Earned:</span><p className="user-amount">$<span>100</span></p>

            </div>
        </div>
    </div>
    </div>
		)
	}
}


//New Thread
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

//post view

class Thread extends React.Component{
	constructor(props){
		super(props)
		
	}
	render() {
		//var model = this.props.data;
		//var id = model.id;
		console.log("herro")
		return(
		<div>
			<NavBar></NavBar>
			<div className="container">
				<div className="pv-container">
					<div className="pv-title"><p></p></div>
					<div className="pv-da"><p></p></div>
					<div className="pv-user-info"></div>
					<div className="pv-user-post">${title}</div>
				</div>
			
			

			</div>
		</div>
		)
	}
}



//User Profile

class ProfileSettings extends React.Component{
	constructor(props){
		super(props)
		this.rerender = () => this.forceUpdate()
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

			 user.set("image", theFile)
			 user.save();
		});	
		}

	}	

	render() {
		

		var recentActivity = user.updatedAt,
		joinDate = Parse.User.current().createdAt 

		return (
			<div>
			<NavBar></NavBar>
			<div className="container">
			<div className="page-location"><a href="#home">Home </a> > Profile</div>
				<div className="user-container">
					<div className="user-left">
						<p>{user.get("username")}</p>
						<img id="profileImg" src={image()}/>
						<br/>
						<br/>
						<p>Joined: </p>
						<p>Recent Activity: </p>
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



//React.render(<Thread/>, document.body);

// Router 
var ForumRouter = Parse.Router.extend ({
	routes: {
		'threads/:id': 'threads',
		'home' : 'list',
		'post' : 'PostContent',
		'profile': 'settings',
		'*default': 'login',
		
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
	settings: () => {
		React.render(<ProfileSettings/>, document.body);
	},
	PostContent: function(){
		React.render(<PostContent data={list}></PostContent>, document.body);
	},
	threads: function(model){
		React.render(<Thread data={model.id}/>, document.body);
	},

	initialize: function() {
		Parse.history.start();
	}

});

var router = new ForumRouter();






