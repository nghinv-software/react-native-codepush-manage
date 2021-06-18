/**
 * Created by nghinv on Tue Jun 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import codePush from 'react-native-code-push';
import { CodePushContext } from './CodePushContext';

class CodePushProvider extends React.PureComponent {
  state = {
    status: null,
    progress: null,
  }

  codePushStatusDidChange(status) {
    this.setState({ status });
  }

  codePushDownloadDidProgress(progress) {
    const newProgress = parseInt(progress.receivedBytes / progress.totalBytes);
    if (newProgress !== this.state.progress) {
      this.setState({ progress: newProgress });
    }
  }

  render() {
    return (
      <CodePushContext.Provider
        value={{
          status: this.state.status,
          progress: this.state.progress,
        }}
      >
        {this.props.children}
      </CodePushContext.Provider>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(CodePushProvider);
