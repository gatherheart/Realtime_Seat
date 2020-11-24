## Client 초기 세팅

### 1. dependencies 설치

```sh
$ yarn
```

### 2. 서버 url 설정

`./client`에 `.env` 파일 생성하고 아래 값을 입력하여 서버 주소 세팅

> 미설정 시 기본값은 `localhost`, `:4000`으로 되어 있습니다

```
REACT_APP_HTTP_URI=34.64.251.108
REACT_APP_HTTP_PORT=4000
REACT_APP_WS_URI=34.64.251.108
REACT_APP_WS_PORT=4000
```

### 3. 실행

```sh
$ yarn start
```

`localhost:3000`에서 확인 가능
