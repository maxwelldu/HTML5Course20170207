/* 一些简称表示的意思
 * tx = transaction
 * e  = error
 * rs = result
 * i  = index
 * db = database
 */

// 打开数据库
var db = openDatabase("noteapp", "1.0", "一个可以记录笔记的应用", 5 * 1024 * 1024);

// 创建数据表
db.transaction(function(tx) {
	tx.executeSql("CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY ASC, note_content TEXT, note_date TEXT)");
});

// 获得 提交 按钮并监听它的点击事件
var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", submitNote, false);

// 获取到提交笔记的表单
var noteForm = document.getElementById("note-form");

// 实时设置 Local Storage 存储用户输入的内容
var noteFormText = noteForm.elements["note-content"];
noteFormText.addEventListener("keyup", 
	function(){
	  localStorage.setItem("note", noteForm.elements["note-content"].value)
	});
// 将 Local Storage 里的内容恢复到文本区域上
noteForm.elements["note-content"].value = localStorage.getItem("note");

// 载入并显示笔记
loadNote();

// 提交笔记
function submitNote(e) {
	e.preventDefault();
	// 得到 note-form 表单里的 note-content 文本区域的值
	var noteContent = noteForm.elements["note-content"].value;
	// 得到 提交 按钮的值 
	var status = noteForm.elements["submit-btn"].value;
	// 得到隐藏文本框 note-id 里面的值
	var note_id = noteForm.elements["note-id"].value;
	// 判断 提交 按钮的状态
    if( status === "submit"){
        // 如果是 submit 那么就添加内容到数据表
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO note (note_content, note_date) VALUES (?, DATETIME('now', 'localtime'))",
                            [noteContent],
                            onSuccess, onError);
        });
    }else{
        // 如果是 update 那么就更新内容到数据表
        db.transaction(function(tx) {
            tx.executeSql("UPDATE note SET note_content = ? WHERE id=?",
                            [noteContent, note_id],
                            onSuccess, onError);
        });
    }
}

// 删除笔记
function deleteNote(id) {
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM note WHERE ID=?",
                        [id],
                        onSuccess, onError);
    });
}

// 编辑笔记
function editNote(id) {
    db.readTransaction(function(tx) {
       tx.executeSql("SELECT * FROM note WHERE id=?", [id], function(tx, rs){  
           noteForm.elements["note-content"].value = rs.rows.item(0).note_content;
           noteForm.elements["submit-btn"].value = "update";
           noteForm.elements["submit-btn"].innerHTML = "更新";
           noteForm.elements["note-id"].value = id;
       });
    });   
}

// 选择数据表里的内容
function loadNote() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM note ORDER BY id DESC", [], displayNote, onError);
	});
}

// 显示数据表里的内容
function displayNote(tx, rs) {
	// 获取到用来显示笔记列表的容器并清空原有的内容
	var noteListContainer = document.getElementById("note-list");
	noteListContainer.innerHTML = "";

	// 循环输出查询到的笔记
	for (var i = 0; i < rs.rows.length; i++) {  
		var noteEntry = rs.rows.item(i);
		noteListContainer.innerHTML += 
			"<li class='list-group-item'>" + 
				noteEntry.note_content +
				"<div class='btn-group btn-group-xs pull-right'>" +
                    "<button class='btn btn-default' onclick='deleteNote(" + noteEntry.id + ")'>" +
                    "删除" +
                    "</button>" +
                    "<button class='btn btn-default' onclick='editNote(" + noteEntry.id + ")'>" +
                    "编辑" +
                    "</button>" +
                "</div>" +
				"<small class='pull-right note-date'>" +
				noteEntry.note_date +
				"</small>" +
			"</li>";
	}
}

// 执行 SQL 成功以后
function onSuccess(tx, rs) {
	console.log("成功！");
	loadNote();
}

// 执行 SQL 成功以后
function onError(tx, e) {
	console.log("失败！" + e.message);
}


