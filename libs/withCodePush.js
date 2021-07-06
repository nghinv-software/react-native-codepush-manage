/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */
import React from 'react';
import codePush from 'react-native-code-push';
import { CodePushContext } from './CodePushContext';

const withCodePush = (codePushOptions) => (WrappedComponent) => {
  class CodePushProvider extends React.PureComponent {
    state = {
      status: null,
      progress: 0,
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
          <WrappedComponent />
        </CodePushContext.Provider>
      );
    }
  }

  return codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
    ...codePushOptions,
  })(CodePushProvider);
};

export {
  withCodePush,
};
