/* @flow */
import type {Thunk} from "../state/types"
import Notice from "../state/Notice"
import Search from "../state/Search"
import Tab from "../state/Tab"
import Tabs from "../state/Tabs"
import errors from "../errors"
import refreshSpaceNames from "./refreshSpaceNames"

export default (): Thunk => (dispatch, getState) => {
  let state = getState()
  let space = Tab.space(state)
  let spaceId = Tab.getSpaceId(state)
  let spaceName = Tab.getSpaceName(state)
  let id = Tab.clusterId(state)
  let spaceIsDeleted = spaceId && !space

  if (spaceIsDeleted) {
    dispatch(Tabs.clearActive())
    dispatch(Search.setCluster(id))
    dispatch(Notice.set(errors.spaceDeleted(spaceName)))
    dispatch(refreshSpaceNames())
  }
}
