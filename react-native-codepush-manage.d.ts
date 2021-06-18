/**
 * Created by nghinv on Thu Jun 11 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

declare module '@nghinv/react-native-codepush-manage' {
  import React, { Component } from 'react';
  import codePush, { CodePushOptions } from 'react-native-code-push';

  interface CodePushContextType {
    status: null | codePush.SyncStatus;
    progress: null | number;
  }

  export interface CodePushProvider extends Component { }

  export function useCodePush<T extends CodePushContextType>(): T;

  export const withCodePush = (codePushOptions: CodePushOptions) => (WrappedComponent: React.ReactNode) => React.Children;
}