import "./styles/index.css";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";

import {
  editor,
  insertPythonSnippet,
  makeUneditable,
  saveAsPythonFile,
  loadModifiedCode,
  saveModifideCode,
  saveAsJsonFile,
} from "./editor/editor";

import * as Blockly from "blockly/core";
import { toolbox } from "./blocky/toolbox";
import { forBlock } from "./blocky/generator";
// import { pythonGenerator } from "blockly/python";
import { pythonGenerator } from "./micropython/setup";
import { blocks } from "./blocky/blocks";
import { OboCategory } from "./blocky/categories";
import { theme } from "./blocky/themes";
import { save, load, exportJson, importJson } from "./blocky/serialization";

import { worker, terminal, stopWorker } from "./pyodide/loader";
import { getDefinedBlocks } from "./chatbot/tools";

import {
  createPinButtonCallback,
  createADCButtonCallback,
  createPWMButtonCallback,
  createI2CButtonCallback,
} from "./micropython/callback";
import {
  pinCategoryFlyout,
  adcCategoryFlyout,
  pwmCategoryFlyout,
  i2cCategoryFlyout,
} from "./micropython/flyouts";

import { executor } from "./chatbot/model";

let editable = false;
let ws;

// ------------------ Elements -------------------------

const editbutton = document.getElementById("edit-button");
// const codeDiv = document.getElementById('generatedCode').firstChild;
const blocklyDiv = document.getElementById("editor");
const imageEDit = document.getElementById("editing-image");
const copyButton = document.getElementById("copy-button");
const runcodeButton = document.getElementById("run-button");
const clearButton = document.getElementById("clear-button");
const stopButton = document.getElementById("stop-button");
const exportButton = document.getElementById("export-button");
const importJsonButton = document.getElementById("import-json-button");
const exportJsonButton = document.getElementById("export-json-button");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");
const runButtonText = document.getElementById("run-text");
const editbuttonText = document.getElementById("edit-text");
const codeDiv = document.getElementById("code");
const outputDiv = document.getElementById("output");
const runModelButton = document.getElementById("run-model-button");

// ------------------- Event Listners -----------------------------
// obo_blocks_logo.src = oboBlocksLogo
// academy_logo.src = academyLogo
// ------------------- Blockly Configuration -------------------------

Blockly.common.defineBlocks(blocks);
Object.assign(pythonGenerator.forBlock, forBlock);

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  OboCategory,
  true
);

const options = {
  toolbox: toolbox,
  theme: theme,
  media: "media",
  grid: {
    spacing: 20,
    length: 1,
    colour: "#888",
    snap: false,
  },
  zoom: {
    controls: true,
    startScale: 1,
    maxScale: 1.5,
    minScale: 0.7,
    scaleSpeed: 1.2,
  },
  renderer: "zelos",
};

// ----------------------- Function defintions --------------------------------
async function runcode() {
  try {
    runcodeButton.setAttribute("disabled", true);
    runButtonText.innerHTML = "Running";
    let code = editor.state.doc.toString();
    worker.postMessage({ code: code, command: "run" });
    runcodeButton.removeAttribute("disabled");
    runButtonText.innerHTML = "Run";
  } catch (err) {
    console.error("Error running code:", err);
  }
}

async function copyTextToClipboard(textToCopy) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    }
  } catch (err) {
    console.error("Error copying text to clipboard:", err);
  }
}

function showNotification(message) {
  notificationText.innerText = message;

  // Show the notification
  notification.classList.add("show");

  // Hide the notification after 2 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 1500);
}

function initBlokly(workspace) {
  workspace = Blockly.inject(blocklyDiv, options);
  workspace.registerToolboxCategoryCallback("PIN", pinCategoryFlyout);
  workspace.registerToolboxCategoryCallback("ADC", adcCategoryFlyout);
  workspace.registerToolboxCategoryCallback("PWM", pwmCategoryFlyout);
  workspace.registerToolboxCategoryCallback("I2C", i2cCategoryFlyout);

  workspace.registerButtonCallback(
    "CREATE_PIN_VARIABLE",
    createPinButtonCallback
  );
  workspace.registerButtonCallback(
    "CREATE_ADC_VARIABLE",
    createADCButtonCallback
  );
  workspace.registerButtonCallback(
    "CREATE_PWM_VARIABLE",
    createPWMButtonCallback
  );
  workspace.registerButtonCallback(
    "CREATE_I2C_VARIABLE",
    createI2CButtonCallback
  );

  workspace.updateToolbox(toolbox);
  workspace.addChangeListener((e) => {
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      workspace.isDragging()
    ) {
      return;
    }
    save(workspace);
    const code = pythonGenerator.workspaceToCode(workspace);
    insertPythonSnippet(code);
  });
  return workspace;
}

