---


---

<h1 id="mysql-요점정리">MySQL 요점정리</h1>
<blockquote>
<p>사실 굳이 열심히 알 필요는 없다. 검색하면 다 나오는데 뭘</p>
</blockquote>
<h4 id="데이터베이스-생성하기">데이터베이스 생성하기</h4>
<pre><code>CREATE DATABASE 디비이름;
</code></pre>
<h4 id="데이터베이스-삭제하기">데이터베이스 삭제하기</h4>
<pre><code>DROP DATABASE 디비이름;
</code></pre>
<h4 id="내-db목록-조회하기">내 DB목록 조회하기</h4>
<pre><code>SHOW DATABASES;
</code></pre>
<h4 id="작업할-db-지정하기">작업할 DB 지정하기</h4>
<pre><code>USE 디비이름;
</code></pre>
<p><br>
table(표) : x축&gt;row,record,행 &amp; y축&gt;column,열</p>
<h4 id="테이블-만들기">테이블 만들기</h4>
<pre><code>CREATE TABLE 테이블이름(
	데이터명 데이터타입(입력 글자수) 부가옵션
	...
	PRIMARY KEY(데이터명)
}
NOT NULL -&gt; 빈칸 입력 금지
AUTO_INCREMENT -&gt; 중복 없이 자동으로 증가
</code></pre>
<p><a href="https://www.mysqltutorial.org/mysql-data-types.aspx">데이터타입 참고</a>   <a href="https://devhints.io/mysql">치트시트</a></p>
<h4 id="데이터-추가하기">데이터 추가하기</h4>
<pre><code>INSERT INTO 테이블이름(field1, field2, ...)
VALUES(값1, 값2, ...)
INSERT INTO topic (title,description,created,author,profile)
VALUES('MySQL', 'MySQL is ...',NOW(),'@shoon__100s','DEVELOPER');
</code></pre>
<h4 id="테이블에-추가한-데이터-읽기">테이블에 추가한 데이터 읽기</h4>
<pre><code>SELECT * FROM 테이블이름; //모든 데이터 읽기
</code></pre>
<p>애스터리스크(*) : 프로젝션 중 모든 것을 나타내라</p>
<pre><code>순서 : FROM, WHERE, ORDER, LIMIT
SELECT 프로젝션 (FROM 테이블이름) (WHERE field명=데이터값);
SELECT * FROM 테이블이름 ORDER BY 필드이름 옵션(순차 : ASC , 역순 : DESC);
LIMIT : 갯수 제한
</code></pre>
<h4 id="테이블-안의-데이터-수정하기">테이블 안의 데이터 수정하기</h4>
<pre><code>UPDATE 테이블명 SET 필드명=바꿀 데이터 값 WHERE 필드명=데이터
</code></pre>
<h4 id="테이블-안의-데이터-삭제하기">테이블 안의 데이터 삭제하기</h4>
<pre><code>DELETE FROM 테이블명 WHERE 필드 = 데이터
</code></pre>

