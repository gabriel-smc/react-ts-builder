export default {
  type: "group",
  id: "9a99988a-0123-4456-b89a-b1607f326fd8",
  children1: {
    "b88ba998-4567-489a-bcde-f1770042afd7": {
      type: "rule_group",
      properties: {
        conjunction: "AND",
        field: "appointment"
      },
      children1: {
        "9b988989-0123-4456-b89a-b1770042baff": {
          type: "rule",
          properties: {
            field: "appointment.cancelledondate",
            operator: "between",
            value: ["2021-01-14", "2021-02-11"],
            valueSrc: ["value", null],
            valueError: [null, null, null],
            valueType: ["date", "date"]
          }
        },
        "bab9a989-89ab-4cde-b012-3177004cb750": {
          type: "rule",
          properties: {
            field: "appointment.cancelledondate",
            operator: "less_or_equal",
            value: ["2021-01-14"],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["date"]
          }
        },
        "a99b98a9-cdef-4012-b456-71770073ad4f": {
          type: "rule",
          properties: {
            field: "appointment.emaildepartment",
            operator: "select_equals",
            value: ["All"],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["select"]
          }
        },
        "a889b98b-89ab-4cde-b012-31770073d2fe": {
          type: "rule",
          properties: {
            field: "appointment.emailcollection",
            operator: "select_any_in",
            value: [["Collected", "Already There", "Changed"]],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["multiselect"]
          }
        }
      }
    },
    "999b99b8-4567-489a-bcde-f17700741217": {
      type: "rule_group",
      properties: {
        conjunction: "AND",
        field: "click"
      },
      children1: {
        "8abba988-0123-4456-b89a-b177007426ca": {
          type: "rule",
          properties: {
            field: "click.clickon",
            operator: "equal",
            value: [1],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["number"]
          }
        },
        "aa9aba98-cdef-4012-b456-717700743a1e": {
          type: "rule",
          properties: {
            field: "click.clicktype",
            operator: "select_not_equals",
            value: ["Homepage"],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["select"]
          }
        }
      }
    },
    "b99babaa-4567-489a-bcde-f176ff77b180": {
      type: "rule_group",
      properties: {
        conjunction: "AND",
        field: "vehicles"
      },
      children1: {
        "88bb99a9-cdef-4012-b456-71770041ed15": {
          type: "rule",
          properties: {
            field: "vehicles.make",
            operator: "select_any_in",
            value: [["Mazda", "Ford"]],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["multiselect"]
          }
        },
        "bab9ba88-89ab-4cde-b012-317700421280": {
          type: "rule",
          properties: {
            field: "vehicles.year",
            operator: "greater_or_equal",
            value: [1996],
            valueSrc: ["value"],
            valueError: [null],
            valueType: ["number"]
          }
        }
      }
    }
  },
  properties: {
    conjunction: "AND",
    not: false
  }
};
