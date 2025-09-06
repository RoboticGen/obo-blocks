/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

import {
  defaultVariableValidator,
  pinModeBlockValidator,
  adcBlockValidator,
  pwmBlockValidator,
  i2cBlockValidator,
  i2cPinBlockValidator,
} from "./validator";

Blockly.Blocks["string_block"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("Hello World!"),
      "input"
    );
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setCommentText(`
      This block used to represent a string value.
      Inputs: input (string) - The text value of the string block.
      Outputs: (string) - The string value.`)
  },

};

Blockly.Blocks["add_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("+");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["subtract_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("-");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["print_block"] = {
  init: function () {
    this.appendValueInput("value").setCheck(null).appendField("print");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["if_block"] = {
  init: function () {
    this.appendValueInput("condition").setCheck("Boolean").appendField("if");
    this.appendStatementInput("statement").setCheck(null).appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFBF00");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["number_block"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldNumber(0), "input");
    this.setOutput(true, "Number");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["equal_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("==");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["if_else_block"] = {
  init: function () {
    this.appendValueInput("condition").setCheck("Boolean").appendField("if");
    this.appendStatementInput("statement").setCheck(null).appendField("then");
    this.appendStatementInput("else").setCheck(null).appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFAB19");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["multiply_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck("Number");
    this.appendDummyInput().appendField("*");
    this.appendValueInput("right").setCheck("Number");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["division_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("/");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["not_equal_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("!=");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["if_else_block"] = {
  init: function () {
    this.appendValueInput("condition").setCheck("Boolean").appendField("if");
    this.appendStatementInput("statement").setCheck(null).appendField("then");
    this.appendStatementInput("else").setCheck(null).appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFBF00");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["multiply_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck("Number");
    this.appendDummyInput().appendField("*");
    this.appendValueInput("right").setCheck("Number");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["division_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("/");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["while_block"] = {
  init: function () {
    this.appendValueInput("condition").setCheck("Boolean").appendField("while");
    this.appendStatementInput("statement").setCheck(null).appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFBF00");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["greater_than_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField(">");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["less_than_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("<");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["greater_than_equal_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField(">=");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["less_than_equal_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck(null);
    this.appendDummyInput().appendField("<=");
    this.appendValueInput("right").setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["input_block"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("input")
      .appendField(new Blockly.FieldTextInput("prompt"), "input");
    this.setOutput(true, "String");
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["true_block"] = {
  init: function () {
    this.appendDummyInput().appendField("True");
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["false_block"] = {
  init: function () {
    this.appendDummyInput().appendField("False");
    this.setOutput(true, "Boolean");
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["modulo_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck("Number");
    this.appendDummyInput().appendField("%");
    this.appendValueInput("right").setCheck("Number");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["power_block"] = {
  init: function () {
    this.appendValueInput("left").setCheck("Number");
    this.appendDummyInput().appendField("^");
    this.appendValueInput("right").setCheck("Number");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["range_block"] = {
  init: function () {
    this.appendDummyInput().appendField("range");
    this.appendValueInput("start").setCheck(null).appendField("begin");
    this.appendValueInput("end").setCheck(null).appendField("end");
    this.appendValueInput("step").setCheck(null).appendField("step");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["for_block"] = {
  init: function () {
    this.appendValueInput("value")
      .setCheck(null)
      .appendField("for")
      .appendField(new Blockly.FieldVariable("index"), "variable")
      .appendField("in");
    this.appendStatementInput("statement").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFBF00");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["list_block"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("list")
      .appendField(new Blockly.FieldTextInput("1,2,3"), "input");
    this.setOutput(true, null);
    this.setColour("#CF63CF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["list_append_block"] = {
  init: function () {
    this.appendDummyInput().appendField("append");
    this.appendValueInput("value").setCheck(null);
    this.appendDummyInput().appendField("to");
    this.appendValueInput("list").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CF63CF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["list_index_get_block"] = {
  init: function () {
    this.appendValueInput("input")
      .setCheck(null)
      .appendField("get index")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "index")
      .appendField("of");
    this.setOutput(true, null);
    this.setColour("#CF63CF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["list_index_set_block"] = {
  init: function () {
    this.appendValueInput("input")
      .setCheck(null)
      .appendField("set index")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "index")
      .appendField("of");
    this.appendDummyInput()
      .appendField("to")
      .appendField(new Blockly.FieldTextInput("1,2,3"), "value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CF63CF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["list_remove_block"] = {
  init: function () {
    this.appendDummyInput().appendField("remove");
    this.appendValueInput("value").setCheck(null);
    this.appendDummyInput().appendField("from");
    this.appendValueInput("list").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CF63CF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["int_str_conv_block"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("str")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "number");
    this.setOutput(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["time_sleep"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sleep")
      .appendField(new Blockly.FieldNumber(0, 0), "time")
      .appendField("Seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8c52ff");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["pin_state"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set")
      .appendField(
        new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
        "pin_variable"
      )
      .appendField("to")
      .appendField(
        new Blockly.FieldDropdown([
          ["On", "On"],
          ["Off", "Off"],
        ]),
        "pin_states"
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#005d8f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pinModeBlockValidator);
  },
};

Blockly.Blocks["pin_mode"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set pin")
      .appendField(new Blockly.FieldNumber(0, 0, 30, 1), "pin_number")
      .appendField(" to")
      .appendField(
        new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
        "pinVariable"
      )
      .appendField("variable as ")
      .appendField(
        new Blockly.FieldDropdown([
          ["Input", "IN"],
          ["Output", "OUT"],
        ]),
        "pinMode"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#005d8f");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["pin_value"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set")
      .appendField(
        new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
        "pin_variable"
      )
      .appendField("value to")
      .appendField(
        new Blockly.FieldDropdown([
          ["0", "0"],
          ["1", "1"],
        ]),
        "pin_values"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#005d8f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pinModeBlockValidator);
  },
};

// Blockly.Blocks["create_adc"] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("Create ADC from")
//       .appendField(
//         new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
//         "pin_variable"
//       );
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   },
// };

Blockly.Blocks["create_adc"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Create ADC from")
      .appendField(
        new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
        "pin_variable"
      )
      .appendField("as")
      .appendField(
        new Blockly.FieldVariable("adc", null, ["ADC"], "ADC"),
        "adc_variable"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ff4300");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["read_adc"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Read")
      .appendField(
        new Blockly.FieldVariable("adc", null, ["ADC"], "ADC"),
        "ADC"
      )
      .appendField("assign variable to")
      .appendField(
        new Blockly.FieldVariable("var", defaultVariableValidator),
        "Var"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ff4300");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(adcBlockValidator);
  },
};

Blockly.Blocks["read_micro_volt"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Read micro volts from ")
      .appendField(
        new Blockly.FieldVariable("adc", null, ["ADC"], "ADC"),
        "ADC"
      )
      .appendField("and assign to")
      .appendField(
        new Blockly.FieldVariable("var", defaultVariableValidator),
        "Var"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ff4300");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(adcBlockValidator);
  },
};

Blockly.Blocks["create_pwm"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Create")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      )
      .appendField("from")
      .appendField(
        new Blockly.FieldVariable("pin", null, ["Pin"], "Pin"),
        "Pin"
      )
      .appendField("with Frequency")
      .appendField(new Blockly.FieldNumber(50, 0, Infinity, 10), "frequency")
      .appendField("Duty")
      .appendField(new Blockly.FieldNumber(8000, 0, Infinity, 10), "duty");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6e9d2f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pinModeBlockValidator);
  },
};

Blockly.Blocks["set_pwm_duty"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(" Set duty cycle of")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      )
      .appendField("to")
      .appendField(new Blockly.FieldNumber(32768, 0), "duty_cycle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6e9d2f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pwmBlockValidator)
  },
};

Blockly.Blocks["init_pwm"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      )
      .appendField("with Frequency")
      .appendField(new Blockly.FieldNumber(50, 0, Infinity, 10), "frequency")
      .appendField("Duty")
      .appendField(new Blockly.FieldNumber(8000, 0, Infinity, 10), "duty");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6e9d2f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pwmBlockValidator)
  },
};

Blockly.Blocks["deinitilize_pwm"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Deinitialize")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6e9d2f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pwmBlockValidator)
  },
};

Blockly.Blocks["set_duty_ns"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set duty of")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      )
      .appendField("to")
      .appendField(new Blockly.FieldNumber(5000, 0), "duty_ns")
      .appendField("nanoseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6e9d2f");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pwmBlockValidator)
  },
};

Blockly.Blocks["set_frequency"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set frequency of")
      .appendField(
        new Blockly.FieldVariable("pwm", null, ["PWM"], "PWM"),
        "PWM"
      )
      .appendField("to")
      .appendField(new Blockly.FieldNumber(50, 0), "frequency");
    this.setColour("#6e9d2f");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(pwmBlockValidator)
  },
};

Blockly.Blocks["i2c"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Create I2C with SCL")
      .appendField(
        new Blockly.FieldVariable("scl_pin", null, ["Pin"], "Pin"),
        "sclPin"
      )
      .appendField("SDA")
      .appendField(
        new Blockly.FieldVariable("sda_pin", null, ["Pin"], "Pin"),
        "sdaPin"
      )
      .appendField("of frequency")
      .appendField(new Blockly.FieldNumber(400000, 0), "frequency")
      .appendField("assign to")
      .appendField(
        new Blockly.FieldVariable("i2c", null, ["I2C"], "I2C"),
        "i2c"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#797c7d");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(i2cPinBlockValidator);
  },
};

Blockly.Blocks["i2c_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("I2C init using SCL")
      .appendField(
        new Blockly.FieldVariable("scl_pin", null, ["Pin"], "Pin"),
        "sclPin"
      )
      .appendField("SDA")
      .appendField(
        new Blockly.FieldVariable("sda_pin", null, ["Pin"], "Pin"),
        "sdaPin"
      )
      .appendField("with frequency")
      .appendField(new Blockly.FieldNumber(400000, 0), "frequency")
      .appendField("assign to")
      .appendField(
        new Blockly.FieldVariable("i2c", null, ["I2C"], "I2C"),
        "i2c"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#797c7d");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(i2cPinBlockValidator);
  },
};

Blockly.Blocks["deint_i2c"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Deinitialize")
      .appendField(
        new Blockly.FieldVariable("i2c", null, ["I2C"], "I2C"),
        "i2c"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#797c7d");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(i2cBlockValidator);
  },
};

Blockly.Blocks["i2c_scan"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Scan for devices using")
      .appendField(
        new Blockly.FieldVariable("i2c", null, ["I2C"], "I2C"),
        "I2C"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#797c7d");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(i2cBlockValidator);
  },
};

export const blocks = Blockly.Blocks;
