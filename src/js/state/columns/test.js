/* @flow */

import {getColumns} from "./selector"
import {
  hideAllColumns,
  hideColumn,
  showAllColumns,
  showColumn,
  updateColumns
} from "../columns/actions"
import TableColumns from "../../models/TableColumns"
import initTestStore from "../../test/initTestStore"

const tableId = "test"
let store
beforeEach(() => {
  store = initTestStore()
})
describe("Columns", () => {
  test("get initial state", () => {
    const state = store.getState()
    expect(getColumns(state)).toEqual({})
  })

  test("Bulk update column settings", () => {
    const state = store.dispatchAll([
      updateColumns(tableId, {
        "_path:string": {
          width: 22,
          isVisible: true,
          position: 0
        },
        "ts:time": {
          width: 200,
          isVisible: false,
          position: 1
        }
      }),
      updateColumns(tableId, {
        "_path:string": {width: 100}
      })
    ])

    expect(getColumns(state)[tableId]).toEqual({
      "_path:string": {
        width: 100,
        isVisible: true,
        position: 0
      },
      "ts:time": {
        width: 200,
        isVisible: false,
        position: 1
      }
    })
  })

  test("hide one column", () => {
    const state = store.dispatchAll([
      hideColumn(tableId, {name: "a", type: "string"})
    ])

    const table = getColumns(state)[tableId]

    expect(table["a:string"]).toEqual({isVisible: false})
  })

  test("show one column", () => {
    const state = store.dispatchAll([
      hideColumn(tableId, {name: "a", type: "string"}),
      showColumn(tableId, {name: "a", type: "string"})
    ])

    const table = getColumns(state)[tableId]

    expect(table["a:string"]).toEqual({isVisible: true})
  })

  test("show all columns", () => {
    const tableColumns = new TableColumns(
      tableId,
      [
        {name: "a", type: "string"},
        {name: "b", type: "string"},
        {name: "c", type: "string"}
      ],
      {
        "a:string": {isVisible: false},
        "b:string": {isVisible: false},
        "c:string": {isVisible: false}
      }
    )

    const state = store.dispatchAll([showAllColumns(tableColumns)])

    const table = getColumns(state)[tableId]

    expect(table["a:string"]).toEqual({isVisible: true})
    expect(table["b:string"]).toEqual({isVisible: true})
    expect(table["c:string"]).toEqual({isVisible: true})
  })

  test("hide all columns", () => {
    const tableColumns = new TableColumns(
      tableId,
      [
        {name: "a", type: "string"},
        {name: "b", type: "string"},
        {name: "c", type: "string"}
      ],
      {
        "a:string": {isVisible: true},
        "b:string": {isVisible: true},
        "c:string": {isVisible: true}
      }
    )

    const state = store.dispatchAll([hideAllColumns(tableColumns)])

    const table = getColumns(state)[tableId]

    expect(table["a:string"]).toEqual({isVisible: false})
    expect(table["b:string"]).toEqual({isVisible: false})
    expect(table["c:string"]).toEqual({isVisible: false})
  })
})