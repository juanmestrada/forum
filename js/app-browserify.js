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
	className: 'UserPost'
	
})

const Comment = Parse.Object.extend({
	className: "Comment"
})

const ForumCollection = Parse.Collection.extend({
	model: UserPost


})

const CommentCollection = Parse.Collection.extend({
	model: Comment
})


const commentlist = new CommentCollection()



const list = new ForumCollection()

list.query = new Parse.Query(UserPost)
list.query.descending("createdAt")


commentlist.query = new Parse.Query(Comment)






// React


//Menu
class NavBar extends React.Component{
	constructor(props){
		super(props)
	}

	_logout(e){
		Parse.User.logOut();
		window.location.hash = '#login'
	}
	_menushow(){
		$('.menu').click(function() {
			if ( $('.menu ul').css('visibility') == 'hidden' ){
			  	$('.menu ul').css('visibility','visible');
			  }else{
			  	$('.menu ul').css('visibility','hidden');
			}
		});
  			
	}
	render() {
		return (
			<div>
			<header>
        <ul>
            <li className="menu" onClick={(e) => this._menushow(e)}>
            	<ul>
            		<li><a href="#home">Home</a></li>
            		<li><a  href="#profile">Settings</a></li>
            		<li onClick={(e) => this._logout(e)}>Log Out</li>
            	</ul>
            </li>
            <a href="#profile"><li className="profile"></li></a>
            <li className="forum-title">Forum</li>
            <li className="user">Welcome, {Parse.User.current().get("username")}</li>
            <li className="notifications"></li>
        </ul>
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
	
	render() {
		var model = this.props.data;
		var id = model.id;
		var hashRoute = window.location.hash;

		var ash = "#threads/"+id;

		var	webPic = "../images/profile-photo.jpg"

		function PostImg(){
			if(model.get('image')){
				return model.get('image').url()
			}else {
				return webPic
			}
		}
		return (
			<div className="forum-column">
                <div className="user-picture"><img src={PostImg()} /></div>
                <div className="forum-question">
                	<a href={ash}  ref="x" /*onClick={(e) => this._test(e)}*/ ><h3>{model.get('title')}</h3> </a>	
                	<p>{model.get('content')}</p>
            	</div>
            	<ul className="forum-replies">
            		<li className="replies">Replies:<a href="#">10</a></li>
            		<li className="views"><p>Views:</p><a href="#">10</a></li>
            	</ul>
            	<ul className="last-post">
            		<li className="author">{model.get('user').get('username')}</li>
            		<li className="date">{model.createdAt}</li>
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
    		<div className="colum-header"><h6>Title/ Threads</h6><span>Replies</span><span>Last Post</span></div>
            	{this.props.data.map((model) => <ForumPost data={model} />)}
        </div>


        <div className="user-earnings-wrapper">
            
            <div className="seller-earnings">
                <ul>
                	<li><a href="mailto:jestrada1622@gmail.com"><img src="../images/email.png" /></a></li>
                	<li><a href="https://github.com/juanmestrada?tab=repositories" ><img src="../images/github.png" /></a></li>
                	<li><a href="https://www.linkedin.com/pub/juan-estrada/101/31b/575" ><img src="../images/linkedin_logo.png" /></a></li>
                </ul>
                

            </div>
        </div>
    </div>
    </div>
		)
	}
}


//New Thread View
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
					<div className="page-location"><span><a href="#home">Home</a> > New Thread</span></div>

					<div className="post-container">
					<div className="colum-header"><h6>Post New Thread</h6></div>
						<form onSubmit={(e) => this._add(e)}>
							<div className="post-title">
								<h5>Title:</h5>
								<input ref="title" type="text" ></input>
							</div>
							<div className="post-content">
								
									<textarea id="post-question" ref="content" ></textarea>
									
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

//Details View

class Thread extends React.Component{
	constructor(props){
		super(props)
		this.rerender = () => this.forceUpdate()
	}
	componentDidMount(){
	
		this.props.cmt.on('update sync', this.rerender)
		var rt = this.props.s


		list.query = new Parse.Query(UserPost);
		list.query.equalTo('objectId', rt);
		list.query.include('user');
		list.query.find({
			success: function(results){
				
				//console.log(results[0].get('title'))
				var title = results[0].get("title")
				var content = results[0].get("content")
				var user = results[0].get("user")
				var username = user.get('username')
				var date = results[0].createdAt
				var updatedAt = results[0].updatedAt
				var id = results[0].id


				
				
				var backimg = "../images/profile-photo.jpg"

				function postImg(){
					if(user.get('image')){
						return user.get('image').url()
					}else{
						return backimg

					}
				}


				$('.user-picture img').attr('src', postImg())
				$(".pv-title p").html("Thread: " + title)
				$(".pv-user-name p").html(username)
				//$(".pv-user-image img").html(userimg)
				$(".pv-user-image img ").attr("src",postImg());
				$(".pv-join-date span").html(date)
				$(".pv-update-date span").html(updatedAt)

				$(".pv-user-post p").html(content)
				$(".s-title").html(title)

				$("#pv-comment-id").val(id)
				
			}, 
			error: function(error){
				alert("Parse says :" + error.message)
			}
			
		});
		
	}
	_postcomment(e){
		e.preventDefault();

		var Comment = Parse.Object.extend("Comment")
		var commentId = $("#pv-comment-id").val();
		var	commentText = $('#pv-comment-text').val();
		var user = Parse.User.current();
		var	userpost = new UserPost({id:commentId});
		var	comment = new Comment();

		comment.set("content", commentText)
		comment.set("user", user)
		comment.set("userpost", userpost)
		comment.save({
			success: function(obj){
				alert("Comment saved!")

				function postImg(){
					if(uimg){
						return userimg
					}else{
						return backimg

					}
				}
				$("#comment-user-name").html(user)
				//$("#comment-user-image").attrl(postImg())
				//$("#comment-user-date").html(user)
				$("#reply-text").html(commentText)
				
				$("#pv-comment-container").hide()

			}, error: function(obj, error) {
				alert("Saving Error: " + error.message)
			}
		})
		var input = React.findDOMNode(this.refs.pvcomment)
		input.value = ''
		//make comment box disappear
		this.props.cmt.on('update sync', this.rerender)
	}
	_showbox(e){
		e.preventDefault()
		$("#pv-comment-container").show()

	}

	_hidebox(e){
		
		$("#pv-comment-container").hide();
	}
	render() {


		return(	
		<div>
			<NavBar></NavBar>
			<div className="container">
				<div className="page-location"><a href="#home">Home </a> > Thread</div>

				<div className="pv-container">
					<div className="pv-title"><p></p></div>
					<div className="pv-user-info">
						<div className="pv-user-name"><p></p></div>
						<div className="pv-user-image"><img src=" "/></div>
						<div className="pv-join-date"><p>Join: </p><span></span></div>
						<div className="pv-update-date"><p>Last Updated: </p><span></span></div>
					</div>
					<div className="pv-user-post">
						<h5 className="s-title"></h5>
						<br/>
						<p></p>
					</div>
					<div id="reply-bttn" onClick={(e) => this._showbox(e)}>
						<img src="../images/reply.png" />
						<p>Reply</p>
					</div>
				</div>
				{this.props.cmt.map((model) => <CommentView cmt={model} />)}

				<div id="pv-comment-container" onBlur={(e) => this._hidebox(e)}>
					<form id="pv-comment-form">
						<p>Reply to:</p>
						<input id="pv-comment-id" type="hidden" value=" " />
						<textarea id="pv-comment-text" ref="pvcomment" ></textarea>
						
						<input type="submit" onClick={(e) => this._postcomment(e)}  />
					</form>
				</div>
			</div>
		</div>
		)
	}
}

//Comment view

class CommentView extends React.Component{
	constructor(props){
		super(props)
		
	}
	componentDidMount(){
		 
		var commentId = $("#pv-comment-id").val();
		var wHash = window.location.hash.substr(9);
		var	userpost = new UserPost({id:wHash});
		var pi = userpost.id

		//console.log(Comment)

		var cmmntlist = this.props.cmt
		
		//console.log(wHash)
		//console.log(cmmntlist)
		cmmntlist.query = new Parse.Query('Comment')
		cmmntlist.query.equalTo('userpost', userpost);
		commentlist.query.include('user');
		cmmntlist.query.include('userpost');
		cmmntlist.query.find({
			success: function(results){
				/*//var title = results[0].get("title")
				var post = results[0].get("userpost")
				var title = post.get("title")
				var content = results[0].get("content")
				var user = results[0].get("user")
				var username = user.get('username')

				//console.log(username)
				console.log(content)*/
				
			
				//console.log(results)
				console.log("query worked")
			}, 
			error: function(error){
				alert("Parse says :" + error.message)
			}
		})
		
		

	}

	render() {
		var cmodel = this.props.cmt
		//console.log(cmodel.get("userpost"))

		//log each id OF COMMENT VV
		//alert(cmodel.id)
		//console.log(cmodel.get('user'))
		
				var	webPic = "../images/profile-photo.jpg"

					
				function image() {

					if(Parse.User.current().get('image') ){
						return Parse.User.current().get('image').url()
					}else{
						return webPic
					}

				}


		return(
			<div>
				<div id="comment-view">
					<div id="comment-user-info">
						<div id="comment-user-name"><p></p></div>
						<div id="comment-user-img"><img src={image()}/></div>
						<div id="comment-user-date"><p>test</p></div>
					</div>
					<div id="reply-container">
						<div id="reply-text"><p>test</p></div>
					</div>
				</div>
			</div>

		)
	}
}

//User Profile View

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
	_showbttn(){
		$('#post-form').show()
		$('.upload-image').hide()
	}

	render() {
		var user = Parse.User.current()
		var	webPic = "../images/profile-photo.jpg"

					
				function image() {

					if(user.get('image')) {
						return Parse.User.current().get('image').url()
					}else{
						return webPic
					}

		}
		
		console.log()
		return (
			<div>
			<NavBar></NavBar>
			
			<div className="page-location"><a href="#home">Home </a> > Profile</div>
				<div className="user-container">
					<div className="user-left">
						<div className="user-left-img"><img id="profileImg" src={image()}/></div>
						<div className="user-left-name"><p>{user.get('username')}</p></div>
						
						<br/>
						<br/>
						<div className="user-left-join"><p>Joined: </p></div>
						<div className="user-left-recent"><p>Recent Activity: </p></div>
					</div>
					<div className="user-right">

						<div className="upload-image" onClick={(e) => this._showbttn(e)}><p>Upload a Photo</p></div>
						
						<form id="post-form" onSubmit={(e) => this._postimage(e)}>
							<h5>Upload an Image</h5>
							<input id="post-file" type="file"></input>
							<input id="file-submit" type="submit"></input>
						</form>
					</div>
				</div>
			
		</div>
		)
	}	

}



//Log In View
class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = { error: 0 }
	}

	 _signupOrLogin(e){
        e.preventDefault()

        var u = new Parse.User(),
            email = React.findDOMNode(this.refs.email).value,
            password = React.findDOMNode(this.refs.password).value,
            username = React.findDOMNode(this.refs.username).value

        u.set({
            email: email,
            password: password,
            username: username
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
	    			<input type="username" placeholder="username" ref="username"></input>
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



//React.render(<Login></Login>, document.body);

// Router 
var ForumRouter = Parse.Router.extend ({
	routes: {
		'threads/:id': 'threads',
		'home' : 'list',
		'post' : 'PostContent',
		'profile': 'settings',
		'login': 'login',
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
	threads: function(id){
		
		commentlist.fetch()
		React.render(<Thread data={list}  s={id} cmt={commentlist}/>, document.body)
	},
	commentc: function(){
		React.render(<CommentView cmt={commentlist}/>, document.body)
	},

	initialize: function() {
		Parse.history.start();
	}

});

var router = new ForumRouter();