let totalSizeWindowSizw =
  parseInt(codeDiv.getBoundingClientRect().height.toFixed(0)) +
  parseInt(outputDiv.getBoundingClientRect().height.toFixed(0));
let oldcodeSize = codeDiv.getBoundingClientRect().height.toFixed(0);
let newoutputSize = outputDiv.getBoundingClientRect().height.toFixed(0);

function resizeRightColumn() {
  let newcodeSize = codeDiv.getBoundingClientRect().height.toFixed(0);
  if (
    newcodeSize < 500 &&
    newcodeSize > 300 &&
    newcodeSize < totalSizeWindowSizw
  ) {
    let outputSize = totalSizeWindowSizw - newcodeSize; // Replace codeSize with newcodeSize
    console.log("Output Size: ", totalSizeWindowSizw);
    outputDiv.style.height = outputSize + "px";
    oldcodeSize = newcodeSize;
  }
}

if ("ResizeObserver" in window) {
  // Create a new ResizeObserver
  const resizeObserver = new ResizeObserver(resizeRightColumn);
  // Start observing the element
  resizeObserver.observe(codeDiv);
} else {
  console.log("Resize Observer not supported in this browser.");
}
// ------------------------ Initializations -----------------------------------------------------------

ws = initBlokly(ws);

// ------------------------ Event Listners -----------------------------------------------------------

editbutton.addEventListener("click", function () {
  editable = !editable;
  makeUneditable(editable);

  if (editable) {
    showNotification("Editing enabled");
    editbuttonText.innerHTML = "Editing";
    save(ws);
    loadModifiedCode();
    ws.dispose();
    blocklyDiv.style.display = "none";
    imageEDit.style.display = "block";
  } else {
    editbuttonText.innerHTML = "Edit";
    blocklyDiv.style.display = "block";
    imageEDit.style.display = "none";
    saveModifideCode();
    ws = initBlokly(ws);
    load(ws);
    const code = pythonGenerator.workspaceToCode(ws);
    insertPythonSnippet(code);
    showNotification("Editing disabled");
  }
});
copyButton.addEventListener("click", () => {
  let code = editor.state.doc.toString();
  if (code === "") {
    showNotification("No code to copy");
    return;
  }
  copyTextToClipboard(code);
  showNotification("Code copied to clipboard");
});

runcodeButton.addEventListener("click", () => {
  runcode();
});

clearButton.addEventListener("click", () => {
  terminal.innerHTML = "Python 3.10 \n>>> ";
  showNotification("Terminal cleared");
});

stopButton.addEventListener("click", () => {
  stopWorker();
});

exportButton.addEventListener("click", () => {
  const content = editor.state.doc.toString();
  if (content === "") {
    showNotification("No code to export");
    return;
  }
  saveAsPythonFile(content);
  showNotification("Code exported as script.py");
});

importJsonButton.addEventListener("click", () => {
  let inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.accept = ".json";
  inputElement.click();
  inputElement.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      try {
        let imported = importJson(ws, json);
        if (imported) {
          showNotification("Workspace imported");
          const code = pythonGenerator.workspaceToCode(ws);
          insertPythonSnippet(code);
        } else {
          showNotification("Error importing JSON");
        }
      } catch (err) {
        console.error("Error importing JSON:", err);
        showNotification("Error importing JSON");
      }
    };
    reader.readAsText(file);
  });

  inputElement.remove();
});

exportJsonButton.addEventListener("click", () => {
  const json = exportJson(ws);
  saveAsJsonFile(JSON.stringify(json));
  showNotification("Workspace exported as workspace.json");
});

document.addEventListener("DOMContentLoaded", () => {
  makeUneditable(editable);
  notification.style.transition = "opacity 0.5s ease-in-out";
  ws.resize();
});

let add_printblock = async (message) => {
   let workspace = Blockly.getMainWorkspace();
      let newBlock = workspace.newBlock("print_block");
      let stringBlock = workspace.newBlock("string_block");
      stringBlock.setFieldValue(message, "input");
      stringBlock.initSvg();
      stringBlock.render();
  
      let connection = newBlock.getInput("value");
      if (connection) {
        connection.connection.connect(stringBlock.outputConnection);
      }
      newBlock.initSvg();
      newBlock.render();
};


runModelButton.addEventListener("click", async () => {
  const input = prompt("What do you want to do with AI")
  const result = await executor.invoke({ input: input});
  console.log("Agent Result: ", result);
  // add_printblock("Yasantha")
  
});

