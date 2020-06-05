/* @flow */

// This is needed to use zealot outside a browser.
global.fetch = require("node-fetch")

import {exec, execSync} from "child_process"
import path from "path"

import zealot from "../../src/js/services/zealot"

import {retryUntil} from "../lib/control"
import {nodeZqDistDir} from "../lib/env"
import {handleError, stdTest} from "../lib/jest.js"
import {
  click,
  ingestFile,
  newAppInstance,
  startApp,
  waitForResults
} from "../lib/app"

describe("Zar tests", () => {
  let app
  let testIdx = 0
  const ZAR = path.join(nodeZqDistDir(), "zar")
  const ZAR_SPACE_NAME = "sample.zar"
  beforeEach(() => {
    app = newAppInstance(path.basename(__filename), ++testIdx)
    return startApp(app)
  })

  afterEach(async () => {
    if (app && app.isRunning()) {
      return await app.stop()
    }
  })

  stdTest(`Brim starts when a Zar space is present`, (done) => {
    ingestFile(app, "sample.tsv")
      .then(async () => {
        await waitForResults(app)

        // Figure out underlying space directories. One will be a
        // zarRoot. The other will be used to read zng into zar.
        const client = zealot.client("localhost:9867")

        const sampleSpace = (await client.spaces.list())[0]
        const zarSpace = await client.spaces.create({name: ZAR_SPACE_NAME})

        const zngFile = path.join(sampleSpace.data_path, "all.zng")
        const zarRoot = zarSpace.data_path

        // Create a zar archive inside the space and index some
        // interesting stuff.
        execSync(`"${ZAR}" import -s 1024B -R "${zarRoot}" "${zngFile}"`)
        await Promise.all(
          [":ip", ":port", "uid", "_path"].map((index) =>
            exec(`"${ZAR}" index -R "${zarRoot}" ${index}`)
          )
        )

        // Make sure zqd identifies both spaces.
        retryUntil(
          () => client.spaces.list(),
          (spaces) => spaces.length === 2
        )

        // Restart the app so that it reads the new space.
        await app.browserWindow.reload()
        await click(app, ".add-tab")
        await app.client.waitForVisible(
          `//*[@class="space-link"]/*[text()="${ZAR_SPACE_NAME}"]`
        )
        done()
      })
      .catch((err) => {
        handleError(app, err, done)
      })
  })
})
