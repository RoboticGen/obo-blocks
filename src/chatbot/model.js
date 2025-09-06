import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { blocks } from "../blocky/blocks";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";
import * as Blockly from "blockly/core";
import { getDefinedBlocks, getWorkspaceBlockDetails } from "./tools";


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

const get_available_blocks = tool(
  async () => {
    return await getDefinedBlocks();
  },
  {
    name: "get_available_blocks",
    description: "Returns a list of all available block types with their details, including inputs, outputs, and descriptions",
  }
);

const get_workspace_block_details = tool(
  async () => {
    return await getWorkspaceBlockDetails();
  },
  {
    name: "get_workspace_block_details", 
    description: "Returns detailed information about all blocks currently in the workspace, including their positions, connections, and field values",
  }
);

const analyze_code_blocks = tool(
  async ({ code }) => {
    const workspace = Blockly.getMainWorkspace();
    
    try {
      // Get current workspace details
      const workspaceDetails = await getWorkspaceBlockDetails();
      const availableBlocks = await getDefinedBlocks();
      
      // Generate current code from workspace using imported pythonGenerator
      const { pythonGenerator } = await import("../micropython/setup");
      const currentCode = pythonGenerator.workspaceToCode(workspace);
      
      return {
        providedCode: code,
        currentWorkspaceCode: currentCode,
        workspaceBlocks: workspaceDetails,
        availableBlockTypes: availableBlocks.map(b => ({
          type: b.type,
          comment: b.comment,
          category: b.category
        })),
        analysis: {
          hasBlocks: workspaceDetails.totalBlocks > 0,
          blockCount: workspaceDetails.totalBlocks,
          topLevelBlocks: workspaceDetails.workspaceStats.topBlocks
        }
      };
    } catch (error) {
      return {
        error: `Error analyzing code: ${error.message}`,
        providedCode: code
      };
    }
  },
  {
    name: "analyze_code_blocks",
    description: "Analyzes provided code and compares it with current workspace blocks, returns detailed analysis",
    schema: z.object({
      code: z.string().describe("The code to analyze and compare with current workspace")
    })
  }
);

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
    schema: z.object({
      message: z.string().describe("Text to print")
    })
  }
);

const tools = [
  get_workspace_json,
  add_block,
  add_print_block,
  get_available_blocks,
  get_workspace_block_details,
  analyze_code_blocks,
];

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant specialized in working with Blockly visual programming workspace. You have comprehensive tools to:\n" +
    "1. Analyze and understand all available block types with their properties and capabilities\n" +
    "2. Examine the current workspace and understand what blocks are already placed\n" +
    "3. Add new blocks to the workspace based on user requirements\n" +
    "4. Analyze code and understand how it relates to the visual blocks\n" +
    "5. Get detailed information about block connections, inputs, outputs, and configurations\n\n" +
    "Always use the available tools to understand the current state before making changes. " +
    "Use only blocks that are available in the system. When adding blocks, consider their " +
    "connections and relationships with existing blocks in the workspace.",
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
