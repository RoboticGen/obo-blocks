import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { blocks } from "../blocky/blocks";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";
import * as Blockly from "blockly/core";


const get_workspace_json = tool(
  async () => {
    const workspace = Blockly.getMainWorkspace();
    return Blockly.serialization.workspaces.save(workspace);
  },
  {
    name: "get_workspace_json",
    description: "Returns the current workspace as JSON",
  }
);

const add_block = tool(
  async ({ block_type }) => {
    const workspace = Blockly.getMainWorkspace();
    const newBlock = workspace.newBlock(block_type);
    newBlock.initSvg();
    newBlock.render();
    return `Block of type ${block_type} added with ID ${newBlock.id}`;
  },
  {
    name: "add_block",
    description: "Adds a new block to the workspace",
    schema: z.object({
        block_type: z.string().describe("The type of block to add"),
        }),
  }
);

// const get_available_blocks = tool(
//   getDefinedBlocks,
//   {
//     name: "get_available_blocks",
//     description: "Returns a list of all available blocks",
//   }
// );

const add_print_block = tool(
  async ({ message }) => {
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
  },
  {
    name: "add_print_block",
    description:
      "Adds a print block to the workspace to print a specific message",
    schema: z.object(
        {
        block_type: z.string().describe("Text to print")
        }
    )
  }
);

const tools = [
  get_workspace_json,
  add_block,
  add_print_block,
];

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant who can work with the blockly workspace. You can add blocks to the workspace based on user requests. You can find the defined blocks and plan your actions accordingly.Use only available blocks",
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const llm = new ChatGoogleGenerativeAI({
  apiKey: "your-api-key", // Use the Google AI Studio API Key - https://aistudio.google.com/
  model: "gemini-2.5-flash",
  maxOutputTokens: 4096,
})

const agent = createToolCallingAgent({ llm, tools, prompt });
const executor = AgentExecutor.fromAgentAndTools({
  agent,
  tools,
  verbose: true,
});

export { executor };
