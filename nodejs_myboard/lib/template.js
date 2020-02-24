module.exports = {
	'test' : 'test',
	'html' : function(title,list,body,update){
		return `
		<!doctype html>
		<html>
		<head>
		<title>WEB1 - ${title}</title>
		<meta charset="utf-8">
		</head>
		<body>
		<style>
		.submit{
			width:50px;
			height : 50px;
			background-color: #f8585b;
			border: none;
			color:#fff;
			padding: 15px 0;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 15px;
			margin: 4px;
			cursor: pointer;
		}
		body{
			margin:0;
		}
		a {
			color:black;
			text-decoration: none;
		}
		#crud{
			text-align: center;
			border-bottom:1px solid gray;
			padding : 5px;
		}
		.docu{
			border-radius:10px;
			width:90px;
			background-color: green;
			border: none;
			color:#fff;
			padding: 5px 0;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 15px;
			margin: 4px;
			cursor: pointer;
		}
		h1 {
			font-size:45px;
			text-align: center;

			margin:0;
			padding:20px;
		}
		ul{
			border-right:1px solid gray;
			width:100px;
			margin:0;
			padding:20px;
		}
		#grid{
			display: grid;
			grid-template-columns: 150px 1fr;
		}
		#grid ul{
			padding-left:33px;
		}
		#grid #article{
			padding-left:25px;
			padding-right:5px;
		}
		</style>
		<h1><a href="/">승훈이네 자유게시판</a></h1>
		<div id = "crud">
		<a href="/create" class = "docu">글쓰기</a>
		</div>
		<div id="grid">
		${list}
		<div id = "article">
		${body}
		<p>
		${update}
		</p>
		</div>
		</div>
		</body>
		</html>
		`;
	},'list':function(filelist){
		var list = '<ul>';
		var i = 0;
		for(i = 0 ; i < filelist.length;i++){
			list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
		}
		list = list+'</ul>';
		return list;
	}
}