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
<h4 id="테이블-정보-보기">테이블 정보 보기</h4>
<pre><code>DESC 테이블명;
</code></pre>
<h4 id="데이터-추가하기">데이터 추가하기</h4>
<pre><code>INSERT INTO 테이블이름(field1, field2, ...)
VALUES(값1, 값2, ...)
INSERT INTO topic (title,description,created,author,profile)
VALUES('MySQL', 'MySQL is ...',NOW(),'@shoon__100s','DEVELOPER');
</code></pre>
<h4 id="테이블에-추가한-데이터-읽기">테이블에 추가한 데이터 읽기</h4>
<pre><code>SELECT * FROM 테이블이름; //모든 데이터 읽기
</code></pre>
<pre><code>WHERE
조건 검사

예시
SELECT NAME WHERE NAME IS NOT NULL;
</code></pre>
<pre><code>NULL인 값 대체하기
IFNULL 함수 사용
SELECT IFNULL(NAME,'No name') FROM table;
</code></pre>
<pre><code>SELECT의 여러 가지 함수들(그룹 함수)
SUM : 조건을 만족하는 컬럼의 합
MAX : 조건을 만족하는 값들 중 최대값
MIN : 조건을 만족하는 값들 중 최소값
AVG : 조건을 만족하는 값들의 평균값
COUNT : 조건을 만족하는 항들의 갯수

SELECT SUM(컬럼이름) 결과로 출력할 이름 (WHERE ~) (FROM 테이블이름);
과 같이 사용함
</code></pre>
<pre><code>GROUP BY
반드시 위에 기술한 그룹 함수들과 함께 사용되어야 함
GROUP BY와 함께 사용시 그룹 함수의 결과 값은 GROUP BY절에 기술된 컬럼의 항목들에 행의 갯수에 의해 정해진다

SELECT ANIMAL_TYPE, COUNT(ANIMAL_TYPE) count
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE;
위와 같이 사용한다.
</code></pre>
<pre><code>HAVING
WHERE와 똑같은 기능을 하지만, 그룹 함수를 사용하는 조건문의 경우 HAVING절에 사용하여야 한다. GROUP BY 의 뒤에 사용한다

HAVING avg(salary) &lt; 9000;
위와 같이 사용한다.
</code></pre>
<p>애스터리스크(*) : 프로젝션 중 모든 것을 나타내라</p>
<pre><code>순서 : FROM, WHERE, ORDER, LIMIT
SELECT 프로젝션 (FROM 테이블이름) (WHERE field명=데이터값);
SELECT * FROM 테이블이름 ORDER BY 필드이름 옵션(순차 : ASC , 역순 : DESC);
LIMIT : 갯수 제한
</code></pre>
<h4 id="테이블-안의-데이터-수정하기">테이블 안의 데이터 수정하기</h4>
<pre><code>UPDATE 테이블명 SET 필드명=바꿀 데이터 값 WHERE 필드명=데이터;
</code></pre>
<h4 id="테이블-안의-데이터-삭제하기">테이블 안의 데이터 삭제하기</h4>
<pre><code>DELETE FROM 테이블명 WHERE 필드 = 데이터;
</code></pre>
<h4 id="join-이용하기">JOIN 이용하기</h4>
<pre><code>SELECT 프로젝션 FROM 테이블명 LEFT(RIGHT) JOIN 합칠 테이블명 ON 테이블 조건 = 합칠 테이블 조건;
#예시
SELECT topic.id AS topic_id,title,description,created,name,profile
FROM topic LEFT JOIN author ON topic.author_id = author.id ORDER BY author_id;
</code></pre>
<h4 id="기타-정리">기타 정리</h4>
<pre><code>문자열을 포함하는 열 찾기
WHERE 칼럼이름 like"%A%" //문자열 앞뒤에서 A 포함하는 문자열 찾기

</code></pre>

