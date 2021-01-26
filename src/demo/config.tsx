import React from "react";
import merge from "lodash/merge";
import {
  BasicConfig,
  // types:
  Operators,
  Widgets,
  Fields,
  Config,
  Types,
  Conjunctions,
  Settings,
  LocaleSettings,
  OperatorProximity,
  Funcs,
  DateTimeFieldSettings
} from "react-awesome-query-builder";
import NumberDay from "./components/widgets/NumberDay";
import moment from "moment";
import en_US from "antd/lib/locale-provider/en_US";

// @ts-ignore
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
// @ts-ignore
import MaterialConfig from "react-awesome-query-builder/lib/config/material";

const skinToConfig = {
  vanilla: BasicConfig,
  antd: AntdConfig,
  material: MaterialConfig
};

export default skin => {
  const InitialConfig = skinToConfig[skin];

  const conjunctions: Conjunctions = {
    ...InitialConfig.conjunctions
  };

  const proximity: OperatorProximity = {
    ...InitialConfig.operators.proximity,
    valueLabels: [
      { label: "Word 1", placeholder: "Enter first word" },
      { label: "Word 2", placeholder: "Enter second word" }
    ],
    textSeparators: [
      //'Word 1',
      //'Word 2'
    ],
    options: {
      ...InitialConfig.operators.proximity.options,
      optionLabel: "Near", // label on top of "near" selectbox (for config.settings.showLabels==true)
      optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
      optionPlaceholder: "Select words between", // placeholder for "near" selectbox
      minProximity: 2,
      maxProximity: 10,
      defaults: {
        proximity: 2
      },
      customProps: {}
    }
  };

  const operators: Operators = {
    ...InitialConfig.operators,
    // examples of  overriding
    proximity,
    between: {
      ...InitialConfig.operators.between,
      valueLabels: ["Value from", "Value to"],
      textSeparators: ["from", "to"]
    },
    on: {
      label: "on",
      reversedOp: "not_on",
      labelForFormat: "on",
      cardinality: 1,
      formatOp: (field, _op, value, _valueSrc, _valueType, opDef) =>
        `${field} ${opDef.labelForFormat} ${value}`,
      mongoFormatOp: (field, op, value) => ({ [field]: { $eq: value } })
    }
  };

  const widgets: Widgets = {
    ...InitialConfig.widgets,
    // examples of  overriding
    text: {
      ...InitialConfig.widgets.text
    },
    slider: {
      ...InitialConfig.widgets.slider,
      customProps: {
        width: "300px"
      }
    },
    rangeslider: {
      ...InitialConfig.widgets.rangeslider,
      customProps: {
        width: "300px"
      }
    },
    date: {
      ...InitialConfig.widgets.date,
      dateFormat: "DD.MM.YYYY",
      valueFormat: "YYYY-MM-DD"
    },
    time: {
      ...InitialConfig.widgets.time,
      timeFormat: "HH:mm",
      valueFormat: "HH:mm:ss"
    },
    datetime: {
      ...InitialConfig.widgets.datetime,
      timeFormat: "HH:mm",
      dateFormat: "DD.MM.YYYY",
      valueFormat: "YYYY-MM-DD HH:mm:ss"
    },
    func: {
      ...InitialConfig.widgets.func,
      customProps: {
        showSearch: true
      }
    },
    treeselect: {
      ...InitialConfig.widgets.treeselect,
      customProps: {
        showSearch: true
      }
    }
  };

  const types: Types = {
    ...InitialConfig.types,
    // examples of  overriding
    days: {
      ...InitialConfig.types.number,
      widgets: {
        NumberDay,
        widgets: {
          number: {
            widgetProps: {
              customProps: {
                formatter: value => (value ? `${value} day` : ""),
                parser: value => value.replace(" day", "")
              }
            }
          }
        }
      }
    },
    boolean: merge(InitialConfig.types.boolean, {
      widgets: {
        boolean: {
          widgetProps: {
            hideOperator: true,
            operatorInlineLabel: "is"
          },
          opProps: {
            equal: {
              label: "is"
            },
            not_equal: {
              label: "is not"
            }
          }
        }
      }
    })
  };

  const localeSettings: LocaleSettings = {
    locale: {
      moment: "en",
      antd: en_US
    },
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Field",
    operatorLabel: "Operator",
    funcLabel: "Function",
    fieldPlaceholder: "Select field",
    funcPlaceholder: "Select function",
    operatorPlaceholder: "Select operator",
    deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add rule",
    delGroupLabel: null,
    notLabel: "Exclude",
    valueSourcesPopupTitle: "Select value source",
    removeRuleConfirmOptions: {
      title: "Are you sure delete this rule?",
      okText: "Yes",
      okType: "danger"
    },
    removeGroupConfirmOptions: {
      title: "Are you sure delete this group?",
      okText: "Yes",
      okType: "danger"
    }
  };

  const settings: Settings = {
    ...InitialConfig.settings,
    ...localeSettings,

    valueSourcesInfo: {
      value: {
        label: "Value"
      },
      field: {
        label: "Field",
        widget: "field"
      },
      func: {
        label: "Function",
        widget: "func"
      }
    },
    // canReorder: true,
    // canRegroup: true,
    // showNot: true,
    // showLabels: true,
    maxNesting: 5,
    canLeaveEmptyGroup: true,
    showErrorMessage: true
    // renderField: (props) => <FieldCascader {...props} />,
    // renderOperator: (props) => <FieldDropdown {...props} />,
    // renderFunc: (props) => <FieldSelect {...props} />,
    // maxNumberOfRules: 10 // number of rules can be added to the query builder
  };

  //////////////////////////////////////////////////////////////////////

  const fields: Fields = {
    appointment: {
      label: "Appointment",
      type: "!group",
      subfields: {
        notcancelledon: {
          label: "Not Cancelled",
          operators: ["equal"],
          type: "number",
          fieldSettings: {
            min: 0,
            max: 100
          },
          valueSources: ["value"]
        },
        cancelledon: {
          label: "Cancelled On",
          operators: ["equal"],
          type: "number",
          widgets: {
            number: {
              widgetProps: {
                customProps: {
                  formatter: value => (value ? `${value} (Days)` : ""),
                  parser: value => value.replace(" (Days)", "")
                }
              }
            }
          },
          fieldSettings: {
            min: 0,
            max: 100
          },
          valueSources: ["value"]
        },
        cancelledondate: {
          label: "Cancelled Date",
          operators: [
            "equal",
            "not_equal",
            "less_or_equal",
            "greater_or_equal",
            "between",
            "not_between"
          ],
          type: "date",
          valueSources: ["value"]
        },
        emaildepartment: {
          label: "Email Department",
          type: "select",
          fieldSettings: {
            listValues: ["All", "BODYSHOP", "INTERNAL", "PDI", "SERVICE"]
          },
          defaultValue: "All",
          valueSources: ["value"]
        },
        emailcollection: {
          label: "Email Collection",
          type: "select",
          fieldSettings: {
            listValues: [
              "None",
              "Collected",
              "Already There",
              "Changed",
              "Missed",
              "Unknow"
            ]
          },
          valueSources: ["value"]
        },
        estimatedcompleteon: {
          label: "Estimated Complete On",
          type: "number",
          widgets: {
            number: {
              widgetProps: {
                customProps: {
                  formatter: value => (value ? `${value} (Days)` : ""),
                  parser: value => value.replace(" (Days)", "")
                }
              }
            }
          },
          operators: ["equal"],
          fieldSettings: {
            min: 0,
            max: 100
          },
          valueSources: ["value"]
        },
        estimatedcompletedate: {
          label: "Estimated Complete Date",
          operators: [
            "equal",
            "not_equal",
            "less_or_equal",
            "greater_or_equal",
            "between",
            "not_between"
          ],
          type: "date",
          valueSources: ["value"]
        },
        inspectionitem: {
          label: "Has Lane Inspection Item",
          operators: ["equal", "not_equal"],
          type: "text",
          defaultValue: "one or more appointments with Lane Inspection Items",
          valueSources: ["value"]
        }
      }
    },
    click: {
      label: "Click",
      type: "!group",
      subfields: {
        clickon: {
          label: "Clicked On",
          operators: ["equal", "not_equal"],
          type: "number",
          widgets: {
            number: {
              widgetProps: {
                customProps: {
                  formatter: value => (value ? `${value} (Days)` : ""),
                  parser: value => value.replace(" (Days)", "")
                }
              }
            }
          },
          fieldSettings: {
            min: 0,
            max: 100
          },
          valueSources: ["value"]
        },
        clicktype: {
          label: "Click Type",
          type: "select",
          fieldSettings: {
            listValues: ["General", "Homepage", "Facebook", "Twitter"]
          },
          valueSources: ["value"]
        }
      }
    },
    vehicles: {
      label: "Vehicles",
      type: "!group",
      subfields: {
        make: {
          type: "select",
          fieldSettings: {
            listValues: ["Mazda", "Ford", "Toyota"]
          },
          valueSources: ["value"]
        },
        model: {
          type: "select",
          fieldSettings: {
            listValues: ["abc", "def", "xyz"]
          },
          valueSources: ["value"]
        },
        year: {
          type: "number",
          fieldSettings: {
            min: 1990,
            max: 2022
          },
          valueSources: ["value"]
        }
      }
    }
  };

  //////////////////////////////////////////////////////////////////////

  const funcs: Funcs = {
    LOWER: {
      label: "Lowercase",
      mongoFunc: "$toLower",
      jsonLogic: "toLowerCase",
      jsonLogicIsMethod: true,
      returnType: "text",
      args: {
        str: {
          label: "String",
          type: "text",
          valueSources: ["value", "field"]
        }
      }
    },
    LINEAR_REGRESSION: {
      label: "Linear regression",
      returnType: "number",
      formatFunc: ({ coef, bias, val }, _) => `(${coef} * ${val} + ${bias})`,
      sqlFormatFunc: ({ coef, bias, val }) => `(${coef} * ${val} + ${bias})`,
      mongoFormatFunc: ({ coef, bias, val }) => ({
        $sum: [{ $multiply: [coef, val] }, bias]
      }),
      jsonLogic: ({ coef, bias, val }) => ({
        "+": [{ "*": [coef, val] }, bias]
      }),
      renderBrackets: ["", ""],
      renderSeps: [" * ", " + "],
      args: {
        coef: {
          label: "Coef",
          type: "number",
          defaultValue: 1,
          valueSources: ["value"]
        },
        val: {
          label: "Value",
          type: "number",
          valueSources: ["value"]
        },
        bias: {
          label: "Bias",
          type: "number",
          defaultValue: 0,
          valueSources: ["value"]
        }
      }
    }
  };

  const config: Config = {
    conjunctions,
    operators,
    widgets,
    types,
    settings,
    fields,
    funcs
  };

  return config;
};
