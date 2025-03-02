/**
 * @format
 */

import { App } from "@/app"
import React from "react"
import ReactTestRenderer from "react-test-renderer"

test("renders correctly", async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />)
  })
})
