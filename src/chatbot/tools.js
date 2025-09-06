import * as Blockly from "blockly/core";
import { blocks } from "../blocky/blocks";

async function getDefinedBlocks() {
  const blocksInfo = [];

  for (const [type, blockDef] of Object.entries(Blockly.Blocks)) {
    // Skip default Blockly blocks and focus on custom blocks
    if (type == "variables_get_dynamic" || type == "variables_set_dynamic" || 
        type == "variables_get" || type == "variables_set" || 
        type == "text_multiline" || type == "text_join") continue;
    
    try {
      // Create a temporary instance to extract the comment
      const tempWorkspace = new Blockly.Workspace();
      const tempBlock = tempWorkspace.newBlock(type);
      const comment = tempBlock.getCommentText();
      
      // Get additional block information
      const blockInfo = {
        type: type,
        comment: comment || `Block type: ${type}`,
        category: tempBlock.getCategory && tempBlock.getCategory() || 'custom',
        colour: tempBlock.getColour && tempBlock.getColour() || '#000000',
        hasOutput: tempBlock.outputConnection !== null,
        hasPrevious: tempBlock.previousConnection !== null,
        hasNext: tempBlock.nextConnection !== null,
        inputs: []
      };

      // Extract input information
      for (let i = 0; i < tempBlock.inputList.length; i++) {
        const input = tempBlock.inputList[i];
        blockInfo.inputs.push({
          name: input.name,
          type: input.type,
          fields: input.fieldRow.map(field => ({
            name: field.name,
            value: field.getValue && field.getValue() || ''
          }))
        });
      }

      tempWorkspace.dispose();
      blocksInfo.push(blockInfo);
    } catch (error) {
      // If there's an error creating the block, still include basic info
      blocksInfo.push({
        type: type,
        comment: `Block type: ${type} (error reading details)`,
        category: 'unknown',
        colour: '#000000',
        hasOutput: false,
        hasPrevious: false,
        hasNext: false,
        inputs: []
      });
    }
  }
  return blocksInfo;
}

async function getWorkspaceBlockDetails() {
  const workspace = Blockly.getMainWorkspace();
  if (!workspace) {
    return { error: "No workspace available" };
  }

  const blockDetails = [];
  const allBlocks = workspace.getAllBlocks();

  for (const block of allBlocks) {
    const blockInfo = {
      id: block.id,
      type: block.type,
      comment: block.getCommentText() || `${block.type} block`,
      isStatement: block.previousConnection !== null || block.nextConnection !== null,
      isValue: block.outputConnection !== null,
      position: {
        x: block.getRelativeToSurfaceXY().x,
        y: block.getRelativeToSurfaceXY().y
      },
      inputs: [],
      fields: {},
      connections: {
        hasOutput: block.outputConnection !== null,
        hasPrevious: block.previousConnection !== null,
        hasNext: block.nextConnection !== null
      }
    };

    // Extract field values
    for (const fieldName of Object.keys(block.fields_)) {
      const field = block.getField(fieldName);
      if (field) {
        blockInfo.fields[fieldName] = field.getValue();
      }
    }

    // Extract input information
    for (let i = 0; i < block.inputList.length; i++) {
      const input = block.inputList[i];
      const inputInfo = {
        name: input.name,
        type: input.type,
        connectedBlock: null
      };

      // Check if there's a connected block
      if (input.connection && input.connection.targetConnection) {
        const connectedBlock = input.connection.targetConnection.sourceBlock_;
        inputInfo.connectedBlock = {
          id: connectedBlock.id,
          type: connectedBlock.type
        };
      }

      blockInfo.inputs.push(inputInfo);
    }

    blockDetails.push(blockInfo);
  }

  return {
    totalBlocks: allBlocks.length,
    blocks: blockDetails,
    workspaceStats: {
      topBlocks: workspace.getTopBlocks().length,
      hasCode: allBlocks.length > 0
    }
  };
}

export { getDefinedBlocks, getWorkspaceBlockDetails };