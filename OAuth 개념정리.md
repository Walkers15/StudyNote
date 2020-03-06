---


---

<h2 id="용어정리">용어정리</h2>
<p><strong>Resource Server, Authorization Server</strong><br>
Google, Facebook등 Access Token(Authorized Code)을 발급해주는 기관</p>
<p><strong>Resource Owner</strong><br>
우리 서버에 접속하는 고객<br>
Resource Server 기관에 접근할 수 있는 Resource를 가지고 있는 사람(Owner)</p>
<p><strong>Client</strong><br>
액세스 토큰을 받아 사용자를 로그인시켜주는 서버(내가 만든거)<br>
클라이언트가 리소스 서버에 자기 홈페이지(혹은 앱 등)을 등록!</p>
<p><strong>웹 개발에서 서버-클라이언트 관계랑 비슷하지만 다름!</strong></p>
<h2 id="개념설명-액세스-토큰-전달-과정">개념설명, 액세스 토큰 전달 과정</h2>
<h3 id="리소스-서버와-클라이언트간의-연결">리소스 서버와 클라이언트간의 연결</h3>
<p>모든 리소스 서버-클라이언트 간 연결의 공통점<br>
<strong>Client ID</strong> <strong>Client Secret</strong>, <strong>Authorized redirect URL</strong> 을 가진다!</p>
<p>그럼 우리가<br>
<a href="https://resource.server/?client_id=%EB%82%B4%EC%95%84%EC%9D%B4%EB%94%94&amp;scope=%EC%9A%B0%EB%A6%AC%EA%B0%80_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B3%A0%EC%9E%90_%ED%95%98%EB%8A%94_%EB%B2%94%EC%9C%84&amp;redirect_url=%EB%82%B4%EA%B0%80_%EA%B5%AC%ED%98%84%ED%95%9C_%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80">https://resource.server/?client_id=내아이디&amp;scope=우리가_사용하고자_하는_범위&amp;redirect_url=내가_구현한_홈페이지</a><br>
로 링크되는 버튼을 만들어두기만 하면 인증 절차가 진행된다.</p>
<p>Resource Owner가 이에 대한 승인을 하면,<br>
<strong>authorization code</strong>가 발급되어, 이를 Resource Owner에게 보낸다.<br>
이 코드에는 location이 있고, 이에 의해 오너는 클라이언트로 이동</p>
<p>그러면 클라이언트는 그 로케이션에 있는 <strong>authorization code</strong>를 이용하여 리소스 서버에 정해진 주소로 접근한다.<br>
정해진 주소에는, authorization code, redirect_url, client_id, client_secret가 포함되어 있어야 한다.</p>
<p>이 주소를 전달받은 리소스 서버는 우선 authorization code를 삭제하고,<br>
<strong>Access token</strong>을 발급한다. 그 후 Client에게 전달한다.<br>
이 토큰은, 클라이언트가 이 토큰을 통해 Resource Server에 접근했을 때 Owner에 대한 정보 및 Scope내의 기능들을 전달한다.</p>
<p>그러현 서로간의 연걸은 확인되었고, 이제 클라이언트와 리소스서버 사이에는 API라는 것을 통해 필요한 정보를 주고받는다.<br>
API는 보통 주소로 이루어져 있다. 각 리소스 서버 별로 검색해서 확인할 수 있다.<br>
보통 주소에 쿼리 스트링을 붙이거나, Bearer라는 헤더값을 이용하는데, Bearer가 더 안전하다.<br>
쿼리 스트링은 경우에 따라 제공하지 않는 서버도 있다.</p>
<h2 id="refresh-token">Refresh Token</h2>
<p>Access Token은 수명이 있다. 보통 1시간~90일 정도이다.<br>
그림 토큰 기간이 만료되었을 경우, 앞의 과정을 반복하지 않기 위해 제공하는 기능이 Refresh Token이다. <strong>rfc6749</strong><br>
이 토큰을 이용하면 Access Token 을 refresh 할 수 있다.</p>

