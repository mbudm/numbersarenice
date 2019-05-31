import * as React from "react"
import Responsive from "react-responsive"

import { Game } from "../../components/games/times-table-speed/Game";
import FabButton from "../../components/shared/FabButton"
import THEME from "../../theme"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

const HeaderArea = () => {
  const goBack = () => window.history.back()
  return <FabButton onClickHandler={goBack} />
}

export default () => {
  return (
    <>
      <Default>
        <div
          style={{
            backgroundColor: THEME.aboutPage.layout.backgroundColor,
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: THEME.aboutPage.layout.cardMaxWidth,
              paddingBottom: 40,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 40,
            }}
          >
            <HeaderArea />
            <Game />
          </div>
        </div>
      </Default>
      <Mobile>
        <HeaderArea />
        <Game />
      </Mobile>
    </>
  )
}
