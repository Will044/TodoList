// 宣告輸入框常數
const inputText = document.getElementById("inputText");
// 宣告新增按鈕常數
const addBtn = document.getElementById("addBtn");
// 宣告待辦事項表格常數
const todoList = document.getElementById("toDoList");
// 宣告儲存所有要做的動作變數
let todoData = [];

// 新增
// 監聽新增按鈕，並設定函式名稱為addToDo
addBtn.addEventListener("click", addToDo);
// 函式 addToDo
function addToDo() {
  // 所有要做的動作定義成一個物件
  let todo = {
    // 輸入內容
    txt: inputText.value,
    // 各種操作，刪除、切換狀態
    id: new Date().getTime(),
    // 判別已完成或未完成項目
    checked: ""
  };
  // 假如輸入內容不是空值
  if( todo.txt !== "" ){
    // 按下addBtn時要把todo物件代入todoData的前面
    todoData.unshift(todo);
    // 輸入完後把輸入框清空
    inputText.value = "";
  }
  // 執行渲染，把動作變數帶進參數
  updateList();
}

// 渲染
// 新增一個函式，帶入陣列data＞名稱叫arr
function render(arr) {
  // 新增一個空字串
  let str = "";  
  // 陣列data＞arr跑回圈
  arr.forEach((item) => {
    // 重新渲染的DOM結構
    str += 
    `
     <li data-id="${item.id}">
       <label class="checkbox" for="">
         <input type="checkbox" ${item.checked}/>
         <span>${item.txt}</span>
       </label>
       <a href="#" class="delete"></a>
     </li>
    `
  });
  // 將組合的新字串str渲染到待辦事項的表格上
  toDoList.innerHTML = str;  
}

// 刪除單筆/切換打勾
// 監聽待辦事項內容
todoList.addEventListener("click", deleteAndChecked);
// 函式 deleteAndChecked
function deleteAndChecked(e){
  // 宣告最接近li的父元素，然後選取data-id
  let li_id = e.target.closest("li").dataset.id;
  // 判斷class的值是否等於delete
  if( e.target.classList.value == "delete" ){
    // 先取消delete的a標籤功能
    e.preventDefault();
    // 若class的值等於delete
    // 就刪除屬性是id的物件
    todoData = todoData.filter((item3) => item3.id != li_id );
  } else {
    // 若class的值不等於delete
    // 就切換狀態功能
    todoData.forEach((item4, index) => {
      if( item4.id == li_id ){
        if( todoData[index].checked == "checked" ){
          todoData[index].checked = "";
        } else {
          todoData[index].checked = "checked";
        }
      }
    });
  }
 //重新渲染
 updateList();
}

// 切換
// 宣告標籤常數
const tab = document.getElementById("tab");
// 宣告狀態
let toggleStatus = "all";
// 監聽標籤事件
tab.addEventListener("click", changeTab);
// 函式changeTab
function changeTab(e) {
  toggleStatus = e.target.dataset.tab;
  // 宣告標籤項目（類陣列）
  let tabs = document.querySelectorAll("#tab li");
  // 標籤項目（類陣列）跑回圈，每次一開始點擊都先清除active
  tabs.forEach((item2) => {      
    item2.classList.remove("active");      
  });
  // 然後點擊後再加上active
  e.target.classList.add("active");
  // updateList() 一開始沒有，最後加上去
  updateList();
}

// 更新待辦清單
function updateList() {
  let showData = [];  
  if( toggleStatus == "all" ){
    showData = todoData;
  } else if ( toggleStatus == "work" ){
    showData = todoData.filter((item5) => item5.checked == "" );
  } else {
    showData = todoData.filter((item5) => item5.checked == "checked" );
  }
  const workNum = document.getElementById("workNum");
  let toBeCom = todoData.filter((item5) => item5.checked == "" );
  workNum.textContent = toBeCom.length;
  
  render(showData);
}

// 初始
updateList();

// 刪除已完成項目
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todoData = todoData.filter((item6) => item6.checked != "checked" );
  updateList();
});

// 優化
inputText.addEventListener("keypress", (e) => {
  // 假如事件的key等於"Enter"，就執行新增動作
  if( e.key == "Enter" ){
    addToDo();
  }
});
