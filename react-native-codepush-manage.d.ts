/**
 * Created by nghinv on Thu Jun 11 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

declare module '@nghinv/react-native-codepush-manage' {
  import React, { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';
  import codePush, { CodePushOptions } from 'react-native-code-push';

  interface CodePushContextType {
    status: null | codePush.SyncStatus;
    progress: null | number;
  }

  type StatusTitle = {
    Updating: string;
    Installing: string;
    NeedToRestart: string;
  }

  type AppVersionType = {
    title?: string;
    statusTitle?: StatusTitle;
    style?: ViewStyle;
    titleColor?: string;
    titleStyle?: TextStyle;
    onPress?: () => void;
    restartOnPress?: boolean;
    buildDate?: string;
  }

  export class CodePushProvider extends Component { }

  export function useCodePush<T extends CodePushContextType>(): T;

  export const withCodePush = (codePushOptions: CodePushOptions) => (WrappedComponent: React.ReactNode) => React.Children;

  export class AppVersion extends Component<AppVersionType> {

  }
}