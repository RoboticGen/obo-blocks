import * as Blockly from "blockly/core";
import { blocks } from "../blocky/blocks";

async function getDefinedBlocks() {
  const blocksInfo = [];

  for (const [type, block] of Object.entries(Blockly.Blocks)) {
    if (type == "variables_get_dynamic" || type == "variables_set_dynamic" || type == "variables_get" || type == "variables_set" || type == "text_multiline" || type == "text_join") continue;
    let block = blocks[type];
    let comment = block.getCommentText();
    if (comment) {
      blocksInfo.push({
        type: type,
        comment: comment,
      });
    }
  }
  return blocksInfo;
}

export { getDefinedBlocks };