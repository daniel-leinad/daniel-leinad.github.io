import init, { execute_script } from "./pkg/web_pages.js";

init().then(() => {
    let inputTextArea = document.getElementById("shaggy-sql-input");
    inputTextArea.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            executeShaggySql();
        }
    });
});

function executeShaggySql() {
    let input = document.getElementById("shaggy-sql-input").value;
    let result = execute_script(input);
    let outputElement = document.getElementById("shaggy-sql-output");
    if (result === "") {
        outputElement.innerHTML = "<br/>";
    } else {
        outputElement.innerText = result;
    }
}
