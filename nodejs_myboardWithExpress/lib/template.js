var sanitizeHtml = require('sanitize-html');
module.exports = {
	'test': 'test',
	'html': function (title, list, body, update) {
		return `
		<!--<!doctype html>-->
		<!--<html>-->
		<head>
		<title>Board - ${title}</title>
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
		<a href="/create" class = "docu">글쓰기</a> <a href="/author_create" class = "docu" style="width:100px;">저자 추가하기</a>
		</div>
		<div id="grid">
		<div id = "list">
		${list}
		</div>
		<div id = "article">
		${body}
		<p>
		${update}
		</p>
		</div>
		</div>
		</body>
		<!--</html>-->
		`;
	}, 'list': function (topics) {
		var list = '<ul>';
		var i = 0;
		for (i = 0; i < topics.length; i++) {
			list += `<li><a href="/page/${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
		}
		list += `<li><a href="/author" style="color:blue;">저자 목록</a></li>`
		list = list + '</ul>';
		return list;
	}, 'authorSelect': function (authors,author_id) {
		var tag = '';
		var i;
		for (var i = 0; i < authors.length; i++) {
			var selected = '';
			if(authors[i].id === author_id){
				selected = ' selected'
			}
			tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`
		}
		return `
		<p>
			<select name = "author">
				${tag}
			</select>
		</p>
		`
	}, 'authorList' : function(authors){
		var list = '';
		for(var i = 0 ; i < authors.length ; i++){
			list +=
			`<h2>${authors[i].name}</h2>
			<p>${authors[i].profile}</p>
			<a href="/author_update/${authors[i].id}" style ="color:blue;font-size:12px">수정</a> <a href="/author_delete/${authors[i].id}" style ="color:blue;font-size:12px">삭제</a>
			`;
		}
		list += `<p>
			<a href="/author_create" class = "docu" style="width:100px;">저자 추가하기</a>
		</p>`
		return list;
	}, 'deleteAuthor' : function(authors,id){
		var list = '';
		console.log(id);
		for(var i = 0 ; i < authors.length ; i++){
			if(id == authors[i].id){
				list +=
					`<h2>${authors[i].name}</h2>
					<p>저자를 삭제합니다.</p>
					<p>저자를 삭제하면 저자가 작성한 글도 삭제됩니다</p>
					<form action = "/author_delete_process"
                method="post">
                <input type ="hidden" name = "id" value="${authors[i].id}">
                <input type = "submit" class = "submit" value="삭제">
                </p>
                </form>
					`;
			}else{
				list +=
					`<h2>${authors[i].name}</h2>
					<p>${authors[i].profile}</p>
					<a href="/author_update/${sanitizeHtml(authors[i].id)}" style ="color:blue;font-size:12px">수정</a> <a href="/author_delete/${authors[i].id}" style ="color:blue;font-size:12px">삭제</a>
					`;
			}
		}
		list += `<p>
			<a href="/author_create" class = "docu" style="width:100px;">저자 추가하기</a>
		</p>`
		return list;
	}
}