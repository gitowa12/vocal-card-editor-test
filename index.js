document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");

  // アイコンのドラッグ開始イベント
  document.querySelectorAll("#icons img").forEach((icon) => {
    icon.addEventListener("dragstart", (e) => {
      const imageSrc = e.target.src; // ドラッグされた画像のsrcを取得
      e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
    });
  });

  // エディタに対するドラッグオーバーイベント
  editor.addEventListener("dragover", (e) => {
    e.preventDefault(); // デフォルトの挙動をキャンセル
  });

  // エディタに対するドロップイベント
  editor.addEventListener("drop", (e) => {
    e.preventDefault();
    const imageSrc = e.dataTransfer.getData("imageSrc");
    if (imageSrc) {
      createDraggableImage(e.offsetX, e.offsetY, imageSrc);
    }
  });
});

// ドラッグ可能な画像を作成し、エディタ内に配置する関数
function createDraggableImage(x, y, src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.position = "absolute";
  img.style.left = x + "px";
  img.style.top = y + "px";
  img.draggable = true;
  document.getElementById("editor").appendChild(img);

  // 新しく追加された画像に対するドラッグ開始イベント
  img.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "dragging");
    e.dataTransfer.setDragImage(e.target, 0, 0); // ドラッグ中に表示される画像を設定
    e.target.classList.add("dragging"); // ドラッグ中の要素にクラスを追加
  });

  // エディタに対するドロップイベント（再配置用）
  img.addEventListener("dragend", (e) => {
    const editor = document.getElementById("editor");
    const draggingImg = editor.querySelector(".dragging");
    if (draggingImg) {
      const rect = editor.getBoundingClientRect();
      draggingImg.style.left = e.clientX - rect.left + "px";
      draggingImg.style.top = e.clientY - rect.top + "px";
      draggingImg.classList.remove("dragging"); // クラスを削除
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // textareaタグを全て取得
  const textareaEls = document.querySelectorAll("textarea");

  textareaEls.forEach((textareaEl) => {
    // デフォルト値としてスタイル属性を付与
    textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
    // inputイベントが発生するたびに関数呼び出し
    textareaEl.addEventListener("input", setTextareaHeight);
  });

  // textareaの高さを計算して指定する関数
  function setTextareaHeight() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
});
