### 설치해야 할 것들
npm install  
npm install echarts  
npm install echarts echarts-for-react  
npm install react-grid-layout   
npm install d3
npm install papaparse

### 파일 구조
: 일단 이렇게 짰고, 나중에 디자인 위해서 css나 color 폴더같은거? 더 만들어야 할 것 같음. 너네 파일이나 폴더 생성하면 여기 아래에 작성해줘

📦public  
 ┣ 📜favicon.ico : 나중에 내가 아이콘 바꿀게
 ┣ 📜index.css : 앱 전체 디자인에 대한 css   
 ┗ 📜index.html : 기본이 될 html  
 📦src  
 ┣ 📂components  
 ┃ ┣ 📂chart  
 ┃ ┃ ┣ 📜Chart1.js  
 ┃ ┃ ┣ 📜Chart2-1.js : 순위 꺾은선 그래프  
 ┃ ┃ ┣ 📜Chart2-2.js : 연도별 막대 그래프  
 ┃ ┃ ┣ 📜Chart3.js  
 ┃ ┃ ┣ 📜Chart4.js  
 ┃ ┃ ┣ 📜Chart5.js  
 ┃ ┃ ┗ 📜Chart6.js  
 ┃ ┗ 📜Filtering.js : 일단 레이아웃 위치때문에 생성한건데, 나중에 보고 없애도 될 듯(Chart2.js에 같이 작성해도 될 것 같아서)  
 ┣ 📜App.js : dom router랑 연결해주는..? 건드릴 필요 X 
 ┣ 📜Dashboard.js : chart.js들이랑 filtering.js들을 하나에 연결해 둔 거?? 건드릴 필요 X  
 ┣ 📜index.js : 건드릴 필요 X  
 ┣ 📜Design.js : 색상스케일 등 디자인요소    
 ┗ 📜layouts.js : 레이아웃 짠거. 건드릴 필요 X  
