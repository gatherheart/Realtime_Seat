import _ from 'lodash'
import React from 'react'

interface LandingProps {}
interface LandingState {}

class LandingPage extends React.Component<LandingProps, LandingState> {
  public static async getInitialProps({ store }) {}

  public render() {
    return <div className="login-wrap">첫페이지</div>
  }
}

export default LandingPage
